import { useNavigate } from "react-router-dom";

const Cancel = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
            <div className="bg-white border border-gray-200 rounded-xl p-10 max-w-md w-full text-center shadow-sm">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
                <h1 className="text-2xl font-medium text-gray-800 mb-2">Payment cancelled</h1>
                <p className="text-gray-500 text-sm mb-6">
                    Your payment was cancelled. No charges were made. You can try again or choose a different payment method.
                </p>
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate("/booker/new-order")}
                        className="w-full py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition"
                    >
                        Try again
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="w-full py-2.5 rounded-lg border border-gray-100 text-gray-400 text-sm hover:bg-gray-50 transition"
                    >
                        Back to home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cancel;