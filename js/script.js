let continentList = document.querySelector('select'),
    searchBar = document.querySelector('.search-bar'),
    countries = document.querySelector('.countries'),
    wordmark = document.querySelector('.wordmark'),
    searchDropdown = document.querySelector('.search-dropdown');
countryList = document.querySelector('.country-list'),
    modal = document.querySelector('.modal'),
    overlay = document.querySelector('.overlay'),
    themeBtn = document.querySelector('.theme-toggler'),
    themeBtnText = document.querySelector('.theme-name'),
    themeIcon = document.querySelector('.theme-toggler i');



searchBar.disabled = true;



function changeValue() {
    continentList.addEventListener('change', event => {
        getData();
        searchBar.value = "";
    })
}
changeValue();



function getData() {
    let cName, cFlag, cPopulation, cCapital, countryCard;
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            countryList.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].continents[0] === continentList.value) {
                    cName = data[i].name.common;
                    cFlag = data[i].flags.svg;
                    cCapital = data[i].capital;
                    cPopulation = Intl.NumberFormat('en-US');
                    cPopulation = cPopulation.format(data[i].population);

                    wordmark.style.display = "none";
                    countryList.innerHTML += `
                    <div class="country-card">
                        <img src="${cFlag}" alt="">
                        <p class="para country-name">${cName}</p>
                        <p class="para country-capital"><strong>Capital:</strong> ${cCapital}</p>
                        <p class="para country-population"><strong>Population:</strong> ${cPopulation}</p>
                    </div>
                    `;

                    searchBar.disabled = false;

                    // Search implementation
                    countryCard = document.querySelectorAll('.country-card');

                    searchBar.addEventListener('keyup', () => {
                        for (let j = 0; j < countryCard.length; j++) {
                            if (countryCard[j].children[1].innerText.toLowerCase().includes(searchBar.value.toLowerCase())) {
                                countryCard[j].style.display = "grid";
                            }
                            else {
                                countryCard[j].style.display = "none"
                            }
                        }
                    })
                }
            }



            function showModal() {
                for (let i = 0; i < data.length; i++) {

                    if (data[i].continents[0] === continentList.value) {
                        countryCard.forEach((country) => {
                            country.addEventListener('click', () => {
                                if (country.children[1].innerText.toLowerCase() === data[i].name.common.toLowerCase()) {
                                    modal.style.display = "block";
                                    overlay.style.display = "block";
                                    let cPopulation = Intl.NumberFormat('en-US');
                                    cPopulation = cPopulation.format(data[i].population);
                                    modal.innerHTML = `
                                    <div class="cancel">
                                        <i class="fa-solid fa-xmark cancel-btn"></i>
                                    </div>
        
                                    <div class = "modal-body"> 
                                        <img src="${data[i].flags.svg}" alt="Country Flag" class="flag">
                                        <div>
                                            <p class="modal-name">${data[i].name.common}</p>
                                            <p class="modal-capital"><strong>Capital:</strong> ${data[i].capital}</p>
                                            <p class="modal-population"><strong>Population:</strong> ${cPopulation}</p>
                                            <p class="modal-region"><strong>Region:</strong> ${data[i].region}</p>
                                            <p class="modal-subregion"><strong>Sub Region:</strong> ${data[i].subregion}</p>
                                            <p class="modal-timezone"><strong>Timezone:</strong> ${data[i].timezones[0]}</p>
                                        </div>
                                    </div>
                                    `;
                                    hideModal(document.querySelector('.cancel'));
                                }
                            })
                        })
                    }

                }
            }
            showModal();



            function hideModal(cancel) {
                cancel.addEventListener('click', () => {
                    modal.style.display = "none";
                    overlay.style.display = "none";
                })
            }
        })
}

setTimeout(getData, 12000);




function switchTheme() {
    themeIcon.classList.toggle('fa-moon');
    document.body.classList.toggle('light-body-theme');
    searchBar.classList.toggle('light-form-theme');
    continentList.classList.toggle('light-form-theme');
    searchDropdown.classList.toggle('light-search-select-bg');
    if (themeBtnText.innerText === 'Light mode') {
        themeBtnText.innerText = 'Dark mode';
    } else {
        themeBtnText.innerText = 'Light mode';
    }
}

themeBtn.addEventListener('click', switchTheme);