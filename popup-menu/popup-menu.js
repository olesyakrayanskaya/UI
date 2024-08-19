'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const catalogBtn = document.querySelector('.catalog-btn');
    const catalogBtnIcon = document.querySelector('.catalog-btn__icon');

    catalogBtn.addEventListener('click', () => {
        catalogBtnIcon.classList.toggle('catalog-btn__icon_active');
    })
})