'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  // optional flags so message item can carry a button
  showWhatsAppButton?: boolean;
  whatsappUrl?: string;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChat({ isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text:
        "Hello! I'm your Elite Cabs AI assistant. I can help you with cab booking, taxi services, and travel information of Elite Cabs 24X7. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [openCountdownForMessageId, setOpenCountdownForMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const pushMessage = (m: Message) => setMessages(prev => [...prev, m]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    pushMessage(userMessage);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      // prefer explicit flags from API rather than parsing text
      if (data?.showWhatsAppButton && data?.whatsappUrl) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response || 'For detailed rates, please connect on WhatsApp.',
          sender: 'ai',
          timestamp: new Date(),
          showWhatsAppButton: true,
          whatsappUrl: data.whatsappUrl,
        };
        pushMessage(aiMessage);
      } else {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response || 'I can only assist with cab booking related queries.',
          sender: 'ai',
          timestamp: new Date(),
        };
        pushMessage(aiMessage);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to get AI response. Please try again.',
        variant: 'destructive',
      });

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          "I apologize, but I'm having trouble responding right now. Please try again later or call us at +91 70217 51691.",
        sender: 'ai',
        timestamp: new Date(),
      };
      pushMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Called when user clicks the WhatsApp button shown in a specific AI message
  const handleWhatsAppClick = (msg: Message) => {
    if (!msg.whatsappUrl) return;

    // Check if already redirected for this query to prevent infinite loops
    const redirectKey = `redirectedForQuery_${msg.id}`;
    if (sessionStorage.getItem(redirectKey)) {
      // If already redirected, just open the URL directly
      window.open(msg.whatsappUrl, '_blank');
      return;
    }

    // Set the redirect flag to prevent future redirects for this query
    sessionStorage.setItem(redirectKey, 'true');

    // Show the message with fallback link
    const fallbackMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: `If you are not redirected, `,
      sender: 'ai',
      timestamp: new Date(),
      showWhatsAppButton: true,
      whatsappUrl: msg.whatsappUrl,
    };
    pushMessage(fallbackMessage);

    // Start countdown
    setOpenCountdownForMessageId(msg.id);
    setCountdown(2);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // Set up the redirect
          setTimeout(() => {
            window.location.href = msg.whatsappUrl!;
          }, 0);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-2xl border-2 border-primary/20" role="dialog" aria-label="Elite Cabs AI Assistant">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden />
              Elite Cabs AI Assistant
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0" aria-label="Close chat">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              Online
            </Badge>
            <Badge variant="outline" className="text-xs">
              Cab Booking Support
            </Badge>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-0">
          <ScrollArea className="h-96 px-4 py-4" aria-live="polite">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>

                    {/* WhatsApp button shown only when API explicitly requested it */}
                    {message.showWhatsAppButton && message.whatsappUrl && (
                      <div className="mt-3">
                        <Button
                          onClick={() => handleWhatsAppClick(message)}
                          disabled={openCountdownForMessageId !== null}
                          aria-label="Open WhatsApp"
                          className="flex items-center gap-2"
                        >
                          {/* simple WhatsApp icon */}
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path
                              d="M20.52 3.48A11.88 11.88 0 0012 .5C6.21.5 1.5 5.21 1.5 11c0 1.96.53 3.86 1.53 5.53L.5 23.5l6.2-2.05A11.5 11.5 0 0012 22.5c5.79 0 10.5-4.71 10.5-10.5 0-3.01-1.18-5.8-3.98-8.52z"
                              fill="currentColor"
                            />
                          </svg>
                          {openCountdownForMessageId === message.id ? `Opening in ${countdown}s…` : 'Open WhatsApp'}
                        </Button>

                        <p className="text-xs text-muted-foreground mt-2">
                          We'll open WhatsApp to continue the conversation. If nothing happens, click the button again.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                      <p className="text-sm text-muted-foreground">Thinking...</p>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <Separator />

          <div className="p-4">
            <div className="flex gap-2 mb-3">
              <Button variant="outline" size="sm" onClick={() => setInputMessage('How do I book a cab?')} className="text-xs">
                Book a Cab
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInputMessage('What are your rates?')} className="text-xs">
                💰 Get Rates on WhatsApp
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInputMessage('Airport transfer')} className="text-xs">
                Airport
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about cab booking..."
                disabled={isLoading}
                className="flex-1"
                aria-label="Type your message"
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading} size="sm" aria-label="Send message">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">I can only help with cab booking and taxi service related queries.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
