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
  document.querySelector("#total-amount").textContent = 0
  document.querySelector("#cart-list").innerHTML = `<div id="noTrip">Aucun trajet dans le panier</div>`
});

// Remettre à jour le pannier

fetch("http://localhost:3000/carts")
  .then((response) => response.json())
  .then((data) => {
    if (data.result) {
      for (let i = 0; i < data.cart.length; i++) {
        //console.log(data.cart);
        let temp = data.cart[i].date
        let index = temp.indexOf(':');
        let hour = Number(temp.slice(0,index))
        let minute = 0
        let hourString = hour        
        if(hour < 10){
          hourString = '0'+hour
        }
        //console.log(temp.slice(index+1, temp.length))
        minute = Number(temp.slice(index+1, temp.length))
        let minuteString = minute
        //console.log(minute)
         if(minute < 10){
          minuteString = '0'+minute
        }
        //console.log(hourString, minuteString)
        // let innerPush = <div class="cart-row"><span>Paris > Lyon</span><span class="row">16:23</span><span class="price">126€</span><button class="delete row">X</button></div>
        let innerPush = `<div class="cart-row"><span>${data.cart[i].departure} > ${data.cart[i].arrival}</span><span class="row">${hourString}:${minuteString}</span><span class="price">${data.cart[i].price}€</span><button class="delete row">X</button></div>`;
        document.querySelector("#cart-list").innerHTML += innerPush;

        const deleteData = document.querySelectorAll(".delete");

        for (let i = 0; i < deleteData.length; i++) {
          deleteData[i].addEventListener("click", function () {
            this.parentElement.remove();
                    fetch(`http://localhost:3000/carts/${data.cart[i]._id}`, {
                  method: "DELETE",
                    })
                .then((response) => response.json())
                .then((data) => {
                  if (data.result) {

                }})
            updateTotal();
          });
        }

        updateTotal();
      }
    }
    else
    {
      document.querySelector("#cart-list").innerHTML = `<div id="noTrip">Aucun trajet dans le panier</div>`
    }
  });
