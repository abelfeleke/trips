// html elements
const events = document.querySelector('#event-list');
const form = document.querySelector('#add-event-form');

// trip info
var tripId = localStorage.getItem("id_storage");
var trip = db.collection("trips").doc(tripId); 

// listens for new event and saves data
form.addEventListener('submit', (e) => { 
    e.preventDefault();
    // valid input check
    if (form.name.value == "" || form.location.value == "" || form.details.value == "") {
        window.alert("Error: Must input event name, location and details.");
        form.reset();
        return;
    }
    // add event to firestore 
    db.collection('events').add({ 
        name: form.name.value,
        location: form.location.value,
        details: form.details.value
    }).then((event) => { 
        // append event id to trip.events
        trip.update({
            events: firebase.firestore.FieldValue.arrayUnion(event.id) 
        }).then(() => {
            form.reset();
            location.reload();
        })
    });
});

var eventsCollection = db.collection("events"); // events collection

// Displays events 
trip.get().then((snapshot) => {
    let eventIds = snapshot.data().events; 
    // for each id 
    eventIds.forEach((eventId) => { 
        // get event
        eventsCollection.doc(eventId).get().then((event) => { 
            // display event
            renderEvent(event); 
        })
    });
});

/* Helper fn: Create element & render event */
function renderEvent(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let location = document.createElement('span');
    let details = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = "Event name: " + doc.data().name;
    location.textContent = "Event location: " + doc.data().location;
    details.textContent = "Event details: " + doc.data().details;
    cross.textContent = 'X';

    li.appendChild(name);
    li.appendChild(location);
    li.appendChild(details);
    li.appendChild(cross);

    events.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        let eventId = e.target.parentElement.getAttribute('data-id'); 
        // delete event from firestore
        eventsCollection.doc(eventId).delete(); 
        // delete id from trip.events
        trip.update({
            events: firebase.firestore.FieldValue.arrayRemove(eventId) 
        }).then(() => {
            window.location.reload(); // refresh
        })
    });
}