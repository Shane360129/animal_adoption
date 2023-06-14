// 初始化Swiper
var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: false,
    centeredSlides: true,
    slidesPerView: 3,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },
    loop: true,
    autoplay: {
        delay: 1500,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

var swiper1 = new Swiper(".mySwiper1", {
    effect: "coverflow",
    grabCursor: false,
    centeredSlides: true,
    slidesPerView: 3,
    coverflowEffect: {
        rotate: 0,
        stretch: 150,
        depth: 700,
        modifier: 1,
        slideShadows: true,
    },
    loop: true,
    autoplay: {
        delay: 1500,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

//教育頁面的tab切換
const tabWall = document.querySelectorAll(".infoTextUl .infoTextHideLi")

for(let i =0 ; i<tabWall.length ; i++){
    tabWall[i].addEventListener('mouseenter',function(){
        document.querySelector(".infoTextUl .active").classList.remove("active")
        this.classList.add("active")
        document.querySelector(".infoTextInside .active").classList.remove("active")
        document.querySelector(`.infoTextInside .infoTextHideUl:nth-child(${i+1})`).classList.add("active")
    })
}