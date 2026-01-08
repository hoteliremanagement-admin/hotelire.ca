"use client";

import Image from "next/image";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardNavbarProps {
  title: string;
  userName?: string;
  userImage?: string;
}

export function DashboardNavbar({ 
  title, 
  userName = "Admin User",
  userImage
}: DashboardNavbarProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Page Title */}
        <h2 className="[font-family:'Poppins',Helvetica] font-bold text-[#3f2c77] text-2xl ml-0 lg:ml-0">
          {title}
        </h2>

        {/* Right Section: Search, Notifications, Profile */}
        <div className="flex items-center gap-4">
          {/* Search - Hidden on mobile */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 w-64 [font-family:'Inter',Helvetica] text-sm"
              data-testid="input-search"
            />
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            data-testid="button-notifications"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-3" data-testid="user-profile">
            <div className="hidden sm:block text-right">
              <p className="[font-family:'Poppins',Helvetica] font-semibold text-sm text-gray-800">
                {userName}
              </p>
              <p className="[font-family:'Inter',Helvetica] text-xs text-gray-500">
                Administrator
              </p>
            </div>
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 border-2 border-[#3f2c77]">
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userName}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#3f2c77] text-white [font-family:'Poppins',Helvetica] font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
