let products = [];
fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
        products = data;
        displayProducts(products);
    });

function displayProducts(productsList) {
    let productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";
    productsList.forEach(product => {
        productsContainer.innerHTML += `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5>${product.name}</h5>
                    <p>⭐ ${product.rating}</p>
                    <p><strong>₹${product.price}</strong></p>
                    <a href="product-details.html?id=${product.id}" class="btn btn-primary">View Details</a>
                </div>
            </div>
        </div>
        `;
    });
}

document.getElementById("categoryFilter").addEventListener("change", filterProducts);
document.getElementById("priceFilter").addEventListener("input", filterProducts);

function filterProducts() {
    let category = document.getElementById("categoryFilter").value;
    let maxPrice = Number(document.getElementById("priceFilter").value);
    
    document.getElementById("priceValue").innerText = maxPrice ? `₹${maxPrice}` : "No Limit";
    
    let filteredProducts = products.filter(product => {
        let categoryMatch = category === "all" || product.category === category;
        let priceMatch = !maxPrice || product.price <= maxPrice;
        return categoryMatch && priceMatch;
    });
    displayProducts(filteredProducts);
}