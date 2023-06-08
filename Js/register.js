const account = document.querySelector("#account");
const accountAlert = document.querySelector(".account-alert");
const password = document.querySelector("#password");
const passwordAlert = document.querySelector(".password-alert");
const name = document.querySelector("#name");
const nameAlert = document.querySelector(".name-alert");
const tel = document.querySelector("#tel");
const telAlert = document.querySelector(".tel-alert");
const birthday = document.querySelector("#birthday");
const loginButton = document.querySelector(".login");

// 將所有input設為不儲存紀錄
const inputElements = document.querySelectorAll("input[]");
inputElements.forEach((input) => {
  input.setAttribute('autocomplete', 'off');
})

// 身分證正規表達式
// ^: 表示匹配字串開頭
// [A-Z]: 表示第一位是任意大寫字母
// [12]: 表示第二位只能是數字 1 或 2
// [0-9]{8}: 表示後面 8 位必須是數字
// $: 表示匹配字串結尾
const accountRegex = /^[A-Z][12][0-9]{8}$/;

// 帳號判斷
account.addEventListener("focusout", function () {
  if (!accountRegex.test(account.value)) {
    accountAlert.style.display = "block";
  }
  else {
    accountAlert.style.display = "none";
  }
});

// 密碼正規表達式
// ^：匹配字串的開頭
// (?=.*[a-zA-Z])：使用正向肯定項目前瞻，表示字串中必須包含英文字母
// (?=.*[0-9])：使用正向肯定項目前瞻，表示字串中必須包含數字
// .{8,12}：匹配任意字符，長度介於 8 到 12 之間。
// $：匹配字串的結尾
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,12}$/;

// 密碼判斷
password.addEventListener("focusout", function () {
  if (!passwordRegex.test(password.value)) {
    passwordAlert.style.display = "block";
  }
  else {
    passwordAlert.style.display = "none";
  }
});

// 名子正規表達
// ^：匹配字串的開頭
// (?=.*[\w\u4E00-\u9FFF])：使用正向肯定查詢，確保字串中至少包含一個英文字母、數字或中文
// [^\s]+：匹配一個或多個非空格字符。這部分確保字串中沒有空格
// $：匹配字串的結尾
const nameRegex = /^(?=.*[\w\u4E00-\u9FFF])\S+$/;

// 姓名判斷
name.addEventListener("focusout", function () {
  if (!nameRegex.test(name.value)) {
    nameAlert.style.display = "block";
  }
  else {
    nameAlert.style.display = "none";
  }
});

// 電話正規表達式
// ^：匹配字串的開頭
// 09:表示開頭必須是09
// [0-8]{8}: 表示後面 8 位必須是數字
// $：匹配字串的結尾
const telRegex = /^09[0-9]{8}$/;

// 電話判斷
tel.addEventListener("focusout", function () {
  if (!telRegex.test(tel.value)) {
    telAlert.style.display = "block";
  }
  else {
    telAlert.style.display = "none";
  }
});

// 自動校正日期範圍
const today = new Date();
const minDate = today.getFullYear() - 120 + "-01-01";
birthday.setAttribute("min", `${minDate}`);
const formattedDate = today.toISOString().split('T')[0];
birthday.value = formattedDate;

//註冊
loginButton.addEventListener("click", () => {
  // 所有input非空判斷
  const span = Array.from(document.querySelectorAll("span"))
  console.dir(span)
  if (account.value.trim() === ""
      || password.value.trim() === ""
      || name.value.trim() === ""
      || tel.value.trim() === ""
      || span.some(span => span.style.display === "block")) {
    return alert("輸入資料有錯")
  }
  const body = {
    member_id: account.value,
    password: password.value,
    member_name: name.value,
    phone: tel.value,
    birthday: birthday.value
  };
  fetch("http://localhost:8080/sign_up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert(data);
      })

})