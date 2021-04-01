const events = document.querySelector('#event-list');
const form = document.querySelector('#add-event-form');

// create element & render event
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
        let id = e.target.parentElement.getAttribute('data-id'); 
        db.collection('events').doc(id).delete();
    });
}

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('events').add({
        name: form.name.value,
        location: form.location.value,
        details: form.details.value
    });
    // Todo: Add Event ID to user.trips.events 
    form.reset() // clear form
});

// real-time listener 
db.collection('events').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderEvent(change.doc);
        } else if (change.type == 'removed'){
            let li = events.querySelector('[data-id=' + change.doc.id + ']');
            events.removeChild(li);
        }
    });
});