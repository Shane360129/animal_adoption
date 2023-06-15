const memberIdDOM = document.querySelector("#memberId");
const pwdDOM = document.querySelector("#pwd");
const idAlertTextDOM = document.querySelector("#idAlertText");
const pwdAlertTextDOM = document.querySelector("#pwdAlertText");

const loginBtnDOM = document.querySelector("#loginBtn");


// 將所有input設為不儲存紀錄
const inputElements = document.querySelectorAll("input");
inputElements.forEach((input) => {
    input.setAttribute('autocomplete', 'off');
})

const idPattern = "^[A-Z][1-2]\\d{8}$";
const pwdPattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\S]{8,12}$";

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

// 驗證碼欄位
const validTextDOM = document.querySelector("#validText");

loginBtnDOM.addEventListener("click", () => {
    // 若有欄位是空
    if (memberIdDOM.value.trim() === "" 
        || pwdDOM.value.trim() === ""
        || validTextDOM.value.trim() === "") {
        return Swal.fire("注意!", "有欄位未填寫", "error");
    }

    // 驗證碼錯誤
    const verifyAlertDOM = document.querySelector("#verifyAlert");
    if (verifyAlertDOM.innerText === "驗證碼錯誤") {
        return Swal.fire("驗證碼錯誤", "請重新輸入", "error")
        .then(() => {
            location.href = "/pages/member/login.html";
        }) 
    }

    // location.href="/";
    const body = {
        member_id: memberIdDOM.value,
        password: pwdDOM.value
    }

    fetch("http://localhost:8080/log_in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(body),

    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // 跳出提醒視窗
            if (data.message === "登入成功") {
                // 暫存帳號資訊
                sessionStorage.setItem("member_id", data.member.memberId);
                sessionStorage.setItem("administrator", data.member.administrator);
                
                Swal.fire(data.message, "登入成功", "success")
                .then((result) => {
                    if (result.isConfirmed) {
                        window.history.go(-1);
                    }
                });
            }
            if (data.message === "資料不正確") {
                Swal.fire(data.message, "輸入錯誤", "error");
            }
            if (data.message === "尚未註冊會員或資料錯誤或尚未生效會員") {
                Swal.fire(data.message, "資訊錯誤", "error");
            }
        })
})
