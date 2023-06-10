import {autoAddMenuCityContent} from "./views/autoAddMenuCityContent.js"
// 預期會從「待認養犬貓照片檢索」的js裡導入選中的寵物資訊
// 這裡先預設
const animal = {
  animalId: 1,
  animalName: "咪咪",
  sex: 1,
  species: 0,
  type: "MIX",
  regDate: "2023-05-12",
  regCity: "臺北市"
}
const animalId = document.querySelector(".animalId");
const animalName = document.querySelector(".animalName");
const regCity = document.querySelector("#regCity")
const type = document.querySelector(".type");
const regDate = document.querySelector(".regDate");
const update = document.querySelector(".update");
const deleteBtn = document.querySelector(".delete");

// 自動新增選單城市內容
autoAddMenuCityContent(regCity);
// 渲染選中寵物資料
setAnimalInfo(animal);

// 渲染選中寵物訊息
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


// 更新功能
update.addEventListener("click", () => {
      // 必須click之後querySelector
      const animalName = document.querySelector(".animalName");
      const sex = document.querySelector("input[name ='sex']:checked");
      const species = document.querySelector("input[name ='species']:checked");
      const regCity = document.querySelector("#regCity")
      const type = document.querySelector(".type");
      const regDate = document.querySelector(".regDate");
      const deleteBtn = document.querySelector(".delete");

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
