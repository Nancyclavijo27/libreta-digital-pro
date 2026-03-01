export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.rol)) {
      return res.status(403).json({
        message: "No tienes permisos para esta acción"
      });
    }
    next();
  };
};