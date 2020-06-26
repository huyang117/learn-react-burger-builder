export const updateStateUtil = (oldState, objectToUpdate) => {
    return {
        ...oldState,
        ...objectToUpdate
    };
};