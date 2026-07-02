const dropZone = document.getElementById("dropZone");
const avatarInput = document.getElementById("avatar");
const previewAvatar = document.getElementById("previewAvatar");

let avatar = "";

dropZone.addEventListener("click", () => {
    avatarInput.click();
});

avatarInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        loadImage(file);
    }
});

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over");
});

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");

    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
        loadImage(file);
    }
});

function loadImage(file) {

    const reader = new FileReader();

    reader.onload = function(e){

        avatar = e.target.result;

        previewAvatar.src = avatar;

        previewAvatar.classList.remove("hidden");

        dropZone.querySelector("i").style.display = "none";
        dropZone.querySelector("p").style.display = "none";
        dropZone.querySelector("span").style.display = "none";
    };

    reader.readAsDataURL(file);
}

document.getElementById("registerForm").addEventListener(

    "submit",
    async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;

        const response = await fetch("/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    username,
                    password,
                    email,
                    avatar
                })
            }
        );

        const data = await response.json();

        const msg = document.getElementById("message");

        if (data.success) {
            alert(data.message);
            window.location.href = "login.html";
        }
        else {
            alert(data.message);
            window.location.href = "register.html";
        }
    }

);