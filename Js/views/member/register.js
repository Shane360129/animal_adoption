const memberIdDOM = document.querySelector("#memberId");
const pwdDOM = document.querySelector("#pwd");
const memberNameDOM = document.querySelector("#memberName");
const phoneDOM = document.querySelector("#phone");
const birthDOM = document.querySelector("#birth");

const idAlertTextDOM = document.querySelector("#idAlertText");
const pwdAlertTextDOM = document.querySelector("#pwdAlertText");
const nameAlertTextDOM = document.querySelector("#nameAlertText");
const phoneAlertTextDOM = document.querySelector("#phoneAlertText");
const birthAlertTextDOM = document.querySelector("#birthAlertText");

const signupBtnDOM = document.querySelector("#signupBtn");

// 將所有input設為不儲存紀錄
const inputElements = document.querySelectorAll("input");
inputElements.forEach((input) => {
  input.setAttribute('autocomplete', 'off');
})

const idPattern = "^[A-Z][1-2]\\d{8}$";
const pwdPattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\S]{8,12}$";
const phonePattern = "^09\\d{8}$";

// 帳號欄位檢查
memberIdDOM.addEventListener("blur", () => {
  if (memberIdDOM.value === null || memberIdDOM.value === "") {
    idAlertTextDOM.innerText = "*帳號欄位未填寫";
  }
  else if (!memberIdDOM.value.match(idPattern)) {
    idAlertTextDOM.innerText = "*帳號格式錯誤";
  }
  else {
    idAlertTextDOM.innerText = "";
  }
})

// 密碼欄位檢查
pwdDOM.addEventListener("blur", () => {
  if (pwdDOM.value === null || pwdDOM.value === "") {
    pwdAlertTextDOM.innerText = "*密碼欄位未填寫";
  }
  else if (!pwdDOM.value.match(pwdPattern)) {
    pwdAlertTextDOM.innerText = "*密碼格式錯誤";
  }
  else {
    pwdAlertTextDOM.innerText = "";
  }
})

// 姓名欄位檢查
memberNameDOM.addEventListener("blur", () => {
  if (memberNameDOM.value === null || memberNameDOM.value === "") {
    nameAlertTextDOM.innerText = "*姓名欄位未填寫";
  }
  else {
    nameAlertTextDOM.innerText = "";
  }
})

// 手機欄位檢查
phoneDOM.addEventListener("blur", () => {
  if (phoneDOM.value === null || phoneDOM.value === "") {
    phoneAlertTextDOM.innerText = "*手機欄位未填寫";
  }
  else if (!phoneDOM.value.match(phonePattern)) {
    phoneAlertTextDOM.innerText = "*手機格式錯誤";
  }
  else {
    phoneAlertTextDOM.innerText = "";
  }
})

// 日期: 設定最大日期為 today
const today = new Date();
const maxDate = today.toISOString().split('T')[0];
birthDOM.max = maxDate;

// 生日欄位檢查
birthDOM.addEventListener("blur", () => {
  // 解析日期字串為日期物件
  const date = new Date(birthDOM.value);

  if (date.getFullYear() < 1900
      || date.getFullYear() > today.getFullYear()) {
    birthAlertTextDOM.innerText = "*生日無效";
  }
  else if (birthDOM.value === null || birthDOM.value === "") {
    birthAlertTextDOM.innerText = "*生日欄位未填寫";
  }
  else {
    birthAlertTextDOM.innerText = "";
  }
})

signupBtnDOM.addEventListener("click", () => {
  // 若有欄位是空或全空白
  if (memberIdDOM.value.trim() === ""
      || pwdDOM.value.trim() === ""
      || memberNameDOM.value.trim() === ""
      || phoneDOM.value.trim() === ""
      || memberNameDOM.value.trim() === ""
      || birthDOM.value.trim() === "") {
    return swal("注意!", "輸入資料錯誤", "error");
  }

  const body = {
    member_id: memberIdDOM.value,
    password: pwdDOM.value,
    member_name: memberNameDOM.value,
    phone: phoneDOM.value,
    birthday: birthDOM.value
  }

  fetch("http://localhost:8080/sign_up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify(body),

  })
      .then(response => response.json())
      .then(data => {
        // console.log(data);

        // 跳出提醒視窗
        if (data.message === "註冊成功") {
          swal(data.message, "註冊成功", "success");

          const swalBtnDOM = document.querySelector(".swal-button");
          swalBtnDOM.addEventListener("click", () => {
            location.href = "/";
          })
        }
        if (data.message === "資料不正確") {
          swal(data.message, "輸入錯誤", "error");
        }
        if (data.message === "已註冊會員") {
          swal(data.message, "已註冊會員，請直接登入", "error");

          const swalBtnDOM = document.querySelector(".swal-button");
          swalBtnDOM.addEventListener("click", () => {
            location.href = "/pages/member/login.html";
          })
        }
      })
})
