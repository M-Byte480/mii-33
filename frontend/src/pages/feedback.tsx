import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, FormControl, FormControlLabel, Radio, RadioGroup, Button, Typography, Paper, Slider, Box } from "@mui/material";
import { getLocalStorageItem } from '../funcs/storage';

export function FeedbackPage() {
    const [searchParams] = useSearchParams();
    const calendarId = searchParams.get("calendarId") || "Guest";
    const meetingId = searchParams.get("meetingId") || "Unknown";
    const [feedback, setFeedback] = useState({
        necessary: 0,
        email: "",
        improvement: "",
    });

    const handleSubmit = async () => {
        const jwt = getLocalStorageItem("mii-jwt");
        if (jwt) {
            try {
                await fetch("http://localhost:3001/feedback", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...feedback, name: calendarId, meetingId }),
                });
                console.log("Feedback submitted:", feedback);
            } catch (error) {
                console.error("Error submitting feedback:", error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-blue-600 text-white py-20 text-center w-full">
                <h1 className="text-4xl font-bold">Meeting Feedback</h1>
                <p className="mt-4 text-lg">Give us feedback on the meeting, {calendarId}!</p>
            </header>
            <Container maxWidth="sm" className=" flex items-center justify-center">
                <Paper className="p-4 mt-4">
                    <Typography variant="h6" gutterBottom>
                        Did it feel necessary for you to be in that meeting?
                    </Typography>
                    <Box sx={{ width: 300, margin: "0 auto" }}>
                        <Slider
                            value={feedback.necessary}
                            onChange={(e, newValue) => setFeedback({ ...feedback, necessary: newValue as number })}
                            step={1}
                            marks={[
                                { value: 0, label: "Not at all" },
                                { value: 1, label: "Somewhat" },
                                { value: 2, label: "Absolutely" },
                            ]}
                            min={0}
                            max={2}
                        />
                    </Box>
                    <Typography variant="h6" gutterBottom>
                        Do you think that meeting could've been an email?
                    </Typography>
                    <FormControl component="fieldset" sx={{ display: 'flex', alignItems: 'center' }}>
                        <RadioGroup
                            value={feedback.email}
                            onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                    <Typography variant="h6" gutterBottom>
                        Could this meeting have been shorter
                    </Typography>
                    <FormControl component="fieldset" sx={{ display: 'flex', alignItems: 'center' }}>
                        <RadioGroup
                            value={feedback.improvement}
                            onChange={(e) => setFeedback({ ...feedback, improvement: e.target.value })}
                        >
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                            <FormControlLabel value="unsure" control={<Radio />} label="Unsure" />
                            <FormControlLabel value="definitely" control={<Radio />} label="Definitely" />
                        </RadioGroup>
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                        >
                            Submit Feedback
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
}
