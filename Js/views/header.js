const btn = document.querySelector(".btn");
console.log(sessionStorage.getItem("member_id"));
console.log(btn)

function signout() {
  const signOut = document.querySelector(".signOut")
  signOut.addEventListener("click", function () {
    sessionStorage.removeItem("member_id");
    sessionStorage.removeItem("administrator");
    // location.reload();
    location.href = "/";
  })
}

// 後台
if (sessionStorage.getItem("administrator") === "true") {
  const animalDOM = document.querySelector("#animalDrop");
  animalDOM.classList.remove('memberIn')
  animalDOM.classList.add('unMember')
  btn.innerHTML = ` <a href="#">
                    <button type="button" class="signOut">登出</button></a>
                    <a href="http://localhost:63343/animal_adoption/pages/product/product_bg_all.html">
                    <button type="button" class="addAnimal">商品總覽</button></a>
                  `;
  signout();
}
// 前台
else if (sessionStorage.getItem("member_id")
  && sessionStorage.getItem("administrator") === "false") {
  btn.innerHTML = ` <a href="#">
                    <button type="button" class="signOut">登出</button>
                </a><a href="http://localhost:63343/animal_adoption/pages/member_info.html">
                    <button type="button" class="">會員中心</button>
                </a>`;
  signout();
}
else {
  btn.innerHTML = ` <a href="http://localhost:63343/animal_adoption/pages/member/register.html">
                    <button type="button">註冊</button>
                </a>
                <a href="http://localhost:63343/animal_adoption/pages/member/login.html">
                    <button type="button">登入</button>
                </a>`;
}