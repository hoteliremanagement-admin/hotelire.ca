"use client"
import { Suspense } from "react"
import { Header } from "@/components/Header"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { SearchBar } from "@/components/SearchBar"
import { ListingPageContent } from "./listing-page-content"

export default function ListingPage() {
  return (
    <div className="bg-white w-full flex flex-col min-h-screen">
      <Header />
      <Navigation />

      {/* Search Section */}
      <section className="w-full bg-[#f5f6fd] py-6 md:py-8 px-4 md:px-8 lg:px-[203px] flex justify-center">
        <SearchBar />
      </section>

      {/* Results Section with Suspense Boundary */}
      <Suspense fallback={<div className="flex-1 w-full px-4 md:px-8 lg:px-[203px] py-6 md:py-8" />}>
        <ListingPageContent />
      </Suspense>

      <Footer />
    </div>
  )
}
