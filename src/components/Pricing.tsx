"use client"
export default function PricingPage() {
    return (
      <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-white flex flex-col items-center justify-center relative overflow-hidden mt-0">
        {/* Background grid */}
       
        
        {/* Header */}
        <div className="text-center mb-16 z-10 px-4">
          <p className="text-sm mb-4">Pricing</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose the Perfect Plan for
            <br />
            your design needs
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            From beginners to pros, we&apos;ve got the tools to match your design needs.
          </p>
        </div>
  
        {/* Pricing comparison */}
        <div className="w-full max-w-6xl px-4 z-10 relative">
          {/* Center accent line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7CFC00]/0 via-[#7CFC00] to-[#7CFC00]/0"></div>
  
          {/* Pricing cards */}
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
            {/* Free tier */}
            <div className="flex-1 max-w-md flex flex-col">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Start</h2>
                <p className="text-gray-400 mb-6 h-24">
                  Ideal for small-scale projects and individuals exploring design tools. Access essential features to
                  kickstart your UI/UX journey.
                </p>
                <div className="text-3xl font-bold">Free</div>
                {/* Adding an empty div to match the height of the "Most Popular Plan" text in the Pro tier */}
                <div className="mt-2 text-sm h-5"></div>
              </div>
  
              <div className="mb-8 flex-grow">
                <h3 className="text-sm font-medium mb-4">Included</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#7CFC00] mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Basic UI components and templates</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#7CFC00] mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Limited access to design resources</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#7CFC00] mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Community support</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#7CFC00] mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">3 active projects</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#7CFC00] mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Access to beginner design tutorials</span>
                  </li>
                </ul>
              </div>
  
              <button className="w-full py-3 px-4 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors mt-auto">
                Book a Demo →
              </button>
            </div>
  
            {/* Pro tier */}
            <div className="flex-1 max-w-md flex flex-col">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Pro</h2>
                <p className="text-gray-400 mb-6 h-24">
                  Unlock advanced tools and resources tailored for professionals and teams, designed to elevate your
                  design workflow and productivity.
                </p>
                <div className="text-3xl font-bold">
                  $1499 <span className="text-sm font-normal text-gray-400">/year</span>
                </div>
                <div className="mt-2 text-sm text-[#7CFC00] h-5">Most Popular Plan</div>
              </div>
  
              <div className="mb-8 flex-grow">
                <h3 className="text-sm font-medium mb-4">Included</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#7CFC00] mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Unlimited access to premium UI components</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#7CFC00] mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Priority support</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#7CFC00] mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Customizable design resources and assets</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#7CFC00] mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Collaboration tools for teams</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-[#7CFC00] mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Integration with third-party apps (e.g., Figma, Sketch)</span>
                  </li>
                </ul>
              </div>
  
              <button className="w-full py-3 px-4 bg-[#BBFF00] text-black font-medium rounded-md hover:bg-[#A8E600] transition-colors mt-auto">
                Book a Demo →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }