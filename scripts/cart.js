// fonction pour calculer le total
function updateTotal() {
  const prices = document.querySelectorAll(".price");
  let total = 0;

  for (let i = 0; i < prices.length; i++) {
    //console.log(prices[i])
    const priceValue = parseInt(prices[i].textContent);
    total += priceValue;
  }
  document.querySelector("#total-amount").textContent = total;
}

updateTotal();

// Passer la commande au click commander et envoyer au booking
document.querySelector("#purchase").addEventListener("click", () => {
  fetch("http://localhost:3000/booking", {
    method: "POST",
  })
    //headers: {'Content-Type': 'application/json'}})
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        document.querySelector("#cart-list").innerHTML = "";
        window.location.href = "booking.html";
      } else {
        console.log("Erreur lors de la validation de la commande");
      }
    });
  updateTotal();
});

// Charger et afficher le panier 

fetch("http://localhost:3000/carts")
  .then((response) => response.json())
  .then((data) => {
    if (data.result) {
      let innerPush = "";

      //on accumule tous les trajets 
      for (let i = 0; i < data.trip.length; i++) {

        innerPush += `<div class="cart-row"><span>${data.trip[i].departure} > ${data.trip[i].arrival}</span><span class="row">${data.trip[i].date}</span><span class="price">${data.trip[i].price}€</span><button class="delete row">X</button></div>`;
      }
        document.querySelector("#cart-list").innerHTML = innerPush;

        const deleteData = document.querySelectorAll(".delete");

        for (let i = 0; i < deleteData.length; i++) {
          deleteData[i].addEventListener("click", function () {
            this.parentElement.remove();
            updateTotal();
          });
        }
         updateTotal()
      } else {
        console.log("Votre panier est vide")
        window.location.href = "index.html";
      }
    });
