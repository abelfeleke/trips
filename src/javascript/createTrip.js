const form = document.querySelector('#create-trip');

// get user id
var userid = firebase.auth().currentUser;
var docid;

// wait for the sumbit button to be clicked and add the entries and doc id
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // check form
  if (checkForm(form) ==  false) {
    return;
  }
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
    var user = db.collection('users').doc(userid);
    user.update({
      trips: firebase.firestore.FieldValue.arrayUnion(docRef.id)
    });
    //clear form
    form.reset();
  })
  .then((value) => {
    openWindow(value);
  });
});

function openWindow(code) {
  var myWindow = window.open("home.html", "_self");
}

function checkForm(f) {
  if (f.name.value == '') {
    alert("Name must be filled out");
    return false;
  } else if (f.location.value == '') {
    alert("Location must be filled out");
    return false;
  } else if (f.date_from.value == '') {
    alert("Date from must be filled out");
    return false;
  } else if (f.date_to.value == '') {
    alert("Date to must be filled out");
    return false;
  } else if (f.description.value == '') {
    alert("Description must be filled out");
    return false;
  } else if (f.date_from.value > f.date_to.value) {
    alert("Dates must be valid");
    return false;
  } else {
    return true;
  }
}
