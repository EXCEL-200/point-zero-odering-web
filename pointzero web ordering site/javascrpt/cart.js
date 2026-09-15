// =====================================
// LOAD CART
// =====================================

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


// =====================================
// GET HTML ELEMENTS
// =====================================

const cartItems =
    document.getElementById("cartItems");

const totalItems =
    document.getElementById("totalItems");

const totalPrice =
    document.getElementById("totalPrice");


// =====================================
// DISPLAY CART
// =====================================

function displayCart() {

    cartItems.innerHTML = "";

    let totalAmount = 0;
    let totalQuantity = 0;


    // EMPTY CART
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart Is Empty</h2>
                <p>
                    Add products from our Products page.
                </p>
            </div>
        `;

        totalItems.textContent = "0";
        totalPrice.textContent = "₦0";

        return;
    }


    // DISPLAY PRODUCTS
    cart.forEach((item, index) => {

        const price =
            Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;

        const subtotal =
            price * quantity;


        totalAmount += subtotal;

        totalQuantity += quantity;


        cartItems.innerHTML += `

            <div class="product-row">

                <div class="product-image-box">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        class="product-image"
                        onerror="imageError(this)"
                    >

                </div>


                <div class="product-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p class="price">
                        ₦${price.toLocaleString()}
                    </p>


                    <div class="quantity-control">

                        <button
                            type="button"
                            onclick="decreaseQuantity(${index})">
                            −
                        </button>

                        <span>
                            ${quantity}
                        </span>

                        <button
                            type="button"
                            onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>


                    <p class="subtotal">
                        Subtotal:
                        <strong>
                            ₦${subtotal.toLocaleString()}
                        </strong>
                    </p>


                    <button
                        type="button"
                        class="remove-btn"
                        onclick="removeItem(${index})">

                        Remove

                    </button>

                </div>

            </div>

        `;
    });


    // TOTALS
    totalItems.textContent =
        totalQuantity;

    totalPrice.textContent =
        "₦" + totalAmount.toLocaleString();
}


// =====================================
// IMAGE ERROR
// =====================================

function imageError(image) {

    image.onerror = null;

    image.src =
        "https://placehold.co/300x300/e2e8f0/0f172a?text=Product";
}


// =====================================
// INCREASE QUANTITY
// =====================================

function increaseQuantity(index) {

    cart[index].quantity =
        (Number(cart[index].quantity) || 1) + 1;

    saveCart();

    displayCart();
}


// =====================================
// DECREASE QUANTITY
// =====================================

function decreaseQuantity(index) {

    const quantity =
        Number(cart[index].quantity) || 1;

    if (quantity > 1) {

        cart[index].quantity =
            quantity - 1;

    } else {

        cart.splice(index, 1);
    }

    saveCart();

    displayCart();
}


// =====================================
// REMOVE PRODUCT
// =====================================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();
}


// =====================================
// SAVE CART
// =====================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


// =====================================
// WHATSAPP ORDER
// =====================================

function sendOrder() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }


    const customerName =
        document
        .getElementById("customerName")
        .value
        .trim();


    const customerPhone =
        document
        .getElementById("customerPhone")
        .value
        .trim();


    const customerAddress =
        document
        .getElementById("customerAddress")
        .value
        .trim();


    if (customerName === "") {

        alert(
            "Please enter your full name."
        );

        return;
    }


    if (customerPhone === "") {

        alert(
            "Please enter your phone number."
        );

        return;
    }


    if (customerAddress === "") {

        alert(
            "Please enter your delivery address."
        );

        return;
    }


    let message =
        "Hello Point Zero Signature Enterprise\n\n";

    message +=
        "NEW ORDER\n\n";

    message +=
        "Customer Name: " +
        customerName +
        "\n";

    message +=
        "Phone: " +
        customerPhone +
        "\n";

    message +=
        "Address: " +
        customerAddress +
        "\n\n";

    message +=
        "PRODUCTS ORDERED:\n";


    let totalAmount = 0;


    cart.forEach((item, index) => {

        const price =
            Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;

        const subtotal =
            price * quantity;


        totalAmount += subtotal;


        message +=
            `${index + 1}. ${item.name} x ${quantity} = ₦${subtotal.toLocaleString()}\n`;

    });


    message +=
        "\nTotal Items: " +
        cart.reduce(
            (total, item) =>
                total + (Number(item.quantity) || 1),
            0
        );


    message +=
        "\nTotal Amount: ₦" +
        totalAmount.toLocaleString();


    const whatsappNumber =
        "2348035005178";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );
}


// =====================================
// START
// =====================================

displayCart();