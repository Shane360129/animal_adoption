// 參考來源: 
// --- 數字圖形驗證 ---
// https://www.facebook.com/x43x61x69/posts/2179043332232529 Code Review
// https://mycode.gov.taipei/mycode 原站
// https://www.itread01.com/content/1545027129.html 被參考的教學

// 若沒有包在立即函式，options 能直接在 console 中被讀取與修改

(function() {
    // 換圖 function
    function changePic() {
        options.txt = randomNum(1000, 9999).toString();
        helper = new writeAuthCode(options);
        document.getElementById("validText").value = "";
        document.getElementById("verifyAlert").innerText = "";
    };

    // 點擊登入按鈕後換圖
    const loginBtnDOM = document.querySelector("#loginBtn");
    loginBtnDOM.addEventListener("click", () => {
        changePic()
    });
 
    // 點擊按鈕換圖
    const btn = document.getElementById("reBtn");
    btn.addEventListener("click", function() {
        changePic()
    });
 
    // 輸入驗證文字
    const text = document.getElementById("validText");
    let isValid = false;
    text.addEventListener("keyup", function() {
       if (helper.validate(text.value)) {
          document.getElementById("verifyAlert").innerText = "驗證碼正確";
          document.getElementById("verifyAlert").style.color = "#665e54";
          isValid = true;
        //   console.log('驗證碼輸入正確');
       } else {
          document.getElementById("verifyAlert").innerText = "驗證碼錯誤";
          document.getElementById("verifyAlert").style.color = "#ff7e6b";
          isValid = false;
       }
    });
 
    // --------------------------------------------------
    /**驗證碼建構函式**/
    let options = {
        canvasId: "authCode",/**canvas的id*/
        txt: (randomNum(1000, 9999)).toString(),/**傳入驗證碼內容*/
        height: 50,/**驗證碼高度 */
        width: 200,/**驗證碼寬度 */
        fontColor1: 0,/**隨機生成字型顏色*/
        fontColor2: 50,/**隨機生成字型顏色*/
        bgColor1: 180,/**這個範圍的顏色作背景看起來清晰一些*/
        bgColor2: 255,/**這個範圍的顏色作背景看起來清晰一些*/
        fontStyle: "24px SimHei"
    };

    function writeAuthCode(options) {
       this.options = options;
       let canvas = document.getElementById(options.canvasId);
       canvas.width = options.width || 300;
       canvas.height = options.height || 150;
       let ctx = canvas.getContext('2d');/**建立一個canvas物件*/
       ctx.textBaseline = "middle";
       ctx.fillStyle = randomColor(options.bgColor1, options.bgColor2);
       ctx.fillRect(0, 0, options.width, options.height);
       for (let i = 0; i < options.txt.length; i++) {
          let txt = options.txt.charAt(i);/**讓每個字不一樣*/
          ctx.font = options.fontStyle;
          ctx.fillStyle = randomColor(options.fontColor1, options.fontColor2);
          ctx.shadowOffsetY = randomNum(-3, 3);
          ctx.shadowBlur = randomNum(-3, 3);
          ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
          let x = options.width / (options.txt.length + 1) * (i + 1);
          let y = options.height / 2;
          let deg = randomNum(-30, 30);
          /**設定旋轉角度和座標原點*/
          ctx.translate(x, y);
          ctx.rotate(deg * Math.PI / 180);
          ctx.fillText(txt, 0, 0);
          /**恢復旋轉角度和座標原點*/
          ctx.rotate(-deg * Math.PI / 180);
          ctx.translate(-x, -y);
       }
       /**1~4條隨機干擾線隨機出現*/
       for (let j = 0; j < randomNum(1, 4); j++) {
          ctx.strokeStyle = randomColor(40, 180);
          ctx.beginPath();
          ctx.moveTo(randomNum(0, options.width), randomNum(0, options.height));
          ctx.lineTo(randomNum(0, options.width), randomNum(0, options.height));
          ctx.stroke();
       }
       /**繪製干擾點*/
       for (let k = 0; k < options.width / 6; k++) {
          ctx.fillStyle = randomColor(0, 255);
          ctx.beginPath();
          ctx.arc(randomNum(0, options.width), randomNum(0, options.height), 1, 0, 2 * Math.PI);
          ctx.fill();
       }
       this.validate = function(code) {
          return this.options.txt === code;
       };
    }
 
    /**隨機數字**/
    function randomNum(min, max) {
       return Math.floor(Math.random() * (max - min) + min);
    }
 
    /**隨機顏色**/
    function randomColor(min, max) {
       let r = randomNum(min, max);
       let g = randomNum(min, max);
       let b = randomNum(min, max);
       return "rgb(" + r + "," + g + "," + b + ")";
    }
 
    let helper = new writeAuthCode(options); 
 })();  
   