function formatHourAndMinutes(time) {
    let result = time.toString()
    if(time < 10)
        result = '0'+time.toString()

    return result
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
            let finalData = data.tripExisting.sort((a, b) => new Date(a.date) - new Date(b.date));
            console.log(finalData.length)
            if(data.result) {
                for(let i =0; i<finalData.length;i++){

                const date = new Date(finalData[i].date);
                const heures = formatHourAndMinutes(date.getHours())
                const minutes = formatHourAndMinutes(date.getMinutes());
                
                //let innerToPush ='<div class="train-row">Paris > Lyon 16:23 126€<button class="book-train">Réserver</button></div>'
                let innerToPush = `<div class="train-row">${finalData[i].departure} > ${finalData[i].arrival} ${heures}:${minutes} ${finalData[i].price}€<button class="book-btn">Réserver</button></div>`
                document.querySelector('#train-list').innerHTML += innerToPush
                }
            }
		});
});
