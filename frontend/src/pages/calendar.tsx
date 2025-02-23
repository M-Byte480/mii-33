import { Session } from "inspector";
import { useEffect, useState } from "react";
import { getSessionItem } from '../funcs/storage';
import { jwtDecode } from "jwt-decode";
import { addDays, format, startOfToday } from "date-fns";
import Modal from 'react-modal';

export function Calendar() {
    const [session, setSession] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedStartTime, setSelectedStartTime] = useState<string>("");
    const [selectedEndTime, setSelectedEndTime] = useState<string>("");
    const [listOfEmails, setListOfEmails] = useState<string[]>([]);
    const [modalIsOpen, setIsOpen] = useState(false);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function openModal() {
        setIsOpen(true);
    }
    let subtitle = {};

    function afterOpenModal() {
        // references are now sync'd and can be accessed. 
        // @ts-ignore
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

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

    // Generate the next 7 days for the date dropdown
    const getNext7Days = () => {
        const today = startOfToday();
        return Array.from({ length: 7 }, (_, i) =>
            format(addDays(today, i), "yyyy-MM-dd")
        );
    };

    // Generate time options (30-minute intervals)
    const getTimeSlots = () => {
        const times: string[] = [];
        for (let hour = 9; hour <= 17; hour++) { // 9 AM to 5 PM
            times.push(format(new Date(2000, 0, 1, hour, 0), "h:mm a"));
            times.push(format(new Date(2000, 0, 1, hour, 30), "h:mm a"));
        }
        return times;
    };


    return (
        <>
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-blue-600 text-white py-20 text-center">
                    <h1 className="text-4xl font-bold">Your Calendar</h1>
                </header>
                {/* Calendar Section */}
                {session ? (
                    <>
                        <button onClick={openModal}>Open Modal</button>

                        <section className="py-20 px-6 max-w-5xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
                            <div className="mt-10 bg-white p-6 rounded-lg shadow-md flex">
                                <iframe src={session}
                                    className="flex-grow" height="600"></iframe>
                            </div>
                            <div className="flex flex-row items-center justify-center mt-10">
                                <div className="flex flex-col space-y-4">
                                    {/* Date Dropdown */}
                                    <label className="text-lg font-semibold">Select Date:</label>
                                    <select
                                        className="p-2 border rounded"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                    >
                                        <option value="">Select a Date</option>
                                        {getNext7Days().map((date) => (
                                            <option key={date} value={date}>
                                                {format(new Date(date), "EEEE, MMMM d")}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Time Dropdown */}
                                    <label className="text-lg font-semibold">Select Start Time:</label>
                                    <select
                                        className="p-2 border rounded"
                                        value={selectedStartTime}
                                        onChange={(e) => setSelectedStartTime(e.target.value)}
                                    >
                                        <option value="">Select a Time</option>
                                        {getTimeSlots().map((time) => (
                                            <option key={time} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Time Dropdown */}
                                    <label className="text-lg font-semibold">Select Finish Time:</label>
                                    <select
                                        className="p-2 border rounded"
                                        value={selectedEndTime}
                                        onChange={(e) => setSelectedEndTime(e.target.value)}
                                    >
                                        <option value="">Select a Time</option>
                                        {getTimeSlots().map((time) => (
                                            <option key={time} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Email Input field*/}

                                    <label className="text-lg font-semibold">Enter Email:</label>

                                    <input
                                        className="p-2 border rounded"
                                        type="email"
                                        value={listOfEmails.join(", ")}
                                        onChange={(e) => setListOfEmails(e.target.value.split(",").map(email => email.trim()))}
                                    />

                                    {/* Display Selected Date & Time */}
                                    {selectedDate && selectedStartTime && selectedEndTime && (
                                        <p className="text-lg font-semibold mt-4">
                                            Selected: {format(new Date(selectedDate), "EEEE, MMMM d")} at {selectedStartTime} to {selectedEndTime}
                                        </p>
                                    )}
                                    <button className="bg-blue-600 text-white p-2 rounded" onClick={() => {
                                        sendApiCall(selectedDate, selectedStartTime, selectedEndTime, listOfEmails)
                                    }}>Submit</button>
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <></>
                )}

            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {/* @ts-ignore */}
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <div>I am a modal</div>
                <form>
                    <button>Button</button>
                </form>
                <button onClick={closeModal}>close</button>
            </Modal>
        </>
    )
}

export function sendApiCall(date: string, startTime: string, endTime: string, emails: string[]) {
    fetch("http://localhost:3001/find", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            date: date,
            start_time: startTime,
            end_time: endTime,
            emails: emails,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
}
