// 點選區塊
const pwdDOM = document.querySelector("#pwd");
const memberNameDOM = document.querySelector("#memberName");
const phoneDOM = document.querySelector("#phone");
const birthdayDOM = document.querySelector("#birthday");

// 預設內文
const pwdInsideDOM = document.querySelector("#pwdInside");
const memberNameInsideDOM = document.querySelector("#memberNameInside");
const phoneInsideDOM = document.querySelector("#phoneInside");
const birthdayInsideDOM = document.querySelector("#birthdayInside");


// fetch 後端API
const body = {
    member_id: sessionStorage.getItem("member_id"),
}

fetch("http://localhost:8080/get_member_info", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    "body": JSON.stringify(body),
    credentials: 'include', 
})
.then(response => response.json())
.then(data => {
    console.log(data);

    const dataPwd = data.member.pwd;
    const dataMemberName = data.member.memberName;
    const dataPhone = data.member.phone;
    const dataBirth = data.member.birth;

    // 預設內文
    pwdInsideDOM.innerText = dataPwd;
    memberNameInsideDOM.innerText = dataMemberName;
    phoneInsideDOM.innerText = dataPhone;
    birthdayInsideDOM.innerText = dataBirth;

    // 輸入格式

    const phonePattern = "^09\\d{8}$";

    // alert
    const nameAlertTextDOM = document.querySelector("#nameAlertText");
    const phoneAlertTextDOM = document.querySelector("#phoneAlertText");
    const birthAlertTextDOM = document.querySelector("#birthAlertText");

    // 修改密碼
    pwdDOM.addEventListener("click", () => {
        Swal.fire({
            title: "修改密碼",
            html: 
            `
            <input type="text" value="${dataPwd}" id="inputPwd" class="swal2-input" style="display: flex justify-content: center">
            <p class="alert-text" id="pwdAlertText" style="color: #ff7e6b">00000</p>
            `,
            confirmButtonText: "確定",
            confirmButtonColor: "#ff7e6b",
            showCancelButton: true,
            cancelButtonText: "取消", 
            preConfirm: () => {
                let inputPwdDOM = popup.document.querySelector("#inputPwd");
                let pwdAlertTextDOM = popup.document.querySelector("#pwdAlertText");
    
                const pwdPattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\S]{8,12}$";
    
                // let newPwd = inputPwdDOM.value;
    
                inputPwdDOM.addEventListener("blur", () => {
                    if(inputPwd.value === null || inputPwd.value === "") {
                        pwdAlertTextDOM.innerText = "*密碼欄位未填寫";
                    }
                    else if (inputPwd.value.match(pwdPattern)) {
                        pwdAlertTextDOM.innerText = "*密碼格式錯誤";
                    }
                    else {
                        pwdAlertTextDOM.innerText = "";
                        return inputPwd.value;
                    }
                })
            },
        })
        .then((result) => {


            if (result.isConfirmed) {
                Swal.fire({
                    title: "請再次確認變更是否正確",
                    text: `新密碼: ${inputPwd.value}`,
                    confirmButtonText: "確定",
                    confirmButtonColor: "#ff7e6b",
                    showCancelButton: true,
                    cancelButtonText: "取消",
                }).then((result) => {
                    if (result.isConfirmed) {
                        // fetch 後端api
                    }
                })
            }
            console.log("確認")

        })
    })


})




memberNameDOM.addEventListener("click", () => {
    
})


phoneDOM.addEventListener("click", () => {
    
})


birthdayDOM.addEventListener("click", () => {
    
})