/* card */
//
// const cardElements = document.querySelectorAll(".card");
// const cardImgWrap = document.querySelector(".card-img-wrapper");
//
// /* front side */
// const cardHeader = document.querySelector(".card-header");
// cardHeader.innerText = cardsList[1][1].word;
// const cardImg = document.createElement("img");
// cardImg.classList.add("card-img");
// cardImg.setAttribute("src", `./assets/${cardsList[1][1].image}`);
// cardImg.setAttribute("alt", "");
// cardImgWrap.append(cardImg);
//
//
// /* back side */
// const cardHeaderBack = document.querySelector(".card-header-back");
// cardHeaderBack.innerText = cardsList[1][1].translation;
//
//
// const soundBtn = document.querySelector(".sound-btn");
// const audio = new Audio(`./assets/${cardsList[1][1].audioSrc}`);
//
// soundBtn.addEventListener("click", () => {
//     audio.play();
// });
//
// const flipContainer = document.querySelector(".flip-box-inner");
//
// const translateBtn = document.querySelector(".translation-btn");
// translateBtn.addEventListener("click", () => {
//     flipContainer.classList.add('rotation');
// });