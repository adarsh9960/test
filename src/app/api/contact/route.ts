import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  from: string;
  to: string;
  date: string;
  time: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'from', 'to', 'date', 'time'];
    for (const field of requiredFields) {
      if (!body[field as keyof ContactFormData]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'sg2plzcpnl509587.prod.sin2.secureserver.net',
      port: 465,
      secure: true,
      auth: {
        user: 'postman@itzadarsh.co.in',
        pass: 'Adarsh_1M9960',
      },
    });

    // Email to admin
    const adminMailOptions = {
      from: 'postman@itzadarsh.co.in',
      to: 'admin@itzadarsh.co.in',
      replyTo: body.email,
      subject: `New Inquiry from ${body.name}`,
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Pickup Location:</strong> ${body.from}</p>
        <p><strong>Destination:</strong> ${body.to}</p>
        <p><strong>Date:</strong> ${body.date}</p>
        <p><strong>Time:</strong> ${body.time}</p>
        <p><strong>Message:</strong> ${body.message || 'No message provided'}</p>
      `,
    };

    // --- New, styled auto-reply template ---
    const userMailOptions = {
      from: 'Elite Cabs <postman@itzadarsh.co.in>',
      to: body.email,
      subject: 'Thank You for Contacting Elite Cabs',
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f7fa; padding: 0; margin: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <tr style="background-color: #665300;">
      <td align="center" style="padding: 20px;">
        <img src="https://www.elitecabsmumbai.com/elite-cabs-logo.png" alt="Elite Cabs" width="160" style="display:block;">
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 30px 40px;">
        <h2 style="color: #003366; margin-top: 0;">Thank You, ${body.name}!</h2>
        <p style="color: #444; line-height: 1.6;">We’ve received your inquiry and our team will contact you shortly to confirm your booking or assist with further details.</p>

        <h3 style="color: #003366; margin-top: 30px;">Your Inquiry Details</h3>
        <table cellpadding="6" cellspacing="0" style="width:100%; border-collapse: collapse; font-size: 14px; color: #333;">
          <tr>
            <td style="width: 40%; font-weight: bold;">Pickup Location:</td>
            <td>${body.from}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Destination:</td>
            <td>${body.to}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Preferred Date:</td>
            <td>${body.date}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Preferred Time:</td>
            <td>${body.time}</td>
          </tr>
          ${
            body.message
              ? `<tr><td style="font-weight: bold;">Your Message:</td><td>${body.message}</td></tr>`
              : ''
          }
        </table>

        <!-- Help Box -->
        <div style="margin-top: 30px; background: #f0f4f9; padding: 15px 20px; border-radius: 6px;">
          <p style="margin: 0; color: #003366; font-weight: bold;">Need immediate help?</p>
          <p style="margin: 8px 0;">
            📞 <a href="tel:+919960416025" style="color: #003366; text-decoration: none;">+91 99604 16025</a>
          </p>
          <p style="margin: 8px 0;">
            💬 <a href="https://wa.me/919960416025" style="color: #003366; text-decoration: none;">WhatsApp us</a>
          </p>
        </div>

        <p style="margin-top: 30px; color: #666;">Warm regards,<br><strong>Team Elite Cabs</strong></p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td align="center" style="background: #665300; color: #ffffff; font-size: 12px; padding: 15px;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Elite Cabs Mumbai. All Rights Reserved.</p>
        <p style="margin: 4px 0 0;">This is an automated response. Please do not reply to this email.</p>
      </td>
    </tr>
  </table>
</div>`,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log('Inquiry saved and emails sent:', body);

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
