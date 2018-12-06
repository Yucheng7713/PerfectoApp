/**
 * Kiosk.js
 *
 * Tracks kiosk information
 */

module.exports = {

    attributes:{
        total_orders: {
            type: 'number',
            description: 'total number of all orders placed at a kiosk'
        },

        location: {
            type: 'string',
            description: 'Location of kiosk. Stored as regular string, can be parsed to lat/long'

        },

        ingredient1_level: {
            type: 'number',
            defaultsTo: 1,
            description: 'percentage of ingredient1 currently in kiosk'
        },

        ingredient2_level: {
            type: 'number',
            defaultsTo: 1,
            description: 'percentage of ingredient2 currently in kiosk'
        },

        ingredient3_level: {
            type: 'number',
            defaultsTo: 1,
            description: 'percentage of ingredient3 currently in kiosk'
        },

        ingredient4_level: {
            type: 'number',
            defaultsTo: 1,
            description: 'percentage of ingredient4 currently in kiosk'
        },

        ingredient5_level: {
            type: 'number',
            defaultsTo: 1,
            description: 'percentage of ingredient5 currently in kiosk'
        },
        ingredient6_level: {
            type: 'number',
            defaultsTo: 1,
            description: 'percentage of ingredient6 currently in kiosk'
        },
        ingredient7_level: {
            type: 'number',
            defaultsTo: 1,
            description: 'percentage of ingredient7 currently in kiosk'
        },
        ingredient8_level: {
            type: 'number',
            defaultsTo: 1,
            description: 'percentage of ingredient8 currently in kiosk'
        },
        ingredient9_level: {
            type: 'number',
            defaultsTo: 1,
            description: 'percentage of ingredient9 currently in kiosk'
        },
        ingredient10_level: {
            type: 'number',
            defaultsTo: 1,
            description: 'percentage of ingredient10 currently in kiosk'
        },

        ingredient1: {
            model: 'Ingredient'
        },
        ingredient2: {
            model: 'Ingredient'
        },
        ingredient3: {
            model: 'Ingredient'
        },
        ingredient4: {
            model: 'Ingredient'
        },
        ingredient5: {
            model: 'Ingredient'
        },
        ingredient6: {
            model: 'Ingredient'
        },
        ingredient7: {
            model: 'Ingredient'
        },
        ingredient8: {
            model: 'Ingredient'
        },
        ingredient9: {
            model: 'Ingredient'
        },
        ingredient10: {
            model: 'Ingredient'
        }


    }
};