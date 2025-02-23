import { Session } from "inspector";
import { useEffect, useState } from "react";
import { getLocalStorageItem } from "../funcs/storage";
import { jwtDecode } from "jwt-decode";
import { addDays, format, startOfToday } from "date-fns";
import Modal from "react-modal";
import { Button } from "@mui/material";

export function Calendar() {
    const [session, setSession] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedStartTime, setSelectedStartTime] = useState<string>("");
    const [selectedEndTime, setSelectedEndTime] = useState<string>("");
    const [selectedDuration, setSelectedDuration] = useState<number>(0);
    useState<string>("");
    const [listOfEmails, setListOfEmails] = useState<string[]>([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState<any>([]);
    const [selectedTime, setSelectedTime] = useState<string>("");

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    function openModal() {
        setIsOpen(true);
    }
    let subtitle = {};

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // @ts-ignore
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        const sessionData = getLocalStorageItem("jwt");
        if (sessionData) {
            const decoded = jwtDecode(sessionData);
            // @ts-ignore
            const encodedEmail = encodeURIComponent(decoded.email);
            const sessionCalendar = `https://calendar.google.com/calendar/embed?src=${encodedEmail}&ctz=Europe%2FDublin&mode=WEEK`;
            setSession(sessionCalendar);
        }
    }, []);

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
        for (let hour = 9; hour <= 17; hour++) {
            // 9 AM to 5 PM
            times.push(format(new Date(2000, 0, 1, hour, 0), "h:mm a"));
            times.push(format(new Date(2000, 0, 1, hour, 30), "h:mm a"));
        }
        return times;
    };

    const submitTime = () => {
        closeModal();
        const startTime = new Date(selectedTime);
        const endTime = new Date(startTime.getTime() + selectedDuration * 60000);
        fetch("http://localhost:3001/createevent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getLocalStorageItem("mii-jwt")
            },
            body: JSON.stringify({
                data: {
                    name: "Meeting with Team",
                    location: "Conference Room",
                    start_time: startTime.toISOString(),
                    end_time: endTime.toISOString(),
                    users: ["genericschoolaccout@gmail.com"]
                }
            }),
        }).then((res) => res.json())
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-blue-600 text-white py-20 text-center">
                    <h1 className="text-4xl font-bold">Your Calendar</h1>
                </header>
                {/* Calendar Section */}
                {session ? (
                    <div className="container mx-auto ">
                        <section className="py-20 px-6 mx-15 mx-auto text-center flex gap-10 justify-center">
                            <div className="flex flex-col grow space-y-4">
                                <h2 className="text-3xl font-bold text-gray-800">
                                    Upcoming Events
                                </h2>

                                <div className="mt-10 bg-white p-6 rounded-lg shadow-md flex">
                                    <iframe
                                        src={session}
                                        className="flex-grow"
                                        height="600"
                                    ></iframe>
                                </div>
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
                                    <label className="text-lg font-semibold">
                                        Select Start Time:
                                    </label>
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
                                    <label className="text-lg font-semibold">
                                        Select Finish Time:
                                    </label>
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

                                    <label className="text-lg font-semibold">
                                        Select Duration:
                                    </label>
                                    <select
                                        className="p-2 border rounded"
                                        value={selectedDuration}
                                        onChange={(e) => setSelectedDuration(Number(e.target.value))}
                                    >
                                        <option value="">Select Duration</option>
                                        {[15, 30, 45, 60, 90, 120].map((duration) => (
                                            <option key={duration} value={duration}>
                                                {duration} minutes
                                            </option>
                                        ))}
                                    </select>

                                    {/* Email Input field*/}

                                    <label className="text-lg font-semibold">Enter Email:</label>

                                    <input
                                        className="p-2 border rounded"
                                        type="email"
                                        value={listOfEmails.join(", ")}
                                        onChange={(e) =>
                                            setListOfEmails(
                                                e.target.value.split(",").map((email) => email.trim())
                                            )
                                        }
                                    />

                                    <button
                                        className="bg-blue-600 text-white p-2 rounded"
                                        onClick={async () => {
                                            try {
                                                let response = await sendApiCall(
                                                    selectedDate,
                                                    selectedDuration,
                                                    selectedStartTime,
                                                    selectedEndTime,
                                                    listOfEmails
                                                );
                                                setModalData(response);
                                                openModal();
                                            } catch (error) {
                                                console.error("Error fetching data:", error);
                                            }
                                        }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
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
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Time Selector</h2>
                <form>
                    {modalData.map((time: string, index: any) => (
                        <>

                            <button
                                key={index}
                                className={`p-2 rounded ${selectedTime === time
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-300 text-black"
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedTime(time);
                                }}
                            >
                                {new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
                            </button>
                            <br></br>
                        </>

                    ))}
                    <Button onClick={() => submitTime()}>Submit</Button>
                </form>
                <button onClick={closeModal}>close</button>
            </Modal>
        </>
    );
}

export async function sendApiCall(
    date: string,
    duration: number,
    startTimeRange: string,
    endTimeRange: string,
    emails: string[]
) {

    let actualStartTime = new Date(date + " " + startTimeRange);
    let actualEndTime = new Date(date + " " + endTimeRange);
    return await fetch("http://localhost:3001/find", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getLocalStorageItem("mii-jwt")}`,
        },
        body: JSON.stringify({
            data: {
                date: date,
                duration: duration,
                start_time: actualStartTime,
                end_time: actualEndTime,
                users: emails
            },
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}
