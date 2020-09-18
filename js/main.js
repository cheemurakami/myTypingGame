'use strict';

{
  const words = ["red", "blue", "pink", "orange", "yellow", "green", "purple"]
  const wordsObj = {
    "red" : "あか",
    "blue" : "あお",
    "pink" : "ピンク",
    "orange" : "オレンジ",
    "yellow" : "きいろ",
    "green" : "みどり",
    "purple" : "むらさき",
  }
  let word;
  let location = 0;
  let startTime;
  let isPlaying = false;
  
  const target = document.getElementById('target');
  const targetJp = document.getElementById('targetJp')
  const message = document.getElementById('message')
  const inputField = document.getElementById('input')
  
  const setWord = () => {
    inputField.placeholder = ""
    inputField.value = ""

    word = words.splice(Math.floor(Math.random() * words.length),1)[0];
    
    location = 0;    
    target.textContent = word;
    targetJp.textContent = wordsObj[word];
  }

  document.addEventListener('click', () => {
    if (isPlaying){
      return;
    }
    isPlaying = true
    if (isPlaying) {
      message.textContent = "👇👇👇 Type here! 👇👇👇"
      setWord();
      startTime = Date.now();
    }
    })

  document.addEventListener('keyup', e => {
    if(e.key !== word[location]){
      return;
    }
      location++;
      target.textContent = "_".repeat(location) + word.substring(location)

      
      if(location === word.length){
        if (words.length === 0){
          const elapsedTime = ((Date.now() -startTime) / 1000).toFixed(2);
          message.textContent = ""
          inputField.style.display = "none";
          const result = document.getElementById('result');
          result.textContent = `Finished! ${elapsedTime} seconds!`
        }
        setWord();
      }
    }

  );
}