document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("formcontainer").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmpassword = document.getElementById("confirmpassword").value;
    let number = document.getElementById("number").value;

    if (password !== confirmpassword) {
        alert("Passwords do not match");
        return;
    }

    let formData = {
        name: name,
        email: email,
        password: password,
        number: number
    };

    localStorage.setItem("userData", JSON.stringify(formData));
    window.location.href = "../Login/login.html";
});
