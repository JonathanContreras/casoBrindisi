const initialProps = {
    login: false,
    user: {},
};

export default function (state = initialProps, action) {
    switch (action.type) {
        case "STATE_LOGIN":
            return {
                ...state,
                login: action.payload,
            };
        case "USER_INFO":
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
}
