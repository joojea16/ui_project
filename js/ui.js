$(function () {
  $("#pc").each(function () {
    const $window = $(window),
      header = $(this),
      headerOffsetTop = header.offset().top;

    $window.on("scroll", function () {
      if ($window.scrollTop() > headerOffsetTop) {
        header.addClass("psticky");
      } else {
        header.removeClass("psticky");
      }
    });
  });

  $("#tablet").each(function () {
    const $window = $(window),
      header = $(this),
      headerOffsetTop = header.offset().top;

    $window.on("scroll", function () {
      if ($window.scrollTop() > headerOffsetTop) {
        header.addClass("tsticky");
      } else {
        header.removeClass("tsticky");
      }
    });
  });

  $("#mobile").each(function () {
    const $window = $(window),
      header = $(this),
      headerOffsetTop = header.offset().top;

    $window.on("scroll", function () {
      if ($window.scrollTop() > headerOffsetTop) {
        header.addClass("msticky");
      } else {
        header.removeClass("msticky");
      }
    });
  });

  $(".hamburger").click(function () {
    $(".hmenu").toggleClass("open");
  });

  $(".hmenu>ul>li>a").click(function () {
    if ($(this).next().is(":visible")) {
      $(this).next().stop().slideUp(500);
      $("hmenu ul li a").removeClass("color");
      $(this).find("i").removeClass("up");
    } else {
      $(".sub").stop().slideUp(500);
      $(this).next().stop().slideDown(500);
      $(".hmenu ul li a").removeClass("color");
      $(this).addClass("color");
      $(".hmenu>ul>li>a>i").removeClass("up");
      $(this).find("i").addClass("up");
    }
  });
  const defaultTop = parseInt($("#quick").css("top"));
  $(window).on("scroll", function () {
    const scv = $(window).scrollTop();
    $("#quick")
      .stop()
      .animate({ top: scv + defaultTop + "px" }, 0);
  });

  $(".ppc_menu>li>a").mouseenter(function () {
    $(".f_menu").stop().slideUp(500);
    $(this).next().stop().slideDown(500);
  });
  $(".menu").mouseleave(function () {
    $(".f_menu").stop().slideUp(500);
  });

  new TypeIt("#title", {
    afterComplete: function (instance) {
      instance.destroy();
    },
  })
    .pause(100)

    .go();
});

let hunder = document.getElementById("hunder");
let hmenu = document.querySelectorAll(".ppc_menu>li> a");

hmenu.forEach((menu) => menu.addEventListener("mouseenter", (e) => horizon(e)));
hmenu.forEach((menu) =>
  menu.addEventListener("mouseleave", (e) => nhorizon(e))
);

function horizon(e) {
  hunder.style.left = e.currentTarget.offsetLeft + "px";
  hunder.style.width = e.currentTarget.offsetWidth + "px";
  hunder.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}
function nhorizon(e) {
  hunder.style.width = 0 + "px";
}

let mainText = document.querySelector("#slide #slide_s");
window.addEventListener("scroll", function () {
  let value = window.scrollY;
  if (value > 300) {
    mainText.style.animation = "slide 1.5s ease-out forwards";
  } else {
    mainText.style.animation = "disa 1.5s ease-out";
  }
});

let autoRun = setInterval(changeSlide, 3000);

function changeSlide() {
  const radioButtons = [...document.querySelectorAll(".slide-radios")];
  const currentIndex = radioButtons.findIndex((rb) => rb.checked);
  radioButtons[(currentIndex + 1) % radioButtons.length].checked = true;
}

document.addEventListener("DOMContentLoaded", () => {
  new TypeIt("#banner_s>h1", { waitUntilVisible: true }).pause(1000).go();
});

class CardFlipOnScroll {
  constructor(wrapper, sticky) {
    this.wrapper = wrapper;
    this.sticky = sticky;
    this.cards = sticky.querySelectorAll(".card");
    this.length = this.cards.length;

    this.start = 0;
    this.end = 0;
    this.step = 0;
  }

  init() {
    this.start = this.wrapper.offsetTop - 100;
    this.end =
      this.wrapper.offsetTop + this.wrapper.offsetHeight - innerHeight * 1.2;
    this.step = (this.end - this.start) / (this.length * 2);
  }

  animate() {
    this.cards.forEach((card, i) => {
      const s = this.start + this.step * i;
      const e = s + this.step * (this.length + 1);

      if (scrollY <= s) {
        card.style.transform = `
                perspective(100vw)
                translateX(100vw) 
                rotateY(180deg)
              `;
      } else if (scrollY > s && scrollY <= e - this.step) {
        card.style.transform = `
                perspective(100vw)
                translateX(${100 + ((scrollY - s) / (e - s)) * -100}vw)
                rotateY(180deg)
              `;
      } else if (scrollY > e - this.step && scrollY <= e) {
        card.style.transform = `
                perspective(100vw)
                translateX(${100 + ((scrollY - s) / (e - s)) * -100}vw)
                rotateY(${
                  180 + (-(scrollY - (e - this.step)) / this.step) * 180
                }deg)
              `;
      } else if (scrollY > e) {
        card.style.transform = `
                perspective(100vw)
                translateX(0vw) 
                rotateY(0deg)
              `;
      }
    });
  }
}

const story = document.querySelector("#story");
const sticky = document.querySelector(".sticky");
const cardFlipOnScroll = new CardFlipOnScroll(story, sticky);
cardFlipOnScroll.init();

window.addEventListener("scroll", () => {
  cardFlipOnScroll.animate();
});

window.addEventListener("resize", () => {
  cardFlipOnScroll.init();
});
