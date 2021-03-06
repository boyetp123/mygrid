/*
interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    // entries(): IterableIterator<[K, V]>;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    // keys(): IterableIterator<K>;
    set(key: K, value?: V): Map<K, V>;
    size: number;
    // values(): IterableIterator<V>;
    // [Symbol.iterator]():IterableIterator<[K,V]>;
    // [Symbol.toStringTag]: string;
}

interface MapConstructor {
    new <K, V>(): Map<K, V>;
    // new <K, V>(iterable: Iterable<[K, V]>): Map<K, V>;
    prototype: Map<any, any>;
}
declare var Map: MapConstructor;

var AlignmentClasses = new Map();
AlignmentClasses.set("NUMBER",'text-right');
AlignmentClasses.set("TEXT",'text-left');
AlignmentClasses.set("DATE",'text-center');
*/
var HAlignmentClasses = Object.freeze({
    NUMBER: 'text-right',
    TEXT: 'text-left',
    DATE: 'text-center',
    DATETIME: 'text-center'
});
var GridHdrClasses = Object.freeze({
    GRID_HDR_CELL: 'grid-hdr-cell'
});
var SortClasses = Object.freeze({
    SORT_DESC: 'sort-descending',
    SORT_ASC: 'sort-ascending',
    SORT_ICONS: 'sort-icons',
    SORTABLE: 'sortable'
});
var DefaultFormats = Object.freeze({
    NUMBER: '0,0.0000',
    TEXT: '',
    DATE: 'MM/DD/YYYY',
    DATETIME: 'MM/DD/YYYY h:mm:ss'
});
var ColumnDef = (function () {
    function ColumnDef(field, headerName, type, format, cellFormatter, headerCellFormatter, sortable, width, headerClasses, cellClasses) {
        if (type === void 0) { type = 'text'; }
        if (cellFormatter === void 0) { cellFormatter = null; }
        if (headerCellFormatter === void 0) { headerCellFormatter = null; }
        if (sortable === void 0) { sortable = false; }
        if (width === void 0) { width = 'auto'; }
        this.type = 'text';
        this.width = 'auto'; // string like '100px' or '100%' or auto
        this.field = field;
        this.headerName = headerName;
        this.type = type;
        this.format = format || DefaultFormats[type.toLowerCase()];
        this.cellFormatter = cellFormatter;
        this.sortable = sortable || false;
        this.width = width;
        this.headerClasses = headerClasses;
        this.cellClasses = cellClasses;
    }
    return ColumnDef;
}());
