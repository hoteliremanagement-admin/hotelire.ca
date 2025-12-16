"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { OTPVerificationModal } from "@/components/OTPVerificationModal";
import { PasswordModal } from "@/components/PasswordModal";
import { ForgotPasswordModal } from "@/components/ForgotPasswordModal";
import axios from 'axios';
import { FcGoogle } from "react-icons/fc"; // Google icon


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;



export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const entryPoint = searchParams.get("from"); // e.g., "login", "list-property", "booking"

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Modal states
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const validateEmail = (emailValue: string) => {
    const trimmed = emailValue.trim();
    if (!trimmed) {
      setError("Email is required");
      return false;
    }
    if (!emailRegex.test(trimmed)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleContinueWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");



    if (!validateEmail(email)) return;

    setIsChecking(true);

    try {
      // Check if email exists in database
      const { data: response } = await axios.post(`${baseUrl}/auth/checkEmail`, {
        email: email,
      });


      //verifyCode

      if (response.nextStep == "password") {
        // Email exists - show password modal for returning user
        setShowPasswordModal(true);
      }
      else if (response.nextStep == "verifyCode") {
        setShowOTPModal(true);
      }
      else {
        // Email doesn't exist - send OTP and show verification modal
        setError("Something went wrong. Please try later.");
      }
    } catch (err) {
      setError("Unable to process request. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };








  const handleOTPVerifySuccess = () => {
    setShowOTPModal(false);

    // Redirect based on entry point
    const redirectPath = getSignupRedirectPath(entryPoint);
    const url = `${redirectPath}${redirectPath.includes("?") ? "&" : "?"}email=${encodeURIComponent(email.trim())}`;
    router.push(url);

  };

  const handleLoginSuccess = () => {
    setShowPasswordModal(false);

    // Redirect user to where they came from
    const redirectPath = getLoginRedirectPath(entryPoint);
    router.push(redirectPath);
  };

  const handleForgotPassword = () => {
    setShowPasswordModal(false);
    setShowForgotPasswordModal(true);
  };

  const handleReturnToLogin = () => {
    setShowForgotPasswordModal(false);
    setShowPasswordModal(true);
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      console.log("[Google OAuth clicked]");
      await new Promise((r) => setTimeout(r, 600));
      // Placeholder for Google OAuth flow
    } finally {
      setIsGoogleLoading(false);
    }
  };



  const handleContinueWithGoogle = async() => {
    try{
       window.location.href = `${baseUrl}/auth/google`;
    }catch(ex){
      console.log(ex);
    }
  }




  return (
    <div className="min-h-dvh flex flex-col md:flex-row">
      {/* Left 40% image section */}
      <aside className="relative hidden md:block md:basis-2/5">
        <Image
          src="/figmaAssets/Rectangle-334.png"
          alt="Hotel room"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#59A5B2", opacity: 0.65 }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="px-8 lg:px-12">
            <h2 className="[font-family:'Poppins',Helvetica] text-white text-3xl lg:text-5xl font-bold max-w-[20ch]">
              Your perfect stay is one click away
            </h2>
          </div>
        </div>
      </aside>

      {/* Right 60% form section */}
      <main className="flex-1 md:basis-3/5 flex items-center justify-center py-10 px-6 lg:px-12 bg-white">
        <div className="w-full max-w-[720px] space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3">
            <img
              className="w-[auto] h-[54px]"
              alt="Logo"
              src="/figmaAssets/logo_orignal.png"
            />
          </div>

          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="[font-family:'Poppins',Helvetica] text-2xl md:text-3xl font-bold text-[#59A5B2]">
              Sign in or Create an Account
            </h1>
            <p className="[font-family:'Inter',Helvetica] text-gray-600 text-sm md:text-base">
              You can sign in using your Hotelire.ca account to access our
              services.
            </p>
          </div>

          {/* Email Form */}
          <form
            onSubmit={handleContinueWithEmail}
            className="space-y-4"
            noValidate
          >
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="[font-family:'Inter',Helvetica] text-gray-700 font-medium"
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="info@abcd.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                // onBlur={(e) => validateEmail(e.target.value)}
                className="h-12 border-gray-300 focus:border-[#59A5B2] focus:ring-[#59A5B2]"
                autoFocus
                data-testid="input-email"
              />
              {error && (
                <p
                  className="text-sm text-red-500 [font-family:'Inter',Helvetica]"
                  data-testid="text-email-error"
                >
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isChecking}
              className="w-full h-12 bg-[#59A5B2] hover:bg-[#4c7e87] text-white transition-colors duration-200"
              data-testid="button-continue-email"
            >
              {isChecking ? "Checking..." : "Continue with Email"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <Separator className="bg-gray-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-4 [font-family:'Inter',Helvetica] text-gray-500 text-sm">
                or
              </span>
            </div>
          </div>

          {/* Google Sign In */}
          {/* <Button
            type="button"
            onClick={handleGoogleSignIn}
            aria-label="Continue with Google"
            className="w-full h-12 rounded-full border border-gray-300 bg-white text-gray-900 px-5 flex items-center justify-center gap-3 transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300"
            variant="outline"
            disabled={isGoogleLoading}
            data-testid="button-google-signin"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#EA4335"
                d="M12 10.2v3.6h5.1c-.2 1.2-1.6 3.6-5.1 3.6-3.1 0-5.7-2.6-5.7-5.8S8.9 5.8 12 5.8c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.7 3.4 14.6 2.5 12 2.5 6.9 2.5 2.8 6.6 2.8 11.7s4.1 9.2 9.2 9.2c5.3 0 8.8-3.7 8.8-8.9 0-.6-.1-1-.1-1.4H12z"
              />
              <path
                fill="#34A853"
                d="M3.7 7.3l3 2.2C7.8 7.4 9.7 5.9 12 5.9c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.7 3.4 14.6 2.5 12 2.5 8.8 2.5 5.9 4.4 3.7 7.3z"
              />
              <path
                fill="#FBBC05"
                d="M12 20.9c2.6 0 4.8-.9 6.4-2.5l-2.9-2.3c-.8.5-1.8.9-3.5.9-3.6 0-5-2.4-5.2-3.7l-3 .2c.6 3 3.2 7.4 8.2 7.4z"
              />
              <path
                fill="#4285F4"
                d="M21.1 12.3c0-.6-.1-1-.1-1.4H12v3.6h5.1c-.3 1.8-2 3.6-5.1 3.6-3.1 0-5.7-2.6-5.7-5.8S8.9 5.8 12 5.8c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.7 3.4 14.6 2.5 12 2.5 6.9 2.5 2.8 6.6 2.8 11.7s4.1 9.2 9.2 9.2c5.3 0 8.8-3.7 8.8-8.9 0-.6-.1-1-.1-1.4H12z"
              />
            </svg>
            <span className="[font-family:'Inter',Helvetica] text-[15px] font-medium">
              {isGoogleLoading ? "Connecting..." : "Continue with Google"}
            </span>
          </Button> */}

          {/* <div
            id="g_id_onload"
            data-client_id="YOUR_GOOGLE_CLIENT_ID"
            data-login_uri="https://your.domain/your_login_endpoint"
            data-auto_prompt="false"
          ></div>
          <div
            className="g_id_signin"
            data-type="standard"
            data-size="large"
            data-theme="outline"
            data-text="sign_in_with"
            data-shape="rectangular"
            data-logo_alignment="left"
          ></div> */}

          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 w-full" // <-- w-full added
            onClick={handleContinueWithGoogle}
          >
            <FcGoogle className="w-6 h-6" /> {/* height & width fixed, scale properly */}
            Continue with Google
          </Button>


          {/* Footer */}
          <div className="pt-6 text-center space-y-2">
            <p className="text-xs text-gray-600 [font-family:'Inter',Helvetica]">
              By signing in or creating an account, you agree with our{" "}
              <a href="#" className="text-[#59A5B2] hover:underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#59A5B2] hover:underline">
                Privacy Statement
              </a>
              .
            </p>
            <p className="text-xs text-gray-500 [font-family:'Inter',Helvetica]">
              All rights reserved. Copyright (2006–2025) – Hotelire.ca™
            </p>
          </div>
        </div>
      </main>

      {/* Modals */}
      <OTPVerificationModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        email={email.trim()}
        onVerifySuccess={handleOTPVerifySuccess}
      />

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        email={email.trim()}
        onLoginSuccess={handleLoginSuccess}
        onForgotPassword={handleForgotPassword}
      />

      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
        initialEmail={email.trim()}
        onReturnToLogin={handleReturnToLogin}
      />
    </div>
  );
}

// Helper functions for redirects based on entry point
function getSignupRedirectPath(entryPoint: string | null): string {
  switch (entryPoint) {
    case "list-property":
    case "property-owner":
      return "/customer/signup?role=owner";
    case "booking":
    case "login":
    default:
      return "/customer/signup?role=customer";
  }
}

function getLoginRedirectPath(entryPoint: string | null): string {
  switch (entryPoint) {
    case "list-property":
    case "property-owner":
      return "/owner";
    case "booking":
      return "/customer"; // Return to where they were booking
    case "login":
    default:
      return "/customer"; // Default customer landing
  }
}