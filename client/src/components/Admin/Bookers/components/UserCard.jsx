import React from 'react';
import { Bookmark, Star } from 'lucide-react';

export default function UserCard({ user }) {
    return (
        <div className="flex items-center justify-center h-fit w-full md:w-[calc((1/2*100%)-1.25rem)] lg:w-[calc((1/3*100%)-1.25rem)] p-4 ">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Header with gradient background */}
                    {/* <div className="relative h-48  from-orange-400 via-pink-400 to-blue-600">
                        Decorative shapes
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-700 rounded-bl-full transform translate-x-20 -translate-y-10"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 rounded-tr-full transform -translate-x-10 translate-y-10"></div>
                        <div className="absolute top-1/2 right-1/4 w-56 h-56 bg-purple-600 rounded-3xl transform rotate-45 translate-y-8"></div>

                        Small bird/decorative element
                        <div className="absolute top-16 right-32 w-3 h-3 bg-blue-900 rounded-full"></div>
                    </div> */}

                {/* Profile content */}
                <div className="relative px-8 pb-8">
                    {/* Profile image */}
                    <div className="mt-5 flex justify-center items-center">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-300 overflow-hidden">
                                <img
                                    src={user.profilePic}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Name and title */}
                    <div className="mt-5 text-center">
                        <h1 className="text-xl font-bold text-gray-900">{user.fullName}</h1>
                        <p className="text-gray-600 font-semibold text-base mt-1">{user.role}</p>
                    </div>

                    {/* Skills tags */}
                    {/* <div className="flex flex-wrap gap-3 mt-6">
                        <span className="px-5 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                            App Design
                        </span>
                        <span className="px-5 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                            Web Design
                        </span>
                        <span className="px-5 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                            Figma
                        </span>
                        <button className="w-10 h-10 bg-gray-100 text-gray-800 rounded-full text-sm font-medium flex items-center justify-center hover:bg-gray-200 transition-colors">
                            +4
                        </button>
                    </div> */}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-xl font-bold text-gray-900">
                                <span>4.9</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">Rating</p>
                        </div>
                        <div className="text-center border-l border-r border-gray-200">
                            <div className="flex items-center justify-center gap-1 text-xl font-bold text-gray-900">
                                <span>50+</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">Clients</p>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-bold text-gray-900">$65/hr</div>
                            <p className="text-gray-600 text-sm mt-1">Rate</p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    {/* <button className="w-full mt-5 bg-gray-900 text-white py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors">
                        Get In Touch
                    </button> */}
                </div>
            </div>
        </div>
    );
}