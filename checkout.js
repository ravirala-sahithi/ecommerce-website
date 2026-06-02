let orderItems = JSON.parse(localStorage.getItem("cartItems")) || [];
fetch("products.json")
    .then((response) => response.json())
    .then((products) => {
        displayOrderSummary(products);
    });

    function displayOrderSummary(products) 
    {
        let summary= document.getElementById("orderSummary");
        let total=0;
        summary.innerHTML="";
        orderItems.forEach(item=>
        {
            let product = products.find(p => p.id === item.id);
            let subtotal = product.price * item.quantity;
            total += subtotal;
            summary.innerHTML += `
            <div class="border p-2 mb-2">
            <strong>${product.name}</strong> - ₹${product.price} x ${item.quantity} = ₹${subtotal}
            </div>
            `;
      
        });
        document.getElementById("checkoutTotal").innerText = total;
    }

    document.getElementById("checkoutForm").addEventListener("submit", function(e) 
    {
        e.preventDefault();
        let name= document.getElementById("name").value.trim();
        let email= document.getElementById("email").value.trim();
        let phone= document.getElementById("phone").value.trim();
        let pincode= document.getElementById("pincode").value.trim();
        if(name.length < 3)
        {
            alert("Please enter a valid name.");
            return;
        }
        const phoneRegex = /^[0-9]{10}$/;
        if(!phoneRegex.test(phone))
        {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }
            const pincodeRegex = /^[0-9]{6}$/;
        if(!pincodeRegex.test(pincode))
        {
            alert("Please enter a valid 6-digit pincode.");
            return;
        }
        placeOrder();
    });

    function placeOrder()
    {
        const orderNumber = "ORD" + Date.now();
        localStorage.setItem("orderNumber", orderNumber);
        localStorage.setItem("orderStatus", "Confirmed");
        localStorage.removeItem("cartItems");
        window.location.href = "order-confirmation.html";
    }