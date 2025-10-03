// CHANGE_PHONE_AND_MESSAGES_HERE
export const buildWhatsApp = (number, message) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

// NOTE: Change PHONE and messages in .env or config file
// Example .env.example
// NEXT_PUBLIC_WHATSAPP_PHONE=917021751691