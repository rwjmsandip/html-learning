$(document).ready(function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartUI() {
        let count = 0;
        let total = 0;

        cart.forEach(item => {
            count += item.qty;
            total += item.price * item.qty;
        });

        $("#cart-count").text(count);
        $("#cart-total").text("₹" + total);

        if (cart.length === 0) {
            $("#cart-section").hide();

            $("#cart-items").html(`
                <div class="text-center py-5">
                    <h5>Your cart is empty 🛒</h5>
                </div>
            `);
        } else {
            $("#cart-section").show();

            let html = "";
            cart.forEach((item, index) => {
                html += `
                    <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                        <div>
                            <h6>${item.name}</h6>
                            <small>₹${item.price} x ${item.qty}</small>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-success increase" data-index="${index}">+</button>
                            <button class="btn btn-sm btn-danger decrease" data-index="${index}">-</button>
                        </div>
                    </div>
                `;
            });

            $("#cart-items").html(html);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    $("#products-link").click(function (e) {
        e.preventDefault();

        $("#cart-section").hide();
        $("#product-section").fadeIn();

        $("html, body").animate({
            scrollTop: $("#product-section").offset().top - 70
        }, 500);
    });

    $("#cart-link").click(function (e) {
        e.preventDefault();

        $("#product-section").hide();
        $("#cart-section").fadeIn();

        $("html, body").animate({
            scrollTop: $("#cart-section").offset().top - 70
        }, 500);
    });

    $(".add-to-cart").click(function () {
        let card = $(this).closest(".card");
        let name = card.find("h5").text();
        let price = parseInt(card.find("p").text().replace("₹", ""));

        let existing = cart.find(item => item.name === name);

        if (existing) {
            existing.qty++;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        updateCartUI();

        let btn = $(this);
        btn.text("Added ✔").removeClass("btn-dark").addClass("btn-success");

        setTimeout(() => {
            btn.text("Add to Cart").removeClass("btn-success").addClass("btn-dark");
        }, 800);
    });

    $(document).on("click", ".increase", function () {
        let index = $(this).data("index");
        cart[index].qty++;
        updateCartUI();
    });

    $(document).on("click", ".decrease", function () {
        let index = $(this).data("index");
        cart[index].qty--;

        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }

        updateCartUI();
    });

    updateCartUI();

});