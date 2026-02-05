module.exports = {
    INTERNAL_APP: {
        allowedRoles: ["ADMIN"],
        features: {
            MANAGE_PRODUCTS: true,
            VIEW_ALL_ORDERS: true
        }
    },

    CUSTOMER_APP: {
        allowedRoles: ["CUSTOMER"],
        features: {
            PLACE_ORDER: true,
            VIEW_OWN_ORDERS: true
        }
    }
};
