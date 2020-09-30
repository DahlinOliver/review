const form = document.querySelector('form');
const name = document.getElementById('name');
const rating = document.querySelector('#rating');
const message = document.getElementById('message');

const button = document.querySelector('button');
const div = document.querySelector('.review-content');

let cardArray = [];

form.addEventListener('submit', e => {
    e.preventDefault();
    checkInputs();


    let numError = document.querySelectorAll('.error').length;
    if (numError === 0) {
        addReview();
        form.reset();
        setNormalFor(name);
        setNormalFor(rating);
        setNormalFor(message);
    }
});


// todo: (mitt förslag) edit mode, save to localstorage, all logik kring det
// finns d i localstorage? isf rendera ut dem, vid nya cards glöm inte att lägga till i lS
// edit mode: klick på kortet? klick på en edit-ikon? tips: gör hela 
// .review-content klickbar, med EN listener, och klura ut genom e.target vad du klikcat på
// se event delegation. 2 alternativ: vid edit mode, ska formuläret fyllas i med data?
// att själva kortet blir redigerbart

function createCard(cardObj) {

    let { name, timeMsg, time, date, message, rating } = cardObj;

    let div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `<h2 id="review-name">${name}</h2>
    <h5 id="review-timemsg">${timeMsg}</h5>
    <div class="row">
        <h6 id="review-time"><i class="fas fa-clock"></i>${time}</h6>
        <h6 id="review-date"><i class="fas fa-calendar-week"></i>${date}</h6>
    </div><p id="review-message">${message}</p>
    <sl-rating readonly value="${rating}"></sl-rating>`
    cardArray.push(cardObj)
    console.log(cardArray)
    return div;
}

function checkInputs() {
    // get the values from the inputs and remove whitespaces with trim()
    const nameValue = name.value.trim();
    const ratingValue = rating.value.trim();
    const messageValue = message.value.trim();

    if (nameValue === '') {
        //add error class
        setErrorFor(name, 'Name cannot be blank');
    } else {
        // add success class
        setSuccessFor(name)
    }

    if (ratingValue === '') {
        setErrorFor(rating, 'Must choose a rating');
    } else {
        setSuccessFor(rating);
    }

    if (messageValue === '') {
        setErrorFor(message, 'Must write something');
    } else {
        setSuccessFor(message);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement; //.form-control
    const errorMsg = formControl.querySelector('p');

    // add error message inside p tag
    errorMsg.innerText = message;

    // add error class
    formControl.className = 'form-control error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    // add success class
    formControl.className = 'form-control success';
}

function setNormalFor(input) {
    const formControl = input.parentElement;

    // Goes back to normal class
    formControl.className = 'form-control';
}

function addReview() {

    div.appendChild(createCard({ name: name.value, message: message.value, date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString(), timeMsg: 'just now', rating: rating.value })).scrollIntoView();

}