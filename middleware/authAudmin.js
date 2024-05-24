const jwt = require('jsonwebtoken');

const authAdmin = (req, res, next) => {
    const token = req.headers['authorization'];

    console.log(token)
    if (!token) return res.status(403).json({ message: 'Token is required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log(err);
        if (err) return res.status(401).json({ message: 'Invalid token' });
        console.log(decoded)
        if (decoded.role !== 'ADMIN') return res.status(403).json({ message: 'Admin access required' });
        next();
    });
};

module.exports = authAdmin;

