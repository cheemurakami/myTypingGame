'use strict';

{
  const word = "red";

  const target = document.getElementById('target');
  target.textContent = word;

  let location = 0;

  document.addEventListener('keydown', e => {
    if(e.key === word[location]){
      location++;
      target.textContent = "_".repeat(location) + word.substring(location)
    }
  });
}