function validateform() {
  var username = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("pass").value;

  if (username.trim() === "") {
    alert("Please enter a username");
    return false;
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return false;
  }

  if (password.length < 6) {
    alert("Password should be at least 6 characters");
    return false;
  }

  return true;
}
function redirect(){
  window.location.href = "./indexx.html";
}
function redirectLogin(){
  window.location.href = "./sign-in.html";
}



function redirectUser() {

  let user = document.getElementById("your_name").value;
  let password = document.getElementById("your_pass").value;

  if (user.toLowerCase() === 'admin@gmail.com' && password == '123456') {
 
    window.location.href = 'admindashboard.html';
  } else {
    window.location.href = 'indexx.html';
  }
}