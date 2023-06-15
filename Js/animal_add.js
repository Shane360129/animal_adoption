import {autoAddMenuCityContent} from "./views/autoAddMenuCityContent.js"

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
  }).catch((error) => console.log(error));
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
submit.addEventListener("click", async () => {
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

  // 必須這樣寫，才能確保前一個e呼叫完，再呼叫下一個e
  for (const e of bodyFromOutside) {
    try {
      await axios.post("http://localhost:8080/upLordImg", e);
      console.log("Image uploaded");
    } catch (error) {
      console.error(error);
    }
  }
  axios.post("http://localhost:8080/animalAdd", body).then((res) => {
    alert(res.data.message)
  }).catch((error) => console.log(error));
})


// 上傳照片
// 宣告外部參數，保存要上傳照片的body
let bodyFromOutside = [];
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
      "imgBase64": imgDataUrl.split(",")[1],
      "sort": "a",
      "id": animalId.value
    }
    bodyFromOutside.push(base64);
    const newDiv = document.createElement("div");
    newDiv.classList.add("firstPic");
    newDiv.innerHTML = `<img src="${imgDataUrl}" alt="pet">`;
    imgBlock.insertBefore(newDiv, imgBlock.firstChild);
    const firstPics = document.querySelectorAll(".firstPic");
    for (let i = 1; i < firstPics.length; i++) {
      firstPics[i].classList.remove("firstPic");
      firstPics[i].classList.add("otherPic");
      modifyMinPic.insertBefore(firstPics[i], modifyMinPic.firstChild);

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


    }
  }
})
