export function Calendar() {
    return (
        <>
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-blue-600 text-white py-20 text-center">
                    <h1 className="text-4xl font-bold">Our Google Calendar</h1>
                    <p className="mt-4 text-lg">Stay updated with our latest schedules and events.</p>
                </header>

                {/* Calendar Section */}
                <section className="py-20 px-6 max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
                    <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
                        <iframe src="https://calendar.google.com/calendar/embed?src=02d404df99bbbb581dd1e66d6951fb0ddc70906925bad545800a3359e5256935%40group.calendar.google.com&ctz=Europe%2FDublin&mode=WEEK"
                            width="800" height="600"
                            scrolling="no"></iframe>
                    </div>
                </section>
            </div>
        </>
    )
}