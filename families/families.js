import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

// also fetches from db
async function displayFamilies() {
    // fetch families from supabase
    const families = await getFamilies();
    // clear out the familiesEl
    familiesEl.innerHTML = '';
    // loop through each family and for each family:
    for (let family of families) {
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        const familyEl = document.createElement('div');
        const nameEl = document.createElement('h3');
        const bunniesEl = document.createElement('div');
        // your HTML Element should look like this:
        // <div class="family">
        //    <h3>the Garcia family</h3>
        //    <div class="bunnies">
        //        <div class="bunny">Fluffy</div>
        //        <div class="bunny">Bob</div>
        //    </div>
        // </div>
        // add the bunnies css class to the bunnies el, and family css class to the family el
        familyEl.classList.add('family');
        bunniesEl.classList.add('bunnies');
        // put the family name in the name element
        familyEl.textContent = family.name;
        // for each of this family's bunnies
        for (let bunny of family.fuzzy_bunnies) {
            //    make an element with the css class 'bunny', and put the bunny's name in the text content
            const bunnyEl = document.createElement('div');
            bunnyEl.classList.add('bunny');
            bunnyEl.textContent = bunny.name;
            //    add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
            bunnyEl.addEventListener('click', async () => {
                await deleteBunny(bunny.id);
                await displayFamilies();
            });
            // append this bunnyEl to the bunniesEl
            bunniesEl.append(bunnyEl);
        }
        // append the bunniesEl and nameEl to the familyEl
        familyEl.append(nameEl, bunniesEl);
        // append the familyEl to the familiesEl
        familiesEl.append(familyEl);
    }
}

window.addEventListener('load', async () => {
    const families = await getFamilies();

    displayFamilies(families);
});
