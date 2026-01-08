"use client";

import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="h-screen w-full  bg-gradient-to-br from-white via-[#f8f9fc] to-[#e3fdff] flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <div className="mb-8">
        <Link 
          href="/customer" 
          className="text-[32px] md:text-[40px] font-bold text-[#3f2c77] hover:opacity-80 transition-opacity duration-300"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Hotelire
        </Link>
      </div>

      {/* Lock/Shield Icon - Modern illustration */}
      <div className="mb-8 relative w-full max-w-md aspect-square flex items-center justify-center">
        <div className="relative w-56 h-56 md:w-72 md:h-72">
          {/* Modern lock/shield SVG illustration */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            {/* Glow background */}
            <circle cx="100" cy="100" r="90" fill="#3f2c77" opacity="0.05" />
            <circle cx="100" cy="100" r="70" fill="#3f2c77" opacity="0.08" />
            
            {/* Shield shape */}
            <path
              d="M 100 30 L 150 50 L 150 100 Q 150 150 100 170 Q 50 150 50 100 L 50 50 Z"
              fill="#3f2c77"
              className="drop-shadow-lg"
            />
            
            {/* Shield inner gradient */}
            <path
              d="M 100 40 L 142 56 L 142 100 Q 142 142 100 158 Q 58 142 58 100 L 58 56 Z"
              fill="#febc11"
              opacity="0.3"
            />
            
            {/* Lock body */}
            <rect
              x="80"
              y="95"
              width="40"
              height="45"
              rx="5"
              fill="white"
              stroke="#3f2c77"
              strokeWidth="2"
            />
            
            {/* Lock shackle */}
            <path
              d="M 85 95 L 85 80 Q 85 65 100 65 Q 115 65 115 80 L 115 95"
              stroke="white"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 85 95 L 85 80 Q 85 65 100 65 Q 115 65 115 80 L 115 95"
              stroke="#3f2c77"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Keyhole */}
            <circle cx="100" cy="110" r="5" fill="#3f2c77" />
            <path
              d="M 100 115 L 95 128 L 105 128 Z"
              fill="#3f2c77"
            />
            
            {/* Sparkle effects */}
            <circle cx="140" cy="60" r="3" fill="#febc11" opacity="0.8">
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="60" cy="80" r="2.5" fill="#febc11" opacity="0.8">
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="135" cy="120" r="2" fill="#febc11" opacity="0.8">
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="text-center max-w-lg mb-8">
        <h1 
          className="text-[32px] md:text-[42px] font-bold text-[#3f2c77] mb-4"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Access Denied
        </h1>
        <p 
          className="text-[16px] md:text-[18px] text-gray-600 mb-8 px-4"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          You don't have permission to view this page. Please log in with the correct credentials.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/customer/signin"
          className="inline-block text-center bg-[#3f2c77] hover:bg-[#2f1f5f] text-white px-8 py-4 rounded-lg font-semibold text-[16px] shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 min-w-[180px]"
          style={{ fontFamily: 'Poppins, sans-serif' }}
          data-testid="button-go-login"
        >
          Go to Login
        </Link>
        <Link 
          href="/customer"
          className="inline-block text-center bg-white hover:bg-gray-50 text-[#3f2c77] border-2 border-[#3f2c77] px-8 py-4 rounded-lg font-semibold text-[16px] shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 min-w-[180px]"
          style={{ fontFamily: 'Poppins, sans-serif' }}
          data-testid="button-back-home"
        >
          Back to Home
        </Link>
      </div>

      {/* Decorative pattern elements */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-[#febc11] rounded-full opacity-10 blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#3f2c77] rounded-full opacity-10 blur-2xl"></div>
      <div className="absolute top-1/3 left-20 w-16 h-16 bg-[#febc11] rounded-full opacity-5 blur-xl"></div>
      <div className="absolute bottom-1/3 right-20 w-20 h-20 bg-[#3f2c77] rounded-full opacity-5 blur-xl"></div>
    </div>
  );
}