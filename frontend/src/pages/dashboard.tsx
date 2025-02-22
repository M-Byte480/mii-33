export function Dashboard(){
    return (
        <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-blue-600 text-white py-20 text-center">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="mt-4 text-lg">Track your analytics and insights.</p>
        </header>
  
        {/* Analytics Section */}
        <section className="py-20 px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">Analytics Overview</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600">📊 Total Events</h3>
              <p className="mt-2 text-gray-600 text-2xl font-bold">42</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600">📅 Upcoming Events</h3>
              <p className="mt-2 text-gray-600 text-2xl font-bold">8</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600">👥 Attendees</h3>
              <p className="mt-2 text-gray-600 text-2xl font-bold">126</p>
            </div>
          </div>
        </section>
      </div>
    )
}