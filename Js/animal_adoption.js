// 從sessionStorage獲取點擊的動物id
const filesPic = +sessionStorage.getItem("filesPic");
// 透過api獲取動物的資訊
axios.post("http://localhost:8080/findByAnimalId",
    {"animalId":filesPic}
    ).then((res)=>{
  const animal = {
    animalId: res.data.animal.animalId,
    animalName: res.data.animal.animalName,
    sex: res.data.animal.sex,
    species: res.data.animal.species,
    type: res.data.animal.type,
    regDate: res.data.animal.regDate,
    regCity: res.data.animal.regCity
  };
  renderAnimalInfo(animal);
  outsideAnimal = animal;
})




const animalId = document.querySelector(".animalId");
const animalName = document.querySelector(".animalName");
const species = document.querySelector(".species");
const sex = document.querySelector(".sex");
const type = document.querySelector(".type");
const regDate = document.querySelector(".regDate");
const regCity = document.querySelector(".regCity");
const adoption = document.querySelector(".adoption");

// 渲染選中寵物資料
function renderAnimalInfo(animal){
  animalId.innerText = animal.animalId;
  animalName.innerText = animal.animalName;
  animal.sex === 0 ? sex.innerText = "公":sex.innerText = "母"
  animal.species === 0 ? species.innerText = "貓" : species.innerText = "狗";
  type.innerText = animal.type;
  regDate.innerText = animal.regDate;
  regCity.innerText = animal.regCity;
}


// 送審認養
// 宣告全域參數，獲取最上面animal資訊
let outsideAnimal = null;
// 從sessionStorage獲取點擊的會員id
const memberId = sessionStorage.getItem("member_id");

adoption.addEventListener("click",()=>{
  const body = {
    "member_id": memberId
    ,animal:{}
  }
  body.animal = outsideAnimal;
  axios({
    method: "post",
    url: "http://localhost:8080/adoption",
    //API要求的資料
    data: body
  })
      .then( (response) => {
        alert(response.data.message)
      })
})