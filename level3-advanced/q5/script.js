const accordionButtons = document.querySelectorAll(".accordion-btn");

accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const accordionItem = button.parentElement;

    accordionItem.classList.toggle("active");
  });
});
