import { resend } from "@/lib/resend";

import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../emails/VerificationEmail";


export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const response = await resend.emails.send({
      from: "no-reply@mysteryauth.com", 
      to: email,
      subject: "Mystery Message Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    console.log("Resend response:", response);

    return { success: true, message: "Verification email sent successfully." };
  } catch (emailError: any) {
    console.error(
      "Error sending verification email:",
      emailError.response?.data || emailError.message || emailError
    );
    return { success: false, message: "Failed to send verification email." };
  }
}
