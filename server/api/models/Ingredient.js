/**
 * Ingredient.js
 *
 * Tracks ingredients that will be referenced by other tables
 */

module.exports = {

    attributes:{
        ingredient:{
            type: 'string',
            required: false,
            description: 'Ingredient that could be referenced by an order or kiosk'
        },
        calories:{
            type: 'number',
            required: false,
            description: 'Number of calories in that ingredient'
        }
    }
};