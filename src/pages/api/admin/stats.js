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
        // Get filter parameter
        const { type } = req.query;
        
        // Build where clause based on filter
        const whereClause = type && type !== 'all' ? { bookingType: type } : {};
        
        // Get total number of bookings
        const totalBookings = await Booking.count({ where: whereClause });
        
        // Get recent bookings (last 5)
        const recentBookings = await Booking.findAll({
          where: whereClause,
          order: [['createdAt', 'DESC']],
          limit: 5
        });
        
        // Get bookings by type
        const bookingsByType = await Booking.findAll({
          where: whereClause,
          attributes: ['bookingType', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
          group: ['bookingType']
        });
        
        // Get bookings by status
        const bookingsByStatus = await Booking.findAll({
          where: whereClause,
          attributes: ['status', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
          group: ['status']
        });
        
        return res.status(200).json({
          success: true,
          data: {
            totalBookings,
            recentBookings,
            bookingsByType,
            bookingsByStatus
          }
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        return res.status(500).json({ success: false, message: "Failed to fetch statistics" });
      }
      
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
  }
}