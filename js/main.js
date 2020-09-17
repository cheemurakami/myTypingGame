'use strict';

{
  const words = ["red", "blue", "pink"]
  let word;
  let location = 0;
  let startTime;
  let isPlaying = false;

  const setWord = () => {
    word = words.splice(Math.floor(Math.random()),1)[0];
    target.textContent = word;
    location = 0;
  }

  const target = document.getElementById('target');
  
  document.addEventListener('click', () => {
    if (isPlaying){
      return;
    }
    isPlaying = true
    if (isPlaying) {
      setWord();
      startTime = Date.now();
    }
    })

  document.addEventListener('keydown', e => {
    if(e.key !== word[location]){
      return;
    }
      location++;
      target.textContent = "_".repeat(location) + word.substring(location)

      if(location === word.length){
        if (words.length === 0){
          const elapsedTime = ((Date.now() -startTime) / 1000).toFixed(2);
          const result = document.getElementById('result');
          result.textContent = `Finished! ${elapsedTime} seconds!`
        }
        setWord();
      }
    }
  );
}