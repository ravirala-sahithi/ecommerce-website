let products =[];
fetch("products.json")
.then(response => response.json())
.then(data => 
    {
    products = data;
    });
    document.getElementById("searchBox").addEventListener("keyup", function()
    {
    let keyword = this.value.toLowerCase();
    let  filtered = products.filter(product => product.name.toLowerCase().includes(keyword));
    displayResults(filtered);
    });
function displayResults(products)
{
    let html = "";
    products.forEach(product =>
    {
        html += `
        <div class="col-md-4 mb-4">
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>₹${product.price.toFixed(2)}</strong></p>
                </div>
            </div>
        </div>`;
    });
    document.getElementById("search-results").innerHTML = html;
}