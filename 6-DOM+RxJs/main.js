// import "./style/main.css";
import * as RX from "rxjs/Observable";
// console.log(RX);  
import { fromEvent, Subscription } from 'rxjs/Observable/fromEvent';
import { throttleTime, scan } from 'rxjs/operators';
import { startWith ,filter} from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { Observable} from 'rxjs/Observable'
import { interval } from "rxjs";
let defaultRowCount = 20; // number of rows
let defaultColCount = 15; // number of cols
const SPREADSHEET= "spreadsheet";
let insertRow = defaultRowCount;
let insertCol = defaultColCount;

const addRowBtn=document.getElementById("addRow");
const addColBtn=document.getElementById("addCol");
const delRowBtn=document.getElementById("delRow");
const delColBtn=document.getElementById("delCol");
const impCsvBtn=document.getElementById("impCsv");
const expCsvBtn=document.getElementById("expCsv");

/**
 * this is the arithmic function
 * depend on different input it has different function
 */
const sumFun =fromEvent(document, "keyup").pipe(filter(e => e.keyCode == 13));
  sumFun
  .subscribe(
    function(e) {
      // console.log(e.target.innerHTML)
      if(e.target){
        if(e.target.innerHTML){
          let str=e.target.innerText
          //console.log(str); 
          if(str.startsWith("=SUM(")&&str.match(/\(([^)]*)\)/))
          { 
            e.target.setAttribute("value",str);
            // console.log(e.target.getAttribute(`value`));
            e.target.addEventListener("dblclick",e=>{
              e.target.innerHTML=e.target.getAttribute(`value`);
            });
            str = str.match(/\(([^)]*)\)/);
            str = str[1];
            let arr=str.match(/[a-zA-Z]+|[0-9]+(?:\.[0-9]+|)/g);
            let c1=arr[0].charCodeAt()-64;
            let c2=arr[2].charCodeAt()-64;
            if(c1>0&&c1<=defaultColCount&&arr[1]>0&&arr[1]<=defaultColCount&&
              arr[3]>0&&arr[3]<=defaultRowCount&&c2>0&&c2<=defaultColCount
              ){
                let tds = document.getElementsByTagName("TD");
                // console.log(tds);
                let sum=0;
                for(let j=0;j<tds.length;j++){
                  let tdrc=tds[j].id.split('-');
                //  console.log(tdrc);
                  if(tds[j].innerHTML!==""){
                  // console.log("out side if "+j+tds[j].innerHTML+" "+tdrc[1]+" "+tdrc[2]);
                  // console.log()
                  }
                  //  console.log(j);
                  if(tdrc[2]>=c1&&tdrc[1]>=arr[1]&&tdrc[2]<=c2&&tdrc[1]<=arr[3]){
                    // console.log("inside if"+j+tds[j].innerHTML+" "+tdrc[1]+" "+tdrc[2]);
                    if(tds[j].innerText!==""){
                      sum = sum+parseInt(tds[j].innerHTML);
                    }else{
                      sum = sum+0;
                    }
                    
                  }
                }
                e.target.innerHTML=sum;
              }else{
                e.target.innerHTML="error";
                // e.target.style.backgroundColor='black';
                alert("out of boundry");
                // sumFun.unsubscribe();
                // cell.unsc
              }
            
          }
          else if(str.startsWith("=MUTIPLY(")&&str.match(/\(([^)]*)\)/))
          {
            str = str.match(/\(([^)]*)\)/);
            str = str[1];
            let arr=str.match(/[a-zA-Z]+|[0-9]+(?:\.[0-9]+|)/g);
            // console.log(arr);
            // let arr = str.split(/[:]/);//arr[1],arr[2];arr[4],arr[5]
            // console.log(arr);
            let c1=arr[0].charCodeAt()-64;
            let c2=arr[2].charCodeAt()-64;
            if(c1>0&&c1<=defaultColCount&&arr[1]>0&&arr[1]<=defaultColCount&&
              arr[3]>0&&arr[3]<=defaultRowCount&&c2>0&&c2<=defaultColCount
              ){
                let tds = document.getElementsByTagName("TD");
                let mul=1;
                for(let j=0;j<tds.length;j++){
                  let tdrc=tds[j].id.split('-');
                //  console.log(tdrc);
                  if(tds[j].innerHTML!==""){
                  // console.log("out side if "+j+tds[j].innerHTML+" "+tdrc[1]+" "+tdrc[2]);
                  // console.log()
                  }
                  //  console.log(j);
                  if(tdrc[2]>=c1&&tdrc[1]>=arr[1]&&tdrc[2]<=c2&&tdrc[1]<=arr[3]){
                    // console.log("inside if"+j+tds[j].innerHTML+" "+tdrc[1]+" "+tdrc[2]);
                    if(tds[j].innerText!==""){
                      mul = mul*parseInt(tds[j].innerHTML);
                    }else{
                      mul = mul*1;
                    }
                    
                  }
                }
                e.target.innerHTML=mul;
              }else{
                e.target.innerHTML="error";
                // e.target.style.backgroundColor='black';
                alert("out of boundry");
                // cell.unsc
              }
            
          }else if(str.startsWith("=MINUS(")&&str.match(/\(([^)]*)\)/))
          {
            str = str.match(/\(([^)]*)\)/);
            // console.log("match"+str);
            str = str[1];
            // console.log("str[1]"+str);
            let arr=str.match(/[a-zA-Z]+|[0-9]+(?:\.[0-9]+|)/g);
            // console.log(arr);
            // let arr = str.split(/[:]/);//arr[1],arr[2];arr[4],arr[5]
            // console.log(arr);
            let c1=arr[0].charCodeAt()-64;
            let c2=arr[2].charCodeAt()-64;
            if(c1>0&&c1<=defaultColCount&&arr[1]>0&&arr[1]<=defaultColCount&&
              arr[3]>0&&arr[3]<=defaultRowCount&&c2>0&&c2<=defaultColCount
              ){
                let tds = document.getElementsByTagName("TD");
                // console.log(tds);
                let matrix=getMatrix();
                console.log(c1,arr[1]);
                console.log(matrix);
                let min=0;
                let tem=0;
                for (let i = 1; i < matrix.length; i++) {
                  for (let j = 1; j < matrix[i].length; j++) {
                    if(i===parseInt(arr[1])&&j===c1){ 
                      min=matrix[i][j];
                      tem=min;
                      // console.log(min);
                    }
                  }
                }
                
                for(let j=0;j<tds.length;j++){
                  let tdrc=tds[j].id.split('-');
                //  console.log(tdrc);
                  if(tds[j].innerHTML!==""){
                  // console.log("out side if "+j+tds[j].innerHTML+" "+tdrc[1]+" "+tdrc[2]);
                  // console.log()
                  }
                  //  console.log(j);
                  if(tdrc[2]>=c1&&tdrc[1]>=arr[1]&&tdrc[2]<=c2&&tdrc[1]<=arr[3]){
                    // console.log("inside if"+j+tds[j].innerHTML+" "+tdrc[1]+" "+tdrc[2]);
                    if(tds[j].innerText!==""&&tdrc[2]!==c1&&tdrc[1]!==arr[1]){
                      min = min-parseInt(tds[j].innerHTML);
                    }else{
                      min=min-0;
                    }
                    
                  }
                }
                e.target.innerHTML=min;
              }else{
                e.target.innerHTML="error";
                // e.target.style.backgroundColor='black';
                alert("out of boundry");
                // cell.unsc
              }
            
          }else if(str.startsWith("=DIVIDE(")&&str.match(/\(([^)]*)\)/))
          {
            str = str.match(/\(([^)]*)\)/);
            // console.log("match"+str);
            str = str[1];
            // console.log("str[1]"+str);
            let arr=str.match(/[a-zA-Z]+|[0-9]+(?:\.[0-9]+|)/g);
            // console.log(arr);
            // let arr = str.split(/[:]/);//arr[1],arr[2];arr[4],arr[5]
            // console.log(arr);
            let c1=arr[0].charCodeAt()-64;
            let c2=arr[2].charCodeAt()-64;
            if(c1>0&&c1<=defaultColCount&&arr[1]>0&&arr[1]<=defaultColCount&&
              arr[3]>0&&arr[3]<=defaultRowCount&&c2>0&&c2<=defaultColCount
              ){
                let tds = document.getElementsByTagName("TD");
                // console.log(tds);
                let matrix=getMatrix();
                console.log(c1,arr[1]);
                console.log(matrix);
                let div=0;
                let tem=0;
                for (let i = 1; i < matrix.length; i++) {
                  for (let j = 1; j < matrix[i].length; j++) {
                    if(i===parseInt(arr[1])&&j===c1){ 
                      div=matrix[i][j];
                      tem=div;
                      // console.log(div);
                    }
                  }
                }
                
                for(let j=0;j<tds.length;j++){
                  let tdrc=tds[j].id.split('-');
                //  console.log(tdrc);
                  if(tds[j].innerHTML!==""){
                  // console.log("out side if "+j+tds[j].innerHTML+" "+tdrc[1]+" "+tdrc[2]);
                  // console.log()
                  }
                  //  console.log(j);
                  if(tdrc[2]>=c1&&tdrc[1]>=arr[1]&&tdrc[2]<=c2&&tdrc[1]<=arr[3]){
                    // console.log("inside if"+j+tds[j].innerHTML+" "+tdrc[1]+" "+tdrc[2]);
                    if(tds[j].innerText!==""&&tdrc[2]!==c1&&tdrc[1]!==arr[1]){
                      if(parseInt(tds[j].innerHTML)===0){
                        alert("zero can not be divided")
                        e.target.innerHTML="error";
                      }
                      else div = div/parseInt(tds[j].innerHTML);
                    }else{
                      div=div/1;
                    }
                    
                  }
                }
                e.target.innerHTML=div;
              }else{
                e.target.innerHTML="error";
                // e.target.style.backgroundColor='black';
                alert("out of boundry");
                // cell.unsc
              }
            
          }
        }
        
      }
      
    }
  );

