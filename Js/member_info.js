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

    let dataPwd = data.member.pwd;
    let dataMemberName = data.member.memberName;
    let dataPhone = data.member.phone;
    let dataBirth = data.member.birth;
    
    // 預設內文
    // 密碼改成*符號
    let starPwd = "";
    function turnToStar(pwd) {
        pwd.split("").forEach(() => {
            starPwd += "*";
        })
    }
    turnToStar(dataPwd);
    pwdInsideDOM.innerText = starPwd;

    memberNameInsideDOM.innerText = dataMemberName;
    phoneInsideDOM.innerText = dataPhone;
    birthdayInsideDOM.innerText = dataBirth;


    // 修改密碼
    let inputPwdDOM = null;
    pwdDOM.addEventListener("click", function showPwd() {
        Swal.fire({
            title: "修改密碼",
            html: 
            `
            <input type="text" id="inputPwd" class="swal2-input" style="display: flex justify-content: center">
            `,
            confirmButtonText: "確定",
            confirmButtonColor: "#ff7e6b",
            showCancelButton: true,
            cancelButtonText: "取消", 
            inputAttributes: {
                autocomplete: 'off'
              },
            preConfirm: () => {
                inputPwdDOM = document.querySelector("#inputPwd");
    
                const pwdPattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\S]{8,12}$";

                if(inputPwdDOM.value === null || inputPwdDOM.value === "") {
                    return Swal.fire("*密碼欄位未填寫")
                    .then(() => {
                        showPwd(); 
                    });
                }
                else if (inputPwdDOM.value === dataPwd) {
                    return Swal.fire("*密碼不可與原本相同")
                    .then(() => {
                        showPwd(); 
                    })
                }
                else if (!inputPwdDOM.value.match(pwdPattern)) {
                    return Swal.fire("*密碼格式錯誤")
                    .then(() => {
                        showPwd(); 
                    })
                }
                else {
                    return Swal.fire({
                        title: "請再次確認變更是否正確",
                        text: `新密碼:    ${inputPwdDOM.value}`,
                        confirmButtonText: "確定",
                        confirmButtonColor: "#ff7e6b",
                        showCancelButton: true,
                        cancelButtonText: "取消",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // fetch 後端api
                            const body = {
                                member_id: sessionStorage.getItem("member_id"),
                                password: inputPwdDOM.value,
                            }
                            
                            return fetch("http://localhost:8080/update_pwd", {
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
                                if (data.message === "更新會員資訊成功") {
                                    Swal.fire({
                                        title: "成功更新密碼",
                                        text: "請重新登入",
                                        icon: "success"
                                    }).then((result) => {
                                        // 更新密碼後(會強制登出)需要重新登入
                                        sessionStorage.removeItem("member_id");
                                        location.href="/pages/member/login.html";
                                        // pwdInsideDOM.innerText = inputPwdDOM.value;
                                        // 密碼改成*符號
                                        let starPwd = "";
                                        function turnToStar(pwd) {
                                            pwd.split("").forEach(() => {
                                                starPwd += "*";
                                            })
                                        }
                                        turnToStar(inputPwdDOM.value);
                                        pwdInsideDOM.innerText = starPwd;
                                    })
                                }
                            })
                        }
                    })
                }
            },
        })
    })


    // 修改姓名
    let inputMemberNameDOM = null;
    memberNameDOM.addEventListener("click", function showMemberName() {
        Swal.fire({
            title: "修改姓名",
            html: 
            `
            <input type="text" value="${dataMemberName}" id="inputMemberName" class="swal2-input" style="display: flex justify-content: center">
            `,
            confirmButtonText: "確定",
            confirmButtonColor: "#ff7e6b",
            showCancelButton: true,
            cancelButtonText: "取消", 
            inputAttributes: {
                autocomplete: 'off'
              },
            preConfirm: () => {
                inputMemberNameDOM = document.querySelector("#inputMemberName");

                if(inputMemberNameDOM.value === null || inputMemberNameDOM.value === "") {
                    return Swal.fire("*姓名欄位未填寫")
                    .then(() => {
                        showMemberName(); 
                    });
                }
                else if (inputMemberNameDOM.value === dataMemberName) {
                    return Swal.fire("*姓名不可與原本相同")
                    .then(() => {
                        showMemberName(); 
                    })
                }
                else {
                    return Swal.fire({
                        title: "請再次確認變更是否正確",
                        text: `新姓名:    ${inputMemberNameDOM.value}`,
                        confirmButtonText: "確定",
                        confirmButtonColor: "#ff7e6b",
                        showCancelButton: true,
                        cancelButtonText: "取消",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // fetch 後端api
                            const body = {
                                member_id: sessionStorage.getItem("member_id"),
                                member_name: inputMemberNameDOM.value,
                            }
                            
                            return fetch("http://localhost:8080/update_member_name", {
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
                                if (data.message === "更新會員資訊成功") {
                                    Swal.fire({
                                        title: "成功更新姓名",
                                        icon: "success"
                                    });
                                    memberNameInsideDOM.innerText = inputMemberNameDOM.value;
                                }
                            })
                        }
                    })
                }
            },
        })
    })

    
    // 修改手機
    let inputPhoneDOM = null;
    phoneDOM.addEventListener("click", function showPhone() {
        Swal.fire({
            title: "修改手機",
            html: 
            `
            <input type="text" value="${dataPhone}" id="inputPhone" class="swal2-input" style="display: flex justify-content: center">
            `,
            confirmButtonText: "確定",
            confirmButtonColor: "#ff7e6b",
            showCancelButton: true,
            cancelButtonText: "取消", 
            inputAttributes: {
                autocomplete: 'off'
              },
            preConfirm: () => {
                inputPhoneDOM = document.querySelector("#inputPhone");
    
                const phonePattern = "^09\\d{8}$";

                if(inputPhoneDOM.value === null || inputPhoneDOM.value === "") {
                    return Swal.fire("*手機欄位未填寫")
                    .then(() => {
                        showPhone(); 
                    });
                }
                else if (inputPhoneDOM.value === dataPhone) {
                    return Swal.fire("*手機不可與原本相同")
                    .then(() => {
                        showPhone(); 
                    })
                }
                else if (!inputPhoneDOM.value.match(phonePattern)) {
                    return Swal.fire("*手機格式錯誤")
                    .then(() => {
                        showPhone(); 
                    })
                }
                else {
                    return Swal.fire({
                        title: "請再次確認變更是否正確",
                        text: `新手機:    ${inputPhoneDOM.value}`,
                        confirmButtonText: "確定",
                        confirmButtonColor: "#ff7e6b",
                        showCancelButton: true,
                        cancelButtonText: "取消",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // fetch 後端api
                            const body = {
                                member_id: sessionStorage.getItem("member_id"),
                                phone: inputPhoneDOM.value,
                            }
                            
                            return fetch("http://localhost:8080/update_phone", {
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
                                if (data.message === "更新會員資訊成功") {
                                    Swal.fire({
                                        title: "成功更新手機",
                                        icon: "success"
                                    });
                                    phoneInsideDOM.innerText = inputPhoneDOM.value;
                                }
                            })
                        }
                    })
                }
            },
        })
    })


    // 日期: 設定最大日期為 today
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];

    // 修改生日
    let inputBirthdayDOM = null;
    birthdayDOM.addEventListener("click", function showBirthday() {
        Swal.fire({
            title: "修改生日",
            html: 
            `
            <input type="date" value="${dataBirth}" id="inputBirthday" min="1900-01-01" max="${maxDate}" placeholder="yyyy/mm/dd" pattern="^\\d{4}-\\d{2}-\\d{2}$" class="swal2-input" style="display: flex justify-content: center" >
            `,
            confirmButtonText: "確定",
            confirmButtonColor: "#ff7e6b",
            showCancelButton: true,
            cancelButtonText: "取消", 
            inputAttributes: {
                autocomplete: 'off'
              },
            preConfirm: () => {
                inputBirthdayDOM = document.querySelector("#inputBirthday");

                // 解析日期字串為日期物件
                const date = new Date(inputBirthdayDOM.value);

                if (date.getFullYear() < 1900 
                || date.getFullYear() > today.getFullYear()) {
                    return Swal.fire("*生日無效")
                    .then(() => {
                        showBirthday(); 
                    })
                }
                else if(inputBirthdayDOM.value === null || inputBirthdayDOM.value === "") {
                    return Swal.fire("*生日欄位未填寫")
                    .then(() => {
                        showBirthday(); 
                    });
                }
                else if (inputBirthdayDOM.value === dataBirth) {
                    return Swal.fire("*生日不可與原本相同")
                    .then(() => {
                        showBirthday(); 
                    })
                }
                else {
                    return Swal.fire({
                        title: "請再次確認變更是否正確",
                        text: `新生日: ${inputBirthdayDOM.value}`,
                        confirmButtonText: "確定",
                        confirmButtonColor: "#ff7e6b",
                        showCancelButton: true,
                        cancelButtonText: "取消",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // fetch 後端api
                            const body = {
                                member_id: sessionStorage.getItem("member_id"),
                                birthday: inputBirthdayDOM.value,
                            }
                            
                            return fetch("http://localhost:8080/update_birthday", {
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
                                if (data.message === "更新會員資訊成功") {
                                    Swal.fire({
                                        title: "成功更新生日",
                                        icon: "success"
                                    });
                                    birthdayInsideDOM.innerText = inputBirthdayDOM.value;
                                }
                            })
                        }
                    })
                }
            },
        })
    })
    
})