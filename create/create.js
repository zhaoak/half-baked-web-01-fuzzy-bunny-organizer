import { createBunny, getFamilies, checkAuth, logout } from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async (e) => {
    // prevent default
    e.preventDefault();
    const bunnyData = new FormData(form);

    // get the name and family id from the form
    // use createBunny to create a bunny with this name and family id
    createBunny({ name: bunnyData.get('bunny-name'), family_id: bunnyData.get('family-id') });
    form.reset();
    location.replace('../');
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const familySelectEl = document.querySelector("select[name='family-id']");
    // go get the families from supabase
    const families = await getFamilies();
    // for each family
    for (let family of families) {
        // create an option tag
        const famOptEl = document.createElement('option');
        // set the option's value and text content
        famOptEl.textContent = family.name;
        famOptEl.value = family.id;
        // and append the option to the select
        familySelectEl.append(famOptEl);
    }
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