/**
 *this is used to initialize a matrix to store the table
 *
 * @returns the matrix
 */
function initializeMatrix() {
    const matrix = [];
    for (let i = 0; i < defaultRowCount; i++) {
      const child = [];
      for (let j = 0; j < defaultColCount; j++) {
        child.push("");
      }
      matrix.push(child);
    }
    return matrix;
  };

/**8
 *this is used to retrieve matrix
 *
 * @returns JSON file or initializeMatrix
 */
function getMatrix(){
    let matrix=localStorage.getItem(SPREADSHEET);
    if(matrix===null||matrix===undefined){
        return initializeMatrix();
    }else {
        return JSON.parse(matrix);
    }
}
/**
 *this is used to store the matrix
 *
 * @param {*} matrix the matrix to store the table
 */
function saveMatrix(matrix){
    localStorage.setItem(SPREADSHEET,JSON.stringify(matrix));
};

/**
 *
 *create the row on the top of the table which is not editable
 * @returns the row of the header
 */
function createHeaderRow(){
    const tr=document.createElement("tr");
    tr.setAttribute("id","h-0");
    for(let i=0;i<defaultColCount;i++){
        const th=document.createElement("th");
        th.setAttribute("id",`h-0-${i}`);
        th.setAttribute("class",`${i===0?"":"column-header"}`);
        if (i !== 0) {
            const span = document.createElement("span");
            // let s=`A`;
            let num=64;
            let str=String.fromCharCode(num+i);
            span.innerHTML = str;
            span.setAttribute("class", "column-header-span");
            th.appendChild(span);
          }
          tr.appendChild(th);
    }
    return tr;
};
/**
 *create the row of the body
 *
 * @param {*} rowNum where we create the row
 * @returns the row of body
 */
