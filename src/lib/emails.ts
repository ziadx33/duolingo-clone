import { env } from "@/env";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(env.SEND_GRID_API_KEY);
export const transporter = sgMail;
