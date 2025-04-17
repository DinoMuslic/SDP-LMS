const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token." });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }
    next();
};

const isLibrarianOrAdmin = (req, res, next) => {
    if (req.user.role !== "admin" && req.user.role !== "librarian") {
        return res.status(403).json({ error: "Access denied. Librarians and admins only." });
    }
    next();
};

module.exports = { verifyToken, isAdmin, isLibrarianOrAdmin };
