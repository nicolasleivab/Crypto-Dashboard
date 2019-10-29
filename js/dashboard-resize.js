/* Media Queries js */
//apply different class on resize for a responsive layout
function resizeGrid(){
let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

if (w < 1200) {
    document.getElementById('dashboard-grid').classList.remove('grid-container');
    document.getElementById('dashboard-grid').classList.add('grid-container2')
  }else{
    document.getElementById('dashboard-grid').classList.add('grid-container');
    document.getElementById('dashboard-grid').classList.remove('grid-container2') 
};
}
window.addEventListener("resize", resizeGrid);