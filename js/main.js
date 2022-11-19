// Declaration
const currentCardNoEl = document.querySelector("#currentCardNo");
const nameEl = document.querySelector("#name");
const nameEl2 = document.getElementById("")
const birthYearEl = document.querySelector("#birthYear");
const chineseZodiacEl = document.querySelector("#chineseZodiac");
const registerEl = document.querySelector('#regButton');
const collcetionEl = document.querySelector(".collectionDiv");
const carouselSliderEl = document.querySelector(".carouselSlider");
const prevBtn = document.querySelector("#prevButton");
const nextBtn = document.querySelector("#nextButton");

const ID_ZODIAC_IMG = "#zodiacImg_";
const ID_MEMBER_NAME = "#memberName_";
const ID_MEMBER_PRONOUNS = "#memberPronouns_";
const ID_MEMBER_BIRTHYEAR = "#memberBirthYear"
const ID_MEMBER_SIGN = "#memberSign_";

let currentCardNo = currentCardNoEl.value;
let pronounsEl = document.getElementsByName("pronouns");
let pronounsValue = '';
let yourZodiacNum = 12; // 12 is never used when this program works.

//Carousel counter
let counter = 0;

// Chinese Zodiac
const ZODIAC = {
    name: ["rat", "ox", "tiger", "rabbit", "dragon", "snake", "horse", "sheep", "monkey", "rooster", "dog", "pig"],
    nameJP: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
    img: ["https://i.ibb.co/tJnZnY8/eto-mark01-nezumi.png",
        "https://i.ibb.co/YZsRCPJ/eto-mark02-ushi.png",
        "https://i.ibb.co/z7PFtLh/eto-mark03-tora.png",
        "https://i.ibb.co/P5FWL6x/eto-mark04-usagi.png",
        "https://i.ibb.co/MfRrLqG/eto-mark05-tatsu.png",
        "https://i.ibb.co/yWv1nSp/eto-mark06-hebi.png",
        "https://i.ibb.co/sVhBYc7/eto-mark07-uma.png",
        "https://i.ibb.co/WGM5QDZ/eto-mark08-hitsuji.png",
        "https://i.ibb.co/JFN4f1W/eto-mark09-saru.png",
        "https://i.ibb.co/R3dq8ws/eto-mark10-tori.png",
        "https://i.ibb.co/XywQLG4/eto-mark11-inu.png",
        "https://i.ibb.co/mCss4ZB/eto-mark12-inoshishi.png"],
}

// ------------------------------
// Main Function AddEventListener
// ------------------------------
//Run FUNCTION
birthYearEl.addEventListener("blur", showZodiac);

//Register Button Listners
registerEl.addEventListener("click", register);

//Next Button Listners
nextBtn.addEventListener("click", () => {

    const collcetionContainer = document.querySelectorAll(".collcetionContainer");
    const size = collcetionContainer[0].clientWidth;

    carouselSliderEl.style.transition = "transform 0.4s ease-in-out";
    counter++;

    carouselSliderEl.style.transform = "translateX(" + (-size * counter) + "px)";
})

//Previous Button Listners
prevBtn.addEventListener("click", () => {

    const collcetionContainer = document.querySelectorAll(".collcetionContainer");
    const size = collcetionContainer[0].clientWidth;

    carouselSliderEl.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSliderEl.style.transform = "translateX(" + (-size * counter) + "px)";
})


carouselSliderEl.addEventListener("transitionend", () => {

    // first card --> prev btn display none
    if (counter === 0) {
        prevBtn.setAttribute("disabled", true);
    } else {
        prevBtn.removeAttribute("disabled");
    };

    // last card --> next btn display none
    if (counter === (Number(currentCardNo) - 1)) {
        nextBtn.setAttribute("disabled", true);
    } else {
        nextBtn.removeAttribute("disabled");
    }

})

// function Show Zodiac
function showZodiac() {

    // input Check
    if (birthYearEl.value === "" | birthYearEl.value.length !== 4) {
        return alert("Please input the member's birth year.");
    };

    calcZodiac();

    // set Zodiac to show
    chineseZodiacEl.value = ZODIAC.name[yourZodiacNum];
}

// function Register
function register() {

    // inputCheck -- > chinese zodiac set
    inputCheck() === "ON" ? mainFunction() : "";
}

// ------------------------------
// Sub Function
// ------------------------------

function mainFunction() {

    // calculation chinese zodiac
    calcZodiac()

    // create a card
    createCard();

    // show a Card
    showCard(currentCardNo);

    // reset
    resetInputElements()

}

