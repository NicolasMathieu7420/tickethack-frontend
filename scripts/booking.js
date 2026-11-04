fetch("http://localhost:3000/booking")
.then((response) => response.json())
.then((data) => {
if (data.result) {
for (let i = 0; i < data.data.length; i++) {


   //console.log(countdown)
}


//console.log(countdown);


//let innerPush = <div class="cart-row"><span>Paris > Lyon</span><span class="row">16:23</span><span class="row">126€</span><span class="row">Départ dans</span></div>
let innerPush = `div class="cart-row"><span>${data.data[i].departure}> ${data.data[i].arrival}</span><span class="row">${data.data[i].date}</span><span class="row">${data.data[i].price}</span><span class="row">Départ dans </span></div>`;
document.querySelector("#cart-list").innerHTML += innerPush;
 }
   }
});
