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
