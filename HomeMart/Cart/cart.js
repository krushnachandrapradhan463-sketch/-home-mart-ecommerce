document.addEventListener("DOMContentLoaded", () => {
    displayCart();
});

function displayCart() {
    let cartContent = document.getElementById("cartContent");
    let totalPrice = document.getElementById("totalPrice");
    let buyBtn = document.getElementById("buyBtn");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContent.innerHTML = "";
    let totalBill = 0;

    if (cart.length === 0) {
        cartContent.innerHTML = `<p>Your Cart is empty. Start Shopping!</p>`;
        totalPrice.innerHTML = "";
        buyBtn.style.display = "none";
        return;
    }

    buyBtn.style.display = "inline-block";

    cart.forEach((v, i) => {
        totalBill += v.price;
        let newElement = document.createElement("div");
        newElement.setAttribute("class", "prod-info");
        newElement.innerHTML = `
            <img src="${v.thumbnail}" alt="${v.title}" />
            <h1>${v.title}</h1>
            <p>$${v.price}</p>
            <div>
                <button onclick="removeFormCart(${i})">Remove</button>
            </div>
        `;
        cartContent.append(newElement);
    });

    totalPrice.innerHTML = `<h2>Total Amount is $${totalBill}</h2>`;
}

function removeFormCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
