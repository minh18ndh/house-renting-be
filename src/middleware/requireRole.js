export const requireRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.role) {
      return res.status(401).json({ error: 'Role not found in token' });
    }

    if (req.role !== requiredRole) {
      return res.status(403).json({ error: 'Forbidden: Insufficient role' });
    }

    next(); // role is valid -> continue
  };
};