import { eventRepository, EventQueryParams } from "@/repositories/event.repository";
import { createEventSchema, updateEventSchema } from "@/validations/event.schema";
import { NotFoundError, ValidationError } from "@/lib/api-error";
import { Prisma } from "@prisma/client";
import { emailService } from "@/services/email.service";

export class EventService {
  async getEvents(params: EventQueryParams) {
    return eventRepository.findAll(params);
  }

  async getEventBySlug(slug: string) {
    const event = await eventRepository.findBySlug(slug);
    if (!event) throw new NotFoundError("Event not found");
    return event;
  }

  async getEventById(id: string) {
    const event = await eventRepository.findById(id);
    if (!event) throw new NotFoundError("Event not found");
    return event;
  }
  async createEvent(data: any) {
    const validated = createEventSchema.safeParse(data);
    if (!validated.success) {
      const formattedErrors = validated.error.issues.map(err => ({
        field: err.path.join("."),
        message: err.message
      }));
      console.error("Zod Validation Errors:", JSON.stringify(formattedErrors, null, 2));
      throw new ValidationError("Validation failed", formattedErrors);
    }
    
    // Check if slug exists
    const existing = await eventRepository.findBySlug(validated.data.slug);
    if (existing) {
      throw new ValidationError("Slug already in use", [{ field: "slug", message: "Slug must be unique" }]);
    }

    return eventRepository.create(validated.data as Prisma.EventCreateInput);
  }

  async updateEvent(id: string, data: any) {
    await this.getEventById(id); // Ensure exists

    const validated = updateEventSchema.safeParse(data);
    if (!validated.success) {
      const formattedErrors = validated.error.issues.map(err => ({
        field: err.path.join("."),
        message: err.message
      }));
      throw new ValidationError("Validation failed", formattedErrors);
    }

    if (validated.data.slug) {
      const existing = await eventRepository.findBySlug(validated.data.slug);
      if (existing && existing.id !== id) {
        throw new ValidationError("Slug already in use", [{ field: "slug", message: "Slug must be unique" }]);
      }
    }

    return eventRepository.update(id, validated.data);
  }

  async deleteEvent(id: string) {
    await this.getEventById(id); // Ensure exists
    return eventRepository.softDelete(id);
  }

  async publishEvent(id: string) {
    const event = await this.getEventById(id);
    if (event.status === "PUBLISHED") return event;
    return eventRepository.update(id, { status: "PUBLISHED" });
  }

  async getAttendees(id?: string, page?: number, limit?: number) {
    if (id) {
      await this.getEventById(id); // Ensure exists
    }
    return eventRepository.getAttendees(id, page, limit);
  }

  async registerForEvent(
    id: string, 
    attendeeName: string, 
    attendeeEmail: string, 
    attendeeId?: string, 
    ticketType: string = "GENERAL",
    considerationDetails?: string
  ) {
    const event = await this.getEventById(id);
    
    if (!event.isRegistrationEnabled) {
      throw new ValidationError("Registration is not available for this event", []);
    }

    if (event.status !== "PUBLISHED") {
      throw new ValidationError("Event is not open for registration", []);
    }

    if (event.capacity && event.registeredCount >= event.capacity) {
      throw new ValidationError("Event is at full capacity", []);
    }

    if (event.registrationDeadline && new Date() > new Date(event.registrationDeadline)) {
      throw new ValidationError("Registration deadline has passed", []);
    }

    const registration = await eventRepository.createRegistration({
      eventId: id,
      attendeeName,
      attendeeEmail,
      attendeeId, // Will be null if public user
      ticketType,
      paymentStatus: event.isFree ? "PAID" : "PENDING",
      considerationDetails
    });

    // Also increment registeredCount on Event
    await eventRepository.update(id, { registeredCount: { increment: 1 } });

    emailService.sendEventRegistrationEmail(registration, event).catch((err) => {
      console.error("Failed to send registration email:", err);
    });

    return registration;
  }
}

export const eventService = new EventService();
