require('file-loader?name=google-maps/maps.html!./maps.html');
const  axios = require('axios');
import { GOOGLE_API_KEY } from "../constants";

const mapsForm = document.querySelector('form')!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

function searchAddressHandler(e: Event): void {
    e.preventDefault();
    const enteredAddress = addressInput.value;

    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
        .then((res: any) => console.log("The map response", res))
}

mapsForm.addEventListener('submit', searchAddressHandler);
