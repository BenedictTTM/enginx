"use client";

import { useEffect, useState } from "react";
import { apiClient, Attendee } from "@/lib/api-client";
import { Loader2, Phone, Calendar, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ExtendedAttendee extends Attendee {
  event?: {
    id: string;
    title: string;
    slug: string;
  };
}

export default function AttendeesDashboardPage() {
  const [attendees, setAttendees] = useState<ExtendedAttendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAttendees = async (currentPage: number) => {
    setLoading(true);
    try {
      const res = await apiClient.getAllAttendees({ page: String(currentPage), limit: "20" });
      if (res.success && res.data) {
        setAttendees(res.data as ExtendedAttendee[]);
        if (res.pagination) {
          setTotalPages(res.pagination.pages);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendees(page);
  }, [page]);

  const handleExportCSV = () => {
    if (attendees.length === 0) return;
    const headers = ["Name", "Phone", "Event", "Ticket Type", "Status", "Registration Date"];
    const rows = attendees.map(a => [
      a.attendeeName,
      a.attendeePhone || "N/A",
      a.event?.title || "N/A",
      a.ticketType,
      a.status,
      new Date(a.registrationDate).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendees-export-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12 bg-[#071a35] text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide text-white">Attendees Management</h1>
        <button 
          onClick={handleExportCSV}
          disabled={attendees.length === 0}
          className="bg-white hover:bg-gray-100 disabled:opacity-40 text-[#021128] px-5 py-2.5 rounded-xl text-sm font-bold shadow-md tracking-wide transition-all flex items-center cursor-pointer border-none outline-none"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>

      <div className="bg-[#0c2546]/80 border border-[#163b6b]/60 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#071a35]/40 text-neutral-300 font-semibold border-b border-[#163b6b]/60">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">Ticket Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#163b6b]/35">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center bg-[#0c2546]/30">
                    <Loader2 className="w-6.5 h-6.5 animate-spin text-blue-400 mx-auto" />
                  </td>
                </tr>
              ) : attendees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 bg-[#0c2546]/30">
                    No attendees registered in the database.
                  </td>
                </tr>
              ) : (
                attendees.map((attendee) => (
                  <tr key={attendee.id} className="hover:bg-[#163b6b]/20 transition-colors duration-150">
                    <td className="px-6 py-4 font-semibold text-white">
                      {attendee.attendeeName}
                    </td>
                    <td className="px-6 py-4 text-gray-300 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-neutral-400" />
                      {attendee.attendeePhone || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {attendee.event ? (
                        <Link 
                          href={`/dashboard/events/${attendee.event.id}`}
                          className="text-[#8dbef8] hover:text-blue-300 hover:underline flex items-center"
                        >
                          {attendee.event.title}
                          <ExternalLink className="w-3.5 h-3.5 ml-1 inline" />
                        </Link>
                      ) : (
                        "Unknown Event"
                      )}
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

      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-4">
          <button
            disabled={page === 1 || loading}
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            className="px-4 py-2 border border-[#163b6b]/60 bg-[#0c2546] hover:bg-[#163b6b]/40 text-white rounded-xl text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            Previous
          </button>
          <span className="text-sm text-gray-400 font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages || loading}
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            className="px-4 py-2 border border-[#163b6b]/60 bg-[#0c2546] hover:bg-[#163b6b]/40 text-white rounded-xl text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
