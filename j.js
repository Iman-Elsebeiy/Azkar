document.addEventListener("DOMContentLoaded", () => {

  const clickSound = new Audio("click.wav");
  clickSound.preload = "auto";

  fetch("evning.json")
    .then(response => response.json())
    .then(data => {

      const cart = document.querySelector(".cart");

      data.forEach(item => {

        // Create card
        cart.innerHTML += `
        <div class="mt-4 totalParts circleContainer border gradient-border">

          <div class="d-flex justify-content-between">
            <span class="circle-order-btn fs-13">${item.order}</span>
            <span class="totalDisplay circle-total-btn fs-13">${item.min}/${item.max}</span>
          </div>

          <p class="mt-3 fs-4">${item.verse}</p>

          <p class="mt-3 txt_white fst-italic">
            ${item.Tafsir}
          </p>

          <p>${item.Eng_trans}</p>

          <p class="mt-3 brown-text fst-italic">
            ${item.Author}
          </p>

          <button class="resetBtn btn gradient-btn text-light px-4 py-2 fs-5">
            <i class="fa-solid fa-rotate-left"></i>
          </button>

          <button class="countBtn btn gradient-btn text-white px-4 py-2">
            Tap to Count
          </button>

        </div>
        `;
      });

      // AFTER cards are created → attach logic
      const containers = document.querySelectorAll('.totalParts');

      containers.forEach(container => {

        const countBtn = container.querySelector('.countBtn');
        const resetBtn = container.querySelector('.resetBtn');
        const totalDisplay = container.querySelector('.totalDisplay');

        let [count, maxCount] = totalDisplay.textContent.split('/').map(Number);

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

        resetBtn.addEventListener('click', () => {
          count = 0;
          totalDisplay.textContent = `0/${maxCount}`;
          totalDisplay.classList.remove('active', 'max-reached');
          container.classList.remove('max-reached', 'shake');

          clickSound.currentTime = 0;
          clickSound.play();
        });

      });

    })
    .catch(error => console.error("Error loading JSON:", error));


  // Theme

  window.setDark = function () {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");

    document.querySelector(".icon").classList.add("fa-moon");
    document.querySelector(".icon").classList.remove("fa-sun");

    document.querySelector(".icon-title").innerHTML = "أذكار المساء";
    document.querySelector(".evening").innerHTML = "Evening Remembrances";
  };

  window.setLight = function () {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");

    document.querySelector(".icon").classList.remove("fa-moon");
    document.querySelector(".icon").classList.add("fa-sun");

    document.querySelector(".icon-title").innerHTML = "أذكار الصباح";
    document.querySelector(".evening").innerHTML = "Morning Remembrances";
  };


    //  LOAD SAVED THEME
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    setDark();
  } else {
    setLight();
  }

});

