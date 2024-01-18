import * as Actions from '../actions';

const initialState = {
    success: false,
    loading: false,
    error: null
};

const login = function (state = initialState, action) {
    switch (action.type) {
        case Actions.LOGIN_SUCCESS:
            {
                return {
                    ...initialState,
                    success: true
                };
            }
        case Actions.LOGIN_ERROR:
            {
                return {
                    success: false,
                    loading: false,
                    error: action.payload
                };
            }
            
        case Actions.USER_LOGGED_OUT:
            {
                return initialState;
            }
        case Actions.LOGIN_LOADING:
            {
                return {
                    ...state,
                    loading: action.payload
                }
            }
        default:
            {
                return state
            }
    }
};

export default login;