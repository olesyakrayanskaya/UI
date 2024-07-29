'use strict'

const burgerBtn = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const body = document.querySelector('.body');
const navItems = document.querySelectorAll('.nav__item');

burgerBtn.addEventListener('click', (e) => {
    burgerBtn.classList.toggle('burger_active');
    nav.classList.toggle('nav_active');
    body.classList.toggle('noscroll');
})

navItems.forEach((item) => {
    item.addEventListener('click', () => {
        burgerBtn.classList.remove('burger_active');
        nav.classList.remove('nav_active');
        body.classList.remove('noscroll');
    })
})