let idTable1 = 'table1';
let idTable2 = 'table2';
let idTable3 = 'table3';

async function getTables() {
    let eventsData;
    eventsData = await getData();
    cardsData = eventsData.events;
    cardsDataUpcoming = cardsData.filter(evnt => evnt.estimate);
    cardsDataPast = cardsData.filter(evnt => evnt.assistance);
    showTable1(idTable1, cardsData);
    showTableUpcomingPast(idTable2, cardsDataUpcoming);
    showTableUpcomingPast(idTable3, cardsDataPast);
}

function showTable1(idTable, eventsData) {
    const tableContainer = document.getElementById(idTable);
    let eventMaxAttendance = getMaxAttendance(eventsData);
    let eventMinAttendance = getMinAttendance(eventsData);
    let eventWithMaxCapacity = getEventLargerCapacity(eventsData);
    tableContainer.innerHTML =
        `<table class="table table-bordered table-stats bg-white">
        <h1>Events statistics</h1>
        <thead>
            <tr>
                <th>Events with the highest percentage of attendance</th>
                <th>Events with the lowest percentage of attendance</th>
                <th>Event with larger capacity</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${eventMaxAttendance.name} (${calculateAssistancePercentage(eventMaxAttendance).toFixed(2)})</td>
                <td>${eventMinAttendance.name} (${calculateAssistancePercentage(eventMinAttendance).toFixed(2)})</td>
                <td>${eventWithMaxCapacity.name} (${eventWithMaxCapacity.capacity})</td>
            </tr>
        </tbody>
    </table>`
}

function getMaxAttendance(eventsData) {
    let cardsPast = eventsData.filter(card => card.assistance);
    let eventMaxAttendance = cardsPast[0];
    let eventMax = calculateAssistancePercentage(eventMaxAttendance);
    for (let card of cardsPast) {
        let eventPercen = calculateAssistancePercentage(card);
        if (eventPercen > eventMax) eventMaxAttendance = card;
    }
    return eventMaxAttendance;
}

function getMinAttendance(eventsData){
    let cardsPast = eventsData.filter(card => card.assistance);
    let eventMinAttendance = cardsPast[0];
    let eventMin = calculateAssistancePercentage(eventMinAttendance);
    for (let card of cardsPast) {
        let eventPercen = calculateAssistancePercentage(card);
        if (eventPercen < eventMin) eventMinAttendance = card;
    }
    return eventMinAttendance;
}

function calculateAssistancePercentage(card) {
    let assistance = card.assistance;
    let capacity = card.capacity;
    return assistance * 100 / capacity;
}

function getEventLargerCapacity(eventsData){
    let eventMaxCapacity = eventsData[0];
    let maxCapacity = eventMaxCapacity.capacity;
    for(card of eventsData){
        let capacity = card.capacity;
        if (capacity > maxCapacity) eventMaxCapacity = card;
    }
    return eventMaxCapacity;
}

function showTableUpcomingPast(idContenedor, eventsData){
    let contenedor = document.getElementById(idContenedor);
    let categories = [...new Set(eventsData.map(card => card.category))];
    let fragment = document.createDocumentFragment();
    for (category of categories){
        let tr = document.createElement("tr");
        tr.innerHTML =`
        <td>${category}: </td>
        <td>$ ${calculateRevenues(eventsData,category)}</td>
        <td>${calculatePercentageByCategory(eventsData,category)} %</td>
        `
        fragment.appendChild(tr);
    }
    contenedor.appendChild(fragment);
}

function calculateRevenues(eventsData, category){
    let eventsDataByCategory = eventsData.filter(evnt => evnt.category == category);
    let totalRenevues = eventsDataByCategory.reduce((total, evnt) => {
        evnt.assistance == undefined ? total += evnt.price * evnt.estimate : total += evnt.price * evnt.assistance
        return total
    },0)
    return totalRenevues;
}

function calculatePercentageByCategory(eventsData, category){
    let eventsDataByCategory = eventsData.filter(evnt => evnt.category == category);
    let totalPercentage = eventsDataByCategory.reduce((total, evnt) => {
        evnt.assistance == undefined ? total += evnt.estimate / evnt.capacity : total += evnt.assistance / evnt.capacity
        return total
    },0)
    return (totalPercentage * 100 / eventsDataByCategory.length).toFixed(2);
}

getTables();

//Otra manera de calcular ganancias
// function calculateRevenues(eventsData, category){
//     let eventsDataByCategory = eventsData.filter(evnt => evnt.category == category);
//     let totalRenevues = 0;
//     for(evnt of eventsDataByCategory){
//         if(evnt.assistance){
//             totalRenevues += evnt.price * evnt.assistance;
//         }
//         else{
//             totalRenevues += evnt.price * evnt.estimate;
//         }
//     }
//     return totalRenevues;
// }
Foot