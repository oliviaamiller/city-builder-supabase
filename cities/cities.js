import { 
    checkAuth, 
    logout,
    fetchCity,
    createDefaultCity,
        
} from '../fetch-utils.js';

checkAuth();

const nameFormEl = document.querySelector('.name-input');
const sloganFormEl = document.querySelector('.slogan-input');
const waterfrontDropdownEl = document.querySelector('#waterfront-dropdown');
const skylineDropdownEl = document.querySelector('#skyline-dropdown');
const castleDropdownEl = document.querySelector('#castle-dropdown');
const nameOutputEl = document.querySelector('#name-output');
const sloganOutputEl = document.querySelector('#slogan-output');
const waterfrontImgEl = document.querySelector('#waterfront-img');
const skylineImgEl = document.querySelector('#skyline-img');
const castleImgEl = document.querySelector('#castle-img');


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


nameFormEl.addEventListener('submit', async(e) => {
    e.preventDefault();

    // update the name column for this city in the database

    // fresh fetch

    // display name 




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

    // loop through slogans and render and append each slogan to the slogan div and clear the dom
    sloganOutputEl.textContent = '';

    for (let slogan of city.slogans) {
        const sloganEl = document.createElement('p');

        sloganEl.classList.add('slogan');

        sloganEl.textContent = slogan;

        sloganOutputEl.append(sloganEl);
    }

}


const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});
