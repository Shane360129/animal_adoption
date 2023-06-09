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
  regCity: "台北市"
}
const animalId = document.querySelector(".animalId");
const animalName = document.querySelector(".animalName");
const regCity = document.querySelector("#regCity")
const species = document.querySelectorAll("input[type='radio'][name='species']");
const type = document.querySelector(".type");
const regDate = document.querySelector(".regDate");

// 自動新增選單城市內容
autoAddMenuCityContent(regCity);

setAnimalInfo(animal);

// 渲染選中寵物訊息
function setAnimalInfo(animal){
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
  animal.regCity

  console.log(regCity.options[0].innerText)
  console.dir(regCity.options)
  console.log(Array.from(regCity));


}

