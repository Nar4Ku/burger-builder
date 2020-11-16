import * as actionsType from './actionsTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionsType.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionsType.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionsType.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionsType.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data));
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed());
            });
    };
};
