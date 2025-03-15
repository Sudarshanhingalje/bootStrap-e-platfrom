// Load Navbar, Footer, and Categories dynamically
document.addEventListener("DOMContentLoaded", function () {
    fetch("footer.html").then(response => response.text()).then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;
    });

    fetch("navbar.html").then(response => response.text()).then(data => {
        document.getElementById("navbar-header").innerHTML = data;
    });

    fetch("categoery.html").then(response => response.text()).then(data => {
        document.getElementById("categories-header").innerHTML = data;
    });

    // Load cart UI when the page loads
    updateCartUI();
});

// Catalog Navigation Handling
document.getElementById("catalogWithFilters").addEventListener("click", function (event) {
    event.preventDefault();
    let catalogContainer = document.getElementById("catalogContainer");

    fetch("shopcatlog.html")
        .then(response => response.text())
        .then(data => {
            catalogContainer.innerHTML = data;
            catalogContainer.classList.remove("d-none");
            window.history.pushState({ page: "catalog" }, "", "#catalog");

            setTimeout(() => {
                catalogContainer.scrollIntoView({ behavior: "smooth" });
            }, 100);
        });
});
window.addEventListener("popstate", function (event) {
    let catalogContainer = document.getElementById("catalogContainer");
    if (event.state && event.state.page === "catalog") {
        catalogContainer.classList.remove("d-none");
        catalogContainer.scrollIntoView({ behavior: "smooth" });
    } else {
        catalogContainer.classList.add("d-none");
    }
});

// home page cateries
document.getElementById("shopcatogery").addEventListener("click", function (event) {
    event.preventDefault();
    let shopcatogerycontainer = document.getElementById("shopcatogerycontainer");

    fetch("shopcatogery.html")
        .then(response => response.text())
        .then(data => {
            shopcatogerycontainer.innerHTML = data;
            shopcatogerycontainer.classList.remove("d-none");
            window.history.pushState({ page: "catalog" }, "", "#catalog");

            setTimeout(() => {
                shopcatogerycontainer.scrollIntoView({ behavior: "smooth" });
            }, 100);
        });
});


window.addEventListener("popstate", function (event) {
    let shopcatogerycontainer = document.getElementById("shopcatogerycontainer");
    if (event.state && event.state.page === "catalog") {
        shopcatogerycontainer.classList.remove("d-none");
        shopcatogerycontainer.scrollIntoView({ behavior: "smooth" });
    } else {
        shopcatogerycontainer.classList.add("d-none");
    }
});

// adding and deleting element from the cart

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName, price, imageSrc = "/images/default.png") {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1, image: imageSrc });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();

    
    window.dispatchEvent(new Event("storage"));
    const toastBody = document.querySelector("#cartToast .toast-body");
    toastBody.innerHTML = `${productName}, item added to cart!`;

  
    const cartToast = new bootstrap.Toast(document.getElementById('cartToast'));
    cartToast.show();
}

// Function to update the cart UI
// function updateCartUI() {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     let cartItems = document.getElementById("cart-items");
//     let cartTotal = document.getElementById("cart-total");

//     if (!cartItems || !cartTotal) return; 

//     let total = 0;
//     cartItems.innerHTML = "";

//     cart.forEach(item => {
//         total += item.price * item.quantity;
//         cartItems.innerHTML += `
//             <li class="list-group-item d-flex justify-content-between align-items-center">
//                 <img src="${item.image}" alt="${item.name}" class="cart-img me-2" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
//                 <div>
//                     <strong>${item.name}</strong><br>
//                     <span class="text-black">$${(item.price * item.quantity).toFixed(2)}</span> (x${item.quantity})
//                 </div>
//                 <div class="d-flex gap-2">
//                     <button class="btn btn-sm btn-success" onclick="increaseQuantity('${item.name}')">+</button>
//                     <button class="btn btn-sm btn-warning" onclick="decreaseQuantity('${item.name}')">-</button>
//                     <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.name}')">❌</button>
//                 </div>
//             </li>`;
//     });

