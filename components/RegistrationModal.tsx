"use client";

import { useState } from "react";
import { Event, apiClient } from "@/lib/api-client";
import { X, Loader2, CheckCircle2 } from "lucide-react";

interface RegistrationModalProps {
  event: Event;
  onClose: () => void;
}

export function RegistrationModal({ event, onClose }: RegistrationModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.register(event.id, { attendeeName: name, attendeeEmail: email });
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.message || "Registration failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
          disabled={loading}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            {success ? "Registration Complete" : "Register for Event"}
          </h2>
          <p className="text-neutral-500 text-sm mb-6 line-clamp-1">
            {event.title}
          </p>

          {success ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
              <p className="text-neutral-600 mb-6">
                Thank you, {name}! Your registration was successful. We will send updates to {email}.
              </p>
              <button
                onClick={onClose}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none transition-shadow"
                  placeholder="Jane Doe"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none transition-shadow"
                  placeholder="jane@example.com"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !name.trim() || !email.trim()}
                className="w-full bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center mt-6"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Registration"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
