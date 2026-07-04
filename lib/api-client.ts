import { Prisma } from "@prisma/client";

export type Event = Prisma.EventGetPayload<{}>;
export type Registration = Prisma.RegistrationGetPayload<{}>;
export type Attendee = Prisma.RegistrationGetPayload<{}>;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: { field: string; message: string }[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const apiClient = {
  getEvents: async (params?: Record<string, string>): Promise<ApiResponse<Event[]>> => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    const res = await fetch(`/api/events${query}`, { cache: "no-store" });
    return res.json();
  },

  getEventBySlug: async (slug: string): Promise<ApiResponse<Event>> => {
    const res = await fetch(`/api/events/${slug}`, { cache: "no-store" });
    return res.json();
  },

  createEvent: async (data: any): Promise<ApiResponse<Event>> => {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer admin" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateEvent: async (slug: string, data: any): Promise<ApiResponse<Event>> => {
    const res = await fetch(`/api/events/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: "Bearer admin" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteEvent: async (slug: string): Promise<ApiResponse<null>> => {
    const res = await fetch(`/api/events/${slug}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer admin" },
    });
    return res.json();
  },

  publishEvent: async (id: string): Promise<ApiResponse<Event>> => {
    const res = await fetch(`/api/events/${id}/publish`, {
      method: "PATCH",
      headers: { Authorization: "Bearer admin" },
    });
    return res.json();
  },

  register: async (
    id: string,
    data: {
      attendeeName: string;
      attendeeEmail: string;
      considerationDetails?: string;
    }
  ): Promise<ApiResponse<Registration>> => {
    const res = await fetch(`/api/events/${id}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getAttendees: async (id: string, params?: Record<string, string>): Promise<ApiResponse<Attendee[]>> => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    const res = await fetch(`/api/events/${id}/attendees${query}`, {
      headers: { Authorization: "Bearer admin" },
      cache: "no-store",
    });
    return res.json();
  },

  getAllAttendees: async (params?: Record<string, string>): Promise<ApiResponse<Attendee[]>> => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    const res = await fetch(`/api/attendees${query}`, {
      headers: { Authorization: "Bearer admin" },
      cache: "no-store",
    });
    return res.json();
  },
};
