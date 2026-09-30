document.addEventListener("DOMContentLoaded", () => {
    let productDetails = document.getElementById("productDetails");
    let allproducts = JSON.parse(localStorage.getItem("allproducts"));
    let productId = localStorage.getItem("productId");

    if (allproducts && productId) {
        let selectedProduct = allproducts.find((v) => v.id == productId);

        if (!selectedProduct) {
            productDetails.innerHTML = `<p>Product Not Available</p>`;
            return;
        }

        let out = "";
        selectedProduct.reviews.forEach((v) => {
            out += `
            <section>
            <hr>
            <h3>${"❤️".repeat(v.rating)}</h3>
            <h3>${v.comment}</h3>
            <p>By ${v.reviewerName} on ${new Date(v.date).toLocaleDateString()}</p>
            </section>
            `;
        });

        let output = `
        <main>
        <div id="box">
        <div id="part1"> <img src="${selectedProduct.thumbnail}"/></div>
        <div id="part2">
        <h1>${selectedProduct.title}</h1><br>
        <h3>Brand: ${selectedProduct.brand}</h3>
        <h3>Category: ${selectedProduct.category}</h3>
        <p><strong>Description: </strong>${selectedProduct.description}</p>

        <h5>Price: $${selectedProduct.price}</h5>
        <div>
        <button id="cart">Add to Cart</button>
        <button id="back">Back to home</button>
        </div>
        </div>
        </div>
        <div>
        <h1>Customer Reviews</h1>
        </div>
        <div id="reviews">
        ${out}
        </div>
        </main>
        `;

        productDetails.innerHTML = output;

        document.getElementById("cart").addEventListener("click", () => {
            cartproducts(selectedProduct);
        });

        document.getElementById("back").addEventListener("click", () => {
            window.location.href = "../Home/home.html";
        });
    } else {
        productDetails.innerHTML = `<p>Product Not Found...</p>`;
    }
});

function cartproducts(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let alreadyInCart = cart.some((v) => v.id === product.id);

    if (alreadyInCart) {
        alert("Product is already added to the cart");
    } else {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added successfully");
    }
}
