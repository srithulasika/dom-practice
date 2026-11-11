const tabs = document.querySelector(".tabs");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

// Event delegation
tabs.addEventListener("click", (event) => {
  // Check whether the clicked element is a tab button
  if (event.target.classList.contains("tab-btn")) {
    // Get the selected tab name
    const selectedTab = event.target.dataset.tab;

    // Remove active class from all buttons
    tabButtons.forEach((button) => {
      button.classList.remove("active");
    });

    // Add active class to clicked button
    event.target.classList.add("active");

    // Hide all panels
    tabPanels.forEach((panel) => {
      panel.classList.remove("active");
    });

    // Show the selected panel
    document.querySelector(`#${selectedTab}`).classList.add("active");
  }
});
