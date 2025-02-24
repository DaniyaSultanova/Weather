import conditions from './conditions.js';

const keyApi = '6da4caa437cc4e1a999223632252402';

const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#input');

function removeCard() {
    const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
    const html = `<div class="card">${errorMessage}</div>`;
    header.insertAdjacentHTML('afterend', html);
}

form.onsubmit = function (e) {
    e.preventDefault();
    let city = input.value.trim();
    const url = `http://api.weatherapi.com/v1/current.json?key=${keyApi}&q=${city}`;

    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {

        if (data.error) {
            removeCard();
            showError(data.error.message);
        } else {
            removeCard();
            const info = conditions.find((obj) => obj.code === data.current.condition.code);

            const condition = data.current.is_day ? info.languages[23]['day_text'] : info.languages[23]['night_text']
            const html = `<div class="card">
                        <h2 class="card-city">${data.location.name}<span>${data.location.country}</span></h2>
                        <div class="card-weather">
                            <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
                            <img class="card-img" src="${data.current.condition.icon}" alt="weather"></img>
                        </div>
                        <div class="card-desc">${condition}</div>
                        </div>`;

            header.insertAdjacentHTML('afterend', html);
        }
    })
}
