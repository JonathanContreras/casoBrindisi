export const SET_LOGIN_STATE = (state) => {
    return {
        type: "STATE_LOGIN",
        payload: state,
    };
};

export const SET_USER_INFO = (state) => {
    return {
        type: "USER_INFO",
        payload: state,
    };
};
