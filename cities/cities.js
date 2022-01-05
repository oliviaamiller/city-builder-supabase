import { 
    checkAuth, 
    logout,
    fetchCity,
    createDefaultCity,
        
} from '../fetch-utils.js';

checkAuth();

const nameInputEl = document.getElementById('name-input');
const nameButtonEl = document.getElementById('name-button');
const sloganInputEl = document.getElementById('slogan-input');
const sloganButtonEl = document.getElementById('slogan-button');
const waterfrontDropdownEl = document.getElementById('waterfront-dropdown');
const skylineDropdownEl = document.getElementById('skyline-dropdown');
const castleDropdownEl = document.getElementById('castle-dropdown');
const nameOutputEl = document.getElementById('name-output');
const sloganOutputEl = document.getElementById('slogan-output');
const waterfrontImgEl = document.getElementById('waterfront-img');
const skylineImgEl = document.getElementById('skyline-img');
const castleImgEl = document.getElementById('castle-img');


window.addEventListener('load', async() => {

    const city = await fetchCity();
    //check to see if this user has a city already (try to fetch it from supabase--if it's null, create a new one and load that)
    //if they do, display that city
    //if they do not have a city create a new, default city for them and display it
    if (!city) {
        const defaultCity = await createDefaultCity();
        displayCity(defaultCity);

    } else {
        displayCity(city);
    }
});




function displayCity(city) {

    // change text content of city name output to the city name
    nameOutputEl.textContent = city.name;

    // change the image src for the waterfront img
    waterfrontImgEl.src = `../assets/waterfront-${city.waterfront_id}.png`;

    // change the image src for the skyline img
    skylineImgEl.src = `.../assets/skyline-${city.skyline_id}.png`;

    // change the image src for the castle img
    castleImgEl.src = `.../assets/castle-${city.castle_id}.png`;

    // loop through slogans and render and append each slogan to the slogan div





}


const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});
