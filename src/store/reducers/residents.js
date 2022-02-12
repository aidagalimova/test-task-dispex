const initState = {
    residents: [],
}
export default function residentsReducer(state = initState, action) {
    switch (action.type) {
        case "SET_RESIDENTS":
            return {
                ...state,
                residents: action.payload.residents
            }
        default:
            return state;
    }
}
