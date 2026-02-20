document.addEventListener("DOMContentLoaded", () => {

      const clickSound = new Audio("click.wav");
      clickSound.preload = "auto";

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


  function setDark() {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
        document.querySelector(".icon").classList.add("fa-moon")
            document.querySelector(".icon").classList.remove("fa-sun")
    document.querySelector(".icon-title").innerHTML=`أذكار المساء `
    document.querySelector(".evening").innerHTML=`Evening Remembrances`

    }

  function setLight() {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
    document.querySelector(".icon").classList.remove("fa-moon")
    document.querySelector(".icon").classList.add("fa-sun")
    document.querySelector(".icon-title").innerHTML=` أذكار الصباح `
    document.body.classList.add('black')
    document.querySelector(".evening").innerHTML=`Morning Remembrances`
    document.querySelector(".one").innerHTML=`Evening Remembrances`



  }

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
