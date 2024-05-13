let api = "http://localhost:45000/api/data";

import { get } from "./dom.js";

export async function data() {
    try {
        const { data } = await axios.get(api);
        saveToLocalStorage(data);
        get(data);
    } catch (error) {
        console.error(error);
    }
}

async function searchUser(id) {
    try {
        const { data } = await axios.get(`${api}?q=${id}`);
        saveToLocalStorage(data);
        get(data);
    } catch (error) {
        console.error(error);
    }
}


async function rangeinp() {
    try {
        const { data } = await axios.get(api);
        const rangeValue = document.querySelector(".range").value;
        const filteredData = data.filter((e) => e.fields.price >= rangeValue);
        saveToLocalStorage(filteredData);
        get(filteredData);
    } catch (error) {
        console.error(error);
    }
}

function saveToLocalStorage(data) {
    localStorage.setItem('apiData', JSON.stringify(data));
}

export { searchUser, rangeinp };
