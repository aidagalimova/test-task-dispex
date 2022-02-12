const initState = {
    streets: [],
    houses: [],
    flats: [],
    selectedStreet: null,
    selectedHouse: null,
    selectedFlat: null
}
export default function locationsReducer(state = initState, action) {
    switch (action.type) {
        case "SET_STREETS":
            return {
                ...state,
                streets: action.payload.streets
            }

        case "SET_HOUSES":
            return {
                ...state,
                houses: action.payload.houses
            }
        case "SET_FLATS":
            return {
                ...state,
                flats: action.payload.flats
            }
        case "SET_STREET":
            return {
                ...state,
                selectedStreet: action.payload.street
            }

        case "SET_HOUSE":
            return {
                ...state,
                selectedHouse: action.payload.house
            }
        case "SET_FLAT":
            return {
                ...state,
                selectedFlat: action.payload.flat
            }
        default:
            return state;
    }
}
