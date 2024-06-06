(() => {
  const slideBtn = (arg) => {

    if (!arg.dom) {
      console.error('dom is required');
      return;
    }

    const slider = arg.dom;
    const sliderThumb = slider.querySelector('.btn_slider_thumb');
    const sliderWidth = slider.offsetWidth;

    let isDragging = false;

    sliderThumb.addEventListener('mousedown', (event) => {
      isDragging = true;
      slider
    });

    document.addEventListener('mousemove', (event) => {
      if (!isDragging) return;

      const rect = slider.getBoundingClientRect();
      let x = event.clientX - rect.left - sliderThumb.offsetWidth / 2;

      if (x < 0) {
        x = 0;
      } else if (x > rect.width - sliderThumb.offsetWidth) {
        x = rect.width - sliderThumb.offsetWidth;
      }

      sliderThumb.style.left = `${x}px`;
    });

    document.addEventListener('mouseup', () => {
      console.log('mouseup', sliderWidth - sliderThumb.offsetLeft);
      isDragging = false;
      if (sliderWidth - sliderThumb.offsetLeft <= sliderThumb.offsetWidth) {
        arg.onSlide();
      } else {
        sliderThumb.style.left = 0;
      }
    });
  }

  window.slideBtn = slideBtn;
})()
