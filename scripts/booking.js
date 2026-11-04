
fetch("http://localhost:3000/booking")
  .then((response) => response.json())
  .then((data) => {
    if (data.result) {
        console.log(data)
      for (let i = 0; i < data.data.length; i++) {
        //console.log(i);
        let temp = data.data[i].date
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
        // <div class="cart-row"><span>Paris > Lyon</span><span class="row">16:23</span><span class="row">126€</span><span class="row">Départ dans</span></div>
        let innerPush = `<div class="cart-row"><span>${data.data[i].departure} > ${data.data[i].arrival}</span><span class="row">${hourString}:${minuteString}</span><span class="price">${data.data[i].price}€</span></div>`;
        document.querySelector("#cart-list").innerHTML += innerPush;
      }
    }
    else
    {
      document.querySelector("#cart-list").innerHTML = `<div id="noTrip">Aucun trajet dans le panier</div>`
    }
  });
