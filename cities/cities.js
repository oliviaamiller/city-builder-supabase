import { 
    checkAuth, 
    logout,
    fetchCity,
    createDefaultCity,
    updateName,
    updateSlogans,
    updateWaterfront,
    updateCastle,
    updateSkyline,
        
} from '../fetch-utils.js';

checkAuth();

const nameFormEl = document.querySelector('.name-form');
const sloganFormEl = document.querySelector('.slogan-form');
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

    // go get the name from the form
    const data = new FormData(nameFormEl);

    const nameInput = data.get('name-input');

    // fresh fetch
    const newName = await updateName(nameInput);

    // display name
    displayCity(newName); 
});


sloganFormEl.addEventListener('submit', async(e) => {
    e.preventDefault();

    // go get the slogan from the form 
    const data = new FormData(sloganFormEl);

    const sloganInput = data.get('slogan-input');

    // get the old city and it's existing slogans from supabase
    const city = await fetchCity();

    // push the new slogan into the array of existing slogans
    city.slogans.push(sloganInput);

    const newSlogan = await updateSlogans(city.slogans);

    displayCity(newSlogan);
});

waterfrontDropdownEl.addEventListener('change', async() => {
    //when dropdown value is selected, update that value in supabase and refresh the display

    const newWaterfront = await updateWaterfront(waterfrontDropdownEl.value);

    displayCity(newWaterfront);
});

skylineDropdownEl.addEventListener('change', async() => {
    //when dropdown value is selected, update that value in supabase and refresh the display

    const newSkyline = await updateSkyline(skylineDropdownEl.value);

    displayCity(newSkyline);
});

castleDropdownEl.addEventListener('change', async() => {
    //when dropdown value is selected, update that value in supabase and refresh the display

    const newCastle = await updateCastle(castleDropdownEl.value);

    displayCity(newCastle);
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
