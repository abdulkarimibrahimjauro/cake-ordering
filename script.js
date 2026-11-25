let selectedCake = "";
let basePrice = 0;
let quantity = 1;
const MAX_QUANTITY = 99;


document.addEventListener("DOMContentLoaded", function () {
    const deliveryDate = document.getElementById("deliveryDate");

    if (deliveryDate) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        deliveryDate.min = `${year}-${month}-${day}`;
    }

    updateOrder();
});


// ==========================
// SELECT CAKE
// ==========================

function selectCake(name, price) {

    selectedCake = name;
    basePrice = price;
    quantity = 1;

    document.getElementById("cakeSize").value = "medium";

    updateOrder();

    document.getElementById("order").scrollIntoView({
        behavior: "smooth"
    });
}


// ==========================
// SIZE PRICE
// ==========================

function getSizePrice() {

    const sizeElement = document.getElementById("cakeSize");
    const size = sizeElement ? sizeElement.value : "medium";

    if (size === "small") {
        return Math.max(basePrice - 2000, 0);
    }

    if (size === "large") {
        return basePrice + 5000;
    }

    return basePrice;
}


// ==========================
// DELIVERY FEE
// ==========================

function getDeliveryFee() {

    let location =
        document.getElementById("deliveryLocation").value;

    if (location === "outside") {
        return 2000;
    }

    return 1000;
}


// ==========================
// CHANGE SIZE
// ==========================

function changeSize() {
    updateOrder();
}


// ==========================
// INCREASE
// ==========================

function increaseQuantity() {

    if (selectedCake === "") {
        alert("Please choose a cake first.");
        return;
    }

    if (quantity >= MAX_QUANTITY) {
        alert(`Maximum quantity is ${MAX_QUANTITY}.`);
        return;
    }

    quantity++;
    updateOrder();
}


// ==========================
// DECREASE
// ==========================

function decreaseQuantity() {

    if (quantity > 1) {
        quantity--;
        updateOrder();
    }
}


// ==========================
// UPDATE ORDER
// ==========================

function updateOrder() {

    const cakeElement = document.getElementById("selectedCake");
    const quantityElement = document.getElementById("quantity");
    const cakeTotalElement = document.getElementById("cakeTotal");
    const deliveryFeeElement = document.getElementById("deliveryFee");
    const totalElement = document.getElementById("total");

    if (!cakeElement || !quantityElement || !cakeTotalElement ||
        !deliveryFeeElement || !totalElement) {
        return;
    }


    if (selectedCake === "") {

        cakeElement.innerText =
            "No cake selected yet.";

        quantityElement.innerText = "1";

        cakeTotalElement.innerText = "0";

        deliveryFeeElement.innerText = "0";

        totalElement.innerText = "0";

        return;
    }


    let size =
        document.getElementById("cakeSize").value;

    let sizePrice =
        getSizePrice();

    let cakeTotal =
        sizePrice * quantity;

    let deliveryFee =
        getDeliveryFee();

    let grandTotal =
        cakeTotal + deliveryFee;


    cakeElement.innerText =
        selectedCake +
        " - " +
        size.charAt(0).toUpperCase() +
        size.slice(1) +
        " - ₦" +
        sizePrice.toLocaleString();


    quantityElement.innerText =
        quantity;

    cakeTotalElement.innerText =
        cakeTotal.toLocaleString();

    deliveryFeeElement.innerText =
        deliveryFee.toLocaleString();

    totalElement.innerText =
        grandTotal.toLocaleString();
}


// ==========================
// SEARCH
// ==========================

function searchCakes() {

    let searchText =
        document.getElementById("cakeSearch")
        .value
        .toLowerCase();

    let cakes =
        document.querySelectorAll(".cake-card");


    cakes.forEach(function(cake) {

        let name =
            cake.querySelector("h3")
            .innerText
            .toLowerCase();

        if (name.includes(searchText)) {
            cake.style.display = "";
        } else {
            cake.style.display = "none";
        }

    });
}


