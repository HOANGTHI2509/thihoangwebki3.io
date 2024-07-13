const formdangnhap = document.getElementById("formdangnhap");
        const usernameLogin = document.getElementById("usernameLogin");
        const passwordLogin = document.getElementById("passwordLogin");

        const usernameLoginError = document.getElementById("usernameLoginError");
        const passwordLoginError = document.getElementById("passwordLoginError");

        // Lắng nghe sự kiện submit form đăng nhập
        formdangnhap.addEventListener("submit", function(e) {
            e.preventDefault();
        
            let isUsernameValid = true;
            let isPasswordValid = true;
        
            // Validate username
            if (!usernameLogin.value) {
                usernameLoginError.style.display = "block";
                usernameLoginError.textContent = "Tài khoản không được để trống.";
                isUsernameValid = false;
            } else {
                usernameLoginError.style.display = "none";
            }
        
            // Validate password
            if (!passwordLogin.value || passwordLogin.value.length < 8) {
                passwordLoginError.style.display = "block";
                passwordLoginError.textContent = "Sai mật khẩu, yêu cầu nhập lại.";
                isPasswordValid = false;
            } else {
                passwordLoginError.style.display = "none";
            }
        
            // Check if username and password are correct
            if (isUsernameValid && isPasswordValid) {
                if (usernameLogin.value === 'admin201' && passwordLogin.value === '12345678') {
                    window.location.href = "/BTL-Font-end/html/home.html";
                } else {
                    passwordLoginError.style.display = "block";
                    passwordLoginError.textContent = "Mật khẩu không chính xác.";
                }
            }
        });
        
        
        