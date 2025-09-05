export const runtime = "nodejs";
import sequelize from "@/lib/db";
import Booking from "@/models/Booking";
import User from "@/models/User";
import { sendBookingEmail } from "@/lib/email";
// Sync once per process in dev only
let didSync = false;

async function authenticateWithRetry(maxAttempts = 3) {
  let attempt = 0;
  while (attempt < maxAttempts) {
    try {
      await sequelize.authenticate();
      return;
    } catch (err) {
      attempt++;
      if (attempt >= maxAttempts) throw err;
      await new Promise((r) => setTimeout(r, 300 * attempt));
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  try {
    await authenticateWithRetry();

    // Ensure the table exists only during local dev (not in production)
    // if (!didSync) {
    if (process.env.NODE_ENV !== "production" && !didSync) {
      await sequelize.sync(); // You can use { alter: true } initially, then remove it
      didSync = true;
    }

    const payload = req.body || {};
    // Minimal sanity checks (tweak as needed)
    if (!payload.bookingType) {
      return res.status(400).json({
        success: false,
        message: "bookingType is required",
      });
    }

    const booking = await Booking.create({ ...payload });

    // Send email notification
    try {
      await sendBookingEmail(payload);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the booking if email fails
    }

    return res.status(201).json({
      success: true,
      message: "Booking saved successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Error saving booking:", error);

    return res.status(500).json({
      success: false,
      message: "Database error",
      error: error.message,
    });
  }
}
