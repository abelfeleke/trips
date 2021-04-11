// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});

const trips = document.querySelector('#trip-list');
const form = document.querySelector('#join-trip');

const user = firebase.auth().currentUser;

// create element & render event
function renderTrip(doc){
  let li = document.createElement('li');
  let name = document.createElement('span');
  let location = document.createElement('span');
  let description = document.createElement('span');
  let dates = document.createElement('span');
  let code = document.createElement('span');
  let del = document.createElement('div');

  li.setAttribute('data-id', doc.id);

  name.textContent = doc.data().name;
  dates.textContent = doc.data().date_from + " to " + doc.data().date_to;
  location.textContent = "Location: " + doc.data().location;
  description.textContent = "Details: " + doc.data().description;
  code.textContent = "Share code with friends to join: " + doc.data().code;
  del.textContent = 'Leave';

  li.appendChild(name);
  li.appendChild(dates);
  li.appendChild(location);
  li.appendChild(description);
  li.appendChild(del);
  li.appendChild(code);

  trips.appendChild(li);

  // deleting data
  del.addEventListener('click', (e) => {
    let id = e.target.parentElement.getAttribute('data-id');
    var tripsList = db.collection("users").doc(user);
    tripsList.update({
      trips: firebase.firestore.FieldValue.arrayRemove(id)
    });
    let left = trips.querySelector('[data-id=' + id + ']');
    trips.removeChild(left);
  });

  // view trip details
  name.addEventListener('click', (e) => {
    let id = e.target.parentElement.getAttribute('data-id');
    // for next page to edit events
    localStorage.setItem("id_storage", id);
    var myWindow = window.open("itinerary.html", "_self");
  });

}

// real-time listener
db.collection('trips1').orderBy('date_from').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  user.get().then((doc) => {
    let list = doc.data().trips;
    changes.forEach(change => {
      if(list.includes(change.doc.data().code)){
        renderTrip(change.doc);
      }
    });
  });
});



// join trips
form.addEventListener('submit', (e) => {
  e.preventDefault();
  user.get().then((doc) => {
    // check to see if already in trip
    let list = doc.data().trips;
    if (list.includes(form.code.value)) {
      alert("Already in trip");
      return;
    } else if (form.code.value == '') {
      alert("Insert Valid trip code");
      return;
    }
    // join trip
    user.update({
      trips: firebase.firestore.FieldValue.arrayUnion(form.code.value)
    })
    // refresh page
    .then((value) => {
      form.reset();
      var myWindow = window.open("itinerary.html", "_self");
    })
  })
});
