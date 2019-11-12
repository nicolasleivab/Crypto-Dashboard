/* Media Queries js */
//apply different class on resize for a responsive layout
const initialW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
//resize if it starts with smaller device
if(initialW < 1100){   
    document.getElementById('chart-data-grid').classList.remove('chart-outter-grid');
    document.getElementById('chart-data-grid').classList.add('chart-outter-grid--2');
};  
//change on resize
function resizeChart(){
let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
if (w < 1100) {
        document.getElementById('chart-data-grid').classList.remove('chart-outter-grid');
        document.getElementById('chart-data-grid').classList.add('chart-outter-grid--2'); 
      }else{
        document.getElementById('chart-data-grid').classList.remove('chart-outter-grid--2'); 
        document.getElementById('chart-data-grid').classList.add('chart-outter-grid'); 
    }
};
window.addEventListener("resize", resizeChart);