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
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            window.location.href = "index.html";
        }
        else {
            alert(data.message);
            window.location.href = "login.html";
        }

    }

);
