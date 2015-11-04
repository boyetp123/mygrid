/// <reference path="../libs/numeraljs.d.ts" />
/// <reference path="mygridDefs.ts" />

class Grid {
	gridContainer:any;
	gridOptions:gridOptions;
	tableBodyCenter:any;
	tableHeaderCenter:any;
	columnDefs:ColumnDef[];
	theGrid:any;
	theGridTdCenterPane:any;
	theGridTdLeftPane:any;
	theGridCenter:any;
	headerContainerCenter:any;
	headerContainerInnerCenter:any;
	bodyContainerCenter:any;
	bodyContainerYscrollCenter:any;	

	theGridLeft:any;
	headerContainerLeft:any; 
	headerContainerInnerLeft:any; 
	tableHeaderLeft:any;
	
	bodyContainerLeft:any; 
	bodyContainerYscrollLeft:any; 
	tableBodyLeft:any;	
	
	
	
	constructor(selector, gridOptions) {
		this.gridContainer = document.querySelector(selector);
		this.setUpProperties(gridOptions)
				
		this.gridContainer.innerHTML = 
			'<div class="mygrid">' +
				'<table>' +
					'<tbody>' +
						'<tr>' +
							'<td class="left-pane" style="display:none">' +
								'<div class=mygrid-left>' +	
									'<div class=mygrid-header>' +
										'<div class=mygrid-header-inner>' +
											'<table><thead><tr></tr></thead></table>' +
										'</div>' +
									'</div>' +
									'<div class=mygrid-body>' +
										'<div class=mygrid-body-y-scroll>' +
											'<table><tbody></tbody></table>'+
										'</div>' +
									'</div>' +
								'</div>' +									
							'</td>' +
							'<td class="center-pane">' +
								'<div class=mygrid-center>' +	
									'<div class=mygrid-header>' +
										'<div class=mygrid-header-inner>' +
											'<table><thead><tr></tr></thead></table>' +
										'</div>' +
									'</div>' +
									'<div class=mygrid-body>' +
										'<div class=mygrid-body-y-scroll>' +
											'<table><tbody></tbody></table>'+
										'</div>' +
									'</div>' +
								'</div>' +									
							'</td>' +
							'<td class="right-pane" style="display:none">' +
								'<div class=mygrid-right>' +	
									'<div class=mygrid-header>' +
										'<div class=mygrid-header-inner>' +
											'<table><thead><tr></tr></thead></table>' +
										'</div>' +
									'</div>' +
									'<div class=mygrid-body>' +
										'<div class=mygrid-body-y-scroll>' +
											'<table><tbody></tbody></table>'+
										'</div>' +
									'</div>' +
								'</div>' +									
									
							'</td>'	+
						'</tr>'	+	
					'</tbody>' +		
				'</table>' +
			'</div>';		
		this.theGrid = this.gridContainer.querySelector('div.mygrid');
		// left pane
		this.theGridTdLeftPane  = this.theGrid.querySelector('td.left-pane');
		this.theGridLeft = this.theGridTdLeftPane.querySelector('div.mygrid-left');
		this.headerContainerLeft = this.theGridLeft.querySelector('div.mygrid-header'); 
		this.headerContainerInnerLeft = this.headerContainerLeft.querySelector('div.mygrid-header-inner'); 
		this.tableHeaderLeft = this.headerContainerInnerLeft.querySelector('table > thead');
		
		this.bodyContainerLeft = this.theGridLeft.querySelector('div.mygrid-body'); 
		this.bodyContainerYscrollLeft = this.bodyContainerLeft.querySelector('div.mygrid-body-y-scroll'); 
		this.tableBodyLeft = this.bodyContainerYscrollLeft.querySelector('table > tbody');
		
		
		// center pane
		this.theGridTdCenterPane  = this.theGrid.querySelector('td.center-pane');
		this.theGridCenter = this.theGridTdCenterPane.querySelector('div.mygrid-center');
		this.headerContainerCenter = this.theGridCenter.querySelector('div.mygrid-header'); 
		this.headerContainerInnerCenter = this.headerContainerCenter.querySelector('div.mygrid-header-inner'); 
		this.tableHeaderCenter = this.headerContainerInnerCenter.querySelector('table > thead');
		
		this.bodyContainerCenter = this.theGridCenter.querySelector('div.mygrid-body'); 
		this.bodyContainerYscrollCenter = this.bodyContainerCenter.querySelector('div.mygrid-body-y-scroll'); 
		this.tableBodyCenter = this.bodyContainerYscrollCenter.querySelector('table > tbody');
		
		// this.theGrid.style.width = this.gridOptions.width || 'auto';
		// this.theGrid.style.height = this.gridOptions.height || 'auto';
		this.setUpWidths();
		
		this.render();
		this.setUpAPI();
		this.setEvents();
		
		if (this.gridOptions.onReady){
			this.gridOptions.onReady(this.gridOptions.api);
		}
	}
	setUpWidths(){
		this.theGrid.style.width = this.gridOptions.width || 'auto';
		this.theGrid.style.height = this.gridOptions.height || 'auto';
		let totalGridWidth = this.theGrid.offsetWidth;
		let pinnedLeftCount = this.gridOptions.pinnedLeftCount;
		let totalLeftWidth = 0;		
		if (pinnedLeftCount > 0){
			this.theGridTdLeftPane.style.display = 'table-cell';
			for(let i = 0; i <pinnedLeftCount ; i++){
				totalLeftWidth = Number(this.columnDefs[i].width.replace('px','').replace('%',''));
			}
			this.theGridTdLeftPane.style.width =  (totalLeftWidth) + 'px';
			this.theGridLeft.style.width =  (totalLeftWidth) + 'px';
			this.headerContainerLeft.style.width =  (totalLeftWidth) + 'px';
			this.bodyContainerLeft.style.width = (totalLeftWidth) + 'px';
		}
		this.theGridTdCenterPane.style.width =  (totalLeftWidth) + 'px';
		this.theGridCenter.style.width =  (totalGridWidth - totalLeftWidth) + 'px';
		this.headerContainerCenter.style.width =  (totalGridWidth - totalLeftWidth) + 'px';
		this.bodyContainerCenter.style.width = (totalGridWidth - totalLeftWidth) + 'px';
	
	}
	setUpProperties(gridOptions){
		this.gridOptions = gridOptions || {};
		this.gridOptions.rowData = gridOptions.rowData || [];
		this.setColumnDefs(gridOptions.columnDefs);		
		this.gridOptions.rowHeight = gridOptions.rowHeight || '30px';			
		this.gridOptions.pinnedLeftCount = gridOptions.pinnedLeftCount || 0;
		this.gridOptions.pinnedRightCount =  gridOptions.pinnedRightCount || 0;
	}
	setUpAPI(){
		this.gridOptions.api = {
			setDataRow : this.setDataRow.bind(this)
		};
		
	}
	setColumnDefs(colDefs:ColumnDef[]){
		this.columnDefs = colDefs.map(function(colDef:ColumnDef){
			return new ColumnDef( colDef.field,
						colDef.headerName , 
						colDef.type ,
						colDef.format ,
						colDef.cellFormatter ,
						colDef.sortable ,
						colDef.width  ,    
						colDef.headerClass ,  
						colDef.cellClass 					
					);
		});
	}	
	createHeader(){
		let arrCenter:Array<string> = [];
		let arrLeft:Array<string> = [];
		let pinnedLeftCount = this.gridOptions.pinnedLeftCount
		
		if (this.gridOptions.columnDefs){
			
			this.columnDefs.forEach((colDef, colIdx)=>{
				if (pinnedLeftCount - 1 >= colIdx){
					arrLeft.push( this.createHeaderCell(colDef, colIdx));					
				} else {
					arrCenter.push( this.createHeaderCell(colDef, colIdx));
				}
			},this);
			
			// arrCenter = this.columnDefs.map((colDef, colIdx)=>{
			// 	return this.createHeaderCell(colDef, colIdx);
			// },this);
			
		}
		if (arrLeft.length > 0) {
			this.tableHeaderLeft.innerHTML = '<tr>' + arrLeft.join('') + '</tr>';
		} 
		this.tableHeaderCenter.innerHTML = '<tr>' + arrCenter.join('') + '</tr>';		
		this.bodyContainerLeft.style.height = this.bodyContainerCenter.style.height = (this.theGrid.offsetHeight - this.headerContainerCenter.offsetHeight) + 'px';		
	}
	createHeaderCell( colDef:ColumnDef, colIdx:number ){
		let styleArr:Array<string>=[];
		if (colDef.width){
			styleArr.push('width:'+colDef.width + '');
		}
		
		return '<th style="' +styleArr.join(';')+ '" col-idx="'+colIdx+'">'+ (colDef.headerName || colDef.field) +'</th>';
	}	
	createDataCell(row:Object, colDef:ColumnDef, rowIndex:number, colIndex:number){
		let val =row[ <string>colDef.field ];
		let styleArr:Array<string>=[];
		if (colDef.width){
			styleArr.push('width:'+colDef.width + '');
		}			
				
		if (colDef.hasOwnProperty('cellFormatter') && typeof(colDef.cellFormatter) == 'function' ){
			let params = {
				data:row,
				rowIndex:rowIndex,
				colIndex:colIndex
			};
			val = colDef.cellFormatter(params);
		} else if (colDef.type === 'number') {
			val = numeral(val).format( colDef.format || '0,0.0000');
		} 
		return  '<td style="'+ styleArr.join(';') +'" col-idx="' +colIndex+ '">' + val + '</td>'; 		
	}
	createDataRow(row:Object, rowIndex:number){
		
		// let rowStr:string = this.columnDefs.map((colDef:ColumnDef, colIndex)=>{
		// 	return this.createDataCell(row, colDef, rowIndex, colIndex);
		// },this).join('');
		let styleArr:Array<string> = [];
		styleArr.push('height:'+this.gridOptions.rowHeight);
		// return '<tr style="'+styleArr.join(';')+'" r-idx="'+rowIndex+'">' + rowStr +'</tr>';
		
		let arrCenter:Array<string> = [];
		let arrLeft:Array<string> = [];
		let pinnedLeftCount = this.gridOptions.pinnedLeftCount;
		let returnObj:any={};
		let rowStr:string='';

		this.columnDefs.forEach((colDef, colIdx)=>{
			rowStr = this.createDataCell(row, colDef, rowIndex, colIdx);			
			if (pinnedLeftCount - 1 >= colIdx){
				arrLeft.push( rowStr );
			} else {
				arrCenter.push( rowStr );
			}
		},this);
		
		if (arrCenter.length > 0){
			returnObj.center ='<tr style="'+styleArr.join(';')+'" r-idx="'+rowIndex+'">' + arrCenter.join('') +'</tr>';
		}
		if (arrLeft.length > 0){
			returnObj.left ='<tr style="'+styleArr.join(';')+'" r-idx="'+rowIndex+'">' + arrLeft.join('') +'</tr>';
		}
		return 	returnObj;	
	}
	createBodyData(){
		let arrCenter:Array<string> = [];
		let arrLeft:Array<string> = [];
		let pinnedLeftCount = this.gridOptions.pinnedLeftCount
		
		if (this.gridOptions.rowData.length > 0){
			this.gridOptions.rowData.forEach((row:Object, rowIndex:number)=>{
				let obj = this.createDataRow(row, rowIndex);
				if (obj.center){
					arrCenter.push(obj.center)
				} 
				if (obj.left){
					arrLeft.push(obj.left)
				}
			},this);			
			// arrCenter = this.gridOptions.rowData.map((row:Object, rowIndex:number)=>{
			// 	return this.createDataRow(row, rowIndex);
			// },this);
		}
		if (arrLeft.length > 0){
			this.tableBodyLeft.innerHTML =arrLeft.join('')
		}
		this.tableBodyCenter.innerHTML =arrCenter.join('')
	}
	alignHeadersAndDataCells(){
		// var thNodes = this.tableHeaderCenter.querySelectorAll('th');
		// let len = thNodes.length;
		// for (let i = 0; i< len;i++){
		// 	let thNode = thNodes.item(i);
        //     let colIdx:string = thNode.getAttribute('col-idx');
		// 	let tdNode = this.tableBodyCenter.querySelector('td[col-idx="'+colIdx+'"]');
		// 	let maxWidth = Math.max(thNode.offsetWidth, tdNode.offsetWidth);
		// 	thNode.style.width = maxWidth+'px';
		// 	tdNode.style.width = maxWidth+'px';
		// }
		
		this.columnDefs.forEach(function(columnDef, idx, arr){
			if (columnDef.width === 'auto'){
				let th = this.tableHeaderCenter.querySelector('th[col-idx="'+idx+'"]');
				let td = this.tableBodyCenter.querySelector('td[col-idx="'+idx+'"]');
				td.style.width = th.style.width ='auto';
				
				let maxWidth = Math.max(th.offsetWdth, td.offsetWdth);
				td.style.width = th.style.width = maxWidth + 'px';
			}
			
		});	
		
		
	}
	render(){
		this.createHeader();
		if (this.gridOptions.rowData.length > 0){
			this.createBodyData();		
			this.alignHeadersAndDataCells();
		}
		
	}
	setDataRow(dataRow){
		if (dataRow.length > 0){			
			this.gridOptions.rowData = dataRow;
			this.createBodyData();		
			this.alignHeadersAndDataCells();
		}
	}
	setEvents(){
		let currentLeft = 0;
		var headerContainerInner = this.headerContainerInnerCenter;
		this.bodyContainerCenter.addEventListener("scroll", function(event) {
			let scrollLeft = event.target.scrollLeft;
			
			if (currentLeft !== scrollLeft ){
				currentLeft = scrollLeft;
				headerContainerInner.style.left = (scrollLeft  * -1 ) + 'px';				
			}
		}); 
	}
		
}