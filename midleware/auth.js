import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) res.status(403).josn({ message: "Access denied" });

    if (token.startsWith("Bearer ")) {
      token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
