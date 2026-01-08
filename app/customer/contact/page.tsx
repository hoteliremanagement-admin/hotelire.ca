"use client";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, User, AtSign } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image"

export default function ContactPage() {
const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const maxChars = 500

  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error("Full name is required");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email address is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      toast.error("Message must be at least 10 characters");
      return false;
    }

    return true;
  };

  /* ---------------- SUBMIT HANDLER ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      toast.success("Message sent successfully!");
      setIsSuccess(true);
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

    const handleMessageChange = (e: { target: { value: any; }; }) => {
    const text = e.target.value
    if (text.length <= maxChars) {
      setFormData({ ...formData, message: text })
      setCharCount(text.length)
    }
  }

  return (
    <div className="bg-[#fafafa] w-full flex flex-col min-h-screen">
      <Header />
      <Navigation />

    <div className="w-full flex flex-col min-h-screen relative overflow-hidden">
      {/* Background accent image area */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none">
        <div className="w-full h-full rounded-full bg-white blur-3xl"></div>
      </div>

      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20 relative z-10">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left side - Building image (hidden on mobile, shown on desktop) */}
            <div className="hidden lg:block relative h-full rounded-3xl overflow-hidden shadow-sm">
              <Image
                src="/contactpic4.jpg"
                alt="Modern building architecture"
                fill
                // className="object-cover"
              />
            </div>

            {/* Right side - Contact form in white card */}
            <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
                    <CheckCircle2 className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Message Sent Successfully</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Thank you for reaching out! Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false)
                      setFormData({ firstName: "", lastName: "", email: "", message: "" })
                      setCharCount(0)
                    }}
                    className="text-[#59A5B2] font-semibold hover:text-[#4a8a95] transition-colors underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <a href="https://hotelire.com"><img src="https://res.cloudinary.com/dzzuoem1w/image/upload/v1767352509/logo_orignal_q0jn75.png" alt="Hotelire Logo" className ="header-logo w-40" /></a>
                    
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 mt-3">Let's Get In Touch.</h1>
                    <p className="text-gray-600">
                      Or just reach out manually to{" "}
                      <a href="mailto:support@hotelire.ca" className="text-[#59A5B2] font-semibold hover:underline">
                        support@hotelire.ca
                      </a>
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* First and Last Name Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Enter your first name..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent transition-all duration-200"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Enter your last name..."
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent transition-all duration-200"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <div className="relative">
                        <AtSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          placeholder="Enter your email address..."
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent transition-all duration-200"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                      <textarea
                        rows={6}
                        placeholder="Enter your main text here..."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent resize-none transition-all duration-200"
                        value={formData.message}
                        onChange={handleMessageChange}
                      />
                       <p className="text-xs text-gray-500 mt-2 text-right">
                        {charCount}/{maxChars}
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#59A5B2] to-[#4a8a95] hover:from-[#4a8a95] hover:to-[#3f7680] text-white font-semibold py-4 px-6 rounded-full flex justify-center items-center gap-2 transition-all duration-200 disabled:opacity-70 shadow-sm hover:shadow-xl text-base md:text-lg"
                          >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit Form
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>

      <Footer />
    </div>
  );
}
