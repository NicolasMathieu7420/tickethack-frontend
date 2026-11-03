document.querySelector('#research-btn').addEventListener('click', function () {
    let params = {
        arrival:document.querySelector('#arrival').value,
        departure:document.querySelector('#departure').value,
        date:document.querySelector('#date').value,
    }
    //console.log(params.date)

    let queryString = `http://localhost:3000/trips?departure=${params.departure}&arrival=${params.arrival}&date=${params.date}`
    //console.log(queryString)
	fetch(queryString).then(response => response.json())
		.then(data => {
                console.log(data)
                if(data.result) {
                    for(let i =0; i<data.tripExisting.length;i++){

                    const date = new Date(data.tripExisting[i].date);
                    const heures = date.getHours();
                    const minutes = date.getMinutes();

                    //let innerToPush ='<div class="train-row">Paris > Lyon 16:23 126€<button class="book-train">Réserver</button></div>'
                    let innerToPush = `<div class="train-row">${data.tripExisting[i].departure} > ${data.tripExisting[i].arrival} ${heures}:${minutes} ${data.tripExisting[i].price}€<button class="book-train">Réserver</button></div>`
                    document.querySelector('#train-list').innerHTML += innerToPush
                    }
                }
		});
});
