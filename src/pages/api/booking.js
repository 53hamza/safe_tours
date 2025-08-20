import sequelize from "@/lib/db";
import Booking from "@/models/Booking";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await sequelize.authenticate();
      await Booking.sync(); // Ensures table exists
      console.log("syncing done");
      

      const booking = await Booking.create({
        ...req.body,
      });

      res.status(201).json({
        success: true,
        message: "Booking saved successfully",
        data: booking,
      });
    } catch (error) {
      console.error("Error saving booking:", error);
      res.status(500).json({
        success: false,
        message: "Database error",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
