let continentList = document.querySelector('select'),
    searchBar = document.querySelector('.search-bar'),
    countries = document.querySelector('.countries'),
    wordmark = document.querySelector('.wordmark'),
    countryList = document.querySelector('.country-list');



searchBar.disabled = true;



function changeValue() {
    continentList.addEventListener('change', event => {
        searchBar.disabled = false;
        getData();
    })
}
changeValue();



function getData() {
    let cName, cFlag, cPopulation;
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            countryList.innerHTML = "";

            for (let i = 0; i < data.length; i++) {
                if (data[i].continents[0] === continentList.value) {
                    cName = data[i].name.common;
                    cFlag = data[i].flags.svg;
                    cCapital = data[i].capital;
                    apiPopulation = Intl.NumberFormat('en-US');
                    cPopulation = apiPopulation.format(data[i].population);

                    wordmark.style.display = "none";
                    countryList.innerHTML += `
                    <div class="country-card">
                        <img src="${cFlag}" alt="">
                        <p class="para country-name">${cName}</p>
                        <p class="para country-capital"><strong>Capital:</strong> ${cCapital}</p>
                        <p class="para country-population"><strong>Population:</strong> ${cPopulation}</p>
                    </div>
                    `;

                    // Search implementation
                    countryCard = document.querySelectorAll('.country-card')
                    searchBar.addEventListener('keyup', () => {
                        for (let j = 0; j < countryCard.length; j++) {
                            if (countryCard[j].children[1].innerText.toLowerCase().includes(searchBar.value.toLowerCase())) {
                                countryCard[j].style.display = "grid";
                                wordmark.style.display = "none"
                            }
                            else {
                                countryCard[j].style.display = "none"
                            }
                        }
                    })
                }
            }
        })
}

getData();
