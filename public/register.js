const dropZone = document.getElementById("dropZone");
const avatarInput = document.getElementById("avatar");
const previewAvatar = document.getElementById("previewAvatar");
const registerForm = document.getElementById("registerForm");
let avatarDataURL = "";

dropZone.addEventListener("click", () => {
    avatarInput.click();
});

avatarInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
        loadImage(file);
        hideError("avatarError");
    } else {
        showError("avatarError", "Please select a valid image file.");
    }
});

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("border-blue-600", "bg-blue-50");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("border-blue-600", "bg-blue-50");
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("border-blue-600", "bg-blue-50");

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
        loadImage(file);
        hideError("avatarError");
    } else {
        showError("avatarError", "Please drop a valid image file.");
    }
});

function loadImage(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        avatarDataURL = e.target.result;
        previewAvatar.src = avatarDataURL;
        previewAvatar.classList.remove("hidden");

        document.getElementById("uploadIcon").style.display = "none";
        document.getElementById("uploadText").style.display = "none";
        document.getElementById("uploadSubText").style.display = "none";
    };
    reader.readAsDataURL(file);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = "";
    errorElement.classList.add("hidden");
}

function clearAllErrors() {
    hideError("nameError");
    hideError("usernameError");
    hideError("passwordError");
    hideError("emailError");
    hideError("avatarError");
    hideError("generalError");
}

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    clearAllErrors();

    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value.trim();

    if (name.length < 2) {
        showError("nameError", "Name must be at least 2 characters.");
        isValid = false;
    }

    if (username.length < 4) {
        showError("usernameError", "Username must be at least 4 characters.");
        isValid = false;
    }

    if (password.length < 6) {
        showError("passwordError", "Password must be at least 6 characters.");
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError("emailError", "Please enter a valid email address.");
        isValid = false;
    }

    if (!avatarDataURL) {
        showError("avatarError", "Profile picture is required.");
        isValid = false;
    }

    if (!isValid) return;

    const response = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            username,
            password,
            email,
            avatar: avatarDataURL
        })
    });

    const data = await response.json();

    if (data.success) {
        window.location.href = "login.html";
    } else {
        showError("generalError", data.message || "Registration failed. Please try again.");
    }
});