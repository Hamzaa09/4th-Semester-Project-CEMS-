import React from 'react';
import { Star, Phone, Mail } from 'lucide-react';

export default function UserCard({ user }) {
  return (
    <div className="w-full md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.833rem)] xl:w-[calc(25%-0.938rem)]">
      <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1.5 bg-emerald-600" />
        
        {/* Profile content */}
        <div className="p-6">
          {/* Profile image and basic info */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 bg-gray-200 overflow-hidden">
                <img
                  src={user.profilePic}
                  alt={user.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-gray-900 truncate">{user.fullName}</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wide mt-1">
                {user.role}
              </span>
            </div>
          </div>

          {/* Contact info */}
          <div className="mt-4 space-y-2">
            {user.email && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="truncate">{user.email}</span>
              </div>
            )}
            {user.phoneNumber && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{user.phoneNumber}</span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-4" />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-lg font-bold text-gray-900">4.9</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Rating</p>
            </div>
            <div className="border-l border-r border-gray-100">
              <span className="text-lg font-bold text-gray-900">50+</span>
              <p className="text-xs text-gray-500 mt-0.5">Orders</p>
            </div>
            <div>
              <span className="text-lg font-bold text-emerald-600">Active</span>
              <p className="text-xs text-gray-500 mt-0.5">Status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
