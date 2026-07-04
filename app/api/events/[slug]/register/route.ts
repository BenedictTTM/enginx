import { NextRequest } from "next/server";
import { eventService } from "@/services/event.service";
import { ApiResponse } from "@/lib/api-response";
import { ApiError, ValidationError } from "@/lib/api-error";

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const id = (await params).slug;
    let body;
    try {
      body = await req.json();
    } catch {
      throw new ValidationError("Invalid or missing JSON body", [
        { field: "body", message: "Request body is empty or invalid JSON" }
      ]);
    }
    
    const attendeeName = body.attendeeName;
    const attendeePhone = body.attendeePhone;
    const attendeeId = body.attendeeId; // Optional if logged in
    const ticketType = body.ticketType || "GENERAL";
    const considerationDetails = body.considerationDetails;

    if (!attendeeName || !attendeePhone) {
      throw new ValidationError("Missing required fields", [
        { field: "attendeeName", message: "Name is required" },
        { field: "attendeePhone", message: "Phone number is required" }
      ]);
    }
    
    const registration = await eventService.registerForEvent(
      id, 
      attendeeName, 
      attendeePhone, 
      attendeeId, 
      ticketType,
      considerationDetails
    );
    
    return ApiResponse.success("Successfully registered for the event", registration, 201);
  } catch (error) {
    console.error("Error in registration route:", error);
    if (error instanceof ApiError) {
      return ApiResponse.error(error.message, error.errors, error.statusCode);
    }
    return ApiResponse.error("Internal Server Error", [], 500);
  }
}
