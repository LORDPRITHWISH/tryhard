import Link from "next/link"
import React from "react";
import { Instagram, Twitter, Facebook } from "lucide-react"
import { TextHoverEffect } from '@/components/TextHoverEffect'

export default function FintreeFooter() {
  return (
    <footer className="bg-black py-16 px-1 md:px-8">
      {/* Logo with Hover Text Effect */}
      {/* <div className="h-64 flex items-center justify-center mb-12">
        <TextHoverEffect text="FINTREE" />
      </div> */}
      <div className="h-[30rem] flex items-center justify-center mb-1">
      <TextHoverEffect text="Zenux" />
        </div>
      
      {/* Footer Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-16">
        {/* Products Column */}
        <div className="space-y-4">
          <h3 className="text-gray-500 font-medium mb-4">PRODUCTS</h3>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                PRODUCTS
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                PRICING
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                LOG IN
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                PARTNERSHIPS
              </Link>
            </li>
          </ul>
        </div>

        {/* Fintree Column */}
        <div className="space-y-4">
          <h3 className="text-gray-500 font-medium mb-4">FINTREE</h3>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                CARD
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                PAYMENT
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                FUNCTIONS
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                FEATURES
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="space-y-4">
          <h3 className="text-gray-500 font-medium mb-4">RESOURCES</h3>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                HELP CENTER
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                BOOK A DEMO
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                SERVER STATUS
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                BLOG
              </Link>
            </li>
          </ul>
        </div>

        {/* About Us Column */}
        <div className="space-y-4">
          <h3 className="text-gray-500 font-medium mb-4">ABOUT US</h3>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                ABOUT FINTREE
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                CONTACT US
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                FEATURES
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                CAREERS
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
        {/* Social Media Icons */}
        <div className="flex space-x-6 mb-6 md:mb-0">
          <Link href="#" className="text-gray-400 hover:text-white transition-colors">
            <Instagram size={20} />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white transition-colors">
            <Twitter size={20} />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white transition-colors">
            <Facebook size={20} />
            <span className="sr-only">Facebook</span>
          </Link>
        </div>

        {/* Legal Links */}
        <div className="flex space-x-6">
          <Link href="#" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
            COOKIE POLICY
          </Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
            PRIVACY POLICY
          </Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
            TERMS & CONDITION
          </Link>
        </div>

        {/* Logo Icon */}
        <div className="mt-6 md:mt-0">
          <div className="bg-white p-1 rounded">
            <div className="w-6 h-6 bg-black flex items-center justify-center">
              <span className="text-white font-bold text-xs">F</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}