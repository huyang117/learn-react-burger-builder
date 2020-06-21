import * as actionTypes from '../actions/actionTypes';
import { updateStateUtil } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const addIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName]+1 };
            const ingredientsAfterAdd = updateStateUtil(state.ingredients, addIngredient);
            return updateStateUtil(state, {
                ingredients: ingredientsAfterAdd,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            });
        case actionTypes.REMOVE_INGREDIENT:
            const removeIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName]-1 };
            const ingredientsAfterRemove = updateStateUtil(state.ingredients, removeIngredient);
            return updateStateUtil(state, {
                ingredients: ingredientsAfterRemove,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            });
        case actionTypes.SET_INGREDIENTS:
            return updateStateUtil(state, { 
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false
             });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateStateUtil(state, { error: true })
        default:
            return state;
    }
}

export default reducer;