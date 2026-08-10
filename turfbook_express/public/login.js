document.getElementById("loginForm").addEventListener(
    "submit",
    async function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const response = await fetch("/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        );
        const data = await response.json();
        const msg = document.getElementById("message");
        if (data.success) {
            if (data.role === "admin") {
                localStorage.setItem("role", "admin");
                window.location.href = "http://localhost:3002/admin";
                return;
            } else {
                localStorage.setItem("user", JSON.stringify(data.user));
                window.location.href = "index.html";
            }
        } else {
                alert(data.message);
                window.location.href = "login.html";
        }
    }
);
