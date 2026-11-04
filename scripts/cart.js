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

//function pour supprimer un bouton

function deleteTrip(event) {
  //event.target.closest(".cart-row").remove();
}

//suppresion d'un voyage au click
const deleteButtons = document.querySelectorAll(".delete");

for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", deleteTrip);
}

updateTotal();

// Passer la commande au click commander et envoyer au booking
document.querySelector("#purchase").addEventListener("click", () => {
  fetch("http://localhost:3000/booking", {
    method: "POST",
  })
    //headers: {'Content-Type': 'application/json'}})
    .then((response) => response.json)
    .then((data) => {
      if (data.result) {
        window.location.href = "booking.html";
      } else {
        console.log("Erreur lors de la validation de la commande");
      }
    });
  updateTotal();
});

// Remettre à jour le pannier

fetch("http://localhost:3000/carts")
  .then((response) => response.json())
  .then((data) => {
    if (data.result) {
      for (let i = 0; i < data.cart.length; i++) {
        //console.log(i);

        // let innerPush = <div class="cart-row"><span>Paris > Lyon</span><span class="row">16:23</span><span class="price">126€</span><button class="delete row">X</button></div>
        let innerPush = `<div class="cart-row"><span>${data.cart[i].departure} > ${data.cart[i].arrival}</span><span class="row">${data.cart[i].date}</span><span class="price">${data.cart[i].price}€</span><button class="delete row">X</button></div>`;
        document.querySelector("#cart-list").innerHTML += innerPush;
        updateTotal();
        deleteTrip()
      }
    }
  });
