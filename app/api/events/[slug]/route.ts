import { NextRequest } from "next/server";
import { eventService } from "@/services/event.service";
import { ApiResponse } from "@/lib/api-response";
import { ApiError } from "@/lib/api-error";
import { requireAdmin } from "@/lib/auth";
const isUuid = (str: string) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(str);

const getEventByIdOrSlug = async (idOrSlug: string) => {
  return isUuid(idOrSlug)
    ? await eventService.getEventById(idOrSlug)
    : await eventService.getEventBySlug(idOrSlug);
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const slug = (await params).slug;
    const event = await getEventByIdOrSlug(slug);
    
    return ApiResponse.success("Event fetched successfully", event, 200);
  } catch (error) {
    if (error instanceof ApiError) {
      return ApiResponse.error(error.message, error.errors, error.statusCode);
    }
    return ApiResponse.error("Internal Server Error", [], 500);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin(req);
    const slug = (await params).slug;
    const eventToUpdate = await getEventByIdOrSlug(slug);
    
    const body = await req.json();
    const updated = await eventService.updateEvent(eventToUpdate.id, body);
    
    return ApiResponse.success("Event updated successfully", updated, 200);
  } catch (error) {
    if (error instanceof ApiError) {
      return ApiResponse.error(error.message, error.errors, error.statusCode);
    }
    return ApiResponse.error("Internal Server Error", [], 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin(req);
    const slug = (await params).slug;
    const eventToDelete = await getEventByIdOrSlug(slug);
    
    await eventService.deleteEvent(eventToDelete.id);
    
    return ApiResponse.success("Event deleted successfully", null, 200);
  } catch (error) {
    if (error instanceof ApiError) {
      return ApiResponse.error(error.message, error.errors, error.statusCode);
    }
    return ApiResponse.error("Internal Server Error", [], 500);
  }
}
