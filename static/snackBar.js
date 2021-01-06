function snackBar() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    console.log("snack----")
    console.log(x)
    // Add the "show" class to DIV
    x.className = "show";
  console.log("snack----")
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }