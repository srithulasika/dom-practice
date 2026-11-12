// SELECT HTML ELEMENTS
const form = document.querySelector("#applicationForm");

const errorSummary = document.querySelector("#errorSummary");
const errorList = document.querySelector("#errorList");

const successMessage = document.querySelector("#successMessage");

const draftStatus = document.querySelector("#draftStatus");
const clearDraftButton = document.querySelector("#clearDraft");

const STORAGE_KEY = "jobApplicationDraft";



//  GET ALL FORM ELEMENTS


const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const dob = document.querySelector("#dob");
const address = document.querySelector("#address");

const qualification = document.querySelector("#qualification");
const college = document.querySelector("#college");
const graduationYear = document.querySelector("#graduationYear");
const percentage = document.querySelector("#percentage");

const position = document.querySelector("#position");
const experience = document.querySelector("#experience");
const coverLetter = document.querySelector("#coverLetter");

const declaration = document.querySelector("#declaration");

const skills = document.querySelectorAll(
    'input[name="skills"]'
);



//  ERROR MESSAGE FUNCTION


function showError(input, message) {

    const errorElement = document.querySelector(
        `#${input.id}-error`
    );

    errorElement.textContent = message;

    if (input.type !== "checkbox") {
        input.classList.add("invalid");
        input.setAttribute("aria-invalid", "true");
    }
}



//  CLEAR ERROR FUNCTION


function clearError(input) {

    if (!input.id) {
        return;
    }

    const errorElement = document.querySelector(
        `#${input.id}-error`
    );

    if (errorElement) {
        errorElement.textContent = "";
    }

    if (input.type !== "checkbox") {
        input.classList.remove("invalid");
        input.removeAttribute("aria-invalid");
    }
}



// CLEAR ALL ERRORS


function clearAllErrors() {

    const inputs = form.querySelectorAll(
        "input, select, textarea"
    );

    inputs.forEach(input => {
        clearError(input);
    });

    errorSummary.hidden = true;
    errorList.innerHTML = "";
}



//  VALIDATION FUNCTION


function validateForm() {

    clearAllErrors();

    let errors = [];

    // PERSONAL DETAILS

    if (fullName.value.trim().length < 3) {

        const message = "Full name must contain at least 3 characters.";

        showError(fullName, message);
        errors.push({ input: fullName, message });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {

        const message = "Please enter a valid email address.";

        showError(email, message);
        errors.push({ input: email, message });
    }

    const phonePattern = /^[6-9]\d{9}$/;

    if (!phonePattern.test(phone.value.trim())) {

        const message = "Enter a valid 10-digit Indian mobile number.";

        showError(phone, message);
        errors.push({ input: phone, message });
    }

    if (!dob.value) {

        const message = "Please select your date of birth.";

        showError(dob, message);
        errors.push({ input: dob, message });

    } else {

        const selectedDate = new Date(dob.value + "T00:00:00");
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate >= today) {

            const message = "Date of birth must be in the past.";

            showError(dob, message);
            errors.push({ input: dob, message });
        }
    }

    if (address.value.trim().length < 10) {

        const message = "Address must contain at least 10 characters.";

        showError(address, message);
        errors.push({ input: address, message });
    }


    // EDUCATION DETAILS

    if (!qualification.value) {

        const message = "Please select your qualification.";

        showError(qualification, message);
        errors.push({ input: qualification, message });
    }

    if (college.value.trim().length < 3) {

        const message = "Please enter a valid college name.";

        showError(college, message);
        errors.push({ input: college, message });
    }

    if (!graduationYear.value) {

        const message = "Please select your graduation year.";

        showError(graduationYear, message);
        errors.push({ input: graduationYear, message });
    }

    const score = Number(percentage.value);

    if (
        percentage.value.trim() === "" ||
        !Number.isFinite(score) ||
        score < 0 ||
        score > 100
    ) {

        const message = "Enter a valid percentage or CGPA between 0 and 100.";

        showError(percentage, message);
        errors.push({ input: percentage, message });
    }


    // SKILLS VALIDATION

    const selectedSkills = Array.from(skills).filter(
        skill => skill.checked
    );

    if (selectedSkills.length < 2) {

        const message = "Please select at least two technical skills.";

        const skillsError = document.querySelector("#skills-error");

        skillsError.textContent = message;

        errors.push({
            input: skills[0],
            message,
            element: skillsError
        });
    }


    // JOB PREFERENCES

    if (!position.value) {

        const message = "Please select the position you are applying for.";

        showError(position, message);
        errors.push({ input: position, message });
    }

    if (!experience.value) {

        const message = "Please select your experience level.";

        showError(experience, message);
        errors.push({ input: experience, message });
    }

    if (coverLetter.value.trim().length < 30) {

        const message = "Cover letter must contain at least 30 characters.";

        showError(coverLetter, message);
        errors.push({ input: coverLetter, message });
    }


    // DECLARATION

    if (!declaration.checked) {

        const message = "Please accept the declaration.";

        const declarationError = document.querySelector(
            "#declaration-error"
        );

        declarationError.textContent = message;

        errors.push({
            input: declaration,
            message,
            element: declarationError
        });
    }


    // RETURN ALL ERRORS

    return errors;
}



