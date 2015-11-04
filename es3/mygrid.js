/// <reference path="../libs/numeraljs.d.ts" />
/// <reference path="mygridDefs.ts" />
var Grid = (function () {
    function Grid(selector, gridOptions) {
        this.gridContainer = document.querySelector(selector);
        this.gridOptions = gridOptions || {};
        this.setColumnDefs(gridOptions.columnDefs);
        this.gridContainer.innerHTML = '<table><thead><tr></tr></thead><tbody></tbody></table>';
        this.tableHeader = this.gridContainer.querySelector('table > thead');
        this.tableBody = this.gridContainer.querySelector('table > tbody');
        this.render();
    }
    Grid.prototype.setColumnDefs = function (colDefs) {
        this.columnDefs = colDefs.map(function (colDef) {
            return new ColumnDef(colDef.field, colDef.headerName, colDef.type, colDef.format, colDef.cellFormatter, colDef.sortable, colDef.width, colDef.headerClass, colDef.cellClass);
        });
    };
    Grid.prototype.createHeader = function () {
        var arr1 = [];
        if (this.gridOptions.columnDefs) {
            arr1 = this.columnDefs.map(function (colDef) {
                return '<th>' + (colDef.headerName || colDef.field) + '</th>';
            }, this);
        }
        return arr1.join('');
    };
    Grid.prototype.createCell = function (row, colDef, rowIndex, colIndex) {
        var val = row[colDef.field];
        if (colDef.hasOwnProperty('cellFormatter') && typeof (colDef.cellFormatter) == 'function') {
            var params = {
                data: row,
                rowIndex: rowIndex,
                colIndex: colIndex
            };
            val = colDef.cellFormatter(params);
        }
        else if (colDef.type === 'number') {
            val = numeral(val).format(colDef.format || '0,0.0000');
        }
        return '<td col-idx="' + colIndex + '">' + val + '</td>';
    };
    Grid.prototype.createRow = function (row, rowIndex) {
        var _this = this;
        var rowStr = this.columnDefs.map(function (colDef, colIndex) {
            return _this.createCell(row, colDef, rowIndex, colIndex);
        }, this).join('');
        return '<tr r-idx="' + rowIndex + '">' + rowStr + '</tr>';
    };
    Grid.prototype.createBodyData = function () {
        var _this = this;
        var arr1 = [];
        if (this.gridOptions.rowData) {
            arr1 = this.gridOptions.rowData.map(function (row, rowIndex) {
                return _this.createRow(row, rowIndex);
            }, this);
        }
        return arr1.join('');
    };
    Grid.prototype.render = function () {
        this.tableHeader.innerHTML = this.createHeader();
        this.tableBody.innerHTML = this.createBodyData();
    };
    return Grid;
})();
