"use strict";

{
  const colorsObj = {
    red: "あか",
    blue: "あお",
    pink: "ピンク",
    orange: "オレンジ",
    yellow: "きいろ",
    green: "みどり",
    purple: "むらさき",
  };
  const vegesObj = {
    carrot: "にんじん",
    cabbage: "キャベツ",
    cucumber: "きゅうり",
    tomato: "トマト",
    potato: "じゃがいも",
    onion: "たまねぎ",
    lettuce: "レタス",
  };
  const kitchenItemsObj = {
    knife: "包丁",
    fork: "フォーク",
    spoon: "スプーン",
    plate: "お皿",
    bowl: "お椀",
    glass: "グラス",
    mug: "マグカップ",
  };

  const wordsCategories = {
    colors: colorsObj,
    veges: vegesObj,
    kitchenItems: kitchenItemsObj,
  };

  const target = document.getElementById("target");
  const targetJp = document.getElementById("targetJp");
  const message = document.getElementById("message");
  const inputField = document.getElementById("input");
  const timer = document.getElementById("timer");
  const selectBox = document.getElementById("inputGroupSelect04");

  let words;
  let word;
  let wordsObj;
  let location = 0;
  let startTime;
  let timeOut;
  let isDisabled = true;

  selectBox.addEventListener("change", () => {
    selectWords();
  });

  const selectWords = () => {
    const selectedWordsCategory = selectBox.value;
    wordsObj = wordsCategories[selectedWordsCategory];
    words = Object.keys(wordsObj);
    isDisabled = false;
  };

  inputField.addEventListener("click", () => {
    if (isDisabled) {
      return;
    }
    message.textContent = "👇👇👇 Type here! 👇👇👇";
    const selectBoxDiv = document.getElementById("select-box");
    selectBoxDiv.style.display = "none";
    setWord();
    setupTyping();
    startTime = Date.now();
    displayElapsedTime();
  });

  const setWord = () => {
    inputField.placeholder = "";
    inputField.value = "";
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    location = 0;
    target.textContent = word;
    targetJp.textContent = wordsObj[word];
  };

  const setupTyping = () => {
    document.addEventListener("keyup", (e) => {
      playAudio("typing");
      if (e.key !== word[location]) {
        inputField.value = word.slice(0, location);
        return;
      }
      location++;
      target.textContent = "_".repeat(location) + word.substring(location);

      if (location === word.length) {
        if (words.length === 0) {
          playAudio("tada");
          stopTimer();
          const finishedTime = ((Date.now() - startTime) / 1000).toFixed(2);
          message.textContent = "";
          inputField.style.display = "none";
          const result = document.getElementById("result");
          result.textContent = `You win! ${finishedTime} seconds!`;
        }
        setWord();
        playAudio("correct");
      }
    });
  };

  const displayElapsedTime = () => {
    let elapsedTime = Date.now() - startTime;
    const d = new Date(elapsedTime);
    let seconds = String(d.getSeconds()).padStart(2, "0");
    let milliSeconds = String(d.getMilliseconds()).padStart(3, "0");
    timer.textContent = `${seconds} : ${milliSeconds}`;
    timeOut = setTimeout(() => {
      displayElapsedTime();
    }, 10);
  };

  const stopTimer = () => {
    clearTimeout(timeOut);
    timer.textContent = "";
  };

  const playAudio = (type) => {
    let audio = document.getElementById(`${type}`);
    audio.play();
  };
}