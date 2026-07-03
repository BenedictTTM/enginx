"use client";

import { useEffect, useState } from "react";
import { apiClient, Event } from "@/lib/api-client";
import { Loader2, Plus, Edit2, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await apiClient.getEvents({ limit: "50" });
      if (res.success && res.data) {
        setEvents(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await apiClient.deleteEvent(slug);
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 bg-[#071a35] text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Events Management</h1>
        <Link
          href="/dashboard/events/new"
          className="bg-white hover:bg-gray-100 text-[#021128] px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-md flex items-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Link>
      </div>

      <div className="bg-[#0c2546]/80 border border-[#163b6b]/60 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#071a35]/40 text-neutral-300 font-semibold border-b border-[#163b6b]/60">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Registrations</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#163b6b]/35">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center bg-[#0c2546]/30">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-400 mx-auto" />
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 bg-[#0c2546]/30">
                    No events found.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-[#163b6b]/20 transition-colors duration-150">
                    <td className="px-6 py-4 font-semibold text-white">
                      {event.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        event.status === "PUBLISHED" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" :
                        event.status === "DRAFT" ? "bg-amber-500/15 text-[#f6e58d] border-amber-500/20" :
                        "bg-neutral-500/15 text-neutral-400 border-neutral-500/20"
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {new Date(event.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {event.registeredCount} / {event.capacity || "∞"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-1">
                      <Link
                        href={`/dashboard/events/${event.id}`}
                        className="inline-flex p-2 text-neutral-400 hover:text-[#8dbef8] hover:bg-[#163b6b]/30 rounded-lg transition-all"
                        title="View Attendees"
                      >
                        <Eye className="w-4.5 h-4.5" />
                      </Link>
                      <Link
                        href={`/dashboard/events/${event.id}/edit`}
                        className="inline-flex p-2 text-neutral-400 hover:text-[#f6e58d] hover:bg-[#163b6b]/30 rounded-lg transition-all"
                        title="Edit Event"
                      >
                        <Edit2 className="w-4.5 h-4.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(event.slug)}
                        className="inline-flex p-2 text-neutral-400 hover:text-red-400 hover:bg-[#163b6b]/30 rounded-lg transition-all cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
