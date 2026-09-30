document.getElementById("form_container").addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.email === email && userData.password === password) {
        window.location.href = "../Home/home.html";
    } else {
        alert("Please enter correct details, or register first.");
    }
});
