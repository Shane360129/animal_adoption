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
        stretch: 0,
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
