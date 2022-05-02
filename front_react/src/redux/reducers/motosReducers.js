const initialProps = {
    motos: [],
};

export default function (state = initialProps, action) {
    switch (action.type) {
        case "SET_MOTOS":
            return {
                ...state,
                motos: action.payload,
            };
        // case "USER_INFO":
        //     return {
        //         ...state,
        //         user: action.payload,
        //     };
        default:
            return state;
    }
}
