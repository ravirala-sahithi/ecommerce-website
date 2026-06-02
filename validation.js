$("#contactForm").submit(function(e) 
{
e.preventDefault();
let name=$("#name").val().trim();
let email=$("#email").val().trim();
let message=$("#message").val().trim();
if(name.length<3)
    {
    alert("Name must be at least 3 characters long.");
    return;
    }
    alert("Form submitted successfully!");
    this.reset();
});