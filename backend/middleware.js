const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const token = authHeader.split(" ")[1];
	const secret = process.env.JWT_SECRET;

	try {
		const decoded = jwt.verify(token, secret);
		req.userId = decoded.userId;

		next();
	} catch (err) {
		return res.status(403).json({ message: "Forbidden" });
	}
};

module.exports = { authMiddleware };
