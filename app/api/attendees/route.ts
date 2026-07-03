import { NextRequest } from "next/server";
import { eventService } from "@/services/event.service";
import { ApiResponse } from "@/lib/api-response";
import { ApiError } from "@/lib/api-error";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);
    const searchParams = req.nextUrl.searchParams;
    
    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
    const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : 20;

    const { data, ...pagination } = await eventService.getAttendees(undefined, page, limit);
    
    return ApiResponse.success("Attendees fetched successfully", data, 200, pagination);
  } catch (error) {
    if (error instanceof ApiError) {
      return ApiResponse.error(error.message, error.errors, error.statusCode);
    }
    return ApiResponse.error("Internal Server Error", [], 500);
  }
}
