/* auto complete */
//get top 100 coins for the list
const list = topCoins.map(function (obj) {
    return obj.name;
  });
  
const n= list.length;     
  
//autocomplete func adapted from: https://www.geeksforgeeks.org/javascript-auto-complete-suggestion-feature/
    function autoComplete(value) { 
        document.getElementById('datalist').innerHTML = ''; 
         //setting datalist empty at the start of function 
     
         //input query length 
        for (let i = 0; i<n; i++) { 
            if(((list[i].toLowerCase()).indexOf(value.toLowerCase()))>-1) 
            { 
             //if input string in list[i] string 
  
             const node = document.createElement("option"); 
             const val = document.createTextNode(list[i]); 
              node.appendChild(val); 
  
               document.getElementById("datalist").appendChild(node); 
                   //create and append new elements from list 
             } 
         } 
     } 
   