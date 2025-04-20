
import { TextHoverEffect } from '@/components/TextHoverEffect'
import React from 'react';
// import { Heart, } from 'lucide-react';

const FintreeFooter: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-black to-gray-900 text-gray-300 py-8 px-0.1  inset-0 flex ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
      
          <div className="col-span-1 lg:col-span-1">
            <div className="flex flex-col space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Product Video
                </h2>
                <p className="text-xl font-bold flex items-center">
                  <span className="text-[#ff5757]"></span>
                  <span className="text-white">tryhard</span>
                  <span className="text-[#f06262]">.tech</span>
                </p>
              </div>
              <p className="text-sm max-w-xs">
              Learn from over 100+ expertly analyzed study materials and presentations—crafted to help you revise smarter, grasp key concepts faster, and stay exam-ready. Our AI transforms your content into summaries, quizzes, and study plans that actually help you succeed.
              </p>
              <div className="flex items-center mt-4 bg-black bg-opacity-40 p-3 rounded-md w-fit">
               
              </div>
            </div>
          </div>

         
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Company</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#features" className="hover:text-white transition duration-200">
                Features
              </a>
              <a href="#pricing" className="hover:text-white transition duration-200">
                Pricing
              </a>
              <a href="#terms" className="hover:text-white transition duration-200">
                Terms
              </a>
              <a href="#privacy" className="hover:text-white transition duration-200">
                Privacy
              </a>
            </nav>
          </div>

        
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Support</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#contact" className="hover:text-white transition duration-200">
                Contact Us
              </a>
            </nav>
          </div>

       
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">About</h3>
            <div className="flex items-center">
              <a 
                href="#maker" 
                className="hover:text-white transition duration-200 flex items-center"
              >
                Made by &#10084;Team Zenux
                
              </a>
            </div>
          </div>
        </div>

        <div className="pt-0.001 border-t border-gray-800">
        <div className="h-[30rem] flex items-center justify-center mb-1 ">
            <TextHoverEffect text="Zenux" m-0 />
        </div>
        </div>
      </div>
    </footer>
  );
};

export default FintreeFooter;