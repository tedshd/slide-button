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


    const slideStart = (event) => {
      isDragging = true;
    }

    const slideMove = (event) => {
      if (!isDragging) return;

      const rect = slider.getBoundingClientRect();
      const clientX = event.clientX ? event.clientX : event.touches[0].clientX;
      let x = clientX - rect.left - sliderThumb.offsetWidth / 2;

      if (x < 0) {
        x = 0;
      } else if (x > rect.width - sliderThumb.offsetWidth) {
        x = rect.width - sliderThumb.offsetWidth;
      }

      sliderThumb.style.left = `${x}px`;
    }

    const slideEnd = (event) => {
      isDragging = false;
      if (sliderWidth - sliderThumb.offsetLeft <= sliderThumb.offsetWidth) {
        arg.onSlide();
      }
      sliderThumb.style.left = 0;
    }

    sliderThumb.addEventListener('mousedown', slideStart);

    document.addEventListener('mousemove', slideMove);

    document.addEventListener('mouseup', slideEnd);

    sliderThumb.addEventListener('touchstart', slideStart);
    document.addEventListener('touchmove', slideMove);
    document.addEventListener('touchend', slideEnd);
  }

  window.slideBtn = slideBtn;
})()
