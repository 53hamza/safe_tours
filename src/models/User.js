// models/User.js
import { DataTypes } from "sequelize";
import sequelize from "@/lib/db";

const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }, // we’ll hash it
  role: { type: DataTypes.STRING, defaultValue: "admin" }, // can add more roles later
});

export default User;
