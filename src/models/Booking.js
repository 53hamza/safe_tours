import { DataTypes } from "sequelize";
import sequelize from "@/lib/db";

const Booking = sequelize.define("Booking", {
  fullName: { type: DataTypes.STRING, allowNull: true },
  mobile: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: true },
  from: { type: DataTypes.STRING, allowNull: true },
  to: { type: DataTypes.STRING, allowNull: true },
  departureDate: { type: DataTypes.DATEONLY, allowNull: true },
  departureTime: { type: DataTypes.STRING },
  returnDate: { type: DataTypes.DATEONLY },
  pickupTime: { type: DataTypes.STRING },
  estimateDistance: { type: DataTypes.STRING },
  carType: { type: DataTypes.STRING, allowNull: true },
  bookingType: { type: DataTypes.STRING, allowNull: false },
  enquiry: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
});

export default Booking;
