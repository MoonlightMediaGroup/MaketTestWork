document.addEventListener("DOMContentLoaded", () => {
  //Custom select 
  const customSelect = document.querySelector(".custom-select");
  const selectBtn = document.querySelector(".select-button");
  const body = document.getElementsByTagName('body');
  const customSelectInput = document.querySelector(".custom-select input[type=\"text\"]");

  const selectedValue = document.querySelector(".selected-value");
  const optionsList = document.querySelectorAll(".select-dropdown li");

  //File Upload Detect and TextField change
  const fileNameField = document.querySelector(".input-file-btn");
  let file = '';

  //Range Change Value
  const rangeinput = document.getElementById('range-input');
  const rangeValueField = document.getElementById('valueRange');

  //Slider
  const sliderElm = document.querySelector(".slider-container .slider");
  const btnLeft = document.querySelector(".slider-container .btn-left");
  const btnRight = document.querySelector(".slider-container .btn-right");

  const numberSliderBoxs = sliderElm.children.length;
  let idxCurrentSlide = 0;

  // Functions:
  function moveSlider() {
    let leftMargin = (sliderElm.clientWidth / numberSliderBoxs) * idxCurrentSlide;
    sliderElm.style.marginLeft = -leftMargin + "px";
    console.log(sliderElm.clientWidth, leftMargin);
  }
  
  function moveLeft() {
    if (idxCurrentSlide === 0) idxCurrentSlide = numberSliderBoxs - 1;
    else idxCurrentSlide--;

    moveSlider();
  }

  function moveRight() {
    if (idxCurrentSlide === numberSliderBoxs - 1) idxCurrentSlide = 0;
    else idxCurrentSlide++;

    moveSlider();
  }

  function truncate(str, n){
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
  };

  // Event Listeners:
  btnLeft.addEventListener("click", moveLeft);
  btnRight.addEventListener("click", moveRight);
  window.addEventListener("resize", moveSlider);

  //Select Custom Listeners
  selectBtn.addEventListener("click", () => {
    customSelect.classList.toggle("active");
    selectBtn.classList.toggle("select-button--active");

    selectBtn.setAttribute(
      "aria-expanded",
      selectBtn.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
  });
  
  optionsList.forEach((option) => {
    function handler(e) {
      if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
        selectedValue.textContent = this.textContent;
        customSelectInput.textContent = this.textContent;
        customSelectInput.value = this.textContent;
        customSelect.classList.remove("active");
      }
    }
    
    option.addEventListener("click", handler);
  });

  //Range Input Listeners
  rangeinput.oninput = function() {
    rangeValueField.innerHTML = this.value + ' %';
  }
  
  //File Input Listeners
  document.querySelector(".input-file input[type=file]").onchange = function() {
    file = this.files[0];
    fileNameField.textContent = truncate(file.name, 25);
  };

});
