const mainImage = document.querySelector("#mainImage");
const thumbnails = document.querySelectorAll(".thumbnail");

thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
        mainImage.src = thumbnail.dataset.src;
    });
});