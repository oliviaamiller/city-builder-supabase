import { checkAuth, logout } from '../fetch-utils.js';

const nameInputEl = document.getElementById('name-input');
const nameButtonEl = document.getElementById('name-button');
const sloganInputEl = document.getElementById('slogan-input');
const sloganButtonEl = document.getElementById('slogan-button');
const waterfrontDropdownEl = document.getElementById('waterfront-dropdown');
const skylineDropdownEl = document.getElementById('skyline-dropdown');
const castleDropdownEl = document.getElementById('castle-dropdown');
const nameOutputEl = document.getElementById('name-output');
const sloganOutputEl = document.getElementById('slogan-output');

console.log(nameInputEl, nameButtonEl, sloganInputEl, sloganButtonEl, waterfrontDropdownEl, skylineDropdownEl, castleDropdownEl, nameOutputEl, sloganOutputEl);






checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});
