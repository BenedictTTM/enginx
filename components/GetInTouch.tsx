'use client';

import React, { useState } from 'react';
import { FaPhoneAlt, FaWhatsapp, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import ContactMe from './ContactMe';

export default function GetInTouch() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder: replace with actual submit logic / API call
    console.log({ name, email, subject, message });
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  }

  return (
    <section className="bg-[#071426] text-gray-100 rounded-2xl border border-gray-800/50 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">Get in Touch</h2>
        <p className="text-center text-gray-300 text-sm mb-4">I'd love to hear from you! Send a message, call, or connect on WhatsApp.</p>

        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <a
            href="tel:+1234567890"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-transparent border border-gray-700/60 hover:border-gray-600 transition"
          >
            <FaPhoneAlt className="w-4 h-4 text-gray-200" />
            <span className="text-sm text-gray-200">Call Me Directly</span>
          </a>

          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-transparent border border-gray-700/60 hover:border-gray-600 transition"
          >
            <FaWhatsapp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-200">Chat on WhatsApp</span>
          </a>
        </div>

        <div className="flex items-center my-2">
          <div className="flex-grow h-px bg-gray-700/40" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <div className="flex-grow h-px bg-gray-700/40" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#061226] border border-gray-700/50 text-gray-200 text-sm"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#061226] border border-gray-700/50 text-gray-200 text-sm"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-[#061226] border border-gray-700/50 text-gray-200 text-sm"
          />

          <textarea
            placeholder="Your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 rounded-md bg-[#061226] border border-gray-700/50 text-gray-200 text-sm resize-vertical"
            required
          />

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#f6ecd4] text-[#081523] px-5 py-2 rounded-md font-medium hover:brightness-95 transition"
            >
              {sent ? 'Message Sent' : 'Send Message'}
            </button>

            <div className="flex items-center gap-3 text-gray-400">
              <span className="text-xs">Find me elsewhere</span>
              <a href="#" aria-label="LinkedIn" className="hover:text-white"><FaLinkedin /></a>
              <a href="#" aria-label="GitHub" className="hover:text-white"><FaGithub /></a>
              <a href="#" aria-label="Twitter" className="hover:text-white"><FaTwitter /></a>
            </div>
          </div>
        </form>

        <div className="mt-6">
          <ContactMe phone="+1234567890" whatsapp="+1234567890" />
        </div>
      </div>
    </section>
  );
}