// ==========================
// ORDER VALIDATION
// ==========================

function isValidPhone(phone) {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
}


function isValidDeliveryDate(deliveryDate) {
    if (!deliveryDate) {
        return false;
    }

    const selected = new Date(`${deliveryDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return !Number.isNaN(selected.getTime()) && selected >= today;
}


// ==========================
// WHATSAPP
// ==========================

function orderWhatsApp() {

    if (selectedCake === "") {
        alert("Please choose a cake first.");
        return;
    }


    let name =
        document.getElementById("customerName").value.trim();

    let phone =
        document.getElementById("phone").value.trim();

    let address =
        document.getElementById("address").value.trim();

    let deliveryDate =
        document.getElementById("deliveryDate").value;

    let size =
        document.getElementById("cakeSize").value;

    let cakeTotal =
        getSizePrice() * quantity;

    let deliveryFee =
        getDeliveryFee();

    let grandTotal =
        cakeTotal + deliveryFee;


    if (
        name === "" ||
        phone === "" ||
        address === "" ||
        deliveryDate === ""
    ) {

        alert("Please fill in all customer information.");
        return;
    }

    if (!isValidPhone(phone)) {
        alert("Please enter a valid phone number.");
        return;
    }

    if (!isValidDeliveryDate(deliveryDate)) {
        alert("Please choose today or a future delivery date.");
        return;
    }


    let message =
`🎂 NEW CAKE ORDER

Cake: ${selectedCake}
Size: ${size}
Quantity: ${quantity}

Cake Total: ₦${cakeTotal.toLocaleString()}
Delivery Fee: ₦${deliveryFee.toLocaleString()}
Grand Total: ₦${grandTotal.toLocaleString()}

Customer: ${name}
Phone: ${phone}
Address: ${address}
Delivery Date: ${deliveryDate}`;


    let whatsappNumber =
        "2347033567604";


    let url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(url, "_blank");
}


// ==========================
// SMS
// ==========================

function orderSMS() {

    if (selectedCake === "") {
        alert("Please choose a cake first.");
        return;
    }


    let name =
        document.getElementById("customerName").value.trim();

    let phone =
        document.getElementById("phone").value.trim();

    let address =
        document.getElementById("address").value.trim();

    let deliveryDate =
        document.getElementById("deliveryDate").value;

    let size =
        document.getElementById("cakeSize").value;

    let cakeTotal =
        getSizePrice() * quantity;

    let deliveryFee =
        getDeliveryFee();

    let grandTotal =
        cakeTotal + deliveryFee;


    if (
        name === "" ||
        phone === "" ||
        address === "" ||
        deliveryDate === ""
    ) {

        alert("Please fill in all customer information.");
        return;
    }

    if (!isValidPhone(phone)) {
        alert("Please enter a valid phone number.");
        return;
    }

    if (!isValidDeliveryDate(deliveryDate)) {
        alert("Please choose today or a future delivery date.");
        return;
    }


    let message =
        "🎂 CAKE ORDER\n\n" +

        "Cake: " +
        selectedCake +
        "\n" +

        "Size: " +
        size +
        "\n" +

        "Quantity: " +
        quantity +
        "\n\n" +

        "Cake Total: ₦" +
        cakeTotal.toLocaleString() +
        "\n" +

        "Delivery Fee: ₦" +
        deliveryFee.toLocaleString() +
        "\n" +

        "Grand Total: ₦" +
        grandTotal.toLocaleString() +
        "\n\n" +

        "Customer: " +
        name +
        "\n" +

        "Phone: " +
        phone +
        "\n" +

        "Address: " +
        address +
        "\n" +

        "Delivery Date: " +
        deliveryDate;


    let smsNumber =
        "07033567604";


    window.location.href =
        "sms:" +
        smsNumber +
        "?body=" +
        encodeURIComponent(message);
}