import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// CHANGE_PHONE_AND_MESSAGES_HERE
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '919960416025';
const WHATSAPP_PRE_TEXT = "Hi, I'd like to know about your cab rates.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PRE_TEXT)}`;

// NOTE: Change PHONE and messages in .env or config file
// Example .env.example
// NEXT_PUBLIC_WHATSAPP_PHONE=+91 99604 16025
// NEXT_PUBLIC_GLM_API_KEY=your_glm_key_here

// keywords (trimmed, lowercase)
const rateKeywords = [
  'rate', 'rates', 'price', 'prices', 'cost', 'fare', 'pricing',
  'charge', 'how much', 'tariff', 'fee'
];

function containsKeyword(text: string, keywords: string[]) {
  if (!text) return false;
  const t = text.toLowerCase();
  return keywords.some(k => t.includes(k));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const message = (body?.message || '').toString().trim();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // short-circuit: if user asked about rates -> return WhatsApp button flag
    const isRateInquiry = containsKeyword(message, rateKeywords);
    if (isRateInquiry) {
      return NextResponse.json({
        response: 'For detailed rate information and special offers, please contact us on WhatsApp.',
        showWhatsAppButton: true,
        whatsappUrl: WHATSAPP_URL
      }, { status: 200 });
    }

    // Fallback responses for common queries when AI is not available
    const fallbackResponses = {
      'booking': 'To book a cab with Elite Cabs 24X7, you can:\n1. Call us at +91 99604 16025\n2. Use our contact form on the website\n3. WhatsApp us for quick booking\n\nWhat type of booking are you looking for?',
      'book': 'To book a cab with Elite Cabs 24X7, you can:\n1. Call us at +91 99604 16025\n2. Use our contact form on the website\n3. WhatsApp us for quick booking\n\nWhat type of booking are you looking for?',
      'airport': 'We provide 24/7 airport transfer services in Mumbai. For airport pickups and drops:\n• Call: +91 99604 16025\n• WhatsApp: +91 99604 16025\n• Use our contact form\n\nWhich airport are you traveling to/from?',
      'mumbai': 'Elite Cabs 24X7 provides comprehensive taxi services throughout Mumbai including:\n• Airport transfers\n• Local city tours\n• Corporate travel\n• Wedding transportation\n• Outstation trips\n\nHow can I help you with your Mumbai travel needs?',
      'contact': 'You can reach Elite Cabs 24X7 through:\n• Phone: +91 99604 16025\n• Email: contact@itzadarsh.co.in\n• WhatsApp: +91 99604 16025\n• Contact form on our website\n\nHow would you like to get in touch?',
      'service': 'Elite Cabs 24X7 offers:\n• Airport transfers (24/7)\n• Local taxi service\n• Corporate travel\n• Wedding & event transportation\n• Outstation trips\n• Sightseeing tours\n\nWhich service are you interested in?',
      'cab': 'Elite Cabs 24X7 provides reliable cab services with:\n• Professional drivers\n• Well-maintained vehicles\n• 24/7 availability\n• Transparent pricing\n• Easy booking\n\nWhat type of cab service do you need?',
      'taxi': 'Elite Cabs 24X7 offers premium taxi services:\n• Airport transfers\n• Local transportation\n• Outstation trips\n• Corporate travel\n• Special event transportation\n\nHow can I assist you with your taxi needs?'
    };

    // Check for fallback keywords first
    const lowerMessage = message.toLowerCase();
    for (const [keyword, response] of Object.entries(fallbackResponses)) {
      if (lowerMessage.includes(keyword)) {
        return NextResponse.json({
          response: response,
          showWhatsAppButton: false
        }, { status: 200 });
      }
    }

    // Try to use AI, but have fallback
    try {
      // Check if we have the required API key
      const apiKey = process.env.NEXT_PUBLIC_GLM_API_KEY;
      if (!apiKey) {
        throw new Error('AI API key not configured');
      }

      // create ZAI only when needed
      const zai = await ZAI.create();

      const systemPrompt = `You are an AI assistant for Elite Cabs 24X7, a taxi service in Mumbai, India. You may ONLY answer queries related to cab booking, taxi services, transportation, and travel within Mumbai.
Important: If a user asks about rates, prices, costs, fares, or pricing, DO NOT provide specific rates. Instead, instruct them to contact WhatsApp (do not include raw URLs).
If the user asks anything unrelated, politely redirect them to ask about cab booking/transportation only.
Keep answers concise, helpful, and professional.`;

      const completion = await zai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const aiRaw = completion?.choices?.[0]?.message?.content;
      const aiResponse = (aiRaw || 'I can only assist with cab booking related queries. How can I help?').toString().trim();

      // if AI accidentally mentions price/rate words, force redirect suggestion
      if (containsKeyword(aiResponse, rateKeywords)) {
        return NextResponse.json({
          response: 'For detailed rate information and special offers, please contact us on WhatsApp.',
          showWhatsAppButton: true,
          whatsappUrl: WHATSAPP_URL
        }, { status: 200 });
      }

      // Normal reply (no WhatsApp button)
      return NextResponse.json({
        response: aiResponse,
        showWhatsAppButton: false
      }, { status: 200 });

    } catch (aiError) {
      console.log('AI service unavailable, using fallback:', aiError);
      
      // If AI fails, provide a helpful fallback response
      const genericFallback = 'I\'m here to help you with Elite Cabs 24X7 services! I can assist with:\n\n• Cab bookings\n• Airport transfers\n• Local taxi services\n• Corporate travel\n• Wedding transportation\n• Outstation trips\n\nFor specific rates and detailed information, please contact us on WhatsApp or call +91 99604 16025.\n\nHow can I help you today?';

      return NextResponse.json({
        response: genericFallback,
        showWhatsAppButton: true,
        whatsappUrl: WHATSAPP_URL
      }, { status: 200 });
    }

  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json({ 
      error: 'Failed to process your request',
      response: 'I apologize, but I\'m having trouble responding right now. Please try again later or call us at +91 99604 16025.',
      showWhatsAppButton: true,
      whatsappUrl: WHATSAPP_URL
    }, { status: 500 });
  }
}
