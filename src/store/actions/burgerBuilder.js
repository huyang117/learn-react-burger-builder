// action creators for burger builder
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (igName) => {
    return { type: actionTypes.ADD_INGREDIENT, ingredientName: igName };
};

export const removeIngredient = (igName) => {
    return { type: actionTypes.REMOVE_INGREDIENT, ingredientName: igName };
};

export const fetchIngredientsFailed = () => {
    return { type: actionTypes.FETCH_INGREDIENTS_FAILED };
};

//synchronous - set ingredients
export const setIngredients = (ingredients) => {
    return { type: actionTypes.SET_INGREDIENTS, ingredients: ingredients };
};

//asynchronous
export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS
    };
};