function createBodyRow(rowNum){
    const tr=document.createElement("tr");
    tr.setAttribute("id",`r-${rowNum}`);
    for(let i=0;i<defaultColCount;i++){
        const cell=document.createElement(`${i===0?"th":"td"}`);
        if(i===0){
            cell.contentEditable=false;
            const span = document.createElement("span");
            span.innerHTML = rowNum;
            // span.setAttribute("class", "column-header-span");
            cell.appendChild(span);
            cell.setAttribute("class","row-header");
        }else{
            cell.contentEditable=true;
            cell.setAttribute("class","cell");
        }
        cell.setAttribute("id",`r-${rowNum}-${i}`); 
        tr.appendChild(cell);
    }
    return tr;
}
/**
 *this is used to create row of tableBody
 *
 * @param {*} tableBody the body part of table
 */
function createTableBody(tableBody){
    for (let rowNum = 1; rowNum < defaultRowCount; rowNum++) {
      tableBody.appendChild(createBodyRow(rowNum));
    }
  }
/**
 *this is used to show the table
 *
 * @returns if matrix is null or undefined don't show
 */
function  populateTable (){
    let matrix = getMatrix();
    if (matrix === undefined || matrix=== null) return;
  
    for (let i = 1; i < matrix.length; i++) {
      for (let j = 1; j < matrix[i].length; j++) {
        let cell = document.getElementById(`r-${i}-${j}`);
        cell.innerHTML = matrix[i][j];
      }
    }
}
/** 
 *this is used to add a row to the body
 *
 * @param {*} currentRow where we insert the row
 * @param {*} direction insert the row above or below
 */
function addRow(currentRow) {
    let matrix = getMatrix();
    let colCount = matrix[0].length;
    let  newRow = new Array(colCount).fill("");
    matrix.splice(currentRow + 1, 0, newRow);
    defaultRowCount++;
    saveMatrix(matrix);
    createSpreadsheet();
  }
