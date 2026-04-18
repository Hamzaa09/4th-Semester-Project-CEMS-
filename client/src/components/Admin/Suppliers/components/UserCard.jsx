import React from "react";

export default function UserCard() {
    const user = {
        name: "John Doe",
        role: "Software Engineer",
        ordersCount: 12,
        image: "https://i.pravatar.cc/150?img=3"
    };

    return (
        <div className="max-w-sm border border-green-500 shadow-lg rounded-2xl overflow-hidden p-4 flex items-center gap-4">
            <img
                src={user.image}
                alt={user.name}
                className="w-20 h-20 object-cover rounded-full"
            />
            <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.role}</p>
                <p className="text-gray-800 font-medium mt-1">Orders placed: {user.ordersCount}</p>
            </div>
        </div>
    );
}
