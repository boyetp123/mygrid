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
	rowHeight:string
	
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
