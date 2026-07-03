import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { Event, Registration } from "@prisma/client";

export class EmailService {
  private getTransporter() {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.warn("Email service is not configured (missing EMAIL_USER or EMAIL_PASS). Skipping email sending.");
      return null;
    }

    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });
  }

  private formatEventDate(startDate: Date, endDate: Date, timezone: string): string {
    try {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: timezone || "UTC",
        timeZoneName: "short"
      };

      const startStr = new Date(startDate).toLocaleString("en-US", options);
      const endStr = new Date(endDate).toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: timezone || "UTC",
        timeZoneName: "short"
      });

      return `${startStr} - ${endStr}`;
    } catch (e) {
      return `${new Date(startDate).toUTCString()} - ${new Date(endDate).toUTCString()}`;
    }
  }

  async sendEventRegistrationEmail(registration: Registration, event: Event): Promise<boolean> {
    try {
      const transporter = this.getTransporter();
      if (!transporter) return false;

      const emailUser = process.env.EMAIL_USER;
      const logoPath = path.join(process.cwd(), "public", "engin.png");
      const logoExists = fs.existsSync(logoPath);

      const formattedDate = this.formatEventDate(event.startDate, event.endDate, event.timezone);
      const location = event.venue 
        ? `${event.venue}${event.address ? `, ${event.address}` : ""}${event.city ? `, ${event.city}` : ""}${event.country ? `, ${event.country}` : ""}`
        : "Online / TBD";

      const priceText = event.isFree 
        ? "Free Ticket" 
        : `${event.price} ${event.currency}`;

      const mailOptions = {
        from: `"EnginX Events" <${emailUser}>`,
        to: registration.attendeeEmail,
        subject: `Ticket Confirmed: ${event.title}`,
        attachments: logoExists ? [{
          filename: "logo.png",
          path: logoPath,
          cid: "logo"
        }] : [],
        html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta name="color-scheme" content="light">
              <meta name="supported-color-schemes" content="light">
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  line-height: 1.6; 
                  color: #1a1a1a;
                  background-color: #f5f7fa;
                  margin: 0;
                  padding: 0;
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
                }
                .wrapper { 
                  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
                  padding: 24px 12px;
                  min-height: auto;
                }
                .container { 
                  max-width: 600px; 
                  margin: 0 auto; 
                  background: #ffffff;
                  border-radius: 16px;
                  overflow: hidden;
                  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
                }
                .header { 
                  background: linear-gradient(135deg, #162633 0%, #243a4b 100%);
                  color: #ffffff; 
                  padding: 28px 20px;
                  text-align: center;
                  position: relative;
                }
                .logo {
                  width: 72px;
                  height: 72px;
                  background: transparent;
                  border-radius: 0;
                  padding: 0;
                  margin: 0 auto 12px;
                  box-shadow: none;
                }
                .logo img {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  display: block;
                  border-radius: 6px;
                }
                .header h1 {
                  margin: 0 0 8px 0;
                  font-size: 24px;
                  font-weight: 600;
                  letter-spacing: -0.4px;
                  line-height: 1.25;
                }
                .header p {
                  margin: 0;
                  font-size: 14px;
                  opacity: 0.92;
                  font-weight: 400;
                }
                .content { 
                  padding: 20px 20px;
                  background: #ffffff;
                }
                .greeting {
                  font-size: 20px;
                  color: #1a1a1a;
                  font-weight: 500;
                  margin-bottom: 24px;
                  letter-spacing: -0.2px;
                }
                .text-block {
                  color: #475569;
                  font-size: 15px;
                  line-height: 1.8;
                  margin-bottom: 24px;
                }
                .ticket-box { 
                  background: #f8fafc;
                  border: 1px solid #e2e8f0;
                  border-radius: 12px;
                  margin: 20px 0;
                  overflow: hidden;
                }
                .ticket-header {
                  background: #f1f5f9;
                  padding: 12px 20px;
                  border-bottom: 1px solid #e2e8f0;
                }
                .ticket-title {
                  font-size: 16px;
                  font-weight: 600;
                  color: #0f172a;
                }
                .ticket-body {
                  padding: 20px;
                }
                .info-row {
                  margin-bottom: 16px;
                }
                .info-row:last-child {
                  margin-bottom: 0;
                }
                .label { 
                  display: block;
                  font-weight: 600;
                  color: #64748b;
                  font-size: 11px;
                  text-transform: uppercase;
                  letter-spacing: 0.8px;
                  margin-bottom: 4px;
                }
                .value { 
                  color: #1a1a1a;
                  font-size: 15px;
                  font-weight: 400;
                }
                .badge {
                  display: inline-block;
                  padding: 2px 8px;
                  font-size: 12px;
                  font-weight: 500;
                  border-radius: 4px;
                  background: #e2e8f0;
                  color: #334155;
                }
                .badge-success {
                  background: #dcfce7;
                  color: #15803d;
                }
                .badge-warning {
                  background: #fef9c3;
                  color: #a16207;
                }
                .cta-section {
                  background: linear-gradient(135deg, #f7fbff 0%, #f2f9ff 100%);
                  padding: 16px;
                  border-radius: 10px;
                  margin: 20px 0;
                  border: 1px solid #e6f3ff;
                }
                .cta-text {
                  color: #0c4a6e;
                  font-size: 14px;
                  line-height: 1.6;
                  margin: 0;
                }
                .signature {
                  margin-top: 24px;
                  padding-top: 18px;
                  border-top: 1px solid #e8ecf1;
                  color: #475569;
                  font-size: 15px;
                  line-height: 1.6;
                }
                .signature-name {
                  font-weight: 600;
                  color: #1a1a1a;
                  display: block;
                  margin-top: 8px;
                  font-size: 16px;
                }
                .footer { 
                  background: #f8fafc;
                  padding: 12px 16px;
                  text-align: center;
                  border-top: 1px solid #e8ecf1;
                }
                .footer p { 
                  margin: 0;
                  font-size: 13px;
                  color: #64748b;
                  line-height: 1.6;
                }
                .footer p + p {
                  margin-top: 6px;
                  font-size: 12px;
                  opacity: 0.8;
                }
                @media only screen and (max-width: 600px) {
                  .wrapper { padding: 20px 10px; }
                  .header { padding: 36px 24px; }
                  .content { padding: 36px 24px; }
                  .footer { padding: 28px 24px; }
                  .header h1 { font-size: 24px; }
                  .greeting { font-size: 18px; }
                  .ticket-body { padding: 16px; }
                }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="container">
                  <div class="header">
                    ${logoExists ? '<div class="logo"><img src="cid:logo" alt="Logo" /></div>' : ''}
                    <h1>Ticket Confirmed!</h1>
                    <p>You're registered for ${event.title}</p>
                  </div>
                  <div class="content">
                    <div class="greeting">Hi ${registration.attendeeName},</div>
                    <div class="text-block">
                      Thank you for registering! Your ticket for the event has been successfully confirmed. Below are your registration details and event information.
                    </div>
                    
                    <div class="ticket-box">
                      <div class="ticket-header">
                        <div class="ticket-title">Registration Ticket Details</div>
                      </div>
                      <div class="ticket-body">
                        <div class="info-row">
                          <span class="label">Event</span>
                          <div class="value" style="font-weight: 600;">${event.title}</div>
                        </div>
                        <div class="info-row">
                          <span class="label">Date & Time</span>
                          <div class="value">${formattedDate}</div>
                        </div>
                        <div class="info-row">
                          <span class="label">Location</span>
                          <div class="value">${location}</div>
                        </div>
                        <div class="info-row">
                          <span class="label">Ticket Type</span>
                          <div class="value"><span class="badge">${registration.ticketType}</span></div>
                        </div>
                        <div class="info-row">
                          <span class="label">Price</span>
                          <div class="value">${priceText}</div>
                        </div>
                        <div class="info-row">
                          <span class="label">Payment Status</span>
                          <div class="value">
                            <span class="badge ${registration.paymentStatus === 'PAID' ? 'badge-success' : 'badge-warning'}">
                              ${registration.paymentStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="cta-section">
                      <p class="cta-text">
                        <strong>Important Information:</strong><br>
                        Please keep this email confirmation handy. If this is a paid event and your payment status is PENDING, please complete your payment using the instructions provided during registration to secure your spot.
                      </p>
                    </div>
                    
                    <div class="signature">
                      Best regards,<br>
                      <span class="signature-name">${event.organizer}</span>
                    </div>
                  </div>
                  <div class="footer">
                    <p>This is an automated confirmation email.</p>
                    <p>Sent on ${new Date().toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
        text: `
Hi ${registration.attendeeName},

Your ticket for "${event.title}" is confirmed!

Event Details:
- Event: ${event.title}
- Date & Time: ${formattedDate}
- Location: ${location}
- Ticket Type: ${registration.ticketType}
- Price: ${priceText}
- Payment Status: ${registration.paymentStatus}

Important Information:
Please keep this email confirmation handy. If this is a paid event and your payment status is PENDING, please complete your payment to secure your spot.

Best regards,
${event.organizer}

---
This is an automated confirmation email.
Sent on ${new Date().toLocaleString()}
        `
      };

      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Error sending registration confirmation email:", error);
      return false;
    }
  }
}

export const emailService = new EmailService();
