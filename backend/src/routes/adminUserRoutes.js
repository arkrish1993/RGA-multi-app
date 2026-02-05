const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const roleGuard = require("../middleware/roleGuard");
const controller = require("../controllers/adminUserController");

/**
 * ALL ROUTES:
 * - JWT required
 * - ADMIN only
 * - INTERNAL_APP only
 */

router.get("/", auth, roleGuard(["ADMIN"]), controller.getAllUsers);

router.get("/:id", auth, roleGuard(["ADMIN"]), controller.getUserById);

router.put(
  "/:id/toggle-status",
  auth,
  roleGuard(["ADMIN"]),
  controller.toggleUserStatus,
);

module.exports = router;
