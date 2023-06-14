const filesBanner = document.querySelector(".filesBanner");


// 獲得資料所有動物資料
// 自動渲染資料中有的動物資訊
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
        const filesPic = document.querySelector(".filesPic");
        newDiv.style.backgroundImage = `url("../img/animalAll/${animalList[i].animalId}-1.png")`;
      }

      resolve();
    }).catch((error) => {
      reject(error);
    });
  });
}

getAllAnimal().then(() => {
  const filesBanner = document.querySelector(".filesBanner")
  console.log(filesBanner);
  filesBanner.addEventListener("click", function (e) {
    console.log(e.target.getAttribute("data-item"))
    if (e.target.classList.contains("like")) {
      const clicks = parseInt(e.target.getAttribute("data-clicks"));
      const animalId = +e.target.getAttribute("data-item");
      const body = {
        "animalId": animalId
      }
      axios.post("http://localhost:8080/findByAnimalId", body).then((res) => {
        console.log(res)
        const body = {
          "member_id":"A129111111",
          "animal_id": animalId
        };
        if (clicks === 0) {
          e.target.classList.add("liked");
          e.target.setAttribute("data-clicks", clicks + 1);
          axios.post("http://localhost:8080/add_favorite", body).then((res) =>{})
        }
        else {
          e.target.classList.remove("liked");
          e.target.setAttribute("data-clicks", clicks - 1);
          axios.post("http://localhost:8080/delete_favorite", body).then((res) =>{})
        }


      });

    }
  });
}).then(() => {

}).catch((error) => {
  console.error(error);
});
