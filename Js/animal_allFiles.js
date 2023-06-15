const filesBanner = document.querySelector(".filesBanner");
const filesBtnDog = document.querySelector(".filesBtnDog");
const filesBtnCat = document.querySelector(".filesBtnCat");
const filesTitleBtn = document.querySelector(".filesTitleBtn");


// 獲得資料庫所有動物資料，並渲染頁面
function getAllAnimal() {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:8080/findAll").then((res) => {
      const animalList = res.data.animalList;
      for (let i = 0; i < 9; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("filesPic");
        newDiv.innerHTML = `<div class="filesText">
        <ul>編號:</ul>
        <ul>${animalList[i].animalId}</ul>
        <p class="like" data-clicks="0" data-item="${animalList[i].animalId}">♥</p>`;
        filesBanner.appendChild(newDiv);
        newDiv.style.backgroundImage = `url("../img/animalAll/${animalList[i].animalId}-1.png")`;
        const filesPic = document.querySelectorAll(".filesPic");
        filesPic[i].setAttribute("data-filesPic", `${animalList[i].animalId}`)
      }
      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}


getAllAnimal().then(() => {
  function render(){  // 畫面載入時，渲染已收藏動物
    axios.post("http://localhost:8080/findByMemberId", {"member_id": sessionStorage.getItem("member_id")}).then(res => {
      const fav = res.data.member.fav.split(",");
      // 根據收藏狀態點亮已收藏的動物 ♥
      const likeElements = document.querySelectorAll(".like");
      likeElements.forEach(element => {
        const animalId = element.getAttribute("data-item");
        if (fav.includes(animalId)) {
          element.classList.add("liked");
          element.setAttribute("data-clicks", "1");
        }
      });
    }).catch((error) => {
      console.error(error);
    });

    // 父層filesBanner綁定點擊事件，並向下冒泡
    const filesBanner = document.querySelector(".filesBanner")
    filesBanner.addEventListener("click", function (e) {

      // 儲存點擊的寵物ID，供animal_adoption.js、animal_modify_and_delete.js使用
      let filesPic = e.target.getAttribute("data-filesPic");
      sessionStorage.setItem("filesPic", filesPic);
      // 判斷點擊的元素是否是<div class="filesPic">
      if (e.target.classList.contains("filesPic")) {
        // 判斷點擊的元素是否是<p class="like">♥</p>
        if (!e.target.classList.contains("like")) {
          if (sessionStorage.getItem("administrator")) {
            // 執行跳轉頁面的動作,管理者
            window.location.href = "../pages/animal_modify_and_delete.html";
          }
          else {
            // 執行跳轉頁面的動作,一般使用者
            window.location.href = "../pages/animal_adoption.html";
          }
        }
      }


      // 判斷，收藏或解除收藏
      console.log(e.target.getAttribute("data-item"))
      if (e.target.classList.contains("like")) {
        const clicks = parseInt(e.target.getAttribute("data-clicks"));
        const animalId = +e.target.getAttribute("data-item");
        const body = {
          "member_id": sessionStorage.getItem("member_id"),
          "animal_id": animalId
        };
        if (clicks === 0) {
          e.target.classList.add("liked");
          e.target.setAttribute("data-clicks", clicks + 1);
          axios.post("http://localhost:8080/add_favorite", body).then((res) => {
            console.log(res.data.message);
          })
        }
        else {
          e.target.classList.remove("liked");
          e.target.setAttribute("data-clicks", clicks - 1);
          axios.post("http://localhost:8080/delete_favorite", body).then((res) => {
            console.log(res.data.message);
          })
        }
      }
    });
  }
}).catch((error) => {
  console.error(error);
});


// 分類顯示
// 綁定父層點擊事件，並向下冒泡
filesTitleBtn.addEventListener("click",function (e){
  const target = event.target; // 取得被點擊的元素

    // 判斷被點擊的元素是否是按鈕
    if (target.classList.contains('filesBtnAll')) {
      // 點擊的是[全部]
      console.log('點擊了[全部]');
    } else if (target.classList.contains('filesBtnDog')) {
      // 點擊的是[犬]
      console.log('點擊了[犬]');
    } else if (target.classList.contains('filesBtnCat')) {
      // 點擊的是[貓]
      console.log('點擊了[貓]');
    }
})

