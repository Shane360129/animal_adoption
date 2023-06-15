const btn = document.querySelector(".btn");
console.log(sessionStorage.getItem("member_id"))
if(sessionStorage.getItem("member_id")){
  btn.innerHTML = ` <a href="#">
                    <button type="button" class="signOut">登出</button>
                </a><a href="#">
                    <button type="button" class="addAnimal">新增動物</button>
                </a>`;
  const signOut = document.querySelector(".signOut")
  signOut.addEventListener("click",function (){
    sessionStorage.removeItem("member_id");
    location.reload();
  })
}
else {
  btn.innerHTML = ` <a href="./pages/member/register.html">
                    <button type="button">註冊</button>
                </a>
                <a href="./pages/member/login.html">
                    <button type="button">登入</button>
                </a>`;
}

