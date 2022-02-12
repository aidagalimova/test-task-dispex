import api from "../axios/api";
import { setFlats, setHouses, setStreets } from "../store/actions/locations";

export default function getStreets() {
    const apiUrl = "/Request/streets";
    return (dispatch) => {
        api.get(apiUrl)
            .then((resp) => {
                dispatch(setStreets(resp.data));
            });
    }
}

export function getHouses(streetId) {
    const apiUrl = `/Request/houses/${streetId}`;
    return (dispatch) => {
        api.get(apiUrl)
            .then((resp) => {
                const houses = resp.data;
                dispatch(setHouses(houses));
            })
    }
}

export function getFlats(houseId) {
    const apiUrl = `/Request/house_flats/${houseId}`;
    return (dispatch) => {
        api.get(apiUrl)
            .then((resp) => {
                const flats = resp.data.filter((flat) => flat.typeName !== 'Подъезд' && flat.typeName !== 'Дом');
                dispatch(setFlats(flats));
            })
    }
}