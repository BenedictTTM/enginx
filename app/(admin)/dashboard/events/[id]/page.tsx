"use client";

import { useEffect, useState, use } from "react";
import { apiClient, Attendee } from "@/lib/api-client";
import { Loader2, ArrowLeft, Download, Mail } from "lucide-react";
import Link from "next/link";

export default function EventAttendeesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const res = await apiClient.getAttendees(id, { limit: "100" });
        if (res.success && res.data) {
          setAttendees(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendees();
  }, [id]);

  return (
    <div className="space-y-6 pb-12 bg-[#071a35] text-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/events" className="p-2 text-neutral-400 hover:text-white transition-colors bg-[#0c2546]/80 rounded-full border border-[#163b6b]/60">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold tracking-wide text-white">Attendees</h1>
        </div>
        <button className="bg-white hover:bg-gray-100 text-[#021128] px-5 py-2.5 rounded-xl text-sm font-bold shadow-md tracking-wide transition-all flex items-center cursor-pointer border-none outline-none">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>

      <div className="bg-[#0c2546]/80 border border-[#163b6b]/60 rounded-2xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-[#163b6b]/50 flex justify-between items-center bg-[#071a35]/25">
          <span className="text-sm font-semibold text-gray-300">Total Registered: {attendees.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#071a35]/40 text-neutral-300 font-semibold border-b border-[#163b6b]/60">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Ticket Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#163b6b]/35">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center bg-[#0c2546]/30">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-400 mx-auto" />
                  </td>
                </tr>
              ) : attendees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400 bg-[#0c2546]/30">
                    No attendees registered yet.
                  </td>
                </tr>
              ) : (
                attendees.map((attendee) => (
                  <tr key={attendee.id} className="hover:bg-[#163b6b]/20 transition-colors duration-150">
                    <td className="px-6 py-4 font-semibold text-white">
                      {attendee.attendeeName}
                    </td>
                    <td className="px-6 py-4 text-gray-300 flex items-center">
                      <Mail className="w-4.5 h-4.5 mr-2 text-neutral-400" />
                      {attendee.attendeeEmail}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {attendee.ticketType}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-emerald-500/15 text-emerald-400 border-emerald-500/20">
                        {attendee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {new Date(attendee.registrationDate).toLocaleDateString()}
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
