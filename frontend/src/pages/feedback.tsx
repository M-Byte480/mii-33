import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, FormControl, FormControlLabel, Radio, RadioGroup, Button, Typography, Paper, Slider, Box, Modal } from "@mui/material";
import { getLocalStorageItem } from '../funcs/storage';

export function FeedbackPage() {
    const [searchParams] = useSearchParams();
    const employeeId = searchParams.get("employeeId");
    const [feedback, setFeedback] = useState({
        necessary: 0,
        email: "",
        shorter: "",
    });
    const [open, setOpen] = useState(false);

    const handleSubmit = async () => {
        const jwt = getLocalStorageItem("mii-jwt");
        if (jwt) {
            try {
                await fetch(`http://localhost:3001/employees/${employeeId}/employee_feedbacks`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...feedback}),
                });
                console.log("Feedback submitted:", feedback);
                setFeedback({ necessary: 0, email: "", shorter: "" });
                setOpen(true);
            } catch (error) {
                console.error("Error submitting feedback:", error);
            }
        }
    };

    const handleClose = () => setOpen(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-blue-600 text-white py-20 text-center w-full">
                <h1 className="text-4xl font-bold">Meeting Feedback</h1>
                <p className="mt-4 text-lg">Give us feedback on your meeting!</p>
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
                            value={feedback.shorter}
                            onChange={(e) => setFeedback({ ...feedback, shorter: e.target.value })}
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Feedback Submitted
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Thank you for your feedback!
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button onClick={handleClose} variant="contained" color="primary">
                            Close
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
