import User from "@/models/User";
import { signToken } from "@/lib/jwt";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: "Invalid username" });

    // Direct comparison
    if (user.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);

    res.setHeader(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict;`
    );

    return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}
