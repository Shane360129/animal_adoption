import {autoAddMenuCityContent} from "../Js/views/autoAddMenuCityContent.js"


// 從sessionStorage獲取點擊的動物id
const filesPic = +sessionStorage.getItem("filesPic");

const animalId = document.querySelector(".animalId");
const animalName = document.querySelector(".animalName");
const regCity = document.querySelector("#regCity")
const type = document.querySelector(".type");
const regDate = document.querySelector(".regDate");
const update = document.querySelector(".update");
const deleteBtn = document.querySelector(".delete");
const quit = document.querySelector(".quit");

// 自動新增選單城市內容
autoAddMenuCityContent(regCity);

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
  console.log(res.data.animal.species)
  setAnimalInfo(animal);
}).catch((error) => console.log(error));


// 渲染選中寵物資料
function setAnimalInfo(animal) {
  animalId.value = animal.animalId;
  animalName.value = animal.animalName;
  let sex;
  animal.sex === 0 ? sex = document.querySelector(".male") : sex = document.querySelector(".female")
  sex.checked = "checked";
  let species;
  animal.species === 0 ? species = document.querySelector(".cat") : species = document.querySelector(".dog");
  species.checked = "checked";
  type.value = animal.type;
  regDate.value = animal.regDate;
  const regCity = document.querySelector("#regCity");
  // 讓下拉選單選項跳至領養動物的城市
  for (let i = 0; i < regCity.options.length; i++) {
    if (regCity.options[i].text === animal.regCity) {
      regCity.selectedIndex = i;
      break;
    }
  }
}

// 放棄更新返回上一頁
quit.addEventListener("click",()=>{
  window.history.go(-1);
})

// 更新功能
update.addEventListener("click", () => {
      // 必須click之後querySelector
      const animalName = document.querySelector(".animalName");
      const sex = document.querySelector("input[name ='sex']:checked");
      const species = document.querySelector("input[name ='species']:checked");
      const regCity = document.querySelector("#regCity")
      const type = document.querySelector(".type");
      const regDate = document.querySelector(".regDate");
      const body = {
        animalList: [
          {
            animalId: animal.animalId,
            animalName: animalName.value,
            sex: +sex.value,
            species: +species.value,
            type: type.value,
            regDate: regDate.value,
            regCity: regCity.value
          }
        ]
      };
  fetch("http://localhost:8080/animalModify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
      })
    }
)

// 刪除功能
deleteBtn.addEventListener("click", () => {
  const body = {
    animalId: animal.animalId
  };
  fetch("http://localhost:8080/deleteById", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
      })
})

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
}).catch((error) => {
  console.error(error);
});