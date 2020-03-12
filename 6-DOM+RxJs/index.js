import "./style/main.css";
// import * as a from './main'
import "./main";

// const cell = fromEvent(document, "keyup").pipe(filter(e => e.keyCode == 13) );
//   cell
//   .subscribe(
//     function(e) {
//       // console.log(e.target.innerHTML)
//       if(e.target){
//         if(e.target.innerHTML){
//           let str=e.target.innerText
//           //console.log(str); 
//           if(str.startsWith("=SUM(")&&str.match(/\(([^)]*)\)/))
//           {
//             str = str.match(/\(([^)]*)\)/);
//             // console.log("match"+str);
//             str = str[1];
//             // console.log("str[1]"+str);
//             let arr=str.match(/[a-zA-Z]+|[0-9]+(?:\.[0-9]+|)/g);

//             // let arr = str.split(/[:]/);//arr[1],arr[2];arr[4],arr[5]
//             // console.log(arr);
//             let c1=arr[0].charCodeAt()-64;
//             let c2=arr[2].charCodeAt()-64;
//             if(c1>0&&c1<=defaultColCount&&arr[1]>0&&arr[1]<=defaultColCount&&
//               arr[3]>0&&arr[3]<=defaultRowCount&&c2>0&&c2<=defaultColCount
//               ){
//                 let tds = document.getElementsByTagName("td");
//                 // console.log(tds);
//                 let sum=0;
//                 for(let j=0;j<tds.length;j++){
//                   let tdrc=tds[j].id.split('-');
//                   if(tds[j].innerHTML!==""){
//                   console.log(tds[j].innerHTML+" "+tdrc[1]+" "+tdrc[2]);
//                   }
//                   // console.log(tdrc);
//                   if(tdrc[1]>=c1&&tdrc[2]>=arr[1]&&tdrc[1]<=c2&&tdrc[2]<=arr[3]){
//                     console.log(tds[j].innerHTML+" "+tdrc[1]+" "+tdrc[2]);
//                     if(tds[j].innerHTML!==""){
//                       sum = sum+parseInt(tds[j].innerHTML);
//                     }else{
//                       sum = sum+0;
//                     }
//                     //console.log(parseInt(document.getElementById(`r-${arr[1]}-${arr[2]}`).innerHTML)); 
//                     //e.target.innerHTML="";
                    
//                   }
//                 }
//                 e.target.innerHTML=sum;
//               }else{
//                 e.target.innerHTML="error";
//                 // e.target.style.backgroundColor='black';
//                 alert("out of boundry");
//                 // cell.unsc
//               }
            
//           }
//         }
        
//       }
      
//     }
//   )
// function createHeaderRow(){
//     const tr=document.createElement("tr");
//     tr.setAttribute("id","h-0");
//     for(let i=0;i<defaultColCount;i++){
//         const th=document.createElement("th");
//         th.setAttribute("id",`h-0-${i}`);
//         th.setAttribute("class",`${i===0?"":"column-header"}`);
//         if (i !== 0) {
//             const span = document.createElement("span");
//             // let s=`A`;
//             let num=64;
//             let str=String.fromCharCode(num+i);
//             span.innerHTML = str;
//             span.setAttribute("class", "column-header-span");
//             th.appendChild(span);
//           }
//           tr.appendChild(th);
//     }
//     return tr;
// };

// function createBodyRow(rowNum){
//     const tr=document.createElement("tr");
//     tr.setAttribute("id",`r-${rowNum}`);
//     for(let i=0;i<defaultColCount;i++){
//         const cell=document.createElement(`${i===0?"th":"td"}`);
//         if(i===0){
//             cell.contentEditable=false;
//             const span = document.createElement("span");
//             span.innerHTML = rowNum;
//             // span.setAttribute("class", "column-header-span");
//             cell.appendChild(span);
//             cell.setAttribute("class","row-header");
//         }else{
//             cell.contentEditable=true;
//             cell.setAttribute("class","cell");
//         }
//         cell.setAttribute("id",`r-${rowNum}-${i}`);
//         tr.appendChild(cell);
//     }
//     return tr;
// }