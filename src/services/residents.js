import api from "../axios/api";
import { setResidents } from "../store/actions/residents";

export const getResidents = (addressId) => async (dispatch) => {
    const apiUrl = `/HousingStock/clients`;
    const params = {
        addressId
    }
    const result = await api.get(apiUrl, { params })
    dispatch(setResidents(result.data))
}

export const addResident = (data, flatId) => async (dispatch) => {
    const apiUrl = `/HousingStock/client`;
    await api.post(apiUrl, data).then((resp) => {
        if (resp.status === 200) dispatch(bindResident(resp.data.id, flatId))
    })
}

export const bindResident = (residentId, flatId) => async (dispatch) => {
    const apiUrl = `/HousingStock/bind_client`;
    await api.put(apiUrl, {
        "AddressId": flatId,
        "ClientId": residentId
    }).then((resp) => {
        if (resp.status === 200) dispatch(getResidents(flatId))
    })
}
export const changeResident = (data, flatId) => async (dispatch) => {
    const apiUrl = `/HousingStock/client`;
    await api.post(apiUrl, data).then((resp) => {
        if (resp.status === 200) {
            api.delete(`/HousingStock/bind_client/${data.BindId}`)
            dispatch(bindResident(resp.data.id, flatId))
        }
    })
}
export const deleteResident = (id, flatId) => async (dispatch) => {
    console.log(id)
    const apiUrl = `/HousingStock/bind_client/${id}`;
    await api.delete(apiUrl).then((resp) => {
        if (resp.status === 200) dispatch(getResidents(flatId))
    })
}