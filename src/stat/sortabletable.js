export class SortableTable {
    constructor(tableNode) {
        this.tableNode = tableNode;
        this.columnHeaders = tableNode.querySelectorAll('thead th');
        this.sortColumns = [];

        for (let i = 0; i < this.columnHeaders.length; i++) {
            let ch = this.columnHeaders[i];
            let buttonNode = ch.querySelector('button');
            if (buttonNode) {
                this.sortColumns.push(i);
                buttonNode.setAttribute('data-column-index', i);
                buttonNode.addEventListener('click', this.handleClick.bind(this));
            }
        }

        this.optionCheckbox = document.querySelector('input[type="checkbox"][value="show-unsorted-icon"]');

        if (this.optionCheckbox) {
            this.optionCheckbox.addEventListener('change', this.handleOptionChange.bind(this));
            if (this.optionCheckbox.checked) {
                this.tableNode.classList.add('show-unsorted-icon');
            }
        }
    }

    setColumnHeaderSort(columnIndex) {
        if (typeof columnIndex === 'string') {
            columnIndex = parseInt(columnIndex);
        }

        for (let i = 0; i < this.columnHeaders.length; i++) {
            let ch = this.columnHeaders[i];
            let buttonNode = ch.querySelector('button');
            if (i === columnIndex) {
                let value = ch.getAttribute('aria-sort');
                if (value === 'descending') {
                    ch.setAttribute('aria-sort', 'ascending');
                    this.sortColumn(columnIndex, 'ascending', ch.classList.contains('num'));
                } else {
                    ch.setAttribute('aria-sort', 'descending');
                    this.sortColumn(columnIndex, 'descending', ch.classList.contains('num'));
                }
            } else {
                if (ch.hasAttribute('aria-sort') && buttonNode) {
                    ch.removeAttribute('aria-sort');
                }
            }
        }
    }

    sortColumn(columnIndex, sortValue, isNumber) {
        function compareValues(a, b) {
            if (sortValue === 'ascending') {
                if (a.value === b.value) {
                    return 0;
                } else {
                    if (isNumber) {
                        return a.value - b.value;
                    } else {
                        return a.value < b.value ? -1 : 1;
                    }
                }
            } else {
                if (a.value === b.value) {
                    return 0;
                } else {
                    if (isNumber) {
                        return b.value - a.value;
                    } else {
                        return a.value > b.value ? -1 : 1;
                    }
                }
            }
        }

        if (typeof isNumber !== 'boolean') {
            isNumber = false;
        }

        let tbodyNode = this.tableNode.querySelector('tbody');
        let rowNodes = [];
        let dataCells = [];

        let rowNode = tbodyNode.firstElementChild;
        let index = 0;

        while (rowNode) {
            rowNodes.push(rowNode);
            let rowCells = rowNode.querySelectorAll('th, td');
            let dataCell = rowCells[columnIndex];

            let data = {};
            data.index = index;
            data.value = dataCell.textContent.toLowerCase().trim();

            if (isNumber) {
                data.value = parseFloat(data.value);
            }

            dataCells.push(data);
            rowNode = rowNode.nextElementSibling;
            index += 1;
        }

        dataCells.sort(compareValues);

        // remove rows
        while (tbodyNode.firstChild) {
            tbodyNode.removeChild(tbodyNode.lastChild);
        }

        // add sorted rows
        for (let i = 0; i < dataCells.length; i += 1) {
            tbodyNode.appendChild(rowNodes[dataCells[i].index]);
        }
    }

    /* EVENT HANDLERS */

    handleClick(event) {
        let tgt = event.currentTarget;
        this.setColumnHeaderSort(tgt.getAttribute('data-column-index'));
    }

    handleOptionChange(event) {
        let tgt = event.currentTarget;

        if (tgt.checked) {
            this.tableNode.classList.add('show-unsorted-icon');
        } else {
            this.tableNode.classList.remove('show-unsorted-icon');
        }
    }
}