const form = document.querySelector("#reg");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password");
const successMsg = document.querySelector("#success");
const passwordStrength = document.querySelector("#password-strength");

// Show error messages
function showError(input, message) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.textContent = message;
}

// Email validation
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Phone validation
function isValidPhone(value) {
  return /^\d{10}$/.test(value);
}

// Password validation
function isValidPassword(value) {
  return value.length >= 8;
}

// Main validation function
function validate() {
  let isValid = true;

  // Name validation
  if (nameInput.value.trim().length < 3) {
    showError(nameInput, "Name needs at least 3 letters");
    isValid = false;
  } else {
    showError(nameInput, "");
  }

  // Email validation
  if (!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, "Enter a valid email");
    isValid = false;
  } else {
    showError(emailInput, "");
  }

  // Phone validation
  if (!isValidPhone(phoneInput.value.trim())) {
    showError(phoneInput, "Enter a 10-digit mobile number");
    isValid = false;
  } else {
    showError(phoneInput, "");
  }

  // Password validation
  if (!isValidPassword(passwordInput.value)) {
    showError(passwordInput, "Password needs at least 8 characters");
    isValid = false;
  } else {
    showError(passwordInput, "");
  }

  return isValid;
}

// Password strength checker
function checkPasswordStrength(value) {
  if (value.length === 0) {
    passwordStrength.textContent = "";
    passwordStrength.style.color = "";
  } else if (value.length < 8) {
    passwordStrength.textContent = "Weak";
    passwordStrength.style.color = "red";
  } else {
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);

    if (hasUppercase && hasLowercase && hasNumber && hasSpecial) {
      passwordStrength.textContent = "Strong";
      passwordStrength.style.color = "green";
    } else {
      passwordStrength.textContent = "Medium";
      passwordStrength.style.color = "orange";
    }
  }
}

// Name real-time validation
nameInput.addEventListener("input", () => {
  if (nameInput.value.trim().length < 3) {
    showError(nameInput, "Name needs at least 3 letters");
  } else {
    showError(nameInput, "");
  }
  successMsg.textContent = "";
});

// Email real-time validation
emailInput.addEventListener("input", () => {
  if (!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, "Enter a valid email");
  } else {
    showError(emailInput, "");
  }
  successMsg.textContent = "";
});

// Phone real-time validation
phoneInput.addEventListener("input", () => {
  if (!isValidPhone(phoneInput.value.trim())) {
    showError(phoneInput, "Enter a 10-digit mobile number");
  } else {
    showError(phoneInput, "");
  }
  successMsg.textContent = "";
});

// Password real-time validation
passwordInput.addEventListener("input", () => {
  if (!isValidPassword(passwordInput.value)) {
    showError(passwordInput, "Password needs at least 8 characters");
  } else {
    showError(passwordInput, "");
  }

  checkPasswordStrength(passwordInput.value);
  successMsg.textContent = "";
});

// Form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validate()) {
    successMsg.textContent = `Registration successful, ${nameInput.value.trim()}!`;

    form.reset();
    passwordStrength.textContent = "";
    passwordStrength.style.color = "";
  } else {
    successMsg.textContent = "";
  }
});
