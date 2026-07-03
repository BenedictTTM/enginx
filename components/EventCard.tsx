"use client";

import { useState } from "react";
import { Event } from "@/lib/api-client";
import { RegistrationModal } from "./RegistrationModal";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedDate = new Date(event.startDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col font-varela-round">
      <Link href={`/events/${event.slug}`} className="h-48 bg-neutral-100 relative block overflow-hidden group">
        {event.featuredImage ? (
          <img
            src={event.featuredImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">
            No Image
          </div>
        )}
        {event.category && (
          <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-neutral-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {event.category}
          </span>
        )}
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <Link href={`/events/${event.slug}`}>
          <h3 className="text-xl font-bold text-neutral-900 mb-2 line-clamp-1 hover:text-neutral-600 transition-colors">
            {event.title}
          </h3>
        </Link>
        <p className="text-neutral-600 mb-4 line-clamp-2 text-sm">{event.shortDescription}</p>

        <div className="space-y-2 mb-6 mt-auto">
          <div className="flex items-center text-sm text-neutral-500">
            <Calendar className="w-4 h-4 mr-2" />
            {formattedDate}
          </div>
          {(event.city || event.venue) && (
            <div className="flex items-center text-sm text-neutral-500">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="truncate">{event.venue || event.city}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <div className="font-semibold text-neutral-900">
            {event.isFree ? "Free" : `${event.price} ${event.currency}`}
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href={`/events/${event.slug}`}
              className="border border-neutral-200 hover:bg-neutral-50 text-neutral-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors outline-none"
            >
              Details
            </Link>
            {event.isRegistrationEnabled && event.status === "PUBLISHED" && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 outline-none"
              >
                Register
              </button>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <RegistrationModal event={event} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden flex flex-col animate-pulse">
      <div className="h-48 bg-neutral-200" />
      <div className="p-6 flex flex-col flex-1">
        <div className="h-6 bg-neutral-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-neutral-200 rounded w-full mb-2" />
        <div className="h-4 bg-neutral-200 rounded w-5/6 mb-6 mt-auto" />
        <div className="space-y-3 mb-6">
          <div className="h-4 bg-neutral-200 rounded w-1/2" />
          <div className="h-4 bg-neutral-200 rounded w-2/3" />
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
          <div className="h-5 bg-neutral-200 rounded w-16" />
          <div className="h-9 bg-neutral-200 rounded w-24" />
        </div>
      </div>
    </div>
  );
}
