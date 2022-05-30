console.log(1);

let editButton = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');

editButton.addEventListener('click', function () {
  popup.classList.add('popup__opened')
}
)

let closeButton = document.querySelector('.popup__close-button')

closeButton.addEventListener('click', function () {
  popup.classList.remove('popup__opened')
})


let formName = document.querySelector('.form__name');
console.log(formName);
console.log(formName);

let formAbout = document.querySelector('.form__about');
console.log(formAbout);
console.log(formAbout);