const pwdDOM = document.querySelector("#pwd");
const memberNameDOM = document.querySelector("#memberName");
const phoneDOM = document.querySelector("#phone");
const birthdayDOM = document.querySelector("#birthday");


fetch("http://localhost:8080/get_member_info", {
    credentials: 'include', 
})
.then(response => response.json())
.then(data => {
    console.log(data);

    pwdDOM.addEventListener("click", () => {
        Swal.fire({
            title: "修改姓名",
            input: "text",
            // inputValue: `${data.member.memberName}`,
            confirmButtonText: "確定",
            cancelButtonText: "取消", 
            showCancelButton: true,
        })
    })


})




memberNameDOM.addEventListener("click", () => {
    
})


phoneDOM.addEventListener("click", () => {
    
})


birthdayDOM.addEventListener("click", () => {
    
})