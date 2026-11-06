// Casa Toscana — vanilla JavaScript interactions

// 1. MENU SEARCH + CATEGORY FILTER
const searchInput = document.querySelector("#menuSearch");
const filterButtons = document.querySelectorAll(".filter-button");
const menuCards = document.querySelectorAll(".menu-card");
const emptyMessage = document.querySelector("#emptyMessage");

let selectedCategory = "all";

function filterMenu() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  menuCards.forEach((card) => {
    const cardCategory = card.dataset.category;
    const searchableText = card.dataset.search.toLowerCase();
    const matchesCategory =
      selectedCategory === "all" || cardCategory === selectedCategory;
    const matchesSearch = searchableText.includes(searchTerm);
    const shouldShow = matchesCategory && matchesSearch;

    card.hidden = !shouldShow;
    if (shouldShow) visibleCount++;
  });

  emptyMessage.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterMenu);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    filterMenu();
  });
});

// 2. FAVOURITES — a Set keeps each selected dish only once.
const favourites = new Set();
const favouriteCount = document.querySelector("#favouriteCount");

document.querySelectorAll(".favourite-button").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".menu-card");
    const dishName = card.querySelector("h3").textContent;

    if (favourites.has(dishName)) {
      favourites.delete(dishName);
      button.classList.remove("is-favourite");
      button.setAttribute("aria-pressed", "false");
      button.innerHTML = '♡ <span>Add to favourites</span>';
    } else {
      favourites.add(dishName);
      button.classList.add("is-favourite");
      button.setAttribute("aria-pressed", "true");
      button.innerHTML = '♥ <span>Added to favourites</span>';
    }

    favouriteCount.textContent = favourites.size;
  });
});

// 3. CONTACT FORM VALIDATION
const contactForm = document.querySelector("#contactForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const formFeedback = document.querySelector("#formFeedback");

function showError(input, errorId, message) {
  document.querySelector(`#${errorId}`).textContent = message;
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Validation condition 1: name must be at least 2 characters long.
  const nameError = name.length < 2
    ? "Please enter a name with at least 2 characters."
    : "";

  // Validation condition 2: email must have a valid basic format.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailError = !emailPattern.test(email)
    ? "Please enter a valid email address."
    : "";

  // Additional check: message must contain at least 10 characters.
  const messageError = message.length < 10
    ? "Please write a message with at least 10 characters."
    : "";

  showError(nameInput, "nameError", nameError);
  showError(emailInput, "emailError", emailError);
  showError(messageInput, "messageError", messageError);

  if (nameError || emailError || messageError) {
    formFeedback.textContent = "Please correct the highlighted fields.";
    formFeedback.style.color = "#a33e32";
    return;
  }

  formFeedback.textContent = `Thank you, ${name}! Your demo message passed validation.`;
  formFeedback.style.color = "#263b30";
  contactForm.reset();
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.setAttribute("aria-invalid", "false");
  });
});

// 4. MOBILE NAVIGATION
const navToggle = document.querySelector("#navToggle");
const mainNav = document.querySelector("#mainNav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});
