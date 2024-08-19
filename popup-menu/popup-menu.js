'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const catalogBtn = document.querySelector('.catalog-btn');
    const catalogBtnIcon = document.querySelector('.catalog-btn__icon');
    const catalog = document.querySelector('.catalog');

    catalogBtn.addEventListener('click', () => {
        catalogBtnIcon.classList.toggle('catalog-btn__icon_active');
        catalog.classList.toggle('catalog_active');
    })

    const categories = document.querySelectorAll('.catalog__category-link');
    const subCategories = document.querySelectorAll('.catalog__subcategories');
    const backBtn = document.querySelector('.catalog__back-btn');

    categories.forEach((category) => {
        if (window.matchMedia('(any-pointer: fine)').matches) {
            category.addEventListener('mouseover', (e) => {
                e.preventDefault();
                subCategories.forEach((subcategory) => {
                    subcategory.style.visibility = 'hidden';
                })
                category.nextElementSibling.style.visibility = 'visible';
                if (window.innerWidth < 600) {
                    category.closest('.catalog__categories').classList.add('hidden-left');
                    backBtn.style.display = 'flex';
                    category.nextElementSibling.classList.add('visible-left');
                    backBtn.addEventListener('click', () => {
                        category.closest('.catalog__categories').classList.remove('hidden-left');
                        category.nextElementSibling.classList.remove('visible-left');
                        category.nextElementSibling.style.visibility = 'hidden';
                        backBtn.style.display = 'none';
                    })
                }
            })
        } else {
            category.addEventListener('click', (e) => {
                e.preventDefault();
                subCategories.forEach((subcategory) => {
                    subcategory.style.visibility = 'hidden';
                })
                category.nextElementSibling.style.visibility = 'visible';
                if (window.innerWidth < 600) {
                    category.closest('.catalog__categories').classList.add('hidden-left');
                    backBtn.style.display = 'flex';
                    category.nextElementSibling.classList.add('visible-left');
                    backBtn.addEventListener('click', () => {
                        category.closest('.catalog__categories').classList.remove('hidden-left');
                        category.nextElementSibling.classList.remove('visible-left');
                        category.nextElementSibling.style.visibility = 'hidden';
                        backBtn.style.display = 'none';
                    })
                }
            })
        }
    })

})