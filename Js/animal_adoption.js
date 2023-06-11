import {setAnimalInfo} from "./views/setAnimalInfo.js"
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
const species = document.querySelector(".species");
const sex = document.querySelector(".sex");
const type = document.querySelector(".type");
const regDate = document.querySelector(".regDate");
const regCity = document.querySelector(".regCity");

// 渲染選中寵物資料
animalId.innerText = animal.animalId;
animalName.innerText = animal.animalName;
animal.sex === 0 ? sex.innerText = "公":sex.innerText = "母"
animal.species === 0 ? species.innerText = "貓" : species.innerText = "狗";
type.innerText = animal.type;
regDate.innerText = animal.regDate;
regCity.innerText = animal.regCity;

// 認養
