export const updateStateUtil = (oldState, objectToUpdate) => {
    return {
        ...oldState,
        ...objectToUpdate
    };
};

export const checkValidity = (value, validationRules) => {
    let isValid = true;
    if (! validationRules) {
        return true;
    }
    if (validationRules.required) {
        return value.trim() !== '' && isValid;
    }
    if (validationRules.minLength) {
        return value.trim().length >= validationRules.minLength && isValid;
    }
    if (validationRules.maxLength) {
        return value.trim().length <= validationRules.maxLength && isValid;
    }
    if (validationRules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }
    if (validationRules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }
    return isValid;
};