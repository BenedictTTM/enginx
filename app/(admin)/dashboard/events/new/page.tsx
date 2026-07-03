"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { Loader2, ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    organizer: "",
    startDate: "",
    endDate: "",
    isRegistrationEnabled: true,
    status: "DRAFT",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setError("Featured image is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Upload Image to Cloudinary
      const formDataUpload = new FormData();
      formDataUpload.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: "Bearer admin" },
        body: formDataUpload,
      });
      
      const uploadData = await uploadRes.json();
      if (!uploadData.success) {
        throw new Error(uploadData.message || "Image upload failed");
      }

      // 2. Create Event
      const payload = {
        ...formData,
        featuredImage: uploadData.url,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };

      const res = await apiClient.createEvent(payload);
      if (res.success) {
        router.push("/dashboard/events");
      } else {
        if (res.errors && res.errors.length > 0) {
          const validationMsg = res.errors.map((e) => `${e.field}: ${e.message}`).join("\n");
          setError(validationMsg);
        } else {
          setError(res.message || "Failed to create event");
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 bg-[#071a35] text-white">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/events" className="p-2 text-neutral-400 hover:text-white transition-colors bg-[#0c2546]/80 rounded-full border border-[#163b6b]/60">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold tracking-wide text-white">Create New Event</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#0c2546]/80 border border-[#163b6b]/60 rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">
        {error && (
          <div className="p-4 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-300">Featured Image *</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#163b6b] border-dashed rounded-2xl relative overflow-hidden group hover:border-[#8dbef8] transition-all duration-200">
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-45" />
                <div className="relative flex flex-col items-center">
                  <span className="bg-white hover:bg-neutral-100 text-[#021128] px-4 py-2 rounded-xl text-sm font-bold shadow-md cursor-pointer transition-colors duration-200">
                    Change Image
                  </span>
                </div>
              </>
            ) : (
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-[#8dbef8]/60" />
                <div className="flex text-sm text-neutral-300 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-[#8dbef8] hover:text-blue-300 focus-within:outline-none">
                    <span>Upload a file</span>
                  </label>
                  <p className="pl-1 text-neutral-400">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-400">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
            <input id="file-upload" name="file-upload" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} required={!imageFile} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">Title *</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2.5 bg-[#071a35] text-white rounded-xl border border-[#163b6b]/60 focus:ring-2 focus:ring-[#8dbef8] focus:border-[#8dbef8] outline-none transition-all duration-200" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">Slug *</label>
            <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-4 py-2.5 bg-[#071a35] text-white rounded-xl border border-[#163b6b]/60 focus:ring-2 focus:ring-[#8dbef8] focus:border-[#8dbef8] outline-none transition-all duration-200" placeholder="e.g. tech-summit" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-300">Short Description *</label>
          <input required type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="w-full px-4 py-2.5 bg-[#071a35] text-white rounded-xl border border-[#163b6b]/60 focus:ring-2 focus:ring-[#8dbef8] focus:border-[#8dbef8] outline-none transition-all duration-200" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-300">Full Description *</label>
          <textarea required name="fullDescription" value={formData.fullDescription} onChange={handleChange} rows={5} className="w-full px-4 py-2.5 bg-[#071a35] text-white rounded-xl border border-[#163b6b]/60 focus:ring-2 focus:ring-[#8dbef8] focus:border-[#8dbef8] outline-none resize-none transition-all duration-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">Category *</label>
            <input required type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2.5 bg-[#071a35] text-white rounded-xl border border-[#163b6b]/60 focus:ring-2 focus:ring-[#8dbef8] focus:border-[#8dbef8] outline-none transition-all duration-200" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">Organizer *</label>
            <input required type="text" name="organizer" value={formData.organizer} onChange={handleChange} className="w-full px-4 py-2.5 bg-[#071a35] text-white rounded-xl border border-[#163b6b]/60 focus:ring-2 focus:ring-[#8dbef8] focus:border-[#8dbef8] outline-none transition-all duration-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">Start Date & Time *</label>
            <input required type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full px-4 py-2.5 bg-[#071a35] text-white rounded-xl border border-[#163b6b]/60 focus:ring-2 focus:ring-[#8dbef8] focus:border-[#8dbef8] outline-none transition-all duration-200" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">End Date & Time *</label>
            <input required type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full px-4 py-2.5 bg-[#071a35] text-white rounded-xl border border-[#163b6b]/60 focus:ring-2 focus:ring-[#8dbef8] focus:border-[#8dbef8] outline-none transition-all duration-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300">Event Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-[#071a35] text-white rounded-xl border border-[#163b6b]/60 focus:ring-2 focus:ring-[#8dbef8] focus:border-[#8dbef8] outline-none transition-all duration-200"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-3 pt-4 border-t border-[#163b6b]/40">
          <input type="checkbox" id="isRegistrationEnabled" name="isRegistrationEnabled" checked={formData.isRegistrationEnabled} onChange={handleChange} className="w-5 h-5 bg-[#071a35] text-[#8dbef8] rounded-md border-[#163b6b]/60 focus:ring-[#8dbef8] focus:ring-offset-[#0c2546] focus:ring-2" />
          <label htmlFor="isRegistrationEnabled" className="text-sm font-semibold text-neutral-300 cursor-pointer select-none">Enable Registration (Promo Mode)</label>
        </div>

        <div className="pt-6 flex justify-end">
          <button type="submit" disabled={loading} className="bg-white hover:bg-gray-100 text-[#021128] font-bold px-6 py-3 rounded-xl transition-all duration-200 flex items-center disabled:opacity-50 cursor-pointer shadow-md">
            {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2 text-[#021128]" /> : null}
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}
