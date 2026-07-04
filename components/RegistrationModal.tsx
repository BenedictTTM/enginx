"use client";

import { useState } from "react";
import { Event, apiClient } from "@/lib/api-client";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface RegistrationModalProps {
  event: Event;
  onClose: () => void;
}

export function RegistrationModal({ event, onClose }: RegistrationModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consideration, setConsideration] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const isPromo = event.category?.toLowerCase() === "promo";
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { attendeeName: string; attendeePhone: string; considerationDetails?: string }) => {
      const res = await apiClient.register(event.id, data);
      if (!res.success) throw new Error(res.message || "Registration failed.");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["event", event.slug] });
      setSuccess(true);
    },
    onError: (err: any) => {
      setError(err.message || "An unexpected error occurred. Please try again.");
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    if (isPromo) {
      if (!consideration.trim()) {
        setError("Please fill out all fields.");
        return;
      }
    }

    setError(null);
    mutation.mutate({
      attendeeName: name,
      attendeePhone: phone,
      ...(isPromo ? { considerationDetails: consideration } : {})
    });
  };

  const isFormValid = name.trim() && phone.trim() && (!isPromo || consideration.trim());
  const loading = mutation.isPending;

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
            {success 
              ? (isPromo ? "Application Complete" : "Registration Complete") 
              : (isPromo ? "Apply for Promo" : "Register for Event")}
          </h2>
          <p className="text-neutral-500 text-sm mb-6 line-clamp-1">
            {event.title}
          </p>

          {success ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
              <p className="text-neutral-600 mb-6">
                {isPromo 
                  ? `Thank you, ${name}! Your application was successful. We will contact you at ${phone}.`
                  : `Thank you, ${name}! Your registration was successful. We will contact you at ${phone}.`}
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
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none transition-shadow text-neutral-900 bg-white"
                  placeholder="Jane Doe"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none transition-shadow text-neutral-900 bg-white"
                  placeholder="+1 (555) 000-0000"
                  disabled={loading}
                />
              </div>

              {isPromo && (
                <div>
                  <label htmlFor="consideration" className="block text-sm font-medium text-neutral-700 mb-1">
                    When/why should you be considered?
                  </label>
                  <textarea
                    id="consideration"
                    required
                    rows={3}
                    value={consideration}
                    onChange={(e) => setConsideration(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none transition-shadow text-sm text-neutral-900 bg-white"
                    placeholder="Explain when you should be considered or details about your application..."
                    disabled={loading}
                  />
                </div>
              )}

              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !isFormValid}
                className="w-full bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center mt-6"
              >
                {loading 
                  ? <Loader2 className="w-5 h-5 animate-spin" /> 
                  : (isPromo ? "Submit Application" : "Complete Registration")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
