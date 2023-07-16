let continentList = document.querySelector('select'),
    searchBar = document.querySelector('.search-bar'),
    countries = document.querySelector('.countries'),
    wordmark = document.querySelector('.wordmark'),
    countryList = document.querySelector('.country-list'),
    modal = document.querySelector('.modal'),
    overlay = document.querySelector('.overlay');



searchBar.disabled = true;



function changeValue() {
    continentList.addEventListener('change', event => {
        getData();
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
                                            <p class="para country-name">${data[i].name.common}</p>
                                            <p class="para country-capital"><strong>Capital:</strong> ${data[i].capital}</p>
                                            <p class="para country-capital"><strong>Population:</strong> ${cPopulation}</p>
                                            <p class="para country-capital"><strong>Region:</strong> ${data[i].region}</p>
                                            <p class="para country-capital"><strong>Sub Region:</strong> ${data[i].subregion}</p>
                                            <p class="para country-capital"><strong>Timezone:</strong> ${data[i].timezones}</p>
                                        </div>
                                    </div>
                                    `;
                                    let cancelBtn = document.querySelector('.cancel');
                                    console.log(cancelBtn);
                                }
                            })
                        })
                    }
                }
            }
            showModal();



            // function hideModal() {
            //     cancelBtn.addEventListener('click', () => {
            //         console.log("sam")
            //         modal.style.display = "none";
            //         overlay.style.display = "none";
            //     })
            // }

            // hideModal()
        })
}

getData()

setTimeout(getData, 12000);


