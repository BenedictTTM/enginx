"use client";

import { apiClient } from "@/lib/api-client";
import { EventCard, EventCardSkeleton } from "./EventCard";
import { AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Events() {
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await apiClient.getEvents({ status: "PUBLISHED" });
      if (!res.success) throw new Error(res.message || "Failed to load events");
      return res.data || [];
    }
  });

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-100 p-6 rounded-xl flex items-center text-red-800">
          <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
          <p>{error instanceof Error ? error.message : "Unable to connect to the server."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto pt-2 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Upcoming Events
        </h2>
        <p className="max-w-2xl mx-auto  font-semibold bg-linear-to-r from-blue-400 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
          Join us for our latest conferences, workshops, and community meetups.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <EventCardSkeleton key={i} />)
        ) : events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <div className="col-span-full py-12 text-center text-neutral-500 bg-neutral-50 rounded-2xl border border-neutral-200 border-dashed">
            No events are currently scheduled. Please check back later.
          </div>
        )}
      </div>
    </div>
  );
}
