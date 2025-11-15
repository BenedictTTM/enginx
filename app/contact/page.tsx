'use client';

import React, { useState } from 'react';
import { FaPhoneAlt, FaWhatsapp, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { BsFillSendCheckFill } from "react-icons/bs";
type ContactMeProps = {
	phone?: string;
	whatsapp?: string;
	className?: string;
};

function ContactMe({ phone = '+1234567890', whatsapp = '+1234567890', className = '' }: ContactMeProps) {
	const waNumber = whatsapp.replace(/\D/g, '');

	return (
		<div className={`bg-[#071426] rounded-xl p-4 ${className}`}>
			<h3 className="text-lg font-semibold text-white mb-2">Get in touch</h3>
			<p className="text-sm text-gray-300 mb-4">Prefer a quick chat? Call or message me on WhatsApp.</p>

			<div className="flex gap-3">
				<a
					href={`tel:${phone}`}
					className="flex-1 inline-flex items-center justify-center gap-2 bg-transparent border border-gray-700/60 hover:border-gray-600 text-gray-200 px-3 py-2 rounded-lg transition"
					aria-label="Call me directly"
				>
					<FaPhoneAlt className="w-4 h-4" />
					<span className="text-sm">Call Me</span>
				</a>

				<a
					href={`https://wa.me/${waNumber}`}
					target="_blank"
					rel="noreferrer"
					className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-300 border border-emerald-600/30 px-3 py-2 rounded-lg transition"
					aria-label="Chat on WhatsApp"
				>
					<FaWhatsapp className="w-4 h-4" />
					<span className="text-sm">Chat on WhatsApp</span>
				</a>
			</div>
		</div>
	);
}

export default function ContactPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [sent, setSent] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSent(false);

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					subject: subject || 'New Contact Form Submission',
					message,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Failed to send message');
			}

			// Success
			setSent(true);
			setName('');
			setEmail('');
			setSubject('');
			setMessage('');
			
			// Reset success message after 5 seconds
			setTimeout(() => setSent(false), 5000);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
			console.error('Form submission error:', err);
		} finally {
			setLoading(false);
		}
	}

	return (
		<main style={{ fontFamily: "'Varela Round', sans-serif" }} className="p-6 min-h-screen bg-gradient-to-b from-gray-950 via-[#021128] to-blue-950 text-white">
			<div className="max-w-3xl mx-auto ">
				<section className="rounded-2xl  border-yellow-50 p-6">
					<h2 className="text-4xl font-bold text-center mb-2">Get in Touch</h2>
					<p className="text-center  text-sm mb-4 font-semibold bg-linear-to-r from-blue-400 via-yellow-100 to-yellow-200 bg-clip-text text-transparent ">I'd love to hear from you! Send a message, call, or connect on WhatsApp.</p>

					<div className="grid gap-4 md:grid-cols-2 mb-4">
						<a
							href="tel:+233274847107"
							className="flex items-center gap-3 px-4 py-3 rounded-lg bg-transparent border border-gray-700/60 hover:border-gray-600 transition"
						>
							<FaPhoneAlt className="w-4 h-4 text-gray-200" />
							<span className="text-sm text-gray-200">Call Me Directly</span>
						</a>

						<a
							href="https://wa.me/274847107"
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
							className="w-full px-3  rounded-md bg-[#061226] border border-gray-700/50 text-gray-200 text-sm resize-vertical"
							required
						/>

						{error && (
							<div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
								{error}
							</div>
						)}

						{sent && (
							<div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
								✓ Message sent successfully! I'll get back to you soon.
							</div>
						)}

												<div className="flex items-center justify-end">
							<button
								type="submit"
								disabled={loading}
								className="bg-[#f6ecd4] text-[#081523] px-5 py-2 rounded-md font-medium hover:brightness-95 transition inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<BsFillSendCheckFill className={`w-4 h-4 transition ${loading ? 'animate-pulse' : ''}`} />
								<span>{loading ? 'Sending...' : 'Send Message'}</span>
							</button>
						</div>
					</form>
				</section>
			</div>
		</main>
	);
}

