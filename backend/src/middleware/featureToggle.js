module.exports = (feature) => {
  return (req, res, next) => {
    if (!req.appContext.features[feature]) {
      return res.status(403).json({
        error: `Feature ${feature} disabled for this app`,
      });
    }
    next();
  };
};
