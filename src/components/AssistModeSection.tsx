"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { HelpCircle, MessagesSquare, X, RefreshCw, AlertTriangle, Send } from "lucide-react";

export function AssistModeSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "system" | "user" | "assistant", content: string }[]>([
    { 
      role: "assistant", 
      content: "Hello! I am the Birkdale Audiology Assistant (Assist Mode). I can help you with forms, appointments, and finding clinic information. How can I assist you today?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: messages.filter(m => m.role !== "system" && !(m.role === "assistant" && m.content.includes("Hello! I am the Birkdale Audiology Assistant"))) })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Assist Mode is temporarily unavailable. Please call the clinic at (704) 237-4099 for help." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Assist Mode is temporarily unavailable. Please call the clinic at (704) 237-4099 for help." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-blue-50/50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-blue-100 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full text-sm font-medium text-blue-800">
              <MessagesSquare size={16} />
              <span>Accessibility First</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary">Need Help Navigating? Try Assist Mode</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              We know that medical forms and websites can be confusing. That's why we built <strong>Assist Mode</strong>—a simple, guided tool that helps you find information, simplify complex wording, and take things one step at a time.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Simple Explanations:</strong> Asks one question at a time.</span>
              </li>
              <li className="flex items-start space-x-3">
                <RefreshCw className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Patient & Calm:</strong> Ask us to repeat or rephrase anything.</span>
              </li>
              <li className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Safe & Secure:</strong> Administrative help only, no medical advice.</span>
              </li>
            </ul>
            <div className="pt-6">
              <Button size="lg" onClick={() => setIsOpen(true)} className="text-base px-8 bg-blue-700 hover:bg-blue-800">
                Try Assist Mode Demo
              </Button>
            </div>
          </div>

          <div className="hidden lg:block relative">
            {/* Visual Demo mockup card */}
            <div className="bg-slate-50 border rounded-2xl shadow-sm p-6 max-w-sm mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold">BA</div>
                <div>
                  <h4 className="font-semibold text-primary">Clinic Assistant</h4>
                  <p className="text-xs text-slate-500">Step 1 of 4</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-100 text-blue-900 p-4 rounded-2xl rounded-tl-sm text-sm">
                  Let's start your intake form. What is your full legal name?
                </div>
                <div className="flex space-x-2">
                  <button className="text-xs bg-white border shadow-sm px-3 py-2 rounded-full font-medium hover:bg-slate-100">Need Help</button>
                  <button className="text-xs bg-white border shadow-sm px-3 py-2 rounded-full font-medium hover:bg-slate-100">Repeat Question</button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Assist Mode Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col h-[85vh] sm:h-[600px] overflow-hidden">
            
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-semibold">BA</div>
                <div>
                  <h3 className="font-semibold">Assist Mode</h3>
                  <p className="text-xs text-primary-foreground/80">Guided Intake & Navigation</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close Assist Mode"
              >
                <X size={24} />
              </button>
            </div>

            {/* Disclaimer */}
            <div className="bg-rose-50 border-b border-rose-100 px-4 py-2 text-xs text-rose-800 flex items-center justify-center text-center">
              <AlertTriangle className="w-4 h-4 mr-2 shrink-0" />
              <span>Assist Mode supports intake and navigation. It does not provide medical advice.</span>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 ${
                    msg.role === "user" 
                      ? "bg-blue-600 text-white rounded-tr-sm" 
                      : "bg-white border shadow-sm text-foreground rounded-tl-sm"
                  }`}>
                    {/* Render with formatting preserving basic whitespace */}
                    <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border shadow-sm text-slate-500 rounded-2xl rounded-tl-sm px-5 py-4 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t">
              <div className="flex flex-wrap gap-2 mb-3">
                <button 
                  onClick={() => setInput("What does that mean?")} 
                  className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition-colors border"
                >
                  Explain this
                </button>
                <button 
                  onClick={() => window.location.href = "tel:7042374099"} 
                  className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition-colors border"
                >
                  Switch to Staff Support
                </button>
              </div>
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your response or question..."
                  className="flex-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-[15px]"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="w-12 h-[50px] rounded-xl shrink-0 bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="w-5 h-5 text-white" />
                </Button>
              </form>
            </div>
            
          </div>
        </div>
      )}

    </section>
  );
}
