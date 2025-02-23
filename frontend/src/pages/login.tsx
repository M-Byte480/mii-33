import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";
import { getLocalStorageItem } from '../funcs/storage';
import { setLocalStorageItem } from '../funcs/storage';

interface LoginPageProps {
    open: boolean;
    onClose: () => void;
}

export function LoginModal({ open, onClose }: LoginPageProps) {
    const responseMessage = async (response: any) => {
        console.log("Success", response);
        
        const idToken = response.credential;

        if (idToken) {
            setLocalStorageItem("jwt", idToken);
            try {
                const backendResponse = await fetch("http://localhost:3001/auth/google", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token: idToken }),
                });

                const data = await backendResponse.json();
                setLocalStorageItem("mii-jwt", data["token"]);
                console.log("Backend response:", data);
                onClose();
            } catch (error) {
                console.error("Error sending token to backend:", error);
            }
        } else {
            console.error("ID token missing from response");
        }
    };

    const errorMessage = () => {
        console.log("An error occurred during login.");
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>
                    Please log in using your Google account.
                </Typography>
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
