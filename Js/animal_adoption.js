// 從sessionStorage獲取點擊的動物id
const filesPic = +sessionStorage.getItem("filesPic");
// 透過api獲取動物的資訊
axios.post("http://localhost:8080/findByAnimalId",
    {"animalId": filesPic}
).then((res) => {
  const animal = {
    animalId: res.data.animal.animalId,
    animalName: res.data.animal.animalName,
    sex: res.data.animal.sex,
    species: +res.data.animal.species,
    type: res.data.animal.type,
    regDate: res.data.animal.regDate,
    regCity: res.data.animal.regCity
  };
  renderAnimalInfo(animal);
  outsideAnimal = animal;
}).catch((error) => console.log(error));


const animalId = document.querySelector(".animalId");
const animalName = document.querySelector(".animalName");
const species = document.querySelector(".species");
const sex = document.querySelector(".sex");
const type = document.querySelector(".type");
const regDate = document.querySelector(".regDate");
const regCity = document.querySelector(".regCity");
const adoption = document.querySelector(".adoption");

// 渲染選中寵物資料
function renderAnimalInfo(animal) {
  animalId.innerText = animal.animalId;
  animalName.innerText = animal.animalName;
  animal.sex === 0 ? sex.innerText = "公" : sex.innerText = "母"
  animal.species === 0 ? species.innerText = "貓" : species.innerText = "狗";
  type.innerText = animal.type;
  regDate.innerText = animal.regDate;
  regCity.innerText = animal.regCity;
}

// 渲染照片功能
axios.post("http://localhost:8080/countImg", {
  "sort": "a",
  "id": filesPic
}).then((res) => {
  // 取得照片張數
  const numberOfPhotos = res.data.count;
  console.log(numberOfPhotos)

  const imgBlock = document.querySelector(".imgBlock");
  const modifyMinPic = document.querySelector(".modifyMinPic");

  for (let i = 1; i <= numberOfPhotos; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("firstPic");
    newDiv.innerHTML = `<img src="../img/animalAll/${filesPic}-${i}.png" alt="pet">`;
    imgBlock.insertBefore(newDiv, imgBlock.firstChild);

    const firstPics = document.querySelectorAll(".firstPic");
    for (let j = 1; j < firstPics.length; j++) {
      firstPics[j].classList.remove("firstPic");
      firstPics[j].classList.add("otherPic");
      modifyMinPic.insertBefore(firstPics[j], modifyMinPic.firstChild);
    }
  }

  // 圖片輪播功能
  // 綁定父層點擊事件，並向下冒泡
  imgBlock.addEventListener('click', (e) => {

    // 檢查點擊的元素是否是圖片元素
    if (e.target.tagName === 'IMG') {
      // 檢查點擊的圖片元素是否已經有 'firstPic' class
      if (!e.target.parentNode.classList.contains('firstPic')) {
        const firstPicElement = imgBlock.querySelector('.firstPic');

        firstPicElement.classList.remove("firstPic");
        firstPicElement.classList.add("otherPic");
        modifyMinPic.appendChild(firstPicElement);

        e.target.parentNode.classList.remove("otherPic");
        e.target.parentNode.classList.add("firstPic");
        imgBlock.insertBefore(e.target.parentNode, imgBlock.firstChild);

      }
    }
  });

}).catch((error) => {
  console.error(error);
});


// 送審認養
// 宣告全域參數，獲取最上面animal資訊
let outsideAnimal = null;
// 從sessionStorage獲取點擊的會員id
const memberId = sessionStorage.getItem("member_id");

adoption.addEventListener("click", () => {
  const body = {
    "member_id": memberId
    , animal: {}
  }
  body.animal = outsideAnimal;
  axios({
    method: "post",
    url: "http://localhost:8080/adoption",
    //API要求的資料
    data: body
  })
      .then((response) => {
        alert(response.data.message)
      }).catch((error) => console.log(error));
})

