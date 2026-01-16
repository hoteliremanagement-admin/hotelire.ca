"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios';


interface OTPVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
  onVerifySuccess: () => void
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;




export function OTPVerificationModal({ isOpen, onClose, email, onVerifySuccess }: OTPVerificationModalProps) {
  const [otp, setOtp] = useState(["", "", "", ""])
  const [error, setError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  useEffect(() => {
    if (isOpen) {
      inputRefs[0].current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    setError("")

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 4)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = pastedData.split("").concat(["", "", "", ""]).slice(0, 4)
    setOtp(newOtp)
    
    const nextEmptyIndex = newOtp.findIndex(digit => !digit)
    if (nextEmptyIndex !== -1) {
      inputRefs[nextEmptyIndex].current?.focus()
    } else {
      inputRefs[3].current?.focus()
    }
  }

  const handleVerify = async () => {
    const code = otp.join("")
    if (code.length !== 4) {
      setError("Please enter all 4 digits")
      return
    }

    setIsVerifying(true)
    setError("")

    try {
 
      const { data: response } = await axios.post(`${baseUrl}/auth/verifyCode`, {
      email: email,
      code:code
    });

      if (response.message == "Email verified successfully") {
        onVerifySuccess()
      } else {
        setError("Invalid verification code. Please try again.")
        setOtp(["", "", "", ""])
        inputRefs[0].current?.focus()
      }
    } catch (err) {
      setError("Verification failed. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    if (resendCooldown > 0) return

    setResendCooldown(60)
    try {
      await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
    } catch (err) {
      console.error("Failed to resend code")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] transition-all duration-300 ease-in-out animate-in fade-in-0 zoom-in-95" data-testid="modal-otp-verification">
        <DialogHeader>
          <DialogTitle className="[font-family:'Poppins',Helvetica] text-2xl font-bold text-[#59A5B2]">
            Verify Your Email
          </DialogTitle>
          <DialogDescription className="[font-family:'Inter',Helvetica] text-gray-600">
            We&apos;ve sent a 4-digit verification code to{" "}
            <span className="font-medium text-gray-900">{email}</span>. Please enter it below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-14 h-14 text-center text-2xl font-bold border-2 focus:border-[#59A5B2] focus:ring-[#59A5B2]"
                aria-label={`OTP digit ${index + 1}`}
                data-testid={`input-otp-${index}`}
              />
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center [font-family:'Inter',Helvetica]" data-testid="text-otp-error">
              {error}
            </p>
          )}

          <Button
            onClick={handleVerify}
            disabled={isVerifying || otp.join("").length !== 4}
            className="w-full h-12 bg-[#59A5B2] hover:bg-[#4C7E87] text-white transition-colors duration-200"
            data-testid="button-verify-continue"
          >
            {isVerifying ? "Verifying..." : "Verify & Continue"}
          </Button>

          <div className="text-center">
            {resendCooldown > 0 ? (
              <p className="text-sm text-gray-500 [font-family:'Inter',Helvetica]">
                Resend code in {resendCooldown}s
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-sm text-[#59A5B2] hover:underline [font-family:'Inter',Helvetica]"
                data-testid="link-resend-code"
              >
                Didn&apos;t receive the code? Resend
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
