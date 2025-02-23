import { Session } from "inspector";
import { useEffect, useState } from "react";
import { getSessionItem } from "../App";
import { jwtDecode } from "jwt-decode";

export function Calendar() {
    const [session, setSession] = useState<string | null>(null);
    useEffect(() => {
        const sessionData = getSessionItem("jwt");
        if (sessionData) {
            const decoded = jwtDecode(sessionData);
            // @ts-ignore
            const encodedEmail = encodeURIComponent(decoded.email);
            const sessionCalendar = `https://calendar.google.com/calendar/embed?src=${encodedEmail}&ctz=Europe%2FDublin&mode=WEEK`;
            setSession(sessionCalendar);
        }
    }
        , []);

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-blue-600 text-white py-20 text-center">
                    <h1 className="text-4xl font-bold">Our Google Calendar</h1>
                    <p className="mt-4 text-lg">Stay updated with our latest schedules and events.</p>
                </header>
                {/* Calendar Section */}
                {session ? (
                    <section className="py-20 px-6 max-w-5xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
                        <div className="mt-10 bg-white p-6 rounded-lg shadow-md flex">
                            <iframe src={session}
                                className="flex-grow" height="600"
                                scrolling="no"></iframe>
                        </div>
                    </section>
                ) : (
                    <></>
                )}

            </div>
        </>
    )
}
