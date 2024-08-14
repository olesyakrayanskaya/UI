'use strict'
document.addEventListener("DOMContentLoaded", function () {
    const popupReviewWithImages = document.querySelector(
        ".app-popup-review-with-images"
    );
    if (popupReviewWithImages) {
        const closeBtnReviewWithImages = document.querySelector(
            ".app-popup-review-with-images__close"
        );
        const body = document.querySelector(".body");

        function closePopup() {
            popupReviewWithImages.classList.remove(
                "app-popup-review-with-images_open"
            );
            body.classList.remove("oveerflow");
        }

        if (closeBtnReviewWithImages) {
            closeBtnReviewWithImages.addEventListener("click", closePopup);
            body.classList.remove("oveerflow");
        }

        popupReviewWithImages.addEventListener("click", (e) => {
            if (e.target === popupReviewWithImages) {
                popupReviewWithImages.classList.remove(
                    "app-popup-review-with-images_open"
                );
                body.classList.remove("oveerflow");
            }
        });
    }
});

// Загрузка изображений

document.addEventListener("DOMContentLoaded", function () {
    const inputImg = document.querySelector(
        ".app-popup-review-with-images__media-box-input"
    );
    const imgContainer = document.querySelector(
        ".app-popup-review-with-images__media-container"
    );

    // Загрузка изображений перетаскиванием

    const dropZone = document.querySelector(
        ".app-popup-review-with-images__media-dragzone"
    );

    if (dropZone) {
        let hoverClassName =
            "app-popup-review-with-images__media-dragzone_active";

        dropZone.addEventListener("dragenter", function (e) {
            e.preventDefault();
            dropZone.classList.add(hoverClassName);
        });

        dropZone.addEventListener("dragover", function (e) {
            e.preventDefault();
            dropZone.classList.add(hoverClassName);
        });

        dropZone.addEventListener("dragleave", function (e) {
            e.preventDefault();
            dropZone.classList.remove(hoverClassName);
        });

        // Это самое важное событие, событие, которое дает доступ к файлам
        dropZone.addEventListener("drop", function (e) {
            e.preventDefault();
            dropZone.classList.remove(hoverClassName);

            const files = Array.from(e.dataTransfer.files);
            files.forEach((file) => {
                const readerDrag = new FileReader();
                readerDrag.onload = function () {
                    let imgWrapper = document.createElement("div");
                    imgWrapper.className =
                        "app-popup-review-with-images__media-image-wrapper";
                    imgContainer.append(imgWrapper);
                    let output = document.createElement("img");
                    output.className = "app-popup-review-with-images__media-image";
                    output.style.width = "40px";
                    output.style.height = "40px";
                    output.style.borderRadius = "4px";
                    imgWrapper.append(output);
                    output.src = readerDrag.result;
                    const delImgBtn = document.createElement("button");
                    delImgBtn.className =
                        "app-popup-review-with-images__media-del-btn";
                    imgWrapper.append(delImgBtn);
                    delImgBtn.addEventListener("click", (e) => {
                        e.target
                            .closest(
                                ".app-popup-review-with-images__media-image-wrapper"
                            )
                            .remove();
                    });
                };
                readerDrag.readAsDataURL(file);
            });

            // загрузка файлов в API
            // if (files.length > 0) {
            //     const data = new FormData();
            //     for (const file of files) {
            //         data.append('file', file);
            //     }

            //     fetch('/upload', {
            //             method: 'POST',
            //             body: data
            //         })
            //         .then(() => console.log("file uploaded"))
            //         .catch(reason => console.error(reason));
            // }
        });
    }

    // Загрузка изображений нажатием на кнопку

    inputImg.addEventListener("change", (event) => {
        const files = Array.from(event.target.files);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = function () {
                let imgWrapper = document.createElement("div");
                imgWrapper.className =
                    "app-popup-review-with-images__media-image-wrapper";
                imgContainer.append(imgWrapper);
                let output = document.createElement("img");
                output.className = "app-popup-review-with-images__media-image";
                output.style.width = "40px";
                output.style.height = "40px";
                output.style.borderRadius = "4px";
                imgWrapper.append(output);
                output.src = reader.result;
                const delImgBtn = document.createElement("button");
                delImgBtn.className =
                    "app-popup-review-with-images__media-del-btn";
                imgWrapper.append(delImgBtn);
                delImgBtn.addEventListener("click", (e) => {
                    e.target
                        .closest(".app-popup-review-with-images__media-image-wrapper")
                        .remove();
                });
            };
            reader.readAsDataURL(file);
        });
    });
});
