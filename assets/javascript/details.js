let idContainer =  'main-container';

async function getDetails() {
    let eventsData;
    eventsData = await getData();
    cardsData = eventsData.events;
    const id = new URLSearchParams(location.search).get("id");
    const card = eventsData.events.find(elem => elem._id == id);
    showCards(card, idContainer);
}

function showCards(card, idContainer) {
    const container = document.getElementById(idContainer);
    let cardAENum = card.assistance ? card.assistance : card.estimate;
    let cardAEStr = card.assistance ? 'Assistance' : 'Estimate';
    container.innerHTML = 
    `<div class="d-flex w-50 contenedor-details p-3">
        <div class="d-flex w-50 contenedor-img">
            <img src=${card.image} class="img-details" alt="Costume Party">
        </div>
        <div class="d-flex flex-column align-items-center justify-content-center contenedor-desc w-50 p-3">
            <h1>${card.name}</h1>
            <p>Date: ${card.date}</p>
            <p>Description: ${card.description}.</p>
            <p>Category: ${card.category}</p>
            <p>Place: ${card.place}.</p>
            <p>Capacity: ${card.capacity}.</p>
            <p>${cardAEStr} : ${cardAENum}.</p>
            <p>Price: $${card.price}.</p>
        </div>
    </div>`
}

getDetails();