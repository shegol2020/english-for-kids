import { SortableTable } from "../stat/sortabletable.js";
import { stats } from "../stat/statistics.js";

const clearStatBtn = document.querySelector(".stat-clear-btn");
const trainStatBtn = document.querySelector(".stat-train-btn");


// Initialize sortable table buttons
document.addEventListener("DOMContentLoaded", function () {
    let sortableTables = document.querySelectorAll('table.sortable');
    for (let i = 0; i < sortableTables.length; i++) {
        new SortableTable(sortableTables[i]);
    }
});

document.addEventListener("DOMContentLoaded", insertStatInTable);

clearStatBtn.addEventListener("click", () => {
    stats.clearStatistics();
})

trainStatBtn.addEventListener("click", () => {
    window.location.href = '/wordplay.html';
    //generateCards(formTrainedList(stats.getTopErrors(8)));
})


//put data from localStorage into statistics table
function insertStatInTable(){
    const dataTable = Array.from(document.querySelectorAll("tr[data-name]"));
    const result = stats.getWordsFromStorage();
    dataTable.forEach(row => {
        const rowName = row.getAttribute("data-name");
        if (result.hasOwnProperty(rowName)) {
            updateCellValue("right", row, rowName, result);
            updateCellValue("wrong", row, rowName, result);
            updateCellValue("trained", row, rowName, result);
            updateCellValue("errors", row, rowName, result);
            }
    })
}

function updateCellValue(value, row, name, result){
    const cell = row.querySelector(`.${value}-cell`);
    const res = result[name][value];
    cell.innerHTML = res;
}





