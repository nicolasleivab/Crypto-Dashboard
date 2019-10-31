/* Media Queries js */
//apply different class on resize for a responsive layout
const initialW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
//resize if it starts with smaller device
if(initialW< 1200){   
    document.getElementById('dashboard-grid').classList.remove('grid-container');
    document.getElementById('dashboard-grid').classList.add('grid-container2');
    //remove filler divs in smaller devices
    document.getElementById("filler1").remove();
    document.getElementById("filler2").remove();
}
//change on resize
function resizeGrid(){
let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
if (w < 1200) {
    document.getElementById('dashboard-grid').classList.remove('grid-container');
    document.getElementById('dashboard-grid').classList.add('grid-container2');
    //remove filler divs
    document.getElementById("filler1").remove();
    document.getElementById("filler2").remove();
  }else{
    document.getElementById('dashboard-grid').classList.remove('grid-container2');
    document.getElementById('dashboard-grid').classList.add('grid-container');    
}
};
window.addEventListener("resize", resizeGrid);