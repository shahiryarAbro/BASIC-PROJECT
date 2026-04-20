const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "admin123";



/*========== LOGIN FUNCTION ==========*/
function login() {
    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;
    const errorMsg = document.getElementById('error');
    
if (!username || !password) {
    if (errorMsg) errorMsg.textContent = "Please enter username and password!";
    return;
}
    
/*========== CHECK CREDENTIALS  ==========*/
if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedInUser', username);
     window.location.href = "index.html";
} else {
if (errorMsg) {
    errorMsg.textContent = "Invalid username or password!";
    errorMsg.style.color = "#ff6b6b";
}
        
   document.getElementById('username').value = '';
   document.getElementById('password').value = '';
   document.getElementById('username').focus();
    }
}

/*========== LOGOUT FUNCTION ==========*/
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    window.location.href = "LOGIN.HTML";
}



/*========== CHECK LOGIN STATUS ==========*/
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPage = window.location.pathname.split('/').pop().toUpperCase();
    const loginPage = currentPage === 'LOGIN.HTML';
    
if (!isLoggedIn && !loginPage) {
    window.location.href = "LOGIN.HTML";
}
    
if (isLoggedIn && loginPage) {
    window.location.href = "index.html";
    }
}



/*========== RUN AUTH CHECK ON PAGE LOAD ==========*/
checkAuth();