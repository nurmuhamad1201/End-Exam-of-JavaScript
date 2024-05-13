let api = "http://localhost:45000/api/data";

import { getData } from "./dom.js";

async function get() {
    try {
        let { data } = await axios.get(api);
        const slicedData = data.slice(0, 3);
        localStorage.setItem('apiData', JSON.stringify(slicedData)); 
        getData(slicedData);
    } catch (error) {
        console.error(error);
    }
}


export {get}