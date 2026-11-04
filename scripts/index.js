function formatHourAndMinutes(time) {
    let result = time.toString()
    if(time < 10)
        result = '0'+time.toString()

    return result
}

let count = 0

function createBookButtonEvents(){
  //Captation clic picto 'Réserver'
  for (let i=0; i < document.querySelectorAll('.book-btn').length;i++){
    // Ajout d'un event sur chaque picto
    document.querySelectorAll('.book-btn')[i].addEventListener('click',
    function () {
      //console.log(this.parentNode.innerHTML)
      const myString = this.parentNode.innerHTML
      //extraction depart
      let index = myString.indexOf("departure");
      let temp = myString.slice(index+11,myString.length-(index+11))
      index = temp.indexOf("</span>");
      let departure = temp.slice(0,index)
      //extraction arrivée
      index = myString.indexOf("arrival");
      temp = myString.slice(index+9,myString.length-(index+9))
      index = temp.indexOf("</span>");
      let arrival = temp.slice(0,index)
      //extraction date
      index = myString.indexOf("hour");
      temp = myString.slice(index+6,myString.length)
      //console.log( myString,temp,index,arrival)
      index = temp.indexOf("</span>");
      let date = `2026-11-03 ${temp.slice(0,index)}:00`
      //extraction prix
      index = myString.indexOf("price");
      temp = myString.slice(index+7,myString.length)
      //console.log( myString,temp,index,arrival)
      index = temp.indexOf("</span>");
      let price = temp.slice(0,index-1)
      //console.log(price)

      fetch('http://localhost:3000/carts', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({departure,arrival,date,price}),
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.result) {
                   count ++;
                   document.querySelector('#Cart').textContent = `Panier : ${count}`
                }

            });

    });
  }
}


document.querySelector('#research-btn').addEventListener('click', function () {
    let params = {
        arrival:document.querySelector('#arrival').value,
        departure:document.querySelector('#departure').value,
        date:document.querySelector('#date').value,
    }
    document.querySelector('#train-list').innerHTML = ''
    //console.log(params.date)

    let queryString = `http://localhost:3000/trips?departure=${params.departure}&arrival=${params.arrival}&date=${params.date}`
    //console.log(queryString)
	fetch(queryString).then(response => response.json())
		.then(data => {
            if(data.result) {
                document.querySelector('#logo').src = 'images/train.png'
                let finalData = data.tripExisting.sort((a, b) => new Date(a.date) - new Date(b.date));
                //console.log(finalData.length)
                if(data.result) {
                    for(let i =0; i<finalData.length;i++){

                    const date = new Date(finalData[i].date);
                    const heures = formatHourAndMinutes(date.getHours())
                    const minutes = formatHourAndMinutes(date.getMinutes());
                    
                    //let innerToPush ='<div class="train-row">Paris > Lyon 16:23 126€<button class="book-train">Réserver</button></div>'
                    let innerToPush = `<div class="train-row"><span id="departure">${finalData[i].departure}</span> <span>&gt;</span> <span id="arrival">${finalData[i].arrival}</span> <span id="hour">${heures}:${minutes}</span> <span id="price">${finalData[i].price}€</span><button class="book-btn">Réserver</button></div>`
                    document.querySelector('#train-list').innerHTML += innerToPush

                    // Cablage event
                    createBookButtonEvents()
                    }
                }
            }
            else{
                document.querySelector('#train-list').innerHTML = `<div id="noTrip">Aucun trajet trouvé</div>`
                document.querySelector('#logo').src = 'images/notfound.png'
            }
		});
});
