import { GoogleLogin } from "@react-oauth/google";

export function LoginPage() {
    const responseMessage = (response: any) => {
        console.log("Success", response);
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