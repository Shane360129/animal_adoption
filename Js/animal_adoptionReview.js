// 先預設要領養的寵物
const animal = {
    animalId: 87,
    animalName: "小吉",
    sex: 1,
    species: 0,
    type: "MIX",
    regDate: "2023-03-31",
    regCity: "臺中市"
}

// 先預設待審核的會員
const member = {
    memberId: "A123456789",
    pwd: "ccc123",
    memberName: "阿花",
    phone: "0912345678",
    birth: "1990-06-08"
}

const animalId = document.querySelector(".animalId");
const animalName = document.querySelector(".animalName");
const species = document.querySelector(".species");
const sex = document.querySelector(".sex");
const type = document.querySelector(".type");
const regDate = document.querySelector(".regDate");
const regCity = document.querySelector(".regCity");
const adoption = document.querySelector(".adoption");

const memberId = document.querySelector(".memberId");
const memberName = document.querySelector(".memberName");
const phone = document.querySelector(".phone");

// const birth = document.querySelector(".memberAge");
const birth = member.birth;


const birthDate = new Date(birth);
const today = new Date();
const age = today.getFullYear() - birthDate.getFullYear();


// 渲染選中寵物資料
animalId.innerText = animal.animalId;
animalName.innerText = animal.animalName;
animal.sex === 0 ? sex.innerText = "公" : sex.innerText = "母"
animal.species === 0 ? species.innerText = "貓" : species.innerText = "狗";
type.innerText = animal.type;
regDate.innerText = animal.regDate;
regCity.innerText = animal.regCity;

// 渲染領養人資料
memberId.innerText = member.memberId;
memberName.innerText = member.memberName;
phone.innerText = member.phone;
document.querySelector(".memberAge").innerText = age + "歲";