let countriesContainer = document.querySelector('.countries-container');
let filterByRegion = document.querySelector('.filter-by-region');
let searchInput = document.querySelector('.search-container input');
const themeChanger = document.querySelector('.theme-changer');

let allCountriesData

fetch('https://restcountries.com/v3.1/all')
.then((res) => {
    return res.json()
})
.then((data) => {
    renderCountries(data);
    allCountriesData = data;
}) // here we can use renderCountries in .then, becoz explicitly passed as argument to callback function because of chaining property.

filterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`) // we can also use e.target.value;
    .then((res) => {
        return res.json()
    })
    .then(renderCountries)// here the data is explicitly passed as argument to callback function becoz of chaining property.
})

function renderCountries(data){
    countriesContainer.innerText = '';
    data.forEach((country) => {
        //console.log(country)
        const countryCard = document.createElement('a');
        countryCard.classList.add('country-card');
        countryCard.href = `/country.html?name=${country.name.common}`
        countryCard.innerHTML = `
                    <img src="${country.flags.svg}" alt="${country.name.common} flag">
                    <div class="card-text">
                        <h3 class="card-title">${country.name.common}</h3>
                        <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p                            
                        <p><b>Region: </b>${country.region}</p>
                        <p><b>Capital: </b>${country.capital?.[0]}</p>
                    </div>
            `

        countriesContainer.append(countryCard);
    })
}

searchInput.addEventListener('input', (e) => {
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    renderCountries(filteredCountries);
})

themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // Save the dark mode preference
    const darkModeEnabled = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', darkModeEnabled ? 'enabled' : 'disabled');
});

// On page load, apply dark mode if the preference is set
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark');
    }
});