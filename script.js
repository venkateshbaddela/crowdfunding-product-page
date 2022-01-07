"use strict";

/* Seletors */

const ctaContainer = document.querySelectorAll(".modal-cta__box");

const rewardBtn = document.querySelectorAll(".about-box__cta-btn");

const checkBtn = document.querySelectorAll(".modal-content__box-input");

const pledgeBtn = document.querySelectorAll(".modal-cta__box-btn");

const pledgeInput = document.querySelectorAll(".modal-cta__box-input");

const closeBtn = document.querySelector(".modal-btn");

const closeTqBtn = document.querySelector(".modal-tq__btn");

const rewardModal = document.querySelector(".modal");

const modalWrapper = document.querySelector(".modal-wrapper");

const modalCta = document.querySelectorAll(".modal-cta__wrapper");

const modalTq = document.querySelector(".modal-tq");

const backers = document.querySelector(".stats-box__backers");

const backed = document.querySelector(".stats-box__backed");

const bookmark = document.querySelector(".master-cta__bookmark");

const nav = document.querySelector(".head-nav__list-wrapper");

const navBtn = document.querySelector(".head-nav__btn");

const navImg = document.querySelector(".head-nav__btn-img");

const modalBox = document.querySelectorAll(".modal-box");

let count = 0;

/////////////////////////////////////
/* functions */
////////////////////////////////////

/* Function to clear All  */

const clearAllModal = function () {
  modalTq.classList.remove("modal-tq__visible");
  modalWrapper.classList.remove("modal-bg");
  rewardModal.classList.remove("modal-visible");
  nav.classList.remove("nav-visible");
  navImg.src = "images/icon-hamburger.svg";
};

/* Function to clear modal cta */
const clearModalCta = function () {
  for (let i = 0; i < modalCta.length - 1; i++) {
    modalCta[i].classList.remove("visible-cta");
    console.log("not");
    checkBtn[i].checked = false;
    pledgeInput[i].value = "";
    pledgeInput[i].style.border = "";
    ctaContainer[i].style.setProperty("--error", "hidden");
  }
};

/* Function to toggle main modal */

const toggleModal = function () {
  rewardModal.classList.toggle("modal-visible");
};

/* Function to toggle modal wrapper */

const toggleModalWrapper = function () {
  modalWrapper.classList.toggle("modal-bg");
};

/* Function to toggle thankyou modal */

const toggleTqModal = function () {
  modalTq.classList.toggle("modal-tq__visible");
};

/* Function to handle checkbox */
const checkBoxClear = function (val) {
  checkBtn.forEach((el, i, arr) => {
    if (arr[i].checked && arr[i] !== val.target) {
      arr[i].checked = false;
      modalCta[i].classList.remove("visible-cta");
    }
  });
};

/* Function to display backed and  backed numbers in the stats section */

const displayBackers = function (val) {
  count++;

  backed.textContent =
    "$" +
    (
      Number(backed.textContent.replace(/[^0-9]+/g, "")) +
      Number(pledgeInput[val].value)
    ).toLocaleString("en");
  backers.textContent =
    "$" +
    (
      Number(backers.textContent.replace(/[^0-9]+/g, "")) + count
    ).toLocaleString("en");

  count--;
};

/////////////////////////////////////
/* Event listeners */
////////////////////////////////////

/* Eventlistener for reward button in main section */

rewardBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    toggleModal();
    toggleModalWrapper();
  });
});

/* Eventlistener for close button in main modal */

closeBtn.addEventListener("click", function (e) {
  toggleModal();
  toggleModalWrapper();
  clearModalCta();
});

/* Eventlistener for check button in main modal */
checkBtn.forEach((btn, i, btnArr) => {
  btn.addEventListener("click", function (e) {
    modalCta[i].classList.toggle("visible-cta");

    modalBox[i].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    checkBoxClear(e);
  });
});

/* Eventlistener for continue button in main modal */

pledgeBtn.forEach((btn, i) => {
  btn.addEventListener("click", function (e) {
    if (pledgeInput[i].value === pledgeInput[i].dataset.num) {
      toggleTqModal();
      toggleModal();
      pledgeInput[i].style.border = "";
      clearModalCta();
      displayBackers(i);
    } else {
      pledgeInput[i].style.border = "1px solid red";
      ctaContainer[i].style.setProperty("--error", "visible");
    }
  });
});

/* Eventlistener for thank you button int hank you modal */

closeTqBtn.addEventListener("click", function () {
  toggleModalWrapper();
  toggleTqModal();
  // clearModalCta();
});

/* Eventlistener for bookmark button */

bookmark.addEventListener("click", function (e) {
  bookmark.classList.toggle("master-cta__bookmark-active");
});

/* Eventlistener for close and opening menu  */

navBtn.addEventListener("click", function () {
  nav.classList.toggle("nav-visible");
  modalTq.classList.remove("modal-tq__visible");
  rewardModal.classList.remove("modal-visible");
  clearModalCta();

  if (nav.classList.contains("nav-visible")) {
    navImg.src = "images/icon-close-menu.svg";
    modalWrapper.classList.add("modal-bg");
  } else {
    navImg.src = "images/icon-hamburger.svg";
    modalWrapper.classList.remove("modal-bg");
  }
});

/* Eventlistener for wrapper background */

modalWrapper.addEventListener("click", function (e) {
  clearAllModal();
  clearModalCta();
});

/* Eventlistener for closing modals when window resizing */

window.addEventListener("resize", function () {
  clearAllModal();
  clearModalCta();
});

/* Progress bar loading  */

let progress = 0;

window.addEventListener("load", function () {
  const proge = function () {
    if (progress == 75) {
      clearInterval(timers);
    } else {
      progress++;
      document
        .querySelector(".stats-progress")
        .style.setProperty("--afterWidth", `${progress}%`);
    }
  };

  const timers = setInterval(proge, 5);
});
