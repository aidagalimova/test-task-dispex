import axios from 'axios';

export default axios.create({
    baseURL: 'https://dispex.org/api/vtest',
    headers: { "accept": "*/*" }
});