function inputCheck() {

    //-----------------------------------------------------
    // initialize inputCheck 
    // inputCheckResult = "ON" : all checks are completed
    //-----------------------------------------------------
    let inputCheckResult = "OFF"

    // // pronouns check
    pronounsEl.forEach(function (item) {
        if (item.checked) {
            pronounsValue = item.value
        }
    })

    // input check
    if (nameEl.value === "") {
        alert("Please input a member's name.");
        return inputCheckResult;
    } else if (birthYearEl.value === "" | birthYearEl.value.length !== 4) {
        alert("Please input the member's birth year.");
        return inputCheckResult;
    } else if (pronounsValue === "") {
        alert("Please select the member's pronounce");
        return inputCheckResult;
    } else {
        inputCheckResult = "ON"
        return inputCheckResult;
    }

}

// Caluculate Zodiac
function calcZodiac() {

    yourZodiacNum = (Number(birthYearEl.value) + 9) % 12;

    // convert Zodiac Num to look for the index
    yourZodiacNum === 0 ? yourZodiacNum = 11 : yourZodiacNum -= 1
}

// Create a card
function createCard() {

    // Collcetion Container DIV
    const collcetionContainerDiv = document.createElement("div");
    collcetionContainerDiv.classList.add("collcetionContainer");

    // Zodiac Img DIV
    const zodiacImgDiv = document.createElement("div");
    zodiacImgDiv.classList.add("zodiacImg");
    zodiacImgDiv.id = ID_ZODIAC_IMG + currentCardNo;
    zodiacImgDiv.style.backgroundImage = `url( ${ZODIAC.img[yourZodiacNum]} )`;
    collcetionContainerDiv.appendChild(zodiacImgDiv);

    // Member Name H3
    const memberNameH3 = document.createElement("h3");
    memberNameH3.classList.add("memberName");
    memberNameH3.id = ID_MEMBER_NAME + currentCardNo;
    memberNameH3.innerText = nameEl.value;
    collcetionContainerDiv.appendChild(memberNameH3);

    // Member Pronouns span
    const memberPronounsSpan = document.createElement("span");
    memberPronounsSpan.classList.add("memberPronouns");
    memberPronounsSpan.id = ID_MEMBER_PRONOUNS + currentCardNo;
    memberPronounsSpan.innerText = pronounsValue;
    collcetionContainerDiv.appendChild(memberPronounsSpan);

    // Member Birth Year h4
    const memberBirthYearH4 = document.createElement("h4");
    memberBirthYearH4.classList.add("memberBirthYear");
    memberBirthYearH4.id = ID_MEMBER_BIRTHYEAR + currentCardNo;
    memberBirthYearH4.innerText = birthYearEl.value;
    collcetionContainerDiv.appendChild(memberBirthYearH4)

    // Member sign h4
    const memberSignH4 = document.createElement("h4");
    memberSignH4.classList.add("memberSign");
    memberSignH4.id = ID_MEMBER_SIGN + currentCardNo;
    memberSignH4.innerText = `${ZODIAC.name[yourZodiacNum]} (${ZODIAC.nameJP[yourZodiacNum]})` ;
    collcetionContainerDiv.appendChild(memberSignH4);

    // APPEND TO LIST
    carouselSliderEl.appendChild(collcetionContainerDiv);

    // Update current card no
    currentCardNo = Number(currentCardNo) + 1
    currentCardNoEl.value = currentCardNo;

}


// show a Card
function showCard(currentCardNo) {

    const collcetionContainer = document.querySelectorAll(".collcetionContainer");
    const size = collcetionContainer[0].clientWidth;

    // Show the current Card
    carouselSliderEl.style.transform = "translateX(" + (-size * (Number(currentCardNo) - 1)) + "px)";

    // Show Prev Btn, Next Btn
    // If this card is the first card, prevBtn and nextBtn are hidden.
    // if this card is not the first card, prevBtn and nextBtn are not hidden and nextBtn is disabled.

    // This card is last card so nextBtn = disabled.
    if (Number(currentCardNo) - 1 === 1) {
        prevBtn.classList.remove("hidden");
        nextBtn.classList.remove("hidden");
    }

    if (Number(currentCardNo) - 1 > 0) {
        nextBtn.setAttribute("disabled", true);
        console.log(`Number(currentCardNo)-1 ${Number(currentCardNo) - 1}`)
    }


    // Update the counter
    counter = Number(currentCardNo) - 1;

}

// reset input elements
function resetInputElements() {
    nameEl.value = "";
    birthYearEl.value = 2000;
    chineseZodiacEl.value = "";

    pronounsEl.forEach(function (item) {
        item.checked = false;;
    })
}

