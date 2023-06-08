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


// 自動新增選單城市內容
const taiwanCities = [
  "基隆市",
  "臺北市",
  "新北市",
  "桃園市",
  "新竹市",
  "新竹縣",
  "苗栗縣",
  "臺中市",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義市",
  "嘉義縣",
  "臺南市",
  "高雄市",
  "屏東縣",
  "臺東縣",
  "花蓮縣",
  "金門縣",
  "澎湖縣",
  "連江縣",
  "宜蘭縣"
];
for (let i = 0; i < taiwanCities.length; i++) {
  const optionElement = document.createElement("option");
  optionElement.text = taiwanCities[i];
  regCity.appendChild(optionElement);
}

// 自動選擇當天日期
function setDate() {
  const today = new Date();
  regDate.value = today.toISOString().split('T')[0];
}

// 頁面載入直接呼叫
setDate();

// 自動填上編號
function setAnimalId() {
  fetch("http://localhost:8080/findAll", {
    method: "GET"
  })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        animalId.value = +data.animalList.pop().animalId + 1;
      })
}

// 頁面載入直接呼叫
setAnimalId();

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
    animalList: [
      {
        animalName: animalName.value,
        sex: +sex.value,
        species: +species.value,
        type: type.value,
        regDate: regDate.value,
        regCity: regCity.value,
      }
    ]
  };
  fetch("http://localhost:8080/animalAdd", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
      .then(response => response.json())
      .then(function (data) {
        alert(data.message)
      })
})
