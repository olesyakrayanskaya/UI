'use strict'
const stars = document.querySelectorAll('.popup_stars-raiting__radio');
const reytingNum = document.querySelector('.popup_stars-raiting__num');

stars.forEach((star) => {
    star.addEventListener('click', () => {
        let value = star.value;
        reytingNum.innerHTML = value;
    })
})
