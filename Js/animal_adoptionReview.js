const reviewAnimalId = document.querySelector(".reviewAnimalId");
const reviewAnimalBtn = document.querySelector(".reviewAnimalBtn");
const reviewMemberId = document.querySelector(".reviewMemberId");
const reviewMemberBtn = document.querySelector(".reviewMemberBtn");


const reject = document.querySelector(".reject");
const reviewPass = document.querySelector(".reviewPass");

const animalId = document.querySelector(".animalId");
const animalName = document.querySelector(".animalName");
const species = document.querySelector(".species");
const sex = document.querySelector(".sex");
const type = document.querySelector(".type");
const regDate = document.querySelector(".regDate");
const regCity = document.querySelector(".regCity");


const memberId = document.querySelector(".memberId");
const memberName = document.querySelector(".memberName");
const phone = document.querySelector(".phone");

let animal = {};
// 動物id搜尋點擊事件
reviewAnimalBtn.addEventListener("click", () => {
  let aniId = +reviewAnimalId.value;
  axios.post("http://localhost:8080/findByAnimalId", {"animalId": aniId}).then(animalRes => {

    console.log(animalRes)
    // 渲染動物資料
    animalId.innerText = animalRes.data.animal.animalId;
    animalName.innerText = animalRes.data.animal.animalName;
    animalRes.data.animal.sex === 0 ? sex.innerText = "公" : sex.innerText = "母"
    animalRes.data.animal.species === 0 ? species.innerText = "貓" : species.innerText = "狗";
    type.innerText = animalRes.data.animal.type;
    regDate.innerText = animalRes.data.animal.regDate;
    regCity.innerText = animalRes.data.animal.regCity;

    // 儲存至外部變數
    animal = animalRes.data.animal;
  }).catch((error) => console.log(error))
})


let member = {};
// 會員id搜尋點擊事件
reviewMemberBtn.addEventListener("click", () => {
  let memId = reviewMemberId.value;
  axios.post("http://localhost:8080/get_member_info", {"member_id": memId}).then(memberRes => {
    console.log(memberRes)

    // 渲染領養人資料
    memberId.innerText = memberRes.data.member.memberId;
    memberName.innerText = memberRes.data.member.memberName;
    phone.innerText = memberRes.data.member.phone;

    // 儲存至外部變數
    member = memberRes.data.member;
  }).catch((error) => console.log(error))
})


// 通過
reviewPass.addEventListener("click", () => {
  const body = {
    animal: animal,
    member: member
  }

  axios.post("http://localhost:8080/eligibility_review", body).then(res => {
    alert(res.data.message);
  }).catch((error) => console.log(error))
})
//  233e8d09-f2e3-45da-9834-4bddb5bbf2d4
// 忍痛拒絕
reject.addEventListener("click",()=>{

})