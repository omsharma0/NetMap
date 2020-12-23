function highlightButton()
{
// Get the container element
var btnContainer = document.getElementById("myUL");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("btn");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active1");

    // If there's no active class
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active1", "");
    }

    // Add the active class to the current/clicked button
    this.className += " active1";
  });
}
}


function highlightButton1()
{
// Get the container element
var btnContainer = document.getElementById("myUL1");
console.log("ddddddd" + btnContainer);

// Get all buttons with class="btn" inside the container
var btns = document.getElementsByClassName("btn1");
console.log("llllll" + btns.length);
// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active2");
    console.log("xxxxx-" + current.length);
    // If there's no active class
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active2", "");
    }

    // Add the active class to the current/clicked button
    this.className += " active2";
  });
}
}


function createTreeView2()
{
var toggler = document.getElementsByClassName("caret2");
var i;
//alert(toggler.length);
for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested2").classList.toggle("active2");
    this.classList.toggle("caret-down2");
  });
}

}


function createTreeView()
{
var toggler = document.getElementsByClassName("caret");
var i;
//alert(toggler.length);
for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}
highlightButton();
}

