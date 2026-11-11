const searchInput = document.querySelector("#searchInput");
const languageList = document.querySelector("#languageList");
const noResults = document.querySelector("#noResults");
const resultCount = document.querySelector("#resultCount");

const languages = [
  "JavaScript",
  "Java",
  "Python",
  "C++",
  "PHP",
  "Ruby",
  "TypeScript",
  "Go",
];

// Display languages
function displayLanguages(items) {
  languageList.innerHTML = "";

  items.forEach((language) => {
    const li = document.createElement("li");

    li.textContent = language;

    languageList.append(li);
  });

  // Show or hide no-results message
  if (items.length === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }

  // Display result count
  resultCount.textContent = `${items.length} language(s) found`;
}

// Search functionality
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase().trim();

  const filteredLanguages = languages.filter((language) => {
    return language.toLowerCase().includes(searchValue);
  });

  displayLanguages(filteredLanguages);
});

// Display all languages initially
displayLanguages(languages);
