
document.addEventListener("DOMContentLoaded", function() {
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        });
});
console.log("JavaScript is working!");

document.addEventListener("DOMContentLoaded", function() {
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-header").innerHTML = data;
        });
});
console.log("JavaScript is working!");


