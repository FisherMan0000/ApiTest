// Middleware to check if user is logged in and has a specific role
function checkRole(role) {
    return (req, res, next) => {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (req.session.role !== role) {
            return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
        }
        next();
    };
}

module.exports = { checkRole };
