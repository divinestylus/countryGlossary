document.addEventListener('DOMContentLoaded', init);
function init() {
    let userImage = document.querySelectorAll('.user-image'),
        userName = document.querySelectorAll('.name'),
        userGender = document.querySelectorAll('.gender'),
        userEmail = document.querySelectorAll('.email'),
        userDOB = document.querySelectorAll('.date-of-birth'),
        userCountry = document.querySelectorAll('.country'),
        userNationality = document.querySelectorAll('.nationality'),
        generateBtn = document.querySelector('.generate-user');


    function getData() {
        fetch('https://randomuser.me/api/?results=3')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < userImage.length; i++) {
                    userImage[i].src = data.results[i].picture.large;

                    userName[i].children[0].innerText = `${data.results[i].name.first} ${data.results[i].name.last} `;

                    userGender[i].innerText = `(${data.results[i].gender})`;

                    userEmail[i].innerText = `${data.results[i].email}`;

                    const date = new Date(data.results[i].dob.date);
                    const options = { month: 'long', day: '2-digit', year: 'numeric' };
                    const formattedDate = date.toLocaleDateString('en-US', options);

                    userDOB[i].innerText = `${formattedDate}`;

                    userCountry[i].children[0].innerText = `${data.results[i].location.country}`;

                    userNationality[i].innerText = ` (${data.results[i].nat})`;
                }
            })

            .catch(error => {
                console.error(error);
            })
    }
    getData()



    setInterval(getData, 3000);
    generateBtn.addEventListener('click', getData);
}