/// <reference path="../libs/jquery.d.ts" />
/// <reference path="../libs/numeraljs.d.ts" />
/// <reference path="../libs/moment.d.ts" />
/// <reference path="mygridDefs.ts" />
var Grid = (function () {
    function Grid(selector, gridOptions) {
        this.hasInitCcompleted = false;
        this.gridContainer = document.querySelector(selector);
        this.setUpProperties(gridOptions);
        this.createGridContainers();
        this.setUpWidths();
        this.render();
        this.setUpAPI();
        this.setEvents();
        if (this.gridOptions.onReady) {
            this.gridOptions.onReady(this.gridOptions.api);
        }
        this.hasInitCcompleted = true;
    }
    Grid.prototype.createGridContainers = function () {
        var innerHTMLs = ['<div class="mygrid">'];
        innerHTMLs.push('<table>');
        innerHTMLs.push('<tbody>');
        innerHTMLs.push('<tr>');
        innerHTMLs.push('<td class="left-pane" style="display:none">');
        innerHTMLs.push('<div class="mygrid-left">');
        innerHTMLs.push('<div class="mygrid-header">');
        innerHTMLs.push('<div class="mygrid-header-inner">');
        innerHTMLs.push('<table><thead><tr></tr></thead></table>');
        innerHTMLs.push('</div>');
        innerHTMLs.push('</div>');
        innerHTMLs.push('<div class="mygrid-body">');
        innerHTMLs.push('<div class="mygrid-body-y-scroll">');
        innerHTMLs.push('<table><tbody></tbody></table>');
        innerHTMLs.push('</div>');
        innerHTMLs.push('</div>');
        innerHTMLs.push('</div>');
        innerHTMLs.push('</td>');
        innerHTMLs.push('<td class="center-pane">');
        innerHTMLs.push('<div class="mygrid-center">');
        innerHTMLs.push('<div class="mygrid-header">');
        innerHTMLs.push('<div class="mygrid-header-inner">');
        innerHTMLs.push('<table><thead><tr></tr></thead></table>');
        innerHTMLs.push('</div>');
        innerHTMLs.push('</div>');
        innerHTMLs.push('<div class="mygrid-body">');
        innerHTMLs.push('<div class="mygrid-body-y-scroll">');
        innerHTMLs.push('<table><tbody></tbody></table>');
        innerHTMLs.push('</div>');
        innerHTMLs.push('</div>');
        innerHTMLs.push('</div>');
        innerHTMLs.push('</td>');
        innerHTMLs.push('<td class="right-pane" style="display:none">');
        innerHTMLs.push('<div class="mygrid-right">');
        innerHTMLs.push('<div class="mygrid-header">');
        innerHTMLs.push('<div class="mygrid-header-inner">');
        innerHTMLs.push('<table><thead><tr></tr></thead></table>');
        innerHTMLs.push('</div>');
        innerHTMLs.push('</div>');
        innerHTMLs.push('<div class="mygrid-body">');
        innerHTMLs.push('<div class="mygrid-body-y-scroll">');
        innerHTMLs.push('<table><tbody></tbody></table>');
        innerHTMLs.push('</div>');
        innerHTMLs.push('</div>');
        innerHTMLs.push('</div>');
        innerHTMLs.push('</td>');
        innerHTMLs.push('</tr>');
        innerHTMLs.push('</tbody>');
        innerHTMLs.push('</table>');
        innerHTMLs.push('</div>');
        this.gridContainer.innerHTML = innerHTMLs.join('');
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
        if (pinnedLeftCount > 0 && this.columnDefs.length > 0) {
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
        var icons = gridOptions.icons || { sortDescending: null, sortAscending: null, groupCollapsed: null, groupExpanded: null };
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
        this.gridOptions.equalRowHeights = gridOptions.equalRowHeights || false;
        this.gridOptions.isGrouped = gridOptions.isGrouped || false;
        this.gridOptions.isDataAlreadyGrouped = gridOptions.isDataAlreadyGrouped || false;
        this.gridOptions.icons = {
            sortDescending: icons.sortDescending || '<span>&#x2193;</span>',
            sortAscending: icons.sortAscending || '<span>&#x2191;</span>',
            groupCollapsed: icons.groupCollapsed || '<span>&gt;</span>',
            groupExpanded: icons.groupExpanded || '<span>v</span>'
        };
        this.gridOptions.icons.sortDescending = '<span class="' + SortClasses.SORT_DESC + '" style="display:none">' + this.gridOptions.icons.sortDescending + '</span>';
        this.gridOptions.icons.sortAscending = '<span class="' + SortClasses.SORT_ASC + '" style="display:none">' + this.gridOptions.icons.sortAscending + '</span>';
    };
    Grid.prototype.setUpAPI = function () {
        this.gridOptions.api = {
            setDataRow: this.setDataRow.bind(this),
            setColumnDefs: this.setColumnDefs.bind(this)
        };
    };
    Grid.prototype.setColumnDefs = function (colDefs) {
        this.columnDefs = [];
        this.columnDefs = colDefs.map(function (colDef) {
            return new ColumnDef(colDef.field, colDef.headerName, colDef.type, colDef.format, colDef.cellFormatter, colDef.headerCellFormatter, colDef.sortable, colDef.width, colDef.headerClasses, colDef.cellClasses);
        });
        if (this.hasInitCcompleted) {
            this.setUpWidths();
            this.render();
        }
    };
    Grid.prototype.createHeader = function () {
        var _this = this;
        var arrCenter = [];
        var arrLeft = [];
        var pinnedLeftCount = this.gridOptions.disableHorizontalScroll ? 0 : this.gridOptions.pinnedLeftCount;
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
        var classArr = [GridHdrClasses.GRID_HDR_CELL];
        var icons = this.gridOptions.icons;
        var val = (colDef.headerName || colDef.field);
        var params = {
            colIndex: colIdx,
            classes: classArr,
            colDef: colDef
        };
        if (colDef.width) {
            styleArr.push('width:' + colDef.width + '');
        }
        classArr.push(HAlignmentClasses[colDef.type.toUpperCase()]);
        if (colDef.sortable) {
            classArr.push(SortClasses.SORTABLE);
        }
        if (colDef.hasOwnProperty('headerCellFormatter') && typeof (colDef.headerCellFormatter) == 'function') {
            val = colDef.headerCellFormatter(params);
            classArr = params.classes;
        }
        return '<th class="' + classArr.join(' ') + '" style="' + styleArr.join(';') + '" col-idx="' + colIdx + '">' +
            '<div style="' + styleArr.join(';') + '" >' +
            '<span>' + val + '</span>' + '<span class="' + SortClasses.SORTABLE + '">' + icons.sortDescending + icons.sortAscending + '</span>' +
            '</div>' +
            '</th>';
    };
    Grid.prototype.createDataCell = function (rowObj, colDef, rowIndex, colIndex, isFirst) {
        var row = rowObj.data;
        var val = row.hasOwnProperty(colDef.field) ? row[colDef.field] : '';
        var styleArr = [];
        var classArr = ['grid-cell'];
        var isGrouped = rowObj.group && this.gridOptions.isGrouped;
        var isDataAlreadyGrouped = this.gridOptions.isDataAlreadyGrouped;
        var groupedIcon = "";
        if (isGrouped && isDataAlreadyGrouped && colIndex === 0) {
            var groupCollapsed = '<span class="group-collapse" style="display:' + (!rowObj.expanded ? 'inline' : 'none') + '">' + this.gridOptions.icons.groupCollapsed + '</span>';
            var groupExpanded = '<span class="group-expand" style="display:' + (rowObj.expanded ? 'inline' : 'none') + '">' + this.gridOptions.icons.groupExpanded + '</span>';
            groupedIcon = '<span class="grouped-icons">' + groupCollapsed + groupExpanded + '</span>';
        }
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
        else if (row.hasOwnProperty(colDef.field)) {
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
            groupedIcon + val +
            '</div>' +
            '</td>';
    };
    Grid.prototype.createDataRow = function (row, rowIndex, rowGroupLevel, parentRowIndex) {
        var _this = this;
        var styleArr = [];
        var arrCenter = [];
        var arrLeft = [];
        var pinnedLeftCount = this.gridOptions.disableHorizontalScroll ? 0 : this.gridOptions.pinnedLeftCount;
        ;
        var returnObj = {};
        var rowStr = '';
        var isGrouped = this.gridOptions.isGrouped;
        var isDataAlreadyGrouped = this.gridOptions.isDataAlreadyGrouped;
        var pid = row.childIndex + '' + row.level;
        // row.parent = parentRowIndex === 0 ? null : 
        this.columnDefs.forEach(function (colDef, colIdx) {
            // let rowData =  (isGrouped && isDataAlreadyGrouped ) ? row.data : row;
            var rowData = row;
            if (pinnedLeftCount - 1 >= colIdx) {
                // rowStr = this.createDataCell(rowData, colDef, rowIndex, colIdx , colIdx === 0);			
                rowStr = _this.createDataCell(rowData, colDef, rowIndex, colIdx, colIdx === 0);
                arrLeft.push(rowStr);
            }
            else {
                // rowStr = this.createDataCell(rowData, colDef, rowIndex, colIdx , (colIdx - pinnedLeftCount) === 0 );			
                rowStr = _this.createDataCell(rowData, colDef, rowIndex, colIdx, (colIdx - pinnedLeftCount) === 0);
                arrCenter.push(rowStr);
            }
        }, this);
        if (arrCenter.length > 0) {
            returnObj.center = '<tr pid="' + pid + '" style="' + styleArr.join(';') + '" pr-idx="' + parentRowIndex + '" lvl="' + rowGroupLevel + '" r-idx="' + rowIndex + '">' + arrCenter.join('') + '</tr>';
        }
        if (arrLeft.length > 0) {
            returnObj.left = '<tr pid="' + pid + '" style="' + styleArr.join(';') + '" pr-idx="' + parentRowIndex + '" lvl="' + rowGroupLevel + '"  r-idx="' + rowIndex + '">' + arrLeft.join('') + '</tr>';
        }
        return returnObj;
    };
    Grid.prototype.renderChildrenDataRows = function (rowData, rowGroupLevel, parentRowIndex) {
        var _this = this;
        var arrCenter = [];
        var arrLeft = [];
        var pinnedLeftCount = this.gridOptions.pinnedLeftCount;
        rowData.children.forEach(function (row, rowIndex) {
            var obj = _this.createDataRow(row, rowIndex, rowGroupLevel, parentRowIndex);
            // obj.pid = rowData.childIndex + '' + rowData.level;
            if (obj.center) {
                arrCenter.push(obj.center);
            }
            if (obj.left) {
                arrLeft.push(obj.left);
            }
        }, this);
        if (arrLeft.length > 0) {
            $(this.tableBodyLeft).append(arrLeft.join(''));
        }
        $(this.tableBodyCenter).find('tr[r-idx="' + rowData.childIndex + '"][lvl="' + rowData.level + '"]').after(arrCenter.join(''));
        if (this.gridOptions.equalRowHeights === true) {
            this.equalizeBodyHeights();
        }
        this.bodyContainerLeft.style.height = (this.bodyContainerCenter.clientHeight) + 'px';
    };
    Grid.prototype.equalizeBodyHeights = function () {
        var pinnedLeftCount = this.gridOptions.pinnedLeftCount;
        var tableBodyLeft = this.tableBodyLeft;
        var tableBodyCenter = this.tableBodyCenter;
        var centerColStartIdx = pinnedLeftCount;
        var tdsLeft = Array.prototype.slice.call(this.tableBodyLeft.querySelectorAll('tbody > tr > td[col-idx="0"]'), 0);
        var tdsCenter = Array.prototype.slice.call(this.tableBodyCenter.querySelectorAll('tbody > tr > td[col-idx="' + centerColStartIdx + '"]'), 0);
        var len = tdsLeft.length;
        var startTime = (new Date()).getTime();
        for (var i = 0; i < len; i++) {
            var tdleft = tdsLeft[i];
            var tdCenter = tdsCenter[i];
            var lH = tdleft.offsetHeight;
            var cH = tdCenter.offsetHeight;
            if (tdleft && tdCenter && lH !== cH) {
                console.info('equalizing height');
                var maxHeight = Math.max(cH, lH);
                tdleft.style.height = tdCenter.style.height = maxHeight + 'px';
            }
        }
        var endTime = (new Date()).getTime();
        console.info('using array total time for ' + len + ' records ' + ((endTime - startTime) / 1000) + ' secs');
    };
    Grid.prototype.sortData = function (field, sortDir) {
        var sortFun = function (a, b) {
            var retval = 0;
            if (sortDir == 'asc') {
                if (a[field] > b[field]) {
                    retval = 1;
                }
                else if (a[field] < b[field]) {
                    retval = -1;
                }
            }
            else {
                if (a[field] > b[field]) {
                    retval = -1;
                }
                else if (a[field] < b[field]) {
                    retval = 1;
                }
            }
            console.info('sorting a.' + field, a[field], 'b.' + field, b[field], 'sortDir', sortDir, 'return', retval);
            return retval;
        };
        var rowData = this.gridOptions.rowData.sort(function (a, b) { return sortFun(a, b); });
        this.createBodyData(rowData, 0, 0);
    };
    Grid.prototype.createBodyData = function (rowData, rowGroupLevel, parentRowIndex) {
        var _this = this;
        var arrCenter = [];
        var arrLeft = [];
        var pinnedLeftCount = this.gridOptions.pinnedLeftCount;
        // let rowData = this.gridOptions.rowData.slice(0,200);
        // let len  = rowData.length;
        rowData.forEach(function (row, rowIndex) {
            var obj = _this.createDataRow(row, rowIndex, rowGroupLevel, parentRowIndex);
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
        if (this.gridOptions.equalRowHeights === true) {
            this.equalizeBodyHeights();
        }
        // console.info('bodyContainerCenter scrolWidth',this.bodyContainerCenter.scrollWidth,
        // 	'offsetWidth',this.bodyContainerCenter.offsetWidth,
        // 	'clientWidth',this.bodyContainerCenter.clientWidth);
        this.bodyContainerLeft.style.height = (this.bodyContainerCenter.clientHeight) + 'px';
        // console.info('theGridCenter scrolWidth',this.theGridCenter.scrollWidth,
        // 	'offsetWidth',this.theGridCenter.offsetWidth,
        // 	'clientWidth',this.theGridCenter.clientWidth);
    };
    Grid.prototype.alignHeadersAndDataCells = function () {
        var _this = this;
        this.columnDefs.forEach(function (columnDef, idx, arr) {
            if (columnDef.width === 'auto') {
                var th = _this.tableHeaderCenter.querySelector('th[col-idx="' + idx + '"]');
                var td = _this.tableBodyCenter.querySelector('td[col-idx="' + idx + '"]');
                td.style.width = th.style.width = 'auto';
                var maxWidth = Math.max(th.offsetWdth, td.offsetWdth);
                td.style.width = th.style.width = maxWidth + 'px';
            }
        });
    };
    Grid.prototype.render = function () {
        this.createHeader();
        if (this.gridOptions.rowData.length > 0) {
            this.createBodyData(this.gridOptions.rowData, 0, 0);
            this.alignHeadersAndDataCells();
        }
    };
    Grid.prototype.getRowDataObj = function (level, rowIndex, parentRowIndex, trDomElem) {
        if (level === 0) {
            return this.gridOptions.rowData[rowIndex];
        }
        else {
            var $tr = $(trDomElem).parents('tr');
            var $tr1 = $($tr[0]);
            var level_1 = Number($tr1.attr('lvl') || '0');
            var rIndex = Number($tr1.attr('r-idx') || '0');
            var prIndex = Number($tr1.attr('pr-idx') || '0');
            return (this.getRowDataObj(level_1, rIndex, prIndex, $tr[0]));
        }
    };
    Grid.prototype.expandCollapseChildren = function (obj) {
        if (obj.isExpand) {
            var row = this.getRowDataObj(obj.level, obj.rowIndex, obj.parentRowIndex, obj.trDomElem);
            this.renderChildrenDataRows(row, obj.level + 1, obj.parentRowIndex);
        }
        else {
            this.removeChildrenDataRows();
        }
    };
    Grid.prototype.removeChildrenDataRows = function () {
    };
    Grid.prototype.processData = function (rows, parentNode, level) {
        rows.forEach(function (row, idx) {
            row.parent = parentNode;
            row.level = level;
            row.childIndex = idx;
            if (typeof (row.children) != 'undefined' && row.children instanceof Array) {
                this.processData(row.children, row, level + 1);
            }
        }, this);
    };
    Grid.prototype.setDataRow = function (dataRow) {
        if (dataRow.length > 0) {
            // this.gridOptions.rowData = dataRow;
            this.gridOptions.rowData = dataRow.slice(0, 200);
            this.processData(this.gridOptions.rowData, null, 0);
            this.createBodyData(this.gridOptions.rowData, 0, 0);
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
        var sortingDir = '';
        var onClickHeader = function (event) {
            var target = event.target;
            var th = $(target).parents('th')[0];
            var colIdx = Number(th.getAttribute('col-idx'));
            var columnDef = this.columnDefs[colIdx];
            sortingDir = sortingDir == 'asc' ? 'desc' : 'asc';
            if (columnDef.sortable) {
                console.info('start sorting=' + columnDef.field + '; dir = ' + sortingDir);
                var ascDesc = '.' + SortClasses.SORT_ASC + ', .' + SortClasses.SORT_DESC;
                $(this.headerContainerInnerLeft).find(ascDesc).hide();
                $(this.headerContainerInnerCenter).find(ascDesc).hide();
                if (this.gridOptions.onSort) {
                    this.gridOptions.onSort(columnDef.field, sortingDir);
                }
                else {
                    this.sortData(columnDef.field, sortingDir);
                    if (sortingDir === 'asc') {
                        $(th).find('.' + SortClasses.SORT_ASC).show();
                    }
                    else {
                        $(th).find('.' + SortClasses.SORT_DESC).show();
                    }
                }
                console.info('done sorting=' + columnDef.field + '; dir = ' + sortingDir);
            }
        };
        this.bodyContainerCenter.addEventListener('click', this.onBodyClick.bind(this));
        this.headerContainerInnerLeft.addEventListener("click", onClickHeader.bind(this));
        this.headerContainerInnerCenter.addEventListener("click", onClickHeader.bind(this));
    };
    Grid.prototype.showElement = function (el) {
        if (el) {
            el.style.display = '';
        }
    };
    Grid.prototype.hideElement = function (el) {
        if (el) {
            el.style.display = 'none';
        }
    };
    Grid.prototype.parent = function (elem, until) {
        until = until || '';
        if (elem && (elem.tagName || '').toUpperCase() === until.toUpperCase()) {
            return elem;
        }
        else if (elem && elem.parentNode) {
            return this.parent(elem.parentNode, until);
        }
        return null;
    };
    Grid.prototype.onBodyClick = function (event) {
        var target = event.target;
        if (target) {
            var $target = $(target);
            var $tr = $(target).parents('tr');
            // let tr = this.parent(target,'tr');
            if ($target.parents('span.grouped-icons').length > 0) {
                var p = target.parentNode;
                var p2 = p.parentNode;
                var isExpand = false;
                if (p.classList.contains('group-collapse') || target.classList.contains('group-collapse')) {
                    this.hideElement(p2.querySelector('.group-collapse'));
                    this.showElement(p2.querySelector('.group-expand'));
                    isExpand = true;
                }
                else if (p.classList.contains('group-expand') || target.classList.contains('group-expand')) {
                    this.showElement(p2.querySelector('.group-collapse'));
                    this.hideElement(p2.querySelector('.group-expand'));
                    isExpand = false;
                }
                var $tr1 = $($tr[0]);
                var level = Number($tr1.attr('lvl') || '0');
                var rIndex = Number($tr1.attr('r-idx') || '0');
                var prIndex = Number($tr1.attr('pr-idx') || '0');
                this.expandCollapseChildren({ isExpand: isExpand, level: level, rowIndex: rIndex, parentRowIndex: prIndex, trDomElem: $tr[0] });
            }
        }
    };
    return Grid;
}());
