import { NextRequest } from "next/server";
import { eventService } from "@/services/event.service";
import { ApiResponse } from "@/lib/api-response";
import { ApiError, ValidationError } from "@/lib/api-error";

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const id = (await params).slug;
    const body = await req.json();
    
    const attendeeName = body.attendeeName;
    const attendeeEmail = body.attendeeEmail;
    const attendeeId = body.attendeeId; // Optional if logged in
    const ticketType = body.ticketType || "GENERAL";

    if (!attendeeName || !attendeeEmail) {
      throw new ValidationError("Missing required fields", [
        { field: "attendeeName", message: "Name is required" },
        { field: "attendeeEmail", message: "Email is required" }
      ]);
    }
    
    const registration = await eventService.registerForEvent(
      id, 
      attendeeName, 
      attendeeEmail, 
      attendeeId, 
      ticketType
    );
    
    return ApiResponse.success("Successfully registered for the event", registration, 201);
  } catch (error) {
    if (error instanceof ApiError) {
      return ApiResponse.error(error.message, error.errors, error.statusCode);
    }
    return ApiResponse.error("Internal Server Error", [], 500);
  }
}
