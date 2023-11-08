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




        function saveHikeDocumentIDAndRedirect(){
            let params = new URL(window.location.href) //get the url from the search bar
            let ID = params.searchParams.get("docID");
            localStorage.setItem('hikeDocID', ID);
            window.location.href = 'review.html';
        }


        function populateReviews() {
            console.log("test");
            let hikeCardTemplate = document.getElementById("reviewCardTemplate");
            let hikeCardGroup = document.getElementById("reviewCardGroup");
        
            let params = new URL(window.location.href); // Get the URL from the search bar
            let hikeID = params.searchParams.get("docID");
        
            // Double-check: is your collection called "Reviews" or "reviews"?
            db.collection("reviews")
                .where("hikeDocID", "==", hikeID)
                .get()
                .then((allReviews) => {
                    reviews = allReviews.docs;
                    console.log(reviews);
                    reviews.forEach((doc) => {
                        var title = doc.data().title;
                        var level = doc.data().level;
                        var season = doc.data().season;
                        var description = doc.data().description;
                        var flooded = doc.data().flooded;
                        var scrambled = doc.data().scrambled;
                        var time = doc.data().timestamp.toDate();
                        var rating = doc.data().rating; // Get the rating value
                        console.log(rating)
        
                        console.log(time);
        
                        let reviewCard = hikeCardTemplate.content.cloneNode(true);
                        reviewCard.querySelector(".title").innerHTML = title;
                        reviewCard.querySelector(".time").innerHTML = new Date(
                            time
                        ).toLocaleString();
                        reviewCard.querySelector(".level").innerHTML = `Level: ${level}`;
                        reviewCard.querySelector(".season").innerHTML = `Season: ${season}`;
                        reviewCard.querySelector(".scrambled").innerHTML = `Scrambled: ${scrambled}`;
                        reviewCard.querySelector(".flooded").innerHTML = `Flooded: ${flooded}`;
                        reviewCard.querySelector( ".description").innerHTML = `Description: ${description}`;
        
                        // Populate the star rating based on the rating value
                        
                          // Initialize an empty string to store the star rating HTML
                                        let starRating = "";
                                        // This loop runs from i=0 to i<rating, where 'rating' is a variable holding the rating value.
                        for (let i = 0; i < rating; i++) {
                            starRating += '<span class="material-icons">star</span>';
                        }
                                        // After the first loop, this second loop runs from i=rating to i<5.
                        for (let i = rating; i < 5; i++) {
                            starRating += '<span class="material-icons">star_outline</span>';
                        }
                        reviewCard.querySelector(".star-rating").innerHTML = starRating;
        
                        hikeCardGroup.appendChild(reviewCard);
                    });
                });
        }
        
        populateReviews();
        