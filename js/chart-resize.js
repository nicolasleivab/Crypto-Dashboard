/* Media Queries js */
//apply different class on resize for a responsive layout
function resizeChart(){
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    
    if (w < 1100) {
        document.getElementById('chart-data-grid').classList.remove('chart-outter-grid');
        document.getElementById('chart-data-grid').classList.add('chart-outter-grid2'); 
      }else{
        document.getElementById('chart-data-grid').classList.add('chart-outter-grid');
        document.getElementById('chart-data-grid').classList.remove('chart-outter-grid2');  
    }
    };
    window.addEventListener("resize", resizeChart);