//     cartTotal.innerText = total.toFixed(2);
// }


// Function to increase product quantity
function increaseQuantity(productName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(p => p.name === productName);
    if (item) {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
        window.dispatchEvent(new Event("storage"));
    }
}

// Function to decrease product quantity
function decreaseQuantity(productName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(p => p.name === productName);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(p => p.name !== productName); // Remove if quantity is 0
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
    window.dispatchEvent(new Event("storage"));
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
    window.dispatchEvent(new Event("storage"));
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem("cart");
    updateCartUI();
    window.dispatchEvent(new Event("storage"));
}

// Load cart on page load
window.onload = updateCartUI;

// Listen for changes in localStorage (sync cart across tabs/pages)
window.addEventListener("storage", function () {
    updateCartUI();
});


// Function to update the cart UI
function updateCartUI() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let cartBadge = document.getElementById("cart-badge"); // Badge element

    if (!cartItems || !cartTotal || !cartBadge) return;

    let total = 0;
    let totalItems = 0;
    cartItems.innerHTML = "";

    cart.forEach(item => {
        total += item.price * item.quantity;
        totalItems += item.quantity; // Count total items in the cart

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
    
    // Update badge count
    cartBadge.innerText = totalItems;
    cartBadge.style.display = totalItems > 0 ? "inline-block" : "none"; // Hide if empty
}




// Redirect to Product Page
function redirectToProductPage() {
    window.location.href = "productpage.html";
}

// Change the main product image
function clicking(smallImg) {
    document.getElementById("imagebox").src = smallImg.src;
}

// shop catlog
function updatePrice() {
    document.getElementById("minPrice").value = document.getElementById("priceRange").value;
}

function updateSlider() {
    document.getElementById("priceRange").value = document.getElementById("minPrice").value;
}

function toggleBrandList() {
    const brands = ["Foxconn", "Hewlett Packard", "Huawei", "Panasonic", "Samsung", "Sony", "Toshiba", "Xiaomi"];
    let brandList = document.getElementById("brandList");
    let toggleBtn = document.getElementById("toggleBrands");

    if (toggleBtn.innerText === "Show More") {
        brands.forEach(brand => {
            let div = document.createElement("div");
            div.className = "form-check";
            div.innerHTML = `<input class="form-check-input" type="checkbox" id="${brand.toLowerCase()}">
                             <label class="form-check-label" for="${brand.toLowerCase()}">${brand}</label>`;
            brandList.appendChild(div);
        });
        toggleBtn.innerText = "Show Less";
    } else {
        brandList.innerHTML = brandList.innerHTML.split('</div>').slice(0, 6).join('</div>') + '</div>';
        toggleBtn.innerText = "Show More";
    }
}


const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const minInput = document.getElementById("minInput");
const maxInput = document.getElementById("maxInput");
const progress = document.querySelector(".range-progress");

function updateProgress() {
    let minVal = parseInt(minPrice.value);
    let maxVal = parseInt(maxPrice.value);
    let minLimit = parseInt(minPrice.min);
    let maxLimit = parseInt(maxPrice.max);

    let left = ((minVal - minLimit) / (maxLimit - minLimit)) * 100;
    let right = ((maxVal - minLimit) / (maxLimit - minLimit)) * 100;
    progress.style.left = left + "%";
    progress.style.width = (right - left) + "%";
}

function syncInputs() {
    minInput.value = minPrice.value;
    maxInput.value = maxPrice.value;
    updateProgress();
}

function syncSliders() {
    minPrice.value = minInput.value;
    maxPrice.value = maxInput.value;
    updateProgress();
}

minPrice.addEventListener("input", syncInputs);
maxPrice.addEventListener("input", syncInputs);
minInput.addEventListener("input", syncSliders);
maxInput.addEventListener("input", syncSliders);

updateProgress();