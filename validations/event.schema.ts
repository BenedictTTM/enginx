import { z } from "zod";

export const eventBaseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  shortDescription: z.string().min(10).max(255),
  fullDescription: z.string().min(10),
  featuredImage: z.string().url("Must be a valid URL"),
  galleryImages: z.array(z.string().url()).optional(),
  category: z.string().min(2),
  organizer: z.string().min(2),
  venue: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  timezone: z.string().default("UTC"),
  
  isRegistrationEnabled: z.boolean().default(true),
  registrationDeadline: z.string().datetime().optional(),
  capacity: z.number().int().positive().optional(),
  price: z.number().min(0).default(0),
  currency: z.string().length(3).default("USD"),
  isFree: z.boolean().default(true),
  
  featured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  faqs: z.any().optional(), // Can be refined
  requirements: z.array(z.string()).optional(),
  registrationLink: z.string().url().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "CANCELLED", "COMPLETED"]).default("DRAFT"),
});

export const createEventSchema = eventBaseSchema.refine(
  (data) => new Date(data.endDate) > new Date(data.startDate),
  { message: "End date cannot be before start date", path: ["endDate"] }
).refine(
  (data) => {
    if (data.registrationDeadline) {
      return new Date(data.registrationDeadline) <= new Date(data.startDate);
    }
    return true;
  },
  { message: "Registration deadline cannot be after the event starts", path: ["registrationDeadline"] }
);

export const updateEventSchema = eventBaseSchema.partial();
