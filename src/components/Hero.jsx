import React, { useState } from 'react';

function SkillSyncHero() {
    const [skills, setSkills] = useState('');
    const [collegeName, setCollegeName] = useState('');

    const handleSearch = () => {
        console.log('Searching for:', { skills, collegeName });
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-6 px-4 sm:py-8 sm:px-6 lg:py-12 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Main Container Box */}
                <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl shadow-2xl overflow-hidden">
                    {/* Geometric Background Shapes */}
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Large triangle left */}
                        <div className="absolute -left-10 top-10 w-32 h-32 bg-blue-500 opacity-20 transform rotate-45 rounded-lg md:w-48 md:h-48 md:-left-16 md:top-16"></div>

                        {/* Small rectangle left */}
                        <div className="absolute left-8 bottom-16 w-12 h-20 bg-blue-400 opacity-25 transform -rotate-12 rounded md:w-16 md:h-28 md:left-16 md:bottom-24"></div>

                        {/* Large circle right */}
                        <div className="absolute -right-8 top-1/4 w-28 h-28 bg-blue-500 opacity-15 rounded-full md:w-40 md:h-40 md:-right-12"></div>

                        {/* Medium circle right */}
                        <div className="absolute right-6 bottom-12 w-16 h-16 bg-blue-400 opacity-20 rounded-full md:w-24 md:h-24 md:right-12 md:bottom-16"></div>

                        {/* Additional decorative shapes */}
                        <div className="hidden lg:block absolute left-1/4 top-8 w-8 h-8 bg-blue-300 opacity-15 rounded-full"></div>
                        <div className="hidden lg:block absolute right-1/3 bottom-8 w-6 h-6 bg-blue-400 opacity-25 transform rotate-45"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-16">
                        <div className="text-center max-w-4xl mx-auto">
                            {/* Title */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 tracking-tight">
                                TeamUP
                            </h1>

                            {/* Subtitle */}
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
                                Connect, collaborate, and build with skilled developers and designers
                            </p>

                            {/* Search Container */}
                            <div className="bg-white rounded-2xl p-3 md:p-4 shadow-xl max-w-lg mx-auto">
                                <div className="space-y-3">
                                    {/* Input Fields Column */}
                                    <div className="flex flex-col gap-4">
                                        {/* Skills Input */}
                                        <div className="w-full relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Skills"
                                                value={skills}
                                                onChange={(e) => setSkills(e.target.value)}
                                                className="w-full pl-12 pr-4 py-3 md:py-4 text-gray-700 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base placeholder-gray-500"
                                            />
                                        </div>

                                        {/* College Name Input */}
                                        <div className="w-full relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="College Name"
                                                value={collegeName}
                                                onChange={(e) => setCollegeName(e.target.value)}
                                                className="w-full pl-12 pr-4 py-3 md:py-4 text-gray-700 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base placeholder-gray-500"
                                            />
                                        </div>

                                        {/* Search Button */}
                                        <button
                                            onClick={handleSearch}
                                            className="w-full bg-blue-600 text-white font-semibold px-6 py-3 md:py-4 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg text-sm md:text-base cursor-grab"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Stats/Features */}
                            <div className="mt-6 md:mt-8 text-blue-100">
                                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
                                    <div className="flex items-center gap-2">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-sm md:text-base">500+ Developers</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-sm md:text-base">100+ Colleges</span>
                                    </div>
                                    <div className="flex items-center gap-2 basis-full sm:basis-auto justify-center">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-sm md:text-base">Active Projects</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SkillSyncHero;