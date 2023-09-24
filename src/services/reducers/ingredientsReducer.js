export const initialState = {
    total: 0
};

export const ingredientsReducer = (state, action) => {
    switch (action.type) {
        case 'add_bun':
            return {
                ...state,
                total: state.total + (action.payload.price * 2)
            };
        case 'add_ingredient':
            return {
                ...state,
                total: state.total + action.payload.price
            };
        case 'remove_bun':
            return {
                ...state,
                total: state.total - (action.payload.price * 2)
            };
        case 'remove_ingredient':
            return {
                ...state,
                total: state.total - action.payload.price
            };
        default:
            return state
    }
};