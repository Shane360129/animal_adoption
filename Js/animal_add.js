import {autoAddMenuCityContent} from "./views/autoAddMenuCityContent.js"
import {updateSessionInterval} from "./views/updateSessionInterval.js"

const upload = document.querySelector(".upload");
const imgBlock = document.querySelector(".imgBlock");
const animalId = document.querySelector(".animalId");
const animalName = document.querySelector(".animalName");
const male = document.querySelector(".male");
const cat = document.querySelector(".cat");
const type = document.querySelector(".type");
const regDate = document.querySelector(".regDate");
const regCity = document.querySelector("#regCity");
const reset = document.querySelector(".reset");
const submit = document.querySelector(".submit");
const inputs = document.querySelectorAll("input");
const modifyMinPic = document.querySelector(".modifyMinPic");

setAnimalId2();
setDate();
autoAddMenuCityContent(regCity);
updateSessionInterval();

// 自動選擇當天日期
function setDate() {
  const today = new Date();
  regDate.value = today.toISOString().split('T')[0];
}

// 自動填上編號
/*function setAnimalId() {
  fetch("http://localhost:8080/findAll", {
    method: "GET"
  })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        animalId.value = +data.animalList.pop().animalId + 1;
      })
}*/
function setAnimalId2() {
  axios.get("http://localhost:8080/findAll").then((res) => {
    animalId.value = +res.data.animalList.pop().animalId + 1;
  });
}


// 清空表單
reset.addEventListener("click", () => {
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (input.type !== "radio" && input.type !== "file") {
      input.value = "";
    }
    else if (input.type === 'file') {
      input.value = null;
    }
  }
  setDate();
  regCity.selectedIndex = 0;
  cat.checked = "checked";
  male.checked = "checked";
})

// 登錄寵物資訊
submit.addEventListener("click", () => {
  const species = document.querySelector("input[name ='species']:checked");
  const sex = document.querySelector("input[name ='sex']:checked");
  const body = {
    "animalList": [
      {
        "animalName": animalName.value,
        "sex": +sex.value,
        "species": +species.value,
        "type": type.value,
        "regDate": regDate.value,
        "regCity": regCity.value,
      }
    ]
  };
  axios.post("http://localhost:8080/animalAdd", body).then((res) => {
    alert(res.data.message)
  });
})

// 上傳照片
upload.addEventListener("change", (e) => {
  console.log(e.target.files[0]);
  const img = e.target.files[0];
  const reader = new FileReader();
  // 非同步方法
  reader.readAsDataURL(img)
  // 讀完圖片後會執行的方法
  reader.onload = function (e) {
    // console.log(e.target.result);
    const imgDataUrl = e.target.result;
    const base64 = {
      "imgBase64":imgDataUrl.split(",")[1],
      "sort":"a",
      "id":animalId.value
    }
    console.log(base64)
    const newDiv = document.createElement("div");
    newDiv.classList.add("firstPic");
    newDiv.innerHTML = `<img src="${imgDataUrl}" alt="pet">`;
    imgBlock.insertBefore(newDiv, imgBlock.firstChild);
    const firstPics = document.querySelectorAll(".firstPic");
    for (let i = 1; i < firstPics.length; i++) {
      firstPics[i].classList.remove("firstPic");
      firstPics[i].classList.add("otherPic");
      modifyMinPic.insertBefore(firstPics[i],modifyMinPic.firstChild);
    }
    // axios.post("http://localhost:8080/upLordImg", base64).then((res) => {
    // });
  }
})

function splitBase64IntoChunks(base64Data, chunkSize) {
  const totalChunks = Math.ceil(base64Data.length / chunkSize);
  const chunks = [];

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const chunk = base64Data.substr(start, chunkSize);
    chunks.push(chunk);
  }
  console.log(chunks)
  return chunks;
}
