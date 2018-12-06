/**
 * Kiosk.js
 *
 * Tracks kiosk information
 */

module.exports = {

    attributes:{
        orderscost: {
            type: 'number',
            description: 'cost of the order'
        },

        time: {
            type: 'ref',
            columnType: "datetime",
            description: "timestamp of the order being placed",
        },

        gift_order: {
            type: 'boolean',
            description: 'was this placed as a gift order?',
        },

        redeemed: {
            type: 'boolean',
            description: 'Has the order been placed and processed yet? this will always be set to true for a regular order,' +
                'however for gift orders this can be set as false, then a code can be generated referencing this order and if not redeemed it can be by' +
                'the gift recipient. '
        },

        recipes_idrecipes: {
            model: 'recipe',
            description: "referenced the recipe the order was placed under"
        },

        users_idusers1: {
            model: 'user',
            description: 'reference the user who purchased this order'
        }
    }
};