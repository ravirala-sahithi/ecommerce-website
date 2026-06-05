let cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch("products.json")
    .then((response) => response.json())
    .then((products) => {
        displayCart(products);
    });

function displayCart(products) {
    let cartContainer = document.getElementById("cartItems");
    let total = 0;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="alert alert-info">Your cart is empty.</div>';
        document.getElementById("cartTotal").innerText = total;
        return;
    }

    cart.forEach(item => {
        let product = products.find(p =>Number(p.id) === Number(item.id));
        if (!product) return;

        let subtotal = product.price * item.quantity;
        total += subtotal;

        cartContainer.innerHTML += `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-3">
                        <img src="${product.image}" class="img-fluid rounded-start" alt="${product.name}">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h5>${product.name}</h5>
                            <p>Price: ₹${product.price}</p>
                            <div>
                                <button class="btn btn-sm btn-danger" onclick="decreaseQty(${item.id})">-</button>
                                <span class="mx-2">${item.quantity}</span>
                                <button class="btn btn-sm btn-success" onclick="increaseQty(${item.id})">+</button>
                            </div>
                            <p class="mt-3">Subtotal: ₹${subtotal}</p>
                            <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${item.id})">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById("cartTotal").innerText = total;
}

function increaseQty(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(i => Number(i.id) === Number(id));
    if (!item) return;

    item.quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function decreaseQty(id) 
{
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(i => Number(i.id) === Number(id));
    if(item.quantity > 1)
    {
        item.quantity--;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function removeItem(id) 
{
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(i => Number(i.id) !== Number(id));
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}
