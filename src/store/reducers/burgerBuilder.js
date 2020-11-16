import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

const reducer = (state = initialState, action) => {
    switch (action.types) {
        case actionsTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            };
        case actionsTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
            };
        case actionsTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: initialState.totalPrice,
                error: false
            };
        case actionsTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
}

export default reducer;