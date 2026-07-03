import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export type EventQueryParams = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
  category?: string;
  month?: string;
  year?: string;
  location?: string;
  organizer?: string;
  price?: string;
  featured?: boolean;
  search?: string;
  status?: "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED";
};

export class EventRepository {
  async findAll(params: EventQueryParams) {
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.EventWhereInput = {
      deletedAt: null,
    };

    if (params.status) {
      where.status = params.status;
    }

    if (params.category) where.category = params.category;
    if (params.organizer) where.organizer = params.organizer;
    if (params.location) {
      where.OR = [
        { city: { contains: params.location, mode: "insensitive" } },
        { country: { contains: params.location, mode: "insensitive" } },
      ];
    }
    if (params.featured !== undefined) {
      where.featured = String(params.featured) === "true";
    }
    if (params.price === "free") where.isFree = true;
    if (params.price === "paid") where.isFree = false;

    if (params.month && params.year) {
      const startDate = new Date(Number(params.year), Number(params.month) - 1, 1);
      const endDate = new Date(Number(params.year), Number(params.month), 0);
      where.startDate = { gte: startDate, lte: endDate };
    }

    if (params.search) {
      const search = params.search;
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { shortDescription: { contains: search, mode: "insensitive" } },
        { tags: { has: search } },
      ];
    }

    const orderBy: Prisma.EventOrderByWithRelationInput = {};
    if (params.sort) {
      (orderBy as any)[params.sort] = params.order || "asc";
    } else {
      orderBy.startDate = "asc"; // Default sort
    }

    const [data, total] = await Promise.all([
      db.event.findMany({ where, orderBy, skip, take: limit }),
      db.event.count({ where }),
    ]);

    return { data, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findBySlug(slug: string) {
    return db.event.findUnique({
      where: { slug, deletedAt: null },
      include: { speakers: true, sponsors: true, agenda: true },
    });
  }

  async findById(id: string) {
    return db.event.findUnique({ where: { id, deletedAt: null } });
  }

  async create(data: Prisma.EventCreateInput) {
    return db.event.create({ data });
  }

  async update(id: string, data: Prisma.EventUpdateInput) {
    return db.event.update({ where: { id }, data });
  }

  async softDelete(id: string) {
    return db.event.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async getAttendees(eventId?: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = eventId ? { eventId } : {};
    const [data, total] = await Promise.all([
      db.registration.findMany({
        where,
        skip,
        take: limit,
        orderBy: { registrationDate: "desc" },
        include: { event: true },
      }),
      db.registration.count({ where }),
    ]);
    return { data, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async createRegistration(data: Prisma.RegistrationUncheckedCreateInput) {
    return db.registration.create({ data });
  }
}

export const eventRepository = new EventRepository();
