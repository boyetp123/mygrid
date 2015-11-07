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

var HAlignmentClasses ={
	NUMBER : 'text-right',
	TEXT : 'text-left',
	DATE : 'text-center',
	DATETIME : 'text-center'
}

interface gridOptions {
	columnDefs: Array<ColumnDef>,
	rowData: Array<Object>,
	pinnedLeftCount?:number,
	pinnedRightCount?:number,
	// events: Object
	width: string,
	height: string,
	api:Object,
	onReady?:Function,
	rowHeight:string,
	flexRow?:boolean,
	disableVerticalScroll:boolean,
	disableHorizontalScroll:boolean
	
}

class ColumnDef {
	field: string;
	headerName: string; 
	type:string='text';
	format:string;
	cellFormatter:any;
	sortable:boolean;
	width :string='auto';    // string like '100px' or '100%' or auto
	headerClass:any;  // string or function that return string
	cellClass:any;   // string or function that return string
		
	constructor(field: string,	
				headerName: string, 
				type:string='text', 
				format?:string, 
				cellFormatter:Function=null, 
				sortable:boolean=false,
				width:string='auto',   
				headerClass?:any, 
				cellClass?:any){
		this.field = field;
		this.headerName = headerName; 
		this.type = type;
		this.format = format;
		this.cellFormatter = cellFormatter;
		this.sortable = sortable;
		this.width  = width;    
		this.headerClass = headerClass;  
		this.cellClass =cellClass;   					
	}
	
	
}
