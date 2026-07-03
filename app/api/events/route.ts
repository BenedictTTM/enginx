import { NextRequest } from "next/server";
import { eventService } from "@/services/event.service";
import { ApiResponse } from "@/lib/api-response";
import { ApiError } from "@/lib/api-error";
import { requireAdmin } from "@/lib/auth";
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const params = {
      page: searchParams.get("page") ? Number(searchParams.get("page")) : undefined,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined,
      sort: searchParams.get("sort") || undefined,
      order: (searchParams.get("order") as "asc" | "desc") || undefined,
      category: searchParams.get("category") || undefined,
      month: searchParams.get("month") || undefined,
      year: searchParams.get("year") || undefined,
      location: searchParams.get("location") || undefined,
      organizer: searchParams.get("organizer") || undefined,
      price: searchParams.get("price") || undefined,
      featured: searchParams.has("featured") ? searchParams.get("featured") === "true" : undefined,
      search: searchParams.get("search") || undefined,
      status: (searchParams.get("status") as any) || undefined,
    };

    const { data, ...pagination } = await eventService.getEvents(params);
    
    return ApiResponse.success("Events fetched successfully", data, 200, pagination);
  } catch (error) {
    console.error("GET /api/events error:", error);
    if (error instanceof ApiError) {
      return ApiResponse.error(error.message, error.errors, error.statusCode);
    }
    return ApiResponse.error("Internal Server Error", [], 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);
    const body = await req.json();
    const event = await eventService.createEvent(body);
    
    return ApiResponse.success("Event created successfully", event, 201);
  } catch (error) {
    console.error("POST /api/events error:", error);
    if (error instanceof ApiError) {
      return ApiResponse.error(error.message, error.errors, error.statusCode);
    }
    return ApiResponse.error("Internal Server Error", [], 500);
  }
}
