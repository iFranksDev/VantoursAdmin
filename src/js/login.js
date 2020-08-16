///////////////////////////////////////////Materialize///////////////////////////////////////////
 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    //var instances = M.Sidenav.init(elems, options);
  });

M.AutoInit();

///////////////////////////////////////////Materialize///////////////////////////////////////////



/*
 FIREBASE
 */
function toggleSignIn() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      document.getElementById('quickstart-sign-in').disabled = false;
    });
  }
}


function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      window.location.replace("main.html");
      if (!emailVerified) {
        document.getElementById('quickstart-verify-email').disabled = false;
      }
    } 
    document.getElementById('quickstart-sign-in').disabled = false; 
  });
  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}



/*
 FIREBASE
 */

window.onload = function() {
  initApp();


var input = document.getElementById("email");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("quickstart-sign-in").click();
  }
});

var input2 = document.getElementById("password");
input2.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("quickstart-sign-in").click();
  }
});
};