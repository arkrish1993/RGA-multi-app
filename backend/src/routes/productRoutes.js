const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const roleGuard = require("../middleware/roleGuard");
const feature = require("../middleware/featureToggle");
const controller = require("../controllers/productController");

/**
 * CREATE
 */
router.post(
    "/",
    auth,
    roleGuard(["ADMIN"]),
    feature("MANAGE_PRODUCTS"),
    controller.create
);

/**
 * READ ALL
 */
router.get("/", auth, controller.list);

/**
 * READ BY ID
 */
router.get("/:id", auth, controller.getById);

/**
 * UPDATE
 */
router.put(
    "/:id",
    auth,
    roleGuard(["ADMIN"]),
    feature("MANAGE_PRODUCTS"),
    controller.update
);

/**
 * DELETE
 */
router.delete(
    "/:id",
    auth,
    roleGuard(["ADMIN"]),
    feature("MANAGE_PRODUCTS"),
    controller.remove
);

module.exports = router;
