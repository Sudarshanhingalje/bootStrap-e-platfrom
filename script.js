
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



// shpping cart add productto cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName, price, imageSrc) {
    let existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        // If product already in cart, increase quantity
        existingItem.quantity += 1;
    } else {
        // If new product, add to cart
        cart.push({ name: productName, price: price, quantity: 1, image: imageSrc });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// Function to update the cart UI
function updateCartUI() {
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let total = 0;

    cartItems.innerHTML = ""; // Clear previous cart items

    cart.forEach(item => {
        total += item.price * item.quantity; // Calculate total price

        cartItems.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <img src="${item.image}" alt="${item.name}" class="cart-img me-2" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
                <div>
                    <strong>${item.name}</strong><br>
                    <span class="text-black">$${(item.price * item.quantity).toFixed(2)}</span> (x${item.quantity})
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-success" onclick="increaseQuantity('${item.name}')">+</button>
                    <button class="btn btn-sm btn-warning" onclick="decreaseQuantity('${item.name}')">-</button>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.name}')">❌</button>
                </div>
            </li>`;
    });

    cartTotal.innerText = total.toFixed(2);
}

// Function to increase quantity
function increaseQuantity(productName) {
    let item = cart.find(p => p.name === productName);
    if (item) {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
    }
}

// Function to decrease quantity
function decreaseQuantity(productName) {
    let item = cart.find(p => p.name === productName);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(p => p.name !== productName); // Remove if quantity is 0
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// Function to clear the cart
function clearCart() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// Load cart on page load
window.onload = updateCartUI;
