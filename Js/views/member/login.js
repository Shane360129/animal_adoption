const memberIdDOM = document.querySelector("#memberId");
const pwdDOM = document.querySelector("#pwd");
const idAlertTextDOM = document.querySelector("#idAlertText");
const pwdAlertTextDOM = document.querySelector("#pwdAlertText");




const loginBtnDOM = document.querySelector("#loginBtn");

const idPattern = "^[A-Z][1-2]\\d{8}$";
const pwdPattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\S]{8,12}$";


// 帳號欄位檢查
memberIdDOM.addEventListener("change", () => {
    if(memberIdDOM.value == null || memberIdDOM.value == "") {
        idAlertTextDOM.innerText = "*帳號欄位未填寫";
    }
    if (!memberIdDOM.value.match(idPattern)) {
        idAlertTextDOM.innerText = "*帳號格式錯誤";
    }else {
        idAlertTextDOM.innerText = "";
    }
}) 

// 密碼欄位檢查
pwdDOM.addEventListener("change", () => {
    if(pwdDOM.value == null || pwdDOM.value == "") {
        pwdAlertTextDOM.innerText = "*密碼欄位未填寫";
    }
    if (!pwdDOM.value.match(pwdPattern)) {
        pwdAlertTextDOM.innerText = "*密碼格式錯誤";
    }else {
        pwdAlertTextDOM.innerText = "";
    }
}) 

loginBtnDOM.addEventListener("click", () => {
    // location.href="/";
    const body = {
        member_id: memberIdDOM.value,
        password: pwdDOM.value
    }

    console.log(body)

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
        if (data.message == "登入成功") {
            swal(data.message, "登入成功", "success");

            const swalBtnDOM = document.querySelector(".swal-button");
            swalBtnDOM.addEventListener("click", () => {
                location.href="/";
            })
            // console.dir(swalBtnDOM)
        }
        if (data.message == "資料不正確") {
            swal(data.message, "輸入錯誤", "error");
        }
        if (data.message == "尚未註冊會員或資料錯誤或尚未生效會員") {
            swal(data.message, "資訊錯誤", "error");
        }
    })
})
