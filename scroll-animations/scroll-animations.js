'use strict'

document.addEventListener('DOMContentLoaded', function () {

    const scrollUp = document.querySelector('.scrull-up');

    window.addEventListener('scroll', function () {
        if (window.scrollY >= 200) {
            scrollUp.style.display = 'flex';
        } else {
            scrollUp.style.display = 'none';
        }
    });

    scrollUp.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animation-square');
                return;
            }
            entry.target.classList.remove('animation-square');
        });
    });
    observer.observe(document.querySelector('.animated-block'));
});