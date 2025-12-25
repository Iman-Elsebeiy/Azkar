// select all counter containers
const containers = document.querySelectorAll('.totalParts');

containers.forEach(container => {
  const countBtn = container.querySelector('.countBtn');
  const resetBtn = container.querySelector('.resetBtn');
  const totalDisplay = container.querySelector('.totalDisplay');

  // parse count and maxCount from span text
  let [count, maxCount] = totalDisplay.textContent.split('/').map(Number);

  // Count button
  countBtn.addEventListener('click', () => {
    if (count < maxCount) {
      count++;
      totalDisplay.textContent = `${count}/${maxCount}`;

      // change text color to yellow with glow
totalDisplay.classList.add("active");

      // highlight when max reached
      if (count === maxCount) {
        totalDisplay.classList.add('max-reached');
        container.classList.add('max-reached');
        container.classList.add("shake");

      }
    }
  });

  // Reset button
  resetBtn.addEventListener('click', () => {
    count = 0;
    totalDisplay.textContent = `0/${maxCount}`;
    totalDisplay.style.color = 'white';
    totalDisplay.style.textShadow = 'none';
    totalDisplay.classList.remove('max-reached');
    container.classList.remove('max-reached');
  });
});


// Load the sound
// document.addEventListener("DOMContentLoaded", () => {
//   // Function to speak any text
//   function speak(text) {
//     window.speechSynthesis.cancel(); // stop any ongoing speech
//     const msg = new SpeechSynthesisUtterance(text);
//     msg.rate = 1;   // speed
//     msg.pitch = 1;  // pitch
//     msg.volume = 1; // volume

//     // Optional: choose English voice
//     const voices = window.speechSynthesis.getVoices();
//     const enVoice = voices.find(v => v.lang.startsWith("en"));
//     if (enVoice) msg.voice = enVoice;

//     window.speechSynthesis.speak(msg);
//   }

//   // Attach click to all buttons with class clickedVoiceBtn
//   const buttons = document.querySelectorAll(".clickedVoiceBtn");
//   buttons.forEach(btn => {
//     btn.addEventListener("click", () => {
//       const text = btn.innerText; // get button text
//       speak(text);
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {

  // Load click sound
  const clickSound = new Audio("click.wav");
  clickSound.preload = "auto";

  // select all counter containers
  const containers = document.querySelectorAll('.totalParts');

  containers.forEach(container => {
    const countBtn = container.querySelector('.countBtn');
    const resetBtn = container.querySelector('.resetBtn');
    const totalDisplay = container.querySelector('.totalDisplay');

    let [count, maxCount] = totalDisplay.textContent.split('/').map(Number);

    // Count button
    countBtn.addEventListener('click', () => {
      if (count < maxCount) {
        count++;
        totalDisplay.textContent = `${count}/${maxCount}`;
        totalDisplay.classList.add("active");

        clickSound.currentTime = 0;
        clickSound.play();

        if (count === maxCount) {
          totalDisplay.classList.add('max-reached');
          container.classList.add('max-reached', 'shake');
        }
      }
    });

    // Reset button
    resetBtn.addEventListener('click', () => {
      count = 0;
      totalDisplay.textContent = `0/${maxCount}`;
      totalDisplay.classList.remove('active', 'max-reached');
      container.classList.remove('max-reached', 'shake');

      clickSound.currentTime = 0;
      clickSound.play();
    });

    // Keyboard accessibility
    [countBtn, resetBtn].forEach(btn => {
      btn.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          btn.click();
        }
      });
    });

  });

});
