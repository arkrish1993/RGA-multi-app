const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const roleGuard = require("../middleware/roleGuard");
const feature = require("../middleware/featureToggle");
const controller = require("../controllers/orderController");

// CUSTOMER creates order
router.post(
  "/",
  auth,
  roleGuard(["CUSTOMER"]),
  feature("PLACE_ORDER"),
  controller.create,
);

// Both can read (scoped in controller)
router.get("/", auth, controller.list);
router.get("/:id", auth, controller.getById);

// CUSTOMER can update own order
router.put(
  "/:id",
  auth,
  roleGuard(["CUSTOMER"]),
  feature("PLACE_ORDER"),
  controller.update,
);

// ADMIN can delete any order
router.delete(
  "/:id",
  auth,
  roleGuard(["ADMIN"]),
  feature("VIEW_ALL_ORDERS"),
  controller.remove,
);

module.exports = router;
