function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            //method #1:  insert with JS
            document.getElementById("name-goes-here").innerText = userName;    

            //method #2:  insert using jquery
            //$("#name-goes-here").text(userName); //using jquery

            //method #3:  insert using querySelector
            //document.querySelector("#name-goes-here").innerText = userName

        } else {
            // No user is signed in.
        }
    });
}
getNameFromAuth(); //run the function




// Function to read the quote of the day from Firestore "quotes" collection
// Input param is the String representing the day of the week, aka, the document name
function readQuote(day) {
    db.collection("quotes").doc(day).onSnapshot(dayDoc =>{
        console.log(dayDoc.data())
        quoteOfTheDay= dayInfo.data().quote;
        document.getElementById("quoteman").innerHTML= quoteOfTheDay;
    })                                                      

}
readQuote("tuesday");        //calling the function

db.collection("quotes").doc("tuesday")
    .get().then(
       function(snap){                 //this is the callback function header
			   console.log(snap.data());     //print key value pairs
       });