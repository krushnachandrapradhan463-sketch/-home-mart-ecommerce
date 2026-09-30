document.addEventListener("DOMContentLoaded", () => {
    renderOrderSummary();
    setupPaymentToggle();
});

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function renderOrderSummary() {
    let cart = getCart();
    let orderItems = document.getElementById("orderItems");
    let orderTotal = document.getElementById("orderTotal");
    let placeOrderBtn = document.getElementById("placeOrderBtn");

    if (cart.length === 0) {
        orderItems.innerHTML = "<p>Your cart is empty. Add items before checking out.</p>";
        orderTotal.innerHTML = "";
        placeOrderBtn.disabled = true;
        placeOrderBtn.style.opacity = 0.5;
        return;
    }

    let total = 0;
    orderItems.innerHTML = cart.map((item) => {
        total += item.price;
        return `
            <div class="order-item">
                <img src="${item.thumbnail}" alt="${item.title}">
                <div class="item-name">${item.title}</div>
                <div>$${item.price}</div>
            </div>
        `;
    }).join("");

    orderTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

function setupPaymentToggle() {
    let radios = document.querySelectorAll('input[name="paymentMethod"]');
    let cardFields = document.getElementById("cardFields");
    let upiFields = document.getElementById("upiFields");
    let codFields = document.getElementById("codFields");

    radios.forEach((radio) => {
        radio.addEventListener("change", () => {
            cardFields.style.display = "none";
            upiFields.style.display = "none";
            codFields.style.display = "none";

            if (radio.value === "card") cardFields.style.display = "flex";
            if (radio.value === "upi") upiFields.style.display = "flex";
            if (radio.value === "cod") codFields.style.display = "block";
        });
    });

    document.getElementById("paymentForm").addEventListener("submit", handleOrderSubmit);
}

function handleOrderSubmit(e) {
    e.preventDefault();

    let cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let method = document.querySelector('input[name="paymentMethod"]:checked').value;

    if (method === "card") {
        let name = document.getElementById("cardName").value.trim();
        let number = document.getElementById("cardNumber").value.replace(/\s/g, "");
        let expiry = document.getElementById("cardExpiry").value.trim();
        let cvv = document.getElementById("cardCvv").value.trim();

        if (!name) {
            alert("Please enter the name on the card.");
            return;
        }
        if (!/^\d{16}$/.test(number)) {
            alert("Please enter a valid 16-digit card number.");
            return;
        }
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
            alert("Please enter expiry in MM/YY format.");
            return;
        }
        if (!/^\d{3}$/.test(cvv)) {
            alert("Please enter a valid 3-digit CVV.");
            return;
        }
    } else if (method === "upi") {
        let upiId = document.getElementById("upiId").value.trim();
        if (!/^[\w.\-]+@[\w.\-]+$/.test(upiId)) {
            alert("Please enter a valid UPI ID (e.g. name@bank).");
            return;
        }
    }
    // COD needs no extra fields

    placeOrder(cart, method);
}

function placeOrder(cart, method) {
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    let order = {
        id: Date.now(),
        items: cart,
        total: total,
        paymentMethod: method,
        date: new Date().toISOString()
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear the cart now that the order is placed
    localStorage.setItem("cart", JSON.stringify([]));

    document.getElementById("paymentForm").style.display = "none";
    document.getElementById("orderConfirmation").innerHTML =
        `Order placed successfully! Order #${order.id} — paying via ${methodLabel(method)}. Redirecting to home...`;

    setTimeout(() => {
        window.location.href = "../Home/home.html";
    }, 2500);
}

function methodLabel(method) {
    if (method === "card") return "Card";
    if (method === "upi") return "UPI";
    return "Cash on Delivery";
}
