import React from 'react'
import Link from 'next/link'
const HeroPage = () => {
  return (
    <div>
        <section className="max-w-4xl mx-auto mt-16 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-blue-100">
          Optimize
          <span className="inline-flex items-center justify-center mx-2">
            <span className="relative">
              <span className="bg-[#ff5757] w-12 h-12 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <line x1="5" y1="12" x2="11" y2="18" />
                  <line x1="5" y1="12" x2="11" y2="6" />
                </svg>
              </span>
            </span>
          </span>
          study,
          <br />
          streamline
          <span className="inline-flex items-center justify-center mx-2">
            <span className="relative">
              <span className="bg-[#4ade80] w-12 h-12 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <line x1="13" y1="5" x2="19" y2="12" />
                  <line x1="13" y1="19" x2="19" y2="12" />
                </svg>
              </span>
            </span>
          </span>
          processes, and
          <br />
          boost study 
          <span className="inline-flex items-center justify-center mx-2">
            <span className="relative">
              <span className="bg-[#3b82f6] w-12 h-12 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v8" />
                  <path d="m16 6-4 4-4-4" />
                  <rect width="20" height="8" x="2" y="14" rx="2" />
                  <path d="M6 18h.01" />
                  <path d="M10 18h.01" />
                </svg>
              </span>
            </span>
          </span>
          growth
        </h1>

        <div className="mt-12">
          <Link href="#" className="bg-[#1a1a1a] text-white px-8 py-3 rounded-full font-medium inline-block">
            Book a Demo
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HeroPage