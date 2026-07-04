"use client";

import { useEffect, useState, use } from "react";
import { apiClient, Event } from "@/lib/api-client";
import { RegistrationModal } from "@/components/RegistrationModal";
import { Loader2, Calendar, MapPin, ArrowLeft, Tag, ShieldCheck, Ticket } from "lucide-react";
import Link from "next/link";

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await apiClient.getEventBySlug(slug);
        if (res.success && res.data) {
          setEvent(res.data);
        } else {
          setError(res.message || "Failed to load event details.");
        }
      } catch (err) {
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [slug]);

  if (loading) {
    return (
      <div className="relative min-h-screen w-full bg-gradient-to-b from-gray-950 via-[#021128] to-blue-950 text-white pt-28 pb-16 px-4 md:px-12 lg:px-20 font-varela-round flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-400" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="relative min-h-screen w-full bg-gradient-to-b from-gray-950 via-[#021128] to-blue-950 text-white pt-28 pb-16 px-4 md:px-12 lg:px-20 font-varela-round flex flex-col items-center justify-center space-y-4">
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl max-w-md text-center">
          <p className="text-red-400 font-medium mb-4">{error || "Event not found."}</p>
          <Link href="/events" className="inline-flex items-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const formattedStartDate = new Date(event.startDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-gray-950 via-[#021128] to-blue-950 text-white pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden font-varela-round">
      <div className="absolute top-1/4 -left-32 w-[20rem] h-[20rem] sm:w-[28rem] sm:h-[28rem] bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 rounded-full filter blur-3xl opacity-10 animate-blob-float"></div>
      <div className="absolute bottom-1/4 -right-32 w-[20rem] h-[20rem] sm:w-[28rem] sm:h-[28rem] bg-gradient-to-tr from-yellow-400 via-pink-500 to-red-500 rounded-full filter blur-3xl opacity-10 animate-blob-float animation-delay-4000"></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        <Link href="/events" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to all events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0b172a] rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
              {event.featuredImage && (
                <div className="h-64 sm:h-96 relative">
                  <img src={event.featuredImage} alt={event.title} className="w-full h-full object-cover" />
                  {event.category && (
                    <span className="absolute top-4 left-4 bg-blue-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm backdrop-blur-xs">
                      {event.category}
                    </span>
                  )}
                </div>
              )}

              <div className="p-6 sm:p-8 space-y-6">
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">{event.title}</h1>
                <p className="text-gray-300 text-lg leading-relaxed">{event.shortDescription}</p>

                <div className="border-t border-gray-800 pt-6 space-y-4">
                  <h2 className="text-xl font-bold">About this event</h2>
                  <div className="text-gray-400 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                    {event.fullDescription}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Registration Details card */}
          <div className="space-y-6">
            <div className="bg-[#0b172a] p-6 rounded-2xl border border-gray-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Ticket Price</span>
                <span className="text-2xl font-bold text-emerald-400">
                  {event.isFree ? "Free Entry" : `${event.price} ${event.currency}`}
                </span>
              </div>

              <div className="border-t border-gray-800 pt-4 space-y-4 text-sm text-gray-300">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-3 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Date & Time</p>
                    <p>{formattedStartDate}</p>
                    <p className="text-xs text-gray-500">Timezone: {event.timezone}</p>
                  </div>
                </div>

                {(event.venue || event.city) && (
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Location</p>
                      <p>{event.venue}</p>
                      {event.city && <p className="text-xs text-gray-500">{event.city}, {event.country}</p>}
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <Tag className="w-5 h-5 mr-3 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Organizer</p>
                    <p>{event.organizer}</p>
                  </div>
                </div>

                {event.capacity && (
                  <div className="flex items-start">
                    <Ticket className="w-5 h-5 mr-3 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Capacity limit</p>
                      <p>{event.registeredCount} / {event.capacity} registered</p>
                    </div>
                  </div>
                )}
              </div>

              {event.isRegistrationEnabled && event.status === "PUBLISHED" ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-white hover:bg-gray-100 text-[#021128] py-3.5 rounded-xl font-bold tracking-wide transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-white outline-none text-center block"
                >
                  {event.category?.toLowerCase() === "promo" ? "Apply Now" : "Register Now"}
                </button>
              ) : (
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 text-center text-sm text-gray-500">
                  Registration is currently closed for this event.
                </div>
              )}
            </div>

            <div className="bg-[#0b172a]/60 p-6 rounded-2xl border border-gray-800/80 shadow-sm space-y-4">
              <h3 className="font-semibold flex items-center text-white text-sm">
                <ShieldCheck className="w-4 h-4 mr-2 text-emerald-400" /> Secure Registration
              </h3>
              <p className="text-xs text-gray-400">
                Your credentials are secured. Registration confirmation and details will be sent directly to your email address.
              </p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <RegistrationModal event={event} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
