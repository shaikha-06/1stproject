let isDObopen = false;
let dateofbirth;
const settingfaEl = document.getElementById("settingicon");
const settingcontentEl = document.getElementById("settingcontent");
const initialtxtEl = document.getElementById("initialtxt");
const afterDOBtxtEl = document.getElementById("afterDObtxt");
const dobbtnEl = document.getElementById("dobbtn");
const dobInputEl = document.getElementById("dobInput");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minEl = document.getElementById("min");
const secEl = document.getElementById("sec");

const maketwodigitnumber = (number) => {
  return number > 9 ? number : `0${number}`;
};

const toggleDateOfBirthSelector = () => {
  if (isDObopen) {
    settingcontentEl.classList.add("hide");
  } else {
    settingcontentEl.classList.remove("hide");
  }
  isDObopen = !isDObopen;

  console.log("Toggle", isDObopen);
};

const ageupdate = () => {
  const currentDate = new Date();
  const datediff = currentDate - dateofbirth;
  const year = Math.floor(datediff / (1000 * 60 * 60 * 24 * 365));
  const month = Math.floor((datediff / (1000 * 60 * 60 * 24 * 30)) % 12);
  const day = Math.floor((datediff / (1000 * 60 * 60 * 24)) % 30);
  const hour = Math.floor((datediff / (1000 * 60 * 60)) % 24);
  const mint = Math.floor((datediff / (1000 * 60)) % 60);
  const sec = Math.floor((datediff / 1000) % 60);

  yearEl.innerHTML = maketwodigitnumber(year);
  monthEl.innerHTML = maketwodigitnumber(month);
  dayEl.innerHTML = maketwodigitnumber(day);
  hourEl.innerHTML = maketwodigitnumber(hour);
  minEl.innerHTML = maketwodigitnumber(mint);
  secEl.innerHTML = maketwodigitnumber(sec);
};

const setDOBHandler = () => {
  const datestring = dobInputEl.value;

  dateofbirth = datestring ? new Date(datestring) : null;

  // 🔹 Get stored values
  const year = localStorage.getItem("year");
  const month = localStorage.getItem("month");
  const day = localStorage.getItem("day");

  if (dateofbirth) {
    localStorage.setItem("year", dateofbirth.getFullYear());
    localStorage.setItem("month", dateofbirth.getMonth());
    localStorage.setItem("hour", dateofbirth.getHours());
    initialtxtEl.classList.add("hide");
    afterDOBtxtEl.classList.remove("hide");
    ageupdate();

    // ⏱ Automatically update every second
    clearInterval(window.ageInterval);
    window.ageInterval = setInterval(ageupdate, 1000);
  } else {
    afterDOBtxtEl.classList.add("hide");
    initialtxtEl.classList.remove("hide");
  }
  console.log("Toggle", dateofbirth);
};

setDOBHandler();

settingfaEl.addEventListener("click", toggleDateOfBirthSelector);
dobbtnEl.addEventListener("click", setDOBHandler);
