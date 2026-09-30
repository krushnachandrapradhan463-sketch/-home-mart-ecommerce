let product = [];

function fetchData() {
    fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((val) => {
            product = val.products;
            localStorage.setItem("allproducts", JSON.stringify(product));
            displayProduct(product);
        })
        .catch((err) => {
            console.error("Failed to load products:", err);
            document.getElementById("productContainer").innerHTML =
                "<p>Could not load products. Please try again later.</p>";
        });
}

fetchData();

function displayProduct(prod) {
    let output = "";

    prod.forEach((val) => {
        let rating = Math.floor(val.rating);

        output += `
        <main>
        <img src="${val.thumbnail}" alt="${val.title}"/>
        <div class="details">
            <h2>${val.title}</h2>
            <div class="rating">${"⭐".repeat(rating)} (${val.rating})</div>

            <div class="p1">
                <div class="price"><strong>$ ${val.price}</strong></div>
                <div>Instock: <strong>${val.stock}</strong></div>
            </div>

            <div class="p2">
                <div><button class="btn a" onclick="addToCart(${val.id})">Add Cart</button></div>
                <div><button class="btn b" onclick="viewDetails(${val.id})">Details</button></div>
            </div>
        </div>
        </main>
        `;
    });

    document.getElementById("productContainer").innerHTML = output;
}

document.getElementById("searchProduct").addEventListener("input", function (e) {
    let searchProduct = e.target.value.toLowerCase();

    let filteredProduct = product.filter((v) => {
        return (
            v.title.toLowerCase().includes(searchProduct) ||
            v.category.toLowerCase().includes(searchProduct)
        );
    });

    displayProduct(filteredProduct);
});

function viewDetails(id) {
    localStorage.setItem("productId", id);
    window.location.href = "../Details/details.html";
}

function addToCart(id) {
    let selectedProduct = product.find((v) => v.id === id);
    if (!selectedProduct) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let alreadyInCart = cart.some((v) => v.id === id);

    if (alreadyInCart) {
        alert("Product is already added to the cart");
    } else {
        cart.push(selectedProduct);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added successfully");
    }
}
