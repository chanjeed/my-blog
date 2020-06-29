import firebase from 'firebase'
require('firebase/auth')

// Github Authentication
var provider = new firebase.auth.GithubAuthProvider();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log(user)
        updateDisplayname();



        //console.log(user.providerData[0]['email']);

    } else {
        // No user is signed in.
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(function (result) {
            console.log('Auth')
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // ...
            }


        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    }
});


//delete button
var logoutButton = document.querySelector("#logout-button");
logoutButton.addEventListener('click', async function (e) {
    var r = confirm("Do you want to logout");
    if (r == true) {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
            console.log('Logout Error')
        });
    }
});

export const updateDisplayname = () => {
    //Get github username
    var user = firebase.auth().currentUser;

    // Create a new request object
    var request = new XMLHttpRequest();

    // Initialize a request
    console.log("mail " + user.providerData[0]['email']);
    request.open('GET', 'https://api.github.com/search/users?q=' + user.providerData[0]['email'], true)

    var current_username;
    request.onload = function () {
        var data = JSON.parse(request.responseText);

        current_username = data['items'][0]['login'];
        console.log("Auth " + current_username);
        user.updateProfile({
            displayName: current_username
        }).then(function () {
            // Update successful.
            console.log("Update displayName SUCCESS");
            console.log(user)
        }).catch(function (error) {
            // An error happened.
            console.log("Update displayName ERROR");
        });


    };

    request.send();



}


