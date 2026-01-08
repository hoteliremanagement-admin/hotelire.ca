"use client";

import { ReactNode } from "react";
import { Sidebar } from "./components/Sidebar";
import { MobileNav } from "./components/MobileNav";
import { AdminNavbar } from "./components/AdminNavbar";
import "../globals.css";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side Content */}
      <div className="flex-1 flex flex-col lg:pl-64">
        {/* Top Navbar */}
        <AdminNavbar onMenuClick={function (): void {
          throw new Error("Function not implemented.");
        } } isDarkMode={false} onToggleDarkMode={function (): void {
          throw new Error("Function not implemented.");
        } } />

        {/* Mobile Navigation */}
        <MobileNav />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
