"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* Header with Logo */}
      <header className="w-full py-6 px-4 md:px-8 lg:px-[203px]">
        {/* <Link 
          href="/customer" 
          className="text-[28px] md:text-[36px] font-bold text-[#59A5B2] hover:opacity-80 transition-opacity duration-300"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Hotelire
        </Link> */}
         <div className="flex items-start gap-3">
            <img
              className="w-[auto] h-[54px]"
              alt="Logo"
              src="/figmaAssets/logo_orignal.png"
            />
          </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Side - Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1 
              className="text-[32px] md:text-[42px] lg:text-[48px] font-bold text-black mb-4 leading-tight"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              You have arrived at hotel 404
            </h1>
            <p 
              className="text-[16px] md:text-[18px] text-gray-600 mb-8 max-w-md mx-auto lg:mx-0"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              This hotel is for lost pages, not people. Try a new search to find the right stay for you.
            </p>
            <Link 
              href="/customer"
              className="inline-block bg-[#59A5B2] hover:bg-[#4c7e87] text-white px-8 py-4 rounded-lg font-semibold text-[16px] shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              data-testid="button-go-search"
            >
              Go to search
            </Link>
          </div>

          {/* Right Side - Hotel Illustration */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <div className="w-full max-w-lg">
              <svg
                viewBox="0 0 500 400"
                className="w-full h-full"
                style={{ maxHeight: '400px' }}
              >
                {/* Background clouds */}
                <ellipse cx="100" cy="120" rx="60" ry="35" fill="#e5e7eb" opacity="0.6" />
                <ellipse cx="420" cy="180" rx="80" ry="45" fill="#e5e7eb" opacity="0.6" />
                <ellipse cx="300" cy="100" rx="50" ry="30" fill="#e5e7eb" opacity="0.5" />
                
                {/* Ground */}
                <rect x="0" y="380" width="500" height="20" fill="#1f2937" />
                
                {/* Left Building (smaller) */}
                <rect x="100" y="240" width="120" height="140" fill="#f3f4f6" stroke="#1f2937" strokeWidth="3" />
                <rect x="100" y="220" width="120" height="20" fill="#1f2937" />
                
                {/* Windows - Left Building */}
                <rect x="115" y="260" width="20" height="25" fill="#d1d5db" />
                <rect x="145" y="260" width="20" height="25" fill="#d1d5db" />
                <rect x="175" y="260" width="20" height="25" fill="#d1d5db" />
                <rect x="115" y="300" width="20" height="25" fill="#d1d5db" />
                <rect x="145" y="300" width="20" height="25" fill="#d1d5db" />
                <rect x="175" y="300" width="20" height="25" fill="#d1d5db" />
                <rect x="115" y="340" width="20" height="25" fill="#d1d5db" />
                <rect x="145" y="340" width="20" height="25" fill="#d1d5db" />
                <rect x="175" y="340" width="20" height="25" fill="#d1d5db" />
                
                {/* Center Building (tallest) - Main Hotel */}
                <rect x="250" y="120" width="140" height="260" fill="#f3f4f6" stroke="#1f2937" strokeWidth="3" />
                <rect x="250" y="95" width="140" height="25" fill="#1f2937" />
                
                {/* Sign with 404 on top of center building */}
                <rect x="275" y="40" width="90" height="50" fill="white" stroke="#1f2937" strokeWidth="3" />
                <text
                  x="320"
                  y="73"
                  fontSize="32"
                  fontWeight="bold"
                  fill="#0ea5e9"
                  textAnchor="middle"
                  fontFamily="Poppins, sans-serif"
                >
                  404
                </text>
                
                {/* Windows - Center Building (Orange/Yellow) */}
                <rect x="265" y="140" width="25" height="30" fill="#f59e0b" />
                <rect x="300" y="140" width="25" height="30" fill="#f59e0b" />
                <rect x="335" y="140" width="25" height="30" fill="#f59e0b" />
                
                <rect x="265" y="185" width="25" height="30" fill="#f59e0b" />
                <rect x="300" y="185" width="25" height="30" fill="#f59e0b" />
                <rect x="335" y="185" width="25" height="30" fill="#f59e0b" />
                
                <rect x="265" y="230" width="25" height="30" fill="#d1d5db" />
                <rect x="300" y="230" width="25" height="30" fill="#d1d5db" />
                <rect x="335" y="230" width="25" height="30" fill="#d1d5db" />
                
                <rect x="265" y="275" width="25" height="30" fill="#d1d5db" />
                <rect x="300" y="275" width="25" height="30" fill="#d1d5db" />
                <rect x="335" y="275" width="25" height="30" fill="#d1d5db" />
                
                <rect x="265" y="320" width="25" height="30" fill="#d1d5db" />
                <rect x="300" y="320" width="25" height="30" fill="#d1d5db" />
                <rect x="335" y="320" width="25" height="30" fill="#d1d5db" />
                
                {/* Right Building (medium) */}
                <rect x="420" y="200" width="100" height="180" fill="#f3f4f6" stroke="#1f2937" strokeWidth="3" />
                <rect x="420" y="180" width="100" height="20" fill="#1f2937" />
                
                {/* Windows - Right Building */}
                <rect x="435" y="220" width="18" height="22" fill="#d1d5db" />
                <rect x="463" y="220" width="18" height="22" fill="#d1d5db" />
                <rect x="435" y="255" width="18" height="22" fill="#d1d5db" />
                <rect x="463" y="255" width="18" height="22" fill="#d1d5db" />
                <rect x="435" y="290" width="18" height="22" fill="#d1d5db" />
                <rect x="463" y="290" width="18" height="22" fill="#d1d5db" />
                <rect x="435" y="325" width="18" height="22" fill="#d1d5db" />
                <rect x="463" y="325" width="18" height="22" fill="#d1d5db" />
                
                {/* Person walking with luggage */}
                {/* Head */}
                <circle cx="230" cy="320" r="12" fill="#fbbf24" />
                
                {/* Body */}
                <rect x="222" y="332" width="16" height="28" fill="#0ea5e9" rx="3" />
                
                {/* Arms */}
                <path
                  d="M 222 338 L 210 345"
                  stroke="#0ea5e9"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M 238 338 L 248 343"
                  stroke="#0ea5e9"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                
                {/* Legs */}
                <path
                  d="M 226 360 L 222 375"
                  stroke="#1f2937"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M 234 360 L 238 375"
                  stroke="#1f2937"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                
                {/* Luggage/Suitcase */}
                <rect x="245" y="340" width="18" height="24" fill="#1f2937" rx="2" />
                <rect x="248" y="336" width="12" height="4" fill="#6b7280" rx="1" />
                <circle cx="248" cy="352" r="1.5" fill="#9ca3af" />
                <circle cx="259" cy="352" r="1.5" fill="#9ca3af" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}