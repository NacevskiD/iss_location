let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let timeFetched = document.querySelector('#time')

let update = 10000

let issMarker
let icon = L.icon({
    iconUrl: 'iss_icon.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
})

let map = L.map('iss-map').setView([0, 0], 1)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copywrite">OpenStreetMap</a>',
    }).addTo(map)

iss()


function iss() {

    fetch(url).then( res => res.json() )
        .then( (issData) => {
            console.log(issData)
            let lat = issData.latitude
            let long = issData.longitude
            issLat.innerHTML = lat
            issLong.innerHTML = long


            if (!issMarker) {
                issMarker = L.marker([lat, long], {icon: icon} ).addTo(map)
            } else {
                issMarker.setLatLng([lat, long])
            }

            let now = Date()
            timeFetched.innerHTML = `Data fetched  at ${now}`

        }).catch( (err) => {

        console.log('Couldn\'t fetch data', err)
    }).finally( () => {
        setTimeout(iss, update)
    })
}