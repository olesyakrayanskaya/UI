'use strict'

let accBtns = document.querySelectorAll('.accordion__btn');

accBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
})