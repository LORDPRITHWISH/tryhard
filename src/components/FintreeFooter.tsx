'use client';

import React from 'react';
import { TextHoverEffect } from '@/components/TextHoverEffect';

const FintreeFooter: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-black to-gray-900 text-gray-300 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Product Video</h2>
            {/* <p className="text-xl font-bold mb-2">
              <span className="text-[#ff5757]">tryhard</span>
              <span className="text-white">.tech</span>
            </p> */}
            <p className="text-sm text-gray-400 max-w-sm">
              Learn from over 100+ expertly analyzed study materials and presentations—crafted to help you revise smarter, grasp key concepts faster, and stay exam-ready. Our AI transforms your content into summaries, quizzes, and study plans that actually help you succeed.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <a href="#features" className="hover:text-white transition">Features</a>
              <a href="#pricing" className="hover:text-white transition">Pricing</a>
              <a href="#terms" className="hover:text-white transition">Terms</a>
              <a href="#privacy" className="hover:text-white transition">Privacy</a>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <a href="#contact" className="hover:text-white transition">Contact Us</a>
            </nav>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <p className="text-sm">
              Made with <span className="text-red-500">&hearts;</span> by <a href="#maker" className="hover:text-white font-medium">Team Zenux</a>
            </p>
          </div>
        </div>

        {/* Text Hover Effect / Branding */}
        <div className="border-t border-gray-800 pt-6">
          <div className="h-32 flex items-center justify-center">
            <TextHoverEffect text="Zenux" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FintreeFooter;
