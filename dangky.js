const formdangky = document.getElementById("formdangky");
const userNameElement = document.getElementById("userName");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const rePasswordElement = document.getElementById("rePassword");
const addressElement = document.getElementById("address");

const userNameError = document.getElementById("userNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const rePasswordError = document.getElementById("rePasswordError");
const addressError = document.getElementById("addressError");
const successMessage = document.getElementById("successMessage");

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

formdangky.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Validate username
    if (!userNameElement.value) {
        userNameError.style.display = "block";
        isValid = false;
    } else {
        userNameError.style.display = "none";
    }

    // Validate email
    if (!emailElement.value) {
        emailError.style.display = "block";
        isValid = false;
    } else {
        if (!validateEmail(emailElement.value)) {
            emailError.style.display = "block";
            emailError.innerHTML = "Email không đúng định dạng";
            isValid = false;
        } else {
            emailError.style.display = "none";
        }
    }

    // Validate password
    if (!passwordElement.value || passwordElement.value.length < 8) {
        passwordError.style.display = "block";
        passwordError.innerHTML = "Mật khẩu phải trên 8 kí tự";
        isValid = false;
    } else {
        passwordError.style.display = "none";
    }

    // Validate re-entered password
    if (!rePasswordElement.value) {
        rePasswordError.style.display = "block";
        isValid = false;
    } else {
        rePasswordError.style.display = "none";
    }

    // Check if passwords match
    if (passwordElement.value !== rePasswordElement.value) {
        rePasswordError.style.display = "block";
        rePasswordError.innerHTML = "Mật khẩu không khớp";
        isValid = false;
    }

    // Display success message if all fields are valid
    if (isValid) {
        successMessage.style.display = "block";
        setTimeout(function () {
            window.location.href = "/BTL-font-end/html/index.html";
        }, 1000);
    }
});
