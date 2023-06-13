const filesBanner = document.querySelector(".filesBanner");

// 獲得資料所有動物資料
function getAllAnimal() {
  axios.get("http://localhost:8080/findAll").then((res) => {
    console.log(res);
    const animalList = res.data.animalList;
    console.log(animalList);
    for (let i = 0; i < animalList.length; i++) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("firstPic");
      newDiv.innerHTML =`<div class="filesText">
      <ul>編號:</ul>
      <ul>${animalList[i].animalId}</ul>
      <svg height="100" width="100" class="like" viewBox="0 0 320 290"
           onclick="document.body.classList.toggle('liked')">
        <path class="path heart" d="M 160 145 c 15 -90 170 -20 0 90 m 0 -90 c -15 -90 -170 -20 0 90"></path>
      </svg>`;
      filesBanner.appendChild(newDiv);
      const filesPic = document.querySelector(".filesPic");
      filesPic.style.backgroundImage=`url("\\img\\animalAll\\${animalList[i].animalId}-1.png")`;
    }
  });
}

getAllAnimal();