/**
 *this is used to delete row
 *
 * @param {*} currentRow the row needs to be deleted
 */
function deleteRow(currentRow){
    let matrix=getMatrix();
    matrix.splice(currentRow,1);
    defaultRowCount--;
    saveMatrix(matrix);
    createSpreadsheet();
}
/**
 *this is used to add a column
 *
 * @param {*} currentCol where we add the column on its right
 */
function addColumn(currentCol){
    let matrix=getMatrix();
    for(let i=0;i<defaultRowCount;i++){
        matrix[i].splice(currentCol+1,0,"");
    }
    defaultColCount++;
    saveMatrix(matrix);
    createSpreadsheet();
}
/**
 *this is used to delete the column
 *
 * @param {*} currentCol the column needs to be deleted
 */
function deleteColumn(currentCol){
    let matrix=getMatrix();
    for(let i=0;i<defaultRowCount;i++){
        matrix[i].splice(currentCol,1);
    }
    defaultColCount++;
    saveMatrix(matrix);
    createSpreadsheet();
}
/**
 *this function is going to create the whole spreadsheet
 *
 */
function createSpreadsheet(){


    let tableHeaderElement=document.getElementById("table-headers");
    let tableBodyElement=document.getElementById("table-body");
    console.log(tableHeaderElement)
    let tableBody = tableBodyElement.cloneNode(true);
    tableBodyElement.parentNode.replaceChild(tableBody, tableBodyElement);
    let tableHeaders = tableHeaderElement.cloneNode(true);
    tableHeaderElement.parentNode.replaceChild(tableHeaders, tableHeaderElement);

    let matrix=getMatrix();
    defaultRowCount=matrix.length||defaultRowCount;
    defaultColCount=matrix[0].length||defaultColCount


    tableBody.innerHTML="";
    tableHeaders.innerHTML="";

    tableHeaders.appendChild(createHeaderRow(defaultColCount));
    createTableBody(tableBody,defaultRowCount,defaultColCount);
        // console.log("default"+defaultRowCount,defaultColCount);
        // console.log("matrix"+ matrix.length,matrix[0].length);
    populateTable();


    // attach focusout event listener
    tableBody.addEventListener("focusout",function(e){
        if(e.target&&e.target.nodeName==="TD"){
            let item=e.target;
            const indices=item.id.split("-");
            let matrix=getMatrix();
            matrix[indices[1]][indices[2]]=item.innerHTML;
            saveMatrix(matrix);
        }
    });

    fromEvent(tableBody, 'click')
    .pipe(
      //throttleTime(1000),  
    )
    .subscribe( () =>{
       //e.target
       //let insertRow;
       let e = event;
       if(e.target){
          if(e.target.className==="row-header"){
                  //insertRow=e.target.parentElement;
                  let indices = e.target.id.split("-");
                  insertRow = indices[1];
                
                  insertCol = 0;
          }       
          if(e.target.parentElement.className==="row-header"){
                  //insertRow=e.target.parentElement.parentElement;
                  let indices = e.target.parentNode.id.split("-");
                  insertRow = indices[1];
                  insertCol = 0;
          }        
       }
    });

    // Attach click event listener to table headers
  fromEvent(tableHeaders, 'click')
  .pipe(
    //throttleTime(1000),
  )
  .subscribe(() =>{
     let e=event;
     if (e.target) {
        if(e.target.className==="column-header"){
                let indices = e.target.id.split("-");
                insertCol = indices[2];   
                // colselected(insertCol);
                insertRow = 0;   
        }       
        if(e.target.parentElement.className==="column-header"){
                let indices = e.target.parentNode.id.split("-");
                insertCol = indices[2];
                // colselected(insertCol); 
                insertRow = 0; 
        }

        }
        
  } );
    // addColBtn.addEventListener("click",function(e){
    //     if(e.target.className==="addCol-btn"){
    //         addColumn(insertCol);
    //     }
    // });
    // delRowBtn.addEventListener("click",function(e){
    //     if(e.target.className==="delRow-btn"){
    //         deleteRow(insertRow);
    //     }
    // });
    // delColBtn.addEventListener("click",function(e){
    //    if(e.target.className==="delCol-btn"){
    //     deleteColumn(insertCol);
    //    }
    // });
}
createSpreadsheet();
// reset button function
const resetData = data => {
    localStorage.removeItem(SPREADSHEET);
    createSpreadsheet();
  };
document.getElementById("reset").addEventListener("click", e => {
    if (
      confirm("This will erase all data and set default configs. Are you sure?")
    ) {
      resetData();
    }
  });
