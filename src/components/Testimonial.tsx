import React from 'react';
import { ArrowRight, Cloud, RefreshCw } from 'lucide-react';
import { Image } from 'lucide-react';
export default function TestimonialsSection() {
 // const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Sophia",
      position: "Founder Of Cloud",
      image: "/api/placeholder/60/60",
      quote: "We Partnered With ScaleX To Refine Our Marketing Efforts And The Results Have Been Outstanding. Their Creative Campaigns And Precise Execution Not Only Improved Our Brand Visibility But Also Fostered Better Customer Retention.",
      icon: <Cloud className="w-6 h-6 text-white" />
    },
    {
      id: 2,
      name: "Anjela",
      position: "CEO Of TechNova",
      image: "/api/placeholder/60/60",
      quote: "Working With ScaleX Has Been A Game Changer For Our Business. Their Innovative Strategies And Hands-On Approach Have Significantly Boosted Our Lead Generation.",
      icon: <RefreshCw className="w-6 h-6 text-white" />
    },
    {
      id: 3,
      name: "Mark",
      position: "CMO Of InnoSaaS",
      image: "/api/placeholder/60/60",
      quote: "ScaleX Transformed Our Digital Marketing Strategy. Their Deep Understanding Of SaaS Dynamics And Data-Driven Approach Allowed Us To Target The Right Audience, Resulting In A 40% Increase In Sales Within Six Months.",
      icon: <Cloud className="w-6 h-6 text-white" />
    }
  ];

  return (
    <div className="bg-gradient-to-r from-black to-gray-900 text-white py-16 px-4 mb-0">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <div className="inline-block border border-gray-600 px-4 py-1 rounded-md mb-4">
            <span className="text-gray-400">Testimonials</span>
          </div>
          <h2 className="text-5xl font-bold mb-10">What Our Users Say</h2>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
          <div className="bg-gray-900 rounded-xl p-6 relative">
            <div className="flex items-center mb-4">
              <div className="relative">
                <img 
                  src="https://ik.imagekit.io/7b4kwmuj2/user3.avif?updatedAt=1745098065882" 
                  alt="Sophia" 
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-xl">Sophia</h3>
                <p className="text-gray-400">Founder Of Cloud</p>
              </div>
              <div className="ml-auto bg-gray-800 p-2 rounded-full">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
            
        
            <div className="mb-4">
              <img
                src="https://ik.imagekit.io/7b4kwmuj2/user1.jpg?updatedAt=1745098287128" 
                alt="Orange cat looking up" 
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
            
            <p className="text-gray-400">
              We Partnered With ScaleX To Refine Our Marketing Efforts And The Results Have Been Outstanding. Their Creative Campaigns And Precise Execution Not Only Improved Our Brand Visibility But Also Fostered Better Customer Retention.
            </p>
          </div>
          
        
          <div className="flex flex-col gap-6">
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="relative">
                  <img
                    src="https://ik.imagekit.io/7b4kwmuj2/user1.jpg?updatedAt=1745098287128" 
                    alt="Anjela" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-xl">Anjela</h3>
                  <p className="text-gray-400">CEO Of TechNova</p>
                </div>
                <div className="ml-auto bg-gray-800 p-2 rounded-full">
                  <RefreshCw className="w-5 h-5" />
                </div>
              </div>
              
              <p className="text-gray-400">
                Working With ScaleX Has Been A Game Changer For Our Business. Their Innovative Strategies And Hands-On Approach Have Significantly Boosted Our Lead Generation.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="relative">
                  <img
                    src="https://ik.imagekit.io/7b4kwmuj2/user2.jpg?updatedAt=1745098594619" 
                    alt="Mark" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-xl">Mark</h3>
                  <p className="text-gray-400">CMO Of InnoSaaS</p>
                </div>
                <div className="ml-auto bg-gray-800 p-2 rounded-full">
                  <Cloud className="w-5 h-5" />
                </div>
              </div>
              
              <p className="text-gray-400">
                ScaleX Transformed Our Digital Marketing Strategy. Their Deep Understanding Of SaaS Dynamics And Data-Driven Approach Allowed Us To Target The Right Audience, Resulting In A 40% Increase In Sales Within Six Months.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}