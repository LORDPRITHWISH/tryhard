import React from 'react'
import Link from 'next/link'
const NavbarPage = () => {
  return (
    <nav className="bg-[#1a1a1a] rounded-full max-w-[700px] mx-auto mt-4 px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white w-6 h-6 rounded flex items-center justify-center">
            <div className="bg-[#1a1a1a] w-3 h-3 rounded-sm"></div>
          </div>
          <span className="text-white font-medium">Aligno</span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-white text-sm">
          <div className="flex items-center gap-1">
            <span>Products</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <div className="flex items-center gap-1">
            <span>Resources</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <div className="flex items-center gap-1">
            <span>Integrations</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <div className="flex items-center gap-1">
            <span>More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="#" className="text-white text-sm px-3 py-1">
            Log in
          </Link>
          <Link href="#" className="bg-white text-black text-sm px-4 py-1 rounded-full font-medium">
            Join the waitlist
          </Link>
        </div>
      </nav>
  )
}

export default NavbarPage