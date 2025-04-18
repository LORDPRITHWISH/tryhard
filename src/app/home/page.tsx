import React from "react";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center font-sans">
            <h1 className="text-4xl mb-4 tracking-widest">Welcome to the Future</h1>
            <p className="max-w-xl text-center text-gray-300">
                Learn at the speed of light with our interactive RPG quiz! Test your knowledge in various genres like fantasy, sci-fi, and medieval. Join us on this adventure and see how you stack up against others!
                <br />
                <a href="/question" className="text-blue-400 hover:underline">
                    Start the Quiz  
                </a>
            </p>
        </main>
    );
}