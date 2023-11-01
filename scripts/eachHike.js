        // Your Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyBnYUfqyLku-Yu3n51ACdPARF1Pu1ImvlM",
            authDomain: "comp1800-fb693.firebaseapp.com",
            projectId: "comp1800-fb693",
            storageBucket: "comp1800-fb693.appspot.com",
            messagingSenderId: "1085465055470",
            appId: "1:1085465055470:web:977adf4c1e44d615f523ff"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        // Initialize Firestore
        const db = firebase.firestore();

        // Function to display hike details
        function displayHikeInfo() {
            let params = new URL(window.location.href); // Get URL of search bar
            let ID = params.searchParams.get("docID"); // Get value for key "docID"
            console.log(ID);

            // doublecheck: is your collection called "Reviews" or "reviews"?
            db.collection("hikes")
                .doc(ID)
                .get()
                .then(doc => {
                    thisHike = doc.data();
                    hikeCode = thisHike.code;
                    hikeName = doc.data().name;

                    // Set the title
                    document.getElementById("hikeName").innerHTML = hikeName;

                    // Set the image src
                    let imgEvent = document.getElementById("hikeImage"); // Get the image element by ID
                    let imageUrl = `../images/${hikeCode}.jpg`; // Build the image URL
                    imgEvent.src = imageUrl;
                });
        }

        displayHikeInfo();





        