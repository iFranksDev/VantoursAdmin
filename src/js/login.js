///////////////////////////////////////////Materialize///////////////////////////////////////////
 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    //var instances = M.Sidenav.init(elems, options);
  });

M.AutoInit();

///////////////////////////////////////////Materialize///////////////////////////////////////////

//////////////////////////////////////////Borrar Version Final///////////////////////////////////
(function(){

    var ui = new firebaseui.auth.AuthUI(firebase.auth());


   var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            return true;
          },
          uiShown: function() {
            document.getElementById('loader').style.display = 'none';
          }
        },
        signInFlow: 'popup',
        signInSuccessUrl: '../views/main.html',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        tosUrl: '<your-tos-url>',
        privacyPolicyUrl: '<your-privacy-policy-url>'
      };

      ui.start('#firebaseui-auth-container', uiConfig);

})()
//////////////////////////////////////////Borrar Version Final///////////////////////////////////



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