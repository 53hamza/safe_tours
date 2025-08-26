import sequelize from "@/lib/db";
import Booking from "@/models/Booking";

export default async function handler(req, res) {
  // Check if database is connected, connect if not
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Database connection failed:", error);
    return res.status(500).json({ success: false, message: "Database connection failed" });
  }

  switch (req.method) {
    case 'GET':
      try {
        // Fetch all bookings with optional filtering
        const { type, status } = req.query;
        
        // Build where clause based on filters
        const whereClause = {};
        if (type) whereClause.bookingType = type;
        if (status !== undefined) whereClause.status = status;
        
        const bookings = await Booking.findAll({
          where: whereClause,
          order: [['createdAt', 'DESC']], // Order by creation date, newest first
        });
        
        return res.status(200).json({
          success: true,
          data: bookings,
          count: bookings.length
        });
      } catch (error) {
        console.error("Error fetching bookings:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch bookings" });
      }
      
    case 'PUT':
      try {
        // Update lead status
        const { id, status } = req.body;
        
        if (!id || status === undefined) {
          return res.status(400).json({ success: false, message: "ID and status are required" });
        }
        
        const booking = await Booking.findByPk(id);
        if (!booking) {
          return res.status(404).json({ success: false, message: "Booking not found" });
        }
        
        booking.status = status;
        await booking.save();
        
        return res.status(200).json({
          success: true,
          message: "Booking status updated successfully",
          data: booking
        });
      } catch (error) {
        console.error("Error updating booking:", error);
        return res.status(500).json({ success: false, message: "Failed to update booking" });
      }
      
    case 'DELETE':
      try {
        // Delete a lead
        const { id } = req.body;
        
        if (!id) {
          return res.status(400).json({ success: false, message: "ID is required" });
        }
        
        const booking = await Booking.findByPk(id);
        if (!booking) {
          return res.status(404).json({ success: false, message: "Booking not found" });
        }
        
        await booking.destroy();
        
        return res.status(200).json({
          success: true,
          message: "Booking deleted successfully"
        });
      } catch (error) {
        console.error("Error deleting booking:", error);
        return res.status(500).json({ success: false, message: "Failed to delete booking" });
      }
      
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
  }
}