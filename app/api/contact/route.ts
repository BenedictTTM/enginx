import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

// Types for request/response
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

// Input validation
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input.trim().slice(0, 1000); // Limit length to prevent abuse
}

export async function POST(request: NextRequest): Promise<NextResponse<ContactResponse>> {
  try {
    // Parse request body
    const body: ContactFormData = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedSubject = sanitizeInput(subject || 'New Contact Form Submission');
    const sanitizedMessage = sanitizeInput(message);

    // Validate environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error('Email credentials not configured');
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Email content
    const mailOptions = {
      from: emailUser,
      to: emailUser, // Send to yourself
      replyTo: sanitizedEmail, // Allow replying to the sender
      subject: `Portfolio Contact: ${sanitizedSubject}`,
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
                padding: 50px 20px;
                min-height: 100vh;
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
                background: linear-gradient(135deg, #2d3e50 0%, #3d5166 100%);
                color: #ffffff; 
                padding: 0 40px;
                position: relative;
              }
              .header-content {
                display: table;
                width: 100%;
                padding: 36px 0;
              }
              .logo-container {
                display: table-cell;
                vertical-align: middle;
                width: 70px;
              }
              .logo {
                width: 56px;
                height: 56px;
                background: #ffffff;
                border-radius: 50%;
                padding: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              }
              .logo img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: block;
              }
              .header-text {
                display: table-cell;
                vertical-align: middle;
                padding-left: 20px;
              }
              .header-text h1 {
                margin: 0 0 4px 0;
                font-size: 22px;
                font-weight: 600;
                letter-spacing: -0.3px;
                line-height: 1.3;
              }
              .header-text p {
                margin: 0;
                font-size: 14px;
                opacity: 0.9;
                font-weight: 400;
              }
              .content { 
                padding: 44px 40px;
                background: #ffffff;
              }
              .info-section {
                background: #ffffff;
              }
              .info-row {
                padding: 20px 0;
                border-bottom: 1px solid #e8ecf1;
              }
              .info-row:first-child {
                padding-top: 0;
              }
              .info-row:last-child {
                border-bottom: none;
                padding-bottom: 0;
              }
              .label { 
                display: block;
                font-weight: 600;
                color: #64748b;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.8px;
                margin-bottom: 10px;
              }
              .value { 
                color: #1a1a1a;
                font-size: 15px;
                line-height: 1.7;
                font-weight: 400;
              }
              .value a {
                color: #2563eb;
                text-decoration: none;
                font-weight: 500;
                transition: color 0.2s ease;
              }
              .value a:hover {
                color: #1d4ed8;
              }
              .message-content {
                background: #f8fafc;
                padding: 24px;
                border-radius: 10px;
                border-left: 3px solid #2563eb;
                margin-top: 10px;
                color: #334155;
                font-size: 15px;
                line-height: 1.8;
              }
              .footer { 
                background: #f8fafc;
                padding: 28px 40px;
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
                .header { padding: 0 24px; }
                .header-content { padding: 28px 0; }
                .content { padding: 32px 24px; }
                .footer { padding: 24px; }
                .header-text h1 { font-size: 19px; }
                .header-text p { font-size: 13px; }
              }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <div class="container">
                <div class="header">
                  <div class="header-content">
                    <div class="logo-container">
                      <div class="logo">
                        <img src="cid:logo" alt="Logo" />
                      </div>
                    </div>
                    <div class="header-text">
                      <h1>New Contact Form Submission</h1>
                      <p>You have received a new message from your portfolio</p>
                    </div>
                  </div>
                </div>
                <div class="content">
                  <div class="info-section">
                    <div class="info-row">
                      <span class="label">Name</span>
                      <div class="value">${sanitizedName}</div>
                    </div>
                    <div class="info-row">
                      <span class="label">Email</span>
                      <div class="value"><a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></div>
                    </div>
                    <div class="info-row">
                      <span class="label">Subject</span>
                      <div class="value">${sanitizedSubject}</div>
                    </div>
                    <div class="info-row">
                      <span class="label">Message</span>
                      <div class="message-content">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
                    </div>
                  </div>
                </div>
                <div class="footer">
                  <p>You received this message from your portfolio contact form.</p>
                  <p>Sent on ${new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

From: ${sanitizedName}
Email: ${sanitizedEmail}
Subject: ${sanitizedSubject}

Message:
${sanitizedMessage}

---
Sent at: ${new Date().toLocaleString()}
      `,
      attachments: [] as Array<{filename: string; path: string; cid: string}>
    };

    // Prepare logo attachment
    const logoPath = path.join(process.cwd(), 'public', 'engin.png');
    const logoExists = fs.existsSync(logoPath);

    // Add logo attachment if it exists
    if (logoExists) {
      mailOptions.attachments = [{
        filename: 'logo.png',
        path: logoPath,
        cid: 'logo'
      }];
    }

    // Send email to yourself
    await transporter.sendMail(mailOptions);

    // Send confirmation email to the sender
    const confirmationMailOptions = {
      from: emailUser,
      to: sanitizedEmail,
      subject: `Thank you for reaching out, ${sanitizedName}!`,
      attachments: logoExists ? [{
        filename: 'logo.png',
        path: logoPath,
        cid: 'logo'
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
                padding: 50px 20px;
                min-height: 100vh;
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
                background: linear-gradient(135deg, #2d3e50 0%, #3d5166 100%);
                color: #ffffff; 
                padding: 48px 40px;
                text-align: center;
                position: relative;
              }
              .logo {
                width: 72px;
                height: 72px;
                background: #ffffff;
                border-radius: 50%;
                padding: 12px;
                margin: 0 auto 24px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
              }
              .logo img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: block;
              }
              .header h1 {
                margin: 0 0 8px 0;
                font-size: 28px;
                font-weight: 600;
                letter-spacing: -0.5px;
                line-height: 1.3;
              }
              .header p {
                margin: 0;
                font-size: 15px;
                opacity: 0.92;
                font-weight: 400;
              }
              .content { 
                padding: 48px 40px;
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
              .message-box { 
                background: #f8fafc;
                padding: 28px;
                border-radius: 12px;
                border-left: 3px solid #2563eb;
                margin: 32px 0;
              }
              .message-label {
                display: block;
                font-weight: 600;
                color: #64748b;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.8px;
                margin-bottom: 14px;
              }
              .message-text {
                color: #334155;
                font-size: 15px;
                line-height: 1.8;
                margin: 0;
              }
              .cta-section {
                background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                padding: 24px;
                border-radius: 12px;
                margin: 28px 0;
                border: 1px solid #bae6fd;
              }
              .cta-text {
                color: #0c4a6e;
                font-size: 14px;
                line-height: 1.6;
                margin: 0;
              }
              .signature {
                margin-top: 36px;
                padding-top: 28px;
                border-top: 1px solid #e8ecf1;
                color: #475569;
                font-size: 15px;
                line-height: 1.7;
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
                padding: 32px 40px;
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
                .message-box { padding: 20px; }
              }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <div class="container">
                <div class="header">
                  ${logoExists ? '<div class="logo"><img src="cid:logo" alt="Logo" /></div>' : ''}
                  <h1>Thank You for Reaching Out!</h1>
                  <p>Your message has been successfully received</p>
                </div>
                <div class="content">
                  <div class="greeting">Hi ${sanitizedName},</div>
                  <div class="text-block">
                    Thank you for contacting me! I've received your message and appreciate you taking the time to reach out. Your inquiry is important to me.
                  </div>
                  
                  <div class="message-box">
                    <span class="message-label">Your Message</span>
                    <div class="message-text">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
                  </div>

                  <div class="cta-section">
                    <p class="cta-text">
                      <strong>What's next?</strong><br>
                      I'll review your message carefully and get back to you within 24-48 hours. If your inquiry is urgent, feel free to reach out directly via phone or WhatsApp.
                    </p>
                  </div>
                  
                  <div class="signature">
                    Best regards,<br>
                    <span class="signature-name">Engin</span>
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
Hi ${sanitizedName},

Thank you for contacting me! I've received your message and will get back to you as soon as possible.

Your message:
"${sanitizedMessage}"

I typically respond within 24-48 hours. If your inquiry is urgent, feel free to reach out to me directly via phone or WhatsApp.

Best regards,
Your Name

---
This is an automated confirmation email.
Sent on ${new Date().toLocaleString()}
      `,
    };

    await transporter.sendMail(confirmationMailOptions);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
