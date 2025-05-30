
document.getElementById("enterBtn").addEventListener("click", function () {
  alert("Redirecting to main site...");
  window.location.href = "index.html";
});


// Add hover effect to combo cards
document.querySelectorAll(".combo-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
    card.style.transform = "scale(1.02)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "none";
    card.style.transform = "scale(1)";
  });
});
document.qu

erySelectorAll(".offer-card button").forEach(button => {
  button.addEventListener("click", () => {
    alert("Offer applied! Continue to checkout.");
  }