// add eventlistner to button
fromEvent(addRowBtn, 'click')
  .pipe(
    throttleTime(500),
  )
  .subscribe( () => {
        addRow(parseInt(insertRow));
});

fromEvent(delRowBtn,'click').pipe(
    throttleTime(500),
)
.subscribe(()=>{
    if(defaultRowCount>1){
    deleteRow(parseInt(insertRow));
    }else{
        alert("you can't delete all rows")
    }
});

fromEvent(addColBtn,'click')
.pipe(
    throttleTime(500),
).subscribe(()=>{
    addColumn(parseInt(insertCol));
});
fromEvent(delColBtn,'click')
.pipe(
    throttleTime(500),
).subscribe(()=>{
    if(defaultColCount>1){
    deleteColumn(parseInt(insertCol));
    }else{
        alert("you can't delete all columns")
    }
})
//////////////
// this is the export csv function
function exportTableToCSV(tableid, title) {
    let winname;
    let str = getTblData(tableid);
          
    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);

    let downloadLink = document.createElement("a");
    downloadLink.href = uri;
    downloadLink.download = title + ".csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
// this is the function to get data from table
function getTblData(inTbl) {
 
    let rows = 0;
    let tblDocument = document;
 
    //tblDocument = eval(inWindow).document;
    let curTbl = tblDocument.getElementById(inTbl);
    let outStr = "";
    if (curTbl != null) {
        for (let j = 0; j < curTbl.rows.length; j++) {
            for (let i = 0; i < curTbl.rows[j].cells.length; i++) {
 
                if (i == 0 && rows > 0) {
                    outStr += ",";
                    rows -= 1;
                }
 
                if(i<curTbl.rows[j].cells.length-1){
                  outStr +=curTbl.rows[j].cells[i].innerText + ",";
                }
                else if(i==curTbl.rows[j].cells.length-1){
                  outStr +=curTbl.rows[j].cells[i].innerText;
                }
                if (curTbl.rows[j].cells[i].colSpan > 1) {
                    for (let k = 0; k < curTbl.rows[j].cells[i].colSpan - 1; k++) {
                        outStr += ",";
                    }
                }
                if (i == 0) {
                    if (rows == 0 && curTbl.rows[j].cells[i].rowSpan > 1) {
                        rows = curTbl.rows[j].cells[i].rowSpan - 1;
                    }
                }
            }
            outStr += "\r\n";//换行
        }
    }
 
    else {
        outStr = null;
        alert(allPage.noData);
    }
    return outStr;
}




document.getElementById("expCsv").addEventListener("click",e=>{
  if(
    confirm("YOU WANT TO EXPORT THE FILE?")
  ){
    exportTableToCSV('table-main','export');
  }
})

// this is the import csv function
function Upload() {
  let matrix=getMatrix();
  // console.log("1");
  // console.log(matrix);
  let fileUpload = document.getElementById("uploadFile");
  let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof (FileReader) != "undefined") {
          let reader = new FileReader();
          reader.onload = function (e) {
              //let table = document.createElement("table");
              let table = document.getElementById('table-main');
              let rows = e.target.result.split("\n");
            
              let maxcol = 0;
              for(let i = 0;i<rows.length; i++){
                let cells = rows[i].split(",");
                if(cells.length-1 > maxcol){
                  maxcol = cells.length;
                }
              }

              if(rows.length-2<=table.rows.length-1 && maxcol-2 <= table.rows[0].cells.length-1){
                
                for (let i = 0; i < rows.length; i++) {
                  let cells = rows[i].split(",");
                  if (cells.length > 1) {
                      //let row = table.insertRow(-1);
                      for (let j = 0; j < cells.length; j++) {
                          //let cell = row.insertCell(-1);
                          let thecell = document.getElementById(`r-${i}-${j}`);
                          if(thecell != null){
                            thecell.innerHTML = cells[j];
                            matrix[i][j]=cells[j];
                            console.log(matrix[i][j]);  
                          }
                          
                      }
                  }
              }
              // save data to matrix
              saveMatrix(matrix);
              }
              else{
                alert('it can not be import because of size');
                console.log(maxcol);
                //console.log();

              }

              
              //let dvCSV = document.getElementById("dvCSV");
              //dvCSV.innerHTML = "";
              //dvCSV.appendChild(table);
          }
          reader.readAsText(fileUpload.files[0]);
      } else {
          alert("This browser does not support HTML5.");
      }
  } else {
      alert("Please upload a valid CSV file.");
  }
}

document.getElementById("impCsv").addEventListener("click", e => {
Upload();
});