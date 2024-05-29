async function fetchImages() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
    // return response.data.slice(0, 10);
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const slider = document.getElementById('slider');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  let images = await fetchImages();
  let currentIndex = 0;

  function renderImages() {
    slider.innerHTML = images.map(image => `
      <div class="slider__track__slide">
        <img src="${image.thumbnailUrl}" alt="${image.title}" class="slider__track__slide__image">
        <h3 class="slider__track__slide__title">${image.title}</h3>
      </div>
    `).join('');
  }

  function updateSliderPosition() {
    const marginLeft = parseInt(getComputedStyle(slider.children[currentIndex], true).marginLeft);
    const marginRight = parseInt(getComputedStyle(slider.children[currentIndex], true).marginRight);
    const slideWidth = slider.children[currentIndex].offsetWidth + marginLeft + marginRight; // Including margin
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === images.length - 1;
  }

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      updateSliderPosition();
    }
  });


  renderImages();
  updateSliderPosition();
});