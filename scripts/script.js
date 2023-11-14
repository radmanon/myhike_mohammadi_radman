//---------------------------------
// Your own functions here
//---------------------------------


function sayHello() {
    //do something
}
//sayHello();    //invoke function


//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
      }).catch((error) => {
        // An error happened.
      });
}






//----------------------------------------------------------
// This function is the only function that's called.
// This strategy gives us better control of the page.
//----------------------------------------------------------
function doAll() {
  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          insertNameFromFirestore(user);
          getBookmarks(user)
      } else {
          console.log("No user is signed in");
      }
  });
}
doAll();

//----------------------------------------------------------
// Wouldn't it be nice to see the User's Name on this page?
// Let's do it!  (Thinking ahead:  This function can be carved out, 
// and put into script.js for other pages to use as well).
//----------------------------------------------------------//----------------------------------------------------------
function insertNameFromFirestore(user) {
          db.collection("users").doc(user.uid).get().then(userDoc => {
              console.log(userDoc.data().name)
              userName = userDoc.data().name;
              console.log(userName)
              document.getElementById("name-goes-here").innerHTML = userName;
          })

}