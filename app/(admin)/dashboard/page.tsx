"use client";

import { useEffect, useState } from "react";
import { apiClient, Event } from "@/lib/api-client";
import { Loader2, Calendar as CalendarIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await apiClient.getEvents({ limit: "5", sort: "createdAt", order: "desc" });
        if (res.success && res.data) {
          setEvents(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-[#071a35]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  const publishedEvents = events.filter((e) => e.status === "PUBLISHED").length;

  return (
    <div className="space-y-6 bg-[#071a35] text-white">
      <h1 className="text-2xl font-bold tracking-wide">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0c2546]/80 border border-[#163b6b]/60 p-6 rounded-2xl shadow-lg flex items-center space-x-4 hover:scale-[1.01] hover:border-blue-500/35 transition-all duration-200">
          <div className="p-3 bg-blue-500/10 text-[#8dbef8] rounded-xl">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Total Events</p>
            <p className="text-2xl font-bold text-white">{events.length}</p>
          </div>
        </div>

        <div className="bg-[#0c2546]/80 border border-[#163b6b]/60 p-6 rounded-2xl shadow-lg flex items-center space-x-4 hover:scale-[1.01] hover:border-blue-500/35 transition-all duration-200">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Published</p>
            <p className="text-2xl font-bold text-white">{publishedEvents}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0c2546]/80 border border-[#163b6b]/60 rounded-2xl overflow-hidden shadow-lg">
        <div className="px-6 py-4 border-b border-[#163b6b]/60 flex justify-between items-center bg-[#071a35]/20">
          <h2 className="text-lg font-semibold">Recent Events</h2>
          <Link href="/dashboard/events" className="text-sm font-medium text-[#8dbef8] hover:text-white flex items-center transition-colors">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <ul className="divide-y divide-[#163b6b]/35">
          {events.length === 0 ? (
            <li className="px-6 py-8 text-center text-gray-400 bg-[#0c2546]/30">No events found.</li>
          ) : (
            events.map((event) => (
              <li key={event.id} className="px-6 py-4 hover:bg-[#163b6b]/30 transition-all duration-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-white">{event.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(event.startDate).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                    event.status === "PUBLISHED" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" :
                    event.status === "DRAFT" ? "bg-amber-500/15 text-[#f6e58d] border-amber-500/20" :
                    "bg-neutral-500/15 text-neutral-400 border-neutral-500/20"
                  }`}>
                    {event.status}
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
