// interface IColumnDef{
// 	field: string,
// 	headerName?: string, 
// 	type?:string ,
// 	numberFormat?:string,
// 	cellFormatter?:Function,
// 	sortable?:boolean,
// 	width?:any,    // string like '100px' or '100%' or auto
// 	headerClass?:any,  // string or function that return string
// 	cellClass?:any   // string or function that return string
// }
var ColumnDef = (function () {
    function ColumnDef(field, headerName, type, format, cellFormatter, sortable, width, headerClass, cellClass) {
        if (type === void 0) { type = 'text'; }
        if (cellFormatter === void 0) { cellFormatter = null; }
        if (sortable === void 0) { sortable = false; }
        if (width === void 0) { width = 'auto'; }
        this.type = 'text';
        this.width = 'auto'; // string like '100px' or '100%' or auto
        this.field = field;
        this.headerName = headerName;
        this.type = type;
        this.format = format;
        this.cellFormatter = cellFormatter;
        this.sortable = sortable;
        this.width = width;
        this.headerClass = headerClass;
        this.cellClass = cellClass;
    }
    return ColumnDef;
})();
