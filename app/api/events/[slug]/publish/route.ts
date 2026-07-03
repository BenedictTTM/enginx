import { NextRequest } from "next/server";
import { eventService } from "@/services/event.service";
import { ApiResponse } from "@/lib/api-response";
import { ApiError } from "@/lib/api-error";
import { requireAdmin } from "@/lib/auth";
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireAdmin(req);
    const id = (await params).slug;
    const event = await eventService.publishEvent(id);
    
    return ApiResponse.success("Event published successfully", event, 200);
  } catch (error) {
    if (error instanceof ApiError) {
      return ApiResponse.error(error.message, error.errors, error.statusCode);
    }
    return ApiResponse.error("Internal Server Error", [], 500);
  }
}
