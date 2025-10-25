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

    const adminMailOptions = {
  from: 'Elite Cabs 24X7 <postman@itzadarsh.co.in>',
  to: 'Elite Cabs Admin <admin@itzadarsh.co.in>',
  replyTo: body.email,
  subject: ` New Inquiry from ${body.name}`,
  html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f7fa; padding: 0; margin: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <tr style="background-color: #665300;">
        <td align="center" style="padding: 20px;">
          <img src="https://www.elitecabsmumbai.com/elite-cabs-logo.png" alt="Elite Cabs" width="150" style="display:block;">
          <h2 style="color: #ffffff; margin: 10px 0 0;">New Booking Inquiry</h2>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding: 30px 40px;">
          <p style="color: #444; line-height: 1.6; font-size: 15px;">
            You’ve received a new inquiry from the website contact form.  
            Below are the details:
          </p>

          <table cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse; font-size: 14px; color: #333;">
            <tr style="background-color: #f7f7f7;">
              <td style="width: 40%; font-weight: bold;">Name:</td>
              <td>${body.name}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Email:</td>
              <td><a href="mailto:${body.email}" style="color:#003366; text-decoration:none;">${body.email}</a></td>
            </tr>
            <tr style="background-color: #f7f7f7;">
              <td style="font-weight: bold;">Phone:</td>
              <td><a href="tel:${body.phone}" style="color:#003366; text-decoration:none;">${body.phone}</a></td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Pickup Location:</td>
              <td>${body.from}</td>
            </tr>
            <tr style="background-color: #f7f7f7;">
              <td style="font-weight: bold;">Destination:</td>
              <td>${body.to}</td>
            </tr>
            <tr>
              <td style="font-weight: bold;">Preferred Date:</td>
              <td>${body.date}</td>
            </tr>
            <tr style="background-color: #f7f7f7;">
              <td style="font-weight: bold;">Preferred Time:</td>
              <td>${body.time}</td>
            </tr>
            ${
              body.message
                ? `<tr><td style="font-weight: bold;">Message:</td><td>${body.message}</td></tr>`
                : ''
            }
          </table>

          <div style="margin-top: 25px; background: #f0f4f9; padding: 15px 20px; border-radius: 6px;">
            <p style="margin: 0; color: #003366; font-weight: bold;">Quick Actions:</p>
            <ul style="margin: 8px 0 0; padding-left: 18px; color: #003366;">
              <li><a href="mailto:${body.email}" style="color: #003366; text-decoration: none;">Reply via Email</a></li>
              <li><a href="tel:${body.phone}" style="color: #003366; text-decoration: none;">Call ${body.phone}</a></li>
              <li><a href="https://wa.me/${body.phone.replace(/[^0-9]/g, '')}" style="color: #003366; text-decoration: none;">Message on WhatsApp</a></li>
            </ul>
          </div>

          <p style="margin-top: 30px; color: #666; font-size: 13px;">
            This inquiry was submitted from your Elite cabs website form.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="background: #665300; color: #ffffff; font-size: 12px; padding: 15px;">
          <p style="margin: 0;">Elite Cabs Admin Alert | ${new Date().toLocaleDateString()}</p>
        </td>
      </tr>
    </table>
  </div>
  `,
};


    const userMailOptions = {
  from: 'Elite Cabs 24X7 <postman@itzadarsh.co.in>',
  to: body.email,
  subject: 'We received your response',
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

          <!-- Book Now Button -->
          <div style="text-align: center; margin-top: 35px;">
            <a href="https://rzp.io/rzp/Nw4FJaE6"
              style="background-color: #ffcc00; color: #000; padding: 14px 28px; border-radius: 6px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 16px; transition: background 0.3s;">
              🚖 Complete booking Now
            </a>
            <p style="color:#666; font-size:12px; margin-top:8px;">Secure Razorpay Payment</p>
          </div>

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
  </div>`
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
