//回頂部小按鈕

    // 捲軸偵測距離頂部超過 150 才顯示按鈕
const homeBoxBtn = document.querySelector(".homeBox");
function scroll(){
    if(window.scrollY>150){
        homeBoxBtn.classList.remove("hide")
    }else{
        homeBoxBtn.classList.add("hide")
    }
}

window.addEventListener('scroll',scroll);
