/// <reference path="../libs/jquery.d.ts" />
/// <reference path="../libs/numeraljs.d.ts" />
/// <reference path="../libs/moment.d.ts" />
/// <reference path="mygridDefs.ts" />
var Grid = (function () {
    function Grid(selector, gridOptions) {
        this.gridContainer = document.querySelector(selector);
        this.setUpProperties(gridOptions);
        this.createGridContainers();
        // this.theGrid.style.width = this.gridOptions.width || 'auto';
        // this.theGrid.style.height = this.gridOptions.height || 'auto';
        this.setUpWidths();
        this.render();
        this.setUpAPI();
        this.setEvents();
        if (this.gridOptions.onReady) {
            this.gridOptions.onReady(this.gridOptions.api);
        }
    }
    Grid.prototype.createGridContainers = function () {
        this.gridContainer.innerHTML =
            '<div class="mygrid">' +
                '<table>' +
                '<tbody>' +
                '<tr>' +
                '<td class="left-pane" style="display:none">' +
                '<div class="mygrid-left">' +
                '<div class="mygrid-header">' +
                '<div class="mygrid-header-inner">' +
                '<table><thead><tr></tr></thead></table>' +
                '</div>' +
                '</div>' +
                '<div class="mygrid-body">' +
                '<div class="mygrid-body-y-scroll">' +
                '<table><tbody></tbody></table>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</td>' +
                '<td class="center-pane">' +
                '<div class="mygrid-center">' +
                '<div class="mygrid-header">' +
                '<div class="mygrid-header-inner">' +
                '<table><thead><tr></tr></thead></table>' +
                '</div>' +
                '</div>' +
                '<div class="mygrid-body">' +
                '<div class="mygrid-body-y-scroll">' +
                '<table><tbody></tbody></table>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</td>' +
                '<td class="right-pane" style="display:none">' +
                '<div class="mygrid-right">' +
                '<div class="mygrid-header">' +
                '<div class="mygrid-header-inner">' +
                '<table><thead><tr></tr></thead></table>' +
                '</div>' +
                '</div>' +
                '<div class="mygrid-body">' +
                '<div class="mygrid-body-y-scroll">' +
                '<table><tbody></tbody></table>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '</div>';
        this.theGrid = this.gridContainer.querySelector('div.mygrid');
        // left pane
        this.theGridTdLeftPane = this.theGrid.querySelector('td.left-pane');
        this.theGridLeft = this.theGridTdLeftPane.querySelector('div.mygrid-left');
        this.headerContainerLeft = this.theGridLeft.querySelector('div.mygrid-header');
        this.headerContainerInnerLeft = this.headerContainerLeft.querySelector('div.mygrid-header-inner');
        this.tableHeaderLeft = this.headerContainerInnerLeft.querySelector('table > thead');
        this.bodyContainerLeft = this.theGridLeft.querySelector('div.mygrid-body');
        this.bodyContainerYscrollLeft = this.bodyContainerLeft.querySelector('div.mygrid-body-y-scroll');
        this.tableBodyLeft = this.bodyContainerYscrollLeft.querySelector('table > tbody');
        // center pane
        this.theGridTdCenterPane = this.theGrid.querySelector('td.center-pane');
        this.theGridCenter = this.theGridTdCenterPane.querySelector('div.mygrid-center');
        this.headerContainerCenter = this.theGridCenter.querySelector('div.mygrid-header');
        this.headerContainerInnerCenter = this.headerContainerCenter.querySelector('div.mygrid-header-inner');
        this.tableHeaderCenter = this.headerContainerInnerCenter.querySelector('table > thead');
        this.bodyContainerCenter = this.theGridCenter.querySelector('div.mygrid-body');
        this.bodyContainerYscrollCenter = this.bodyContainerCenter.querySelector('div.mygrid-body-y-scroll');
        this.tableBodyCenter = this.bodyContainerYscrollCenter.querySelector('table > tbody');
    };
    Grid.prototype.setUpWidths = function () {
        var gridOptions = this.gridOptions;
        this.theGrid.style.width = gridOptions.width || 'auto';
        this.theGrid.style.height = !gridOptions.disableVerticalScroll ? (this.gridOptions.height || 'auto') : 'auto';
        var totalGridWidth = this.theGrid.offsetWidth;
        // let pinnedLeftCount = this.gridOptions.pinnedLeftCount;
        var pinnedLeftCount = this.gridOptions.disableHorizontalScroll ? 0 : this.gridOptions.pinnedLeftCount;
        ;
        var totalLeftWidth = 0;
        if (pinnedLeftCount > 0) {
            this.theGridTdLeftPane.style.display = '';
            for (var i = 0; i < pinnedLeftCount; i++) {
                totalLeftWidth = Number(this.columnDefs[i].width.replace('px', '').replace('%', ''));
            }
            this.theGridTdLeftPane.style.width = (totalLeftWidth) + 'px';
            this.theGridLeft.style.width = (totalLeftWidth) + 'px';
            this.headerContainerLeft.style.width = (totalLeftWidth) + 'px';
            this.bodyContainerLeft.style.width = (totalLeftWidth) + 'px';
        }
        this.theGridTdCenterPane.style.width = (totalLeftWidth) + 'px';
        this.theGridCenter.style.width = (totalGridWidth - totalLeftWidth) + 'px';
        this.headerContainerCenter.style.width = (totalGridWidth - totalLeftWidth) + 'px';
        this.bodyContainerCenter.style.width = (totalGridWidth - totalLeftWidth) + 'px';
    };
    Grid.prototype.setUpProperties = function (gridOptions) {
        var icons = gridOptions.icons || { sortDescending: null, sortAscending: null };
        this.gridOptions = gridOptions;
        this.gridOptions.rowData = gridOptions.rowData || [];
        this.setColumnDefs(gridOptions.columnDefs);
        this.gridOptions.rowHeight = gridOptions.rowHeight || '30px';
        this.gridOptions.pinnedLeftCount = gridOptions.pinnedLeftCount || 0;
        this.gridOptions.pinnedRightCount = gridOptions.pinnedRightCount || 0;
        this.gridOptions.flexRow = gridOptions.flexRow || false;
        this.gridOptions.disableVerticalScroll = gridOptions.disableVerticalScroll || false;
        this.gridOptions.disableHorizontalScroll = gridOptions.disableHorizontalScroll || false;
        this.gridOptions.disableSorting = gridOptions.disableSorting || true;
        this.gridOptions.icons = {
            sortDescending: icons.sortDescending || '<scan>&#x2193;</scan>',
            sortAscending: icons.sortAscending || '<scan>&#x2191;</scan>'
        };
        this.gridOptions.icons.sortDescending = '<scan class="sort-descending" style="display:none">' + this.gridOptions.icons.sortDescending + '</scan>';
        this.gridOptions.icons.sortAscending = '<scan class="sort-ascending" style="display:none">' + this.gridOptions.icons.sortAscending + '</scan>';
    };
    Grid.prototype.setUpAPI = function () {
        this.gridOptions.api = {
            setDataRow: this.setDataRow.bind(this)
        };
    };
    Grid.prototype.setColumnDefs = function (colDefs) {
        this.columnDefs = colDefs.map(function (colDef) {
            return new ColumnDef(colDef.field, colDef.headerName, colDef.type, colDef.format, colDef.cellFormatter, colDef.sortable, colDef.width, colDef.headerClasses, colDef.cellClasses);
        });
    };
    Grid.prototype.createHeader = function () {
        var _this = this;
        var arrCenter = [];
        var arrLeft = [];
        // let pinnedLeftCount = this.gridOptions.pinnedLeftCount
        var pinnedLeftCount = this.gridOptions.disableHorizontalScroll ? 0 : this.gridOptions.pinnedLeftCount;
        ;
        if (this.gridOptions.columnDefs) {
            this.columnDefs.forEach(function (colDef, colIdx) {
                if (pinnedLeftCount - 1 >= colIdx) {
                    arrLeft.push(_this.createHeaderCell(colDef, colIdx));
                }
                else {
                    arrCenter.push(_this.createHeaderCell(colDef, colIdx));
                }
            }, this);
        }
        if (arrLeft.length > 0) {
            this.tableHeaderLeft.innerHTML = '<tr>' + arrLeft.join('') + '</tr>';
        }
        this.tableHeaderCenter.innerHTML = '<tr>' + arrCenter.join('') + '</tr>';
        // this.tableHeaderCenter.querySelectorAll('span.sort-descending').style.display = 'none';
        if (!this.gridOptions.disableVerticalScroll) {
            this.bodyContainerLeft.style.height = this.bodyContainerCenter.style.height = (this.theGrid.offsetHeight - this.headerContainerCenter.offsetHeight) + 'px';
        }
        else {
            this.bodyContainerLeft.style.height = this.bodyContainerCenter.style.height = 'auto';
        }
    };
    Grid.prototype.createHeaderCell = function (colDef, colIdx) {
        var styleArr = [];
        var classArr = [];
        var icons = this.gridOptions.icons;
        if (colDef.width) {
            styleArr.push('width:' + colDef.width + '');
        }
        classArr.push(HAlignmentClasses[colDef.type.toUpperCase()]);
        if (colDef.sortable) {
            classArr.push('sortable');
        }
        return '<th class="' + classArr.join(' ') + '" style="' + styleArr.join(';') + '" col-idx="' + colIdx + '">' +
            '<div style="' + styleArr.join(';') + '" >' +
            '<span>' + (colDef.headerName || colDef.field) + '</span>' + icons.sortAscending + icons.sortAscending +
            '</div>' +
            '</th>';
    };
    Grid.prototype.createDataCell = function (row, colDef, rowIndex, colIndex, isFirst) {
        var val = row[colDef.field];
        var styleArr = [];
        var classArr = [];
        if (colDef.width) {
            styleArr.push('width:' + colDef.width + '');
        }
        if (isFirst && this.gridOptions.rowHeight) {
            styleArr.push('height:' + this.gridOptions.rowHeight);
        }
        classArr.push(HAlignmentClasses[colDef.type.toUpperCase()]);
        var params = {
            data: row,
            rowIndex: rowIndex,
            colIndex: colIndex,
            classes: classArr,
            colDef: colDef
        };
        // types		
        if (colDef.hasOwnProperty('cellFormatter') && typeof (colDef.cellFormatter) == 'function') {
            val = colDef.cellFormatter(params);
            classArr = params.classes;
        }
        else {
            if (colDef.type === 'number') {
                val = numeral(val).format(colDef.format);
            }
            else if (colDef.type === 'date') {
                val = moment(val).format(colDef.format);
            }
            else if (colDef.type === 'datetime') {
                val = moment(val).format(colDef.format);
            }
        }
        // cellclasses
        if (colDef.hasOwnProperty('cellClasses') && colDef.cellClasses) {
            if (typeof (colDef.cellClasses) == 'function') {
                classArr.push(colDef.cellClasses(params));
            }
            else {
                classArr.push(colDef.cellClasses);
            }
        }
        return '<td class="' + classArr.join(' ') + '" style="' + styleArr.join(';') + '" col-idx="' + colIndex + '">' +
            '<div style="' + styleArr.join(';') + '">' +
            val +
            '</div>' +
            '</td>';
    };
    Grid.prototype.createDataRow = function (row, rowIndex) {
        var _this = this;
        var styleArr = [];
        var arrCenter = [];
        var arrLeft = [];
        var pinnedLeftCount = this.gridOptions.disableHorizontalScroll ? 0 : this.gridOptions.pinnedLeftCount;
        ;
        var returnObj = {};
        var rowStr = '';
        this.columnDefs.forEach(function (colDef, colIdx) {
            if (pinnedLeftCount - 1 >= colIdx) {
                rowStr = _this.createDataCell(row, colDef, rowIndex, colIdx, colIdx === 0);
                arrLeft.push(rowStr);
            }
            else {
                rowStr = _this.createDataCell(row, colDef, rowIndex, colIdx, (colIdx - pinnedLeftCount) === 0);
                arrCenter.push(rowStr);
            }
        }, this);
        if (arrCenter.length > 0) {
            returnObj.center = '<tr style="' + styleArr.join(';') + '" r-idx="' + rowIndex + '">' + arrCenter.join('') + '</tr>';
        }
        if (arrLeft.length > 0) {
            returnObj.left = '<tr style="' + styleArr.join(';') + '" r-idx="' + rowIndex + '">' + arrLeft.join('') + '</tr>';
        }
        return returnObj;
    };
    Grid.prototype.equalizeBodyHeights = function () {
        var pinnedLeftCount = this.gridOptions.pinnedLeftCount;
        var tableBodyLeft = this.tableBodyLeft;
        var tableBodyCenter = this.tableBodyCenter;
        var tdsLeft = Array.prototype.slice.call(this.tableBodyLeft.querySelectorAll('tbody > tr > td'), 0);
        var tdsCenter = Array.prototype.slice.call(this.tableBodyCenter.querySelectorAll('tbody > tr > td'), 0);
        var len = 200; // trsLeft.length;
        var startTime = (new Date()).getTime();
        for (var i = 0; i < len; i++) {
            var tdleft = tdsLeft[i];
            var tdCenter = tdsCenter[i];
            var lH = tdleft.offsetHeight;
            var cH = tdCenter.offsetHeight;
            if (tdleft && tdCenter && lH !== cH) {
                var maxHeight = Math.max(cH, lH);
                tdleft.style.height = tdCenter.style.height = maxHeight + 'px';
            }
        }
        var endTime = (new Date()).getTime();
        console.info('using array total time for ' + len + ' records ' + ((endTime - startTime) / 1000) + ' secs');
    };
    Grid.prototype.sortData = function (field, sortDir) {
    };
    Grid.prototype.equalizeBodyHeights1 = function () {
        var pinnedLeftCount = this.gridOptions.pinnedLeftCount;
        var tableBodyLeft = this.tableBodyLeft;
        var tableBodyCenter = this.tableBodyCenter;
        var trsLeft = tableBodyLeft.querySelectorAll('tbody > tr');
        var trsCenter = tableBodyCenter.querySelectorAll('tbody > tr');
        var len = 200; // trsLeft.length;
        // return;
        // debugger;
        var startTime = (new Date()).getTime();
        for (var i = 0; i < len; i++) {
            var tdleft = trsLeft.item(i).children[0];
            var tdCenter = trsCenter.item(i).children[0];
            var lH = tdleft.offsetHeight;
            var cH = tdCenter.offsetHeight;
            if (tdleft && tdCenter && lH !== cH) {
                var maxHeight = Math.max(cH, lH);
                tdleft.style.height = tdCenter.style.height = maxHeight + 'px';
            }
        }
        var endTime = (new Date()).getTime();
        console.info('direct total time for ' + len + ' records ' + ((endTime - startTime) / 1000) + ' secs');
    };
    Grid.prototype.createBodyData = function () {
        var _this = this;
        var arrCenter = [];
        var arrLeft = [];
        var pinnedLeftCount = this.gridOptions.pinnedLeftCount;
        var rowData = this.gridOptions.rowData.slice(0, 200);
        // let len  = rowData.length;
        rowData.forEach(function (row, rowIndex) {
            var obj = _this.createDataRow(row, rowIndex);
            if (obj.center) {
                arrCenter.push(obj.center);
            }
            if (obj.left) {
                arrLeft.push(obj.left);
            }
        }, this);
        if (arrLeft.length > 0) {
            this.tableBodyLeft.innerHTML = arrLeft.join('');
        }
        this.tableBodyCenter.innerHTML = arrCenter.join('');
        // this.equalizeBodyHeights();
        console.info('bodyContainerCenter scrolWidth', this.bodyContainerCenter.scrollWidth, 'offsetWidth', this.bodyContainerCenter.offsetWidth, 'clientWidth', this.bodyContainerCenter.clientWidth);
        this.bodyContainerLeft.style.height = (this.bodyContainerCenter.clientHeight) + 'px';
        console.info('theGridCenter scrolWidth', this.theGridCenter.scrollWidth, 'offsetWidth', this.theGridCenter.offsetWidth, 'clientWidth', this.theGridCenter.clientWidth);
    };
    Grid.prototype.alignHeadersAndDataCells = function () {
        this.columnDefs.forEach(function (columnDef, idx, arr) {
            if (columnDef.width === 'auto') {
                var th = this.tableHeaderCenter.querySelector('th[col-idx="' + idx + '"]');
                var td = this.tableBodyCenter.querySelector('td[col-idx="' + idx + '"]');
                td.style.width = th.style.width = 'auto';
                var maxWidth = Math.max(th.offsetWdth, td.offsetWdth);
                td.style.width = th.style.width = maxWidth + 'px';
            }
        });
    };
    Grid.prototype.render = function () {
        this.createHeader();
        if (this.gridOptions.rowData.length > 0) {
            this.createBodyData();
            this.alignHeadersAndDataCells();
        }
    };
    Grid.prototype.setDataRow = function (dataRow) {
        if (dataRow.length > 0) {
            this.gridOptions.rowData = dataRow;
            this.createBodyData();
            this.alignHeadersAndDataCells();
        }
    };
    Grid.prototype.setEvents = function () {
        var currentLeft = 0;
        var currentTop = 0;
        var headerContainerInner = this.headerContainerInnerCenter;
        var bodyContainerYscrollLeft = this.bodyContainerYscrollLeft;
        var onScrollEvent = function (event) {
            var scrollLeft = event.currentTarget.scrollLeft;
            var scrollTop = event.currentTarget.scrollTop;
            if (currentLeft !== scrollLeft) {
                currentLeft = scrollLeft;
                headerContainerInner.style.left = (scrollLeft * -1) + 'px';
            }
            if (currentTop !== scrollTop) {
                currentTop = scrollTop;
                bodyContainerYscrollLeft.style.top = (scrollTop * -1) + 'px';
            }
        };
        this.bodyContainerCenter.addEventListener("scroll", onScrollEvent.bind(this));
        var onClickHeader = function (event) {
            var target = event.target;
            var th = $(target).parents('th')[0];
            var colIdx = Number(th.getAttribute('col-idx'));
            var columnDef = this.columnDefs[colIdx];
            if (columnDef.sortable) {
                console.info('sorting=' + columnDef.field);
            }
        };
        this.headerContainerInnerLeft.addEventListener("click", onClickHeader.bind(this));
        this.headerContainerInnerCenter.addEventListener("click", onClickHeader.bind(this));
    };
    return Grid;
})();
