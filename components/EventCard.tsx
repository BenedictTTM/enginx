"use client";

import { useState } from "react";
import { Event } from "@/lib/api-client";
import { RegistrationModal } from "./RegistrationModal";
import { Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { getDisplayRegisteredCount } from "@/lib/utils";

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
    <div className="bg-white rounded-2xl border border-neutral-200/60 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-350 ease-out flex flex-col font-varela-round">
      <Link href={`/events/${event.slug}`} className="h-52 bg-neutral-50 relative block overflow-hidden group">
        {event.featuredImage ? (
          <img
            src={event.featuredImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">
            No Image
          </div>
        )}
        {event.category && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-neutral-800 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-sm border border-neutral-100/50">
            {event.category}
          </span>
        )}
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <Link href={`/events/${event.slug}`}>
          <h3 className="text-xl font-bold text-neutral-900 mb-2.5 line-clamp-1 hover:text-blue-600 transition-colors duration-250">
            {event.title}
          </h3>
        </Link>
        <p className="text-neutral-500 mb-5 line-clamp-2 text-sm leading-relaxed">{event.shortDescription}</p>

        <div className="space-y-2.5 mb-6 mt-auto">
          <div className="flex items-center text-sm text-neutral-500">
            <Calendar className="w-4 h-4 mr-2.5 text-blue-500/80" />
            {formattedDate}
          </div>
          {(event.city || event.venue) && (
            <div className="flex items-center text-sm text-neutral-500">
              <MapPin className="w-4 h-4 mr-2.5 text-neutral-400" />
              <span className="truncate">{event.venue || event.city}</span>
            </div>
          )}
          <div className="flex items-center text-sm text-neutral-500">
            <Users className="w-4 h-4 mr-2.5 text-neutral-400" />
            <span>{getDisplayRegisteredCount(event.createdAt, event.registeredCount)} registered</span>
          </div>
        </div>

        <div className="pt-4.5 border-t border-neutral-100/80 space-y-3.5">
          {!event.isFree && (
            <div className="flex items-center justify-between px-0.5">
              <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Price</span>
              <div className="font-bold text-neutral-900 text-lg tracking-tight">
                {event.price}{" "}
                <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider ml-0.5">
                  {event.currency}
                </span>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-2.5">
            <Link
              href={`/events/${event.slug}`}
              className="flex-1 text-center border border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-700 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 outline-none"
            >
              Details
            </Link>
            {event.isRegistrationEnabled && event.status === "PUBLISHED" && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 bg-neutral-900 hover:bg-black text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 outline-none active:scale-[0.98]"
              >
                {event.category?.toLowerCase() === "promo" ? "Apply" : "Register"}
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
