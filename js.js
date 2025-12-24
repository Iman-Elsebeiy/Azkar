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
      totalDisplay.style.color = 'yellow';
      totalDisplay.style.textShadow = '0 0 10px yellow';

      // highlight when max reached
      if (count === maxCount) {
        totalDisplay.classList.add('max-reached');
        container.classList.add('max-reached');
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
