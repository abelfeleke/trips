const form = document.querySelector('#create-trip');

// get user id
var userid = firebase.auth().currentUser;
var docid;

// wait for the sumbit button to be clicked and add the entries and doc id
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('trips').add({
        name: form.name.value,
        location: form.location.value,
        date_from: form.date_from.value,
        date_to: form.date_to.value,
        description: form.description.value,
        events: []
    })
    .then((docRef) => {
    docid = docRef.id;
    var tripdoc = db.collection('trips').doc(docRef.id);
    var setWithMerge = tripdoc.update({
      code: docRef.id
    });
    // add trip to user's list
    // get user id
    // var userid = firebase.auth().currentUser;
    // get user's list of trips to update them
    // var user = db.collection('users').doc(userid);
    var user = db.collection('users').doc(userid);
    user.update({
    trips: firebase.firestore.FieldValue.arrayUnion(docRef.id)
    });
    //clear form
    form.name.value = '';
    form.location.value = '';
    form.date_from.value = '';
    form.date_to.value = '';
    form.description.value = '';
    console.log(docRef.id);
    })
    .then((value) => {
      myFunction(value);
    });
});


function myFunction(code) {
  var myWindow = window.open("itinerary.html", "_self");
}
