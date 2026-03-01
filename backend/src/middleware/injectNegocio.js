export const injectNegocio = (req, res, next) => {
  if (req.user.rol !== "superadmin") {
    req.negocio_id = req.user.negocio_id;
  }
  next();
};