//  DISPLAY ERROR SUMMARY


function displayErrors(errors) {

    errorList.innerHTML = "";

    errors.forEach(error => {

        const li = document.createElement("li");

        li.textContent = error.message;

        errorList.appendChild(li);
    });

    if (errors.length > 0) {

        errorSummary.hidden = false;

        errorSummary.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        errors[0].input.focus({
            preventScroll: true
        });
    }
}



//  FORM SUBMISSION


form.addEventListener("submit", function(event) {

    event.preventDefault();

    const errors = validateForm();

    if (errors.length > 0) {

        displayErrors(errors);

        successMessage.hidden = true;

        return;
    }

    // Get selected skills

    const selectedSkills = Array.from(skills)
        .filter(skill => skill.checked)
        .map(skill => skill.value);

    // Application data

    const applicationData = {

        personalDetails: {
            fullName: fullName.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim(),
            dob: dob.value,
            address: address.value.trim()
        },

        educationDetails: {
            qualification: qualification.value,
            college: college.value.trim(),
            graduationYear: graduationYear.value,
            percentage: percentage.value
        },

        skills: selectedSkills,

        jobPreferences: {
            position: position.value,
            experience: experience.value,
            coverLetter: coverLetter.value.trim()
        }

    };

    console.log("Application Submitted:", applicationData);

    // Remove saved draft

    localStorage.removeItem(STORAGE_KEY);

    // Hide form and show success

    form.hidden = true;

    errorSummary.hidden = true;

    successMessage.hidden = false;

    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});



//  GET FORM DATA FOR DRAFT


function getFormData() {

    const formData = {};

    const inputs = form.querySelectorAll(
        "input, select, textarea"
    );

    inputs.forEach(input => {

        if (input.type === "checkbox") {

            if (input.name === "skills") {

                if (!formData.skills) {
                    formData.skills = [];
                }

                if (input.checked) {
                    formData.skills.push(input.value);
                }

            } else {

                formData[input.name] = input.checked;
            }

        } else {

            formData[input.name] = input.value;
        }

    });

    return formData;
}



//  SAVE DRAFT IN LOCAL STORAGE


function saveDraft() {

    const formData = getFormData();

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(formData)
    );

    draftStatus.textContent = "Draft saved automatically.";
}



//  RESTORE SAVED DRAFT


function loadDraft() {

    const savedDraft = localStorage.getItem(STORAGE_KEY);

    if (!savedDraft) {
        return;
    }

    try {

        const formData = JSON.parse(savedDraft);

        Object.keys(formData).forEach(key => {

            if (key === "skills") {

                skills.forEach(skill => {

                    skill.checked = formData.skills.includes(
                        skill.value
                    );

                });

            } else {

                const input = form.elements.namedItem(key);

                if (!input) {
                    return;
                }

                if (input.type === "checkbox") {

                    input.checked = formData[key];

                } else {

                    input.value = formData[key];
                }

            }

        });

        draftStatus.textContent = "Your previous draft has been restored.";

    } catch (error) {

        console.error("Unable to restore draft:", error);

        localStorage.removeItem(STORAGE_KEY);

        draftStatus.textContent = "Saved draft could not be restored.";

    }

}



//  AUTO SAVE ON INPUT AND CHANGE


form.addEventListener("input", function() {

    saveDraft();

});

form.addEventListener("change", function() {

    saveDraft();

});



//  CLEAR DRAFT


clearDraftButton.addEventListener("click", function() {

    const confirmClear = confirm(
        "Are you sure you want to clear all application details?"
    );

    if (!confirmClear) {
        return;
    }

    // Clear form fields

    form.reset();

    // Remove local storage data

    localStorage.removeItem(STORAGE_KEY);

    // Clear validation messages

    clearAllErrors();

    // Hide success message

    successMessage.hidden = true;

    // Update status

    draftStatus.textContent = "Draft cleared successfully.";

});



//  CLEAR FIELD ERROR WHILE TYPING


form.addEventListener("input", function(event) {

    const input = event.target;

    if (input.name === "skills") {

        const selectedSkills = Array.from(skills).filter(
            skill => skill.checked
        );

        if (selectedSkills.length >= 2) {

            document.querySelector("#skills-error").textContent = "";

        }

    } else if (input.id === "declaration") {

        if (declaration.checked) {
            clearError(declaration);
        }

    } else {

        clearError(input);

    }

    errorSummary.hidden = true;

});

form.addEventListener("change", function(event) {

    const input = event.target;

    if (input.name === "skills") {

        const selectedSkills = Array.from(skills).filter(
            skill => skill.checked
        );

        if (selectedSkills.length >= 2) {

            document.querySelector("#skills-error").textContent = "";

        }

    } else if (input.id === "declaration") {

        if (declaration.checked) {
            clearError(declaration);
        }

    } else {

        clearError(input);

    }

});



// LOAD DRAFT WHEN PAGE OPENS
loadDraft();
