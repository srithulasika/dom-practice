const gallery = document.querySelector("#gallery");
const filterButtons = document.querySelectorAll(".filter-btn");

// Gallery data
const places = [
  {
    name: "Goa",
    category: "beaches",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600",
  },
  {
    name: "Maldives",
    category: "beaches",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600",
  },
  {
    name: "Bali",
    category: "beaches",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
  },
  {
    name: "Ooty",
    category: "mountains",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600",
  },
  {
    name: "Manali",
    category: "mountains",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600",
  },
  {
    name: "Munnar",
    category: "mountains",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600",
  },
];

// Display gallery cards
function displayPlaces(items) {
  gallery.innerHTML = "";

  items.forEach((place) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("img");
    image.src = place.image;
    image.alt = place.name;

    const heading = document.createElement("h3");
    heading.textContent = place.name;

    card.dataset.category = place.category;

    card.append(image, heading);
    gallery.append(card);
  });
}

// Filter buttons
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    if (category === "all") {
      displayPlaces(places);
    } else {
      const filteredPlaces = places.filter((place) => {
        return place.category === category;
      });

      displayPlaces(filteredPlaces);
    }

    // Active button styling
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
  });
});

// Display all places initially
displayPlaces(places);

// Set All button as active initially
filterButtons[0].classList.add("active");
