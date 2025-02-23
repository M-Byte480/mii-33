export function Home() {
    return (
        <>
            <div className="min-h-screen bg-gray-100">
                {/* Hero Section */}
                <header className="bg-blue-600 text-white py-20 text-center">
                    <h1 className="text-4xl font-bold">Welcome to Mii-Tings</h1>
                    <p className="mt-4 text-lg">Optimize your meetings and improve collaboration effortlessly.</p>
                    <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
                        Get Started
                    </button>
                </header>

                {/* Features Section */}
                <section className="py-20 px-6 max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Why Choose Mii-Tings?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-blue-600">🚀 Optimize Meetings</h3>
                            <p className="mt-2 text-gray-600">Streamline your meetings with our advanced tools.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-blue-600">💡 Improve Collaboration</h3>
                            <p className="mt-2 text-gray-600">Enhance team collaboration with seamless integration.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-blue-600">🔒 Secure & Reliable</h3>
                            <p className="mt-2 text-gray-600">Ensure your meetings are secure and reliable.</p>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="bg-blue-600 text-white py-16 text-center">
                    <h2 className="text-3xl font-bold">Ready to Optimize Your Meetings?</h2>
                    <p className="mt-4 text-lg">Join thousands of teams improving their collaboration today.</p>
                    <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
                        Sign Up Now
                    </button>
                </section>
            </div>
        </>
    )
}
