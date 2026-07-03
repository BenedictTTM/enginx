import { NextResponse } from "next/server";

export interface SuccessResponse<T> {
  success: true;
  message: string;
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: any[];
}

export class ApiResponse {
  static success<T>(message: string, data?: T, status = 200, pagination?: SuccessResponse<T>["pagination"]) {
    const response: SuccessResponse<T> = {
      success: true,
      message,
      ...(data !== undefined && { data }),
      ...(pagination && { pagination }),
    };
    return NextResponse.json(response, { status });
  }

  static error(message: string, errors?: any[], status = 400) {
    const response: ErrorResponse = {
      success: false,
      message,
      ...(errors && { errors }),
    };
    return NextResponse.json(response, { status });
  }
}
