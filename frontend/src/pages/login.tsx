import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export function LoginPage() {
    const responseMessage = async (response: any) => {
        console.log("Success", response);
        
        const idToken = response.credential;

        if (idToken) {
            try {
                const backendResponse = await fetch("http://localhost:3001/auth/google", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token: idToken }),
                });

                const data = await backendResponse.json();
                console.log("Backend response:", data);
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
        <>
            <div className="flex justify-center items-center h-screen">
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>
        </>
    )
}