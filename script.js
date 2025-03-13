
document.addEventListener("DOMContentLoaded", function() {
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        });
});


document.addEventListener("DOMContentLoaded", function() {
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-header").innerHTML = data;
        });
});


document.addEventListener("DOMContentLoaded", function() {
    fetch("categoery.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("categories-header").innerHTML = data;
        });
});




// document.addEventListener("DOMContentLoaded", function() {
//     fetch("shopcatlog.html")
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById("shop-catlog").innerHTML = data;
//         });
// });





// document.addEventListener("DOMContentLoaded", function() {
//     let catalogLink = document.getElementById("catalogWithFilters");
//     let macbookCard = document.getElementById("macbookCard");

//     // Show and scroll when clicking "Catalog with Side Filters"
//     catalogLink.addEventListener("click", function(event) {
//         event.preventDefault(); // Stop default jump

//         // Show the card
//         macbookCard.style.display = "block";

//         // Scroll smoothly to the card
//         macbookCard.scrollIntoView({ behavior: "smooth", block: "start" });

//         // Push state to history
//         history.pushState({ section: "macbook" }, "", "#macbook");
//     });

//     // Detect when user presses back button or navigates away
//     window.addEventListener("popstate", function(event) {
//         if (!event.state || event.state.section !== "macbook") {
//             macbookCard.style.display = "none"; // Hide card
//         }
//     });

//     // Hide card if clicked outside
//     document.addEventListener("click", function(event) {
//         if (!macbookCard.contains(event.target) && event.target !== catalogLink) {
//             macbookCard.style.display = "none";
//             history.pushState({}, "", window.location.pathname); // Reset URL
//         }
//     });
// });

document.getElementById("catalogWithFilters").addEventListener("click", function (event) {
    event.preventDefault(); 

    let catalogContainer = document.getElementById("catalogContainer");

    // Fetch shopcatlog.html and insert it
    fetch("shopcatlog.html") 
        .then(response => response.text())
        .then(data => {
            catalogContainer.innerHTML = data;
            catalogContainer.classList.remove("d-none");

            // Push state to history
            window.history.pushState({ page: "catalog" }, "", "#catalog");

            // Scroll after content loads
            setTimeout(() => {
                catalogContainer.scrollIntoView({ behavior: "smooth" });
            }, 100); // Small delay to ensure rendering
        });
});

// Handle Back/Forward Navigation
window.addEventListener("popstate", function (event) {
    let catalogContainer = document.getElementById("catalogContainer");

    if (event.state && event.state.page === "catalog") {
        catalogContainer.classList.remove("d-none");
        catalogContainer.scrollIntoView({ behavior: "smooth" }); // Scroll when coming back
    } else {
        catalogContainer.classList.add("d-none");
    }
});