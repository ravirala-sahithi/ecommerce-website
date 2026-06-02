const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id'));
fetch("products.json")
    .then((response) => response.json())
    .then((products) => {
        const product = products.find(p => p.id === productId);
        showProduct(product);
        showRelated(products, product.category, product.id);
    });

function showProduct(product) {
    document.getElementById("productDetails").innerHTML = `
    <div class="row">
        <div class="col-md-6">
            <img src="${product.image}" class="img-fluid" alt="${product.name}">
        </div>
        <div class="col-md-6">
            <h2>${product.name}</h2>
            <p>⭐ ${product.rating}</p>
            <h4>₹${product.price}</h4>
            <p>${product.description}</p>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    </div>
    `;
}

function showRelated(products, category, currentId) {
    const related = products.filter(p => p.category === category && p.id !== currentId);
    let html = "";
    related.forEach(product => {
        html += `
            <div class="col-md-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5>${product.name}</h5>
                        <p>₹${product.price}</p>
                        <a href="product-details.html?id=${product.id}" class="btn btn-secondary">View Details</a>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById("relatedProducts").innerHTML = html;
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
}
    

        