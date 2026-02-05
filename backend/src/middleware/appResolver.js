const appConfig = require("../config/appConfig");

module.exports = (req, res, next) => {
  const appId = req.header("X-APP-ID");

  if (!appId || !appConfig[appId]) {
    return res.status(400).json({ error: "Invalid X-APP-ID" });
  }

  req.appId = appId;
  req.appContext = appConfig[appId];

  next();
};
