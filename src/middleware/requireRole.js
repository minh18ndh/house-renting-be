export const requireRole = (role) => {
  return (req, res, next) => {
    if (req.role !== role) {
      return res.status(403).json({ error: 'Admin only' });
    }
    next();
  };
};