/**
 * Kiosk.js
 *
 * Tracks kiosk information
 */

module.exports = {

    attributes:{
        uses: {
            type: 'number',
            description: 'number of times the recipe has been used'
        },
        name: {
            type: 'string',
            description: 'Name of the recipe. If nothing is entered by the user will be called by base recipe name'
        },

        ingredient1_level:{
            type: 'number',
            description: 'measures the level of corresponding ingredient in the recipe',
            defaultsTo: 1,
        },
        ingredient2_level:{
            type: 'number',
            description: 'measures the level of corresponding ingredient in the recipe',
            defaultsTo: 1,
        },
        ingredient3_level:{
            type: 'number',
            description: 'measures the level of corresponding ingredient in the recipe',
            defaultsTo: 1,
        },
        ingredient4_level:{
            type: 'number',
            description: 'measures the level of corresponding ingredient in the recipe',
            defaultsTo: 1,
        },
        ingredient5_level:{
            type: 'number',
            description: 'measures the level of corresponding ingredient in the recipe',
            defaultsTo: 1,
        },
        ingredient6_level:{
            type: 'number',
            description: 'measures the level of corresponding ingredient in the recipe',
            defaultsTo: 1,
        },
        ingredient7_level:{
            type: 'number',
            description: 'measures the level of corresponding ingredient in the recipe',
            defaultsTo: 1,
        },
        ingredient8_level:{
            type: 'number',
            description: 'measures the level of corresponding ingredient in the recipe',
            defaultsTo: 1,
        },
        ingredient9_level:{
            type: 'number',
            description: 'measures the level of corresponding ingredient in the recipe',
            defaultsTo: 1,
        },
        ingredient10_level:{
            type: 'number',
            description: 'measures the level of corresponding ingredient in the recipe',
            defaultsTo: 1,
        },

        ingredient1:{
            model: 'Ingredient'
        },
        ingredient2:{
            model: 'Ingredient'
        },
        ingredient3:{
            model: 'Ingredient'
        },
        ingredient4:{
            model: 'Ingredient'
        },
        ingredient5:{
            model: 'Ingredient'
        },
        ingredient6:{
            model: 'Ingredient'
        },
        ingredient7:{
            model: 'Ingredient'
        },
        ingredient8:{
            model: 'Ingredient'
        },
        ingredient9:{
            model: 'Ingredient'
        },
        ingredient10:{
            model: 'Ingredient'
        },

        users_idusers: {
            model: 'User'
        }
    }
};