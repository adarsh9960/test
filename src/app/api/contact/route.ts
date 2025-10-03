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
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Create SMTP transporter using provided credentials
    const transporter = nodemailer.createTransport({
      host: 'sg2plzcpnl509587.prod.sin2.secureserver.net',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: 'postman@itzadarsh.co.in',
        pass: 'Adarsh_1M9960'
      }
    });

    // Email to admin
    const adminMailOptions = {
      from: 'postman@itzadarsh.co.in',
      to: 'admin@itzadarsh.co.in',
      replyTo: body.email,
      subject: `New Contact Form Submission from ${body.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Pickup Location:</strong> ${body.from}</p>
        <p><strong>Destination:</strong> ${body.to}</p>
        <p><strong>Preferred Date:</strong> ${body.date}</p>
        <p><strong>Preferred Time:</strong> ${body.time}</p>
        <p><strong>Message:</strong> ${body.message || 'No additional message provided'}</p>
        <hr>
        <p><em>This email was sent from the contact form on your website.</em></p>
      `
    };

    // Email to user (auto-reply)
    const userMailOptions = {
      from: 'postman@itzadarsh.co.in',
      to: body.email,
      subject: 'Thank you for contacting us - Elite Cabs',
      html: `
        <h2>Thank You for Contacting Elite Cabs!</h2>
        <p>Dear ${body.name},</p>
        <p>We have received your inquiry and will get back to you shortly.</p>
        
        <h3>Your Inquiry Details:</h3>
        <p><strong>Pickup Location:</strong> ${body.from}</p>
        <p><strong>Destination:</strong> ${body.to}</p>
        <p><strong>Preferred Date:</strong> ${body.date}</p>
        <p><strong>Preferred Time:</strong> ${body.time}</p>
        ${body.message ? `<p><strong>Your Message:</strong> ${body.message}</p>` : ''}
        
        <p>We will process your request and contact you soon to confirm your booking or provide further assistance.</p>
        
        <p>For immediate assistance, you can:</p>
        <ul>
          <li>Call us at: <a href="tel:+917021751691">+91 7021751691</a></li>
          <li>WhatsApp us at: <a href="https://wa.me/917021751691">+91 7021751691</a></li>
        </ul>
        
        <p>Best regards,<br>
        <strong>Elite Cabs Team</strong></p>
        
        <hr>
        <p><em>This is an automated response. Please do not reply to this email.</em></p>
      `
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log('Contact form submission:', body);
    console.log('Emails sent successfully');

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
