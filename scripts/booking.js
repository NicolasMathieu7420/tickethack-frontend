fetch("http://localhost:3000/booking")
.then((response) => response.json())
.then((data) => {
if (data.result) {
for (let i = 0; i < data.data.length; i++) {
//console.log(data.data[i]);

//let dateNow = new Date();
//let dateDeparture = new Date(data.data[i].date);

//console.log(data.data[i].date)
//let diffTime = dateDeparture - dateNow ;
//let countdown = Math.floor(diffTime/ (1000*60*60));

let countdown = moment(data.data[i].date).fromNow();

console.log(countdown);


//let innerPush = <div class="cart-row"><span>Paris > Lyon</span><span class="row">16:23</span><span class="row">126€</span><span class="row">Départ dans</span></div>
let innerPush = `div class="cart-row"><span>${data.data[i].departure}> ${data.data[i].arrival}</span><span class="row">${data.data[i].date}</span><span class="row">${data.data[i].price}</span><span class="row">Départ dans ${countdown}</span></div>`;
document.querySelector("#cart-list").innerHTML += innerPush;
 }
   }
});
