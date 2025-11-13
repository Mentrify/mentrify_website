"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-cream-100 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl sm:text-[150px] font-bold bg-gradient-to-r from-primary-900 via-violet-500 to-pink-400 bg-clip-text text-transparent leading-none">
            404
          </h1>
          <div className="h-1 w-24 bg-primary-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-grey-200 mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-lg text-grey-900 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been
          moved, deleted, or you may have followed an incorrect link.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            variant="default"
            size="lg"
            className="bg-primary-500 hover:bg-primary-600 text-white"
          >
            <Link href="/">
              <Home className="w-5 h-5" />
              Go to Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary-300 text-primary-600 hover:bg-primary-50"
          >
            <Link href="/contact">
              Get Help
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
