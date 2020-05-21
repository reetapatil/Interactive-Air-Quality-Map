let checkboxStates
let selectedYear = 2018
let selectedMonth = 1

const jsontest = pollution;

const map = L.map('map').setView([39.381266, -97.922211], 4.4)


L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
var baseLayer = L.geoJSON().addTo(map);
baseLayer.addData(jsontest);

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    var info = "Air Quality Index <br> State:  "+ feature.properties.State + "<br> O3:     "+ feature.properties.O3 + "<br> NO2:    "+ feature.properties.NO2 +"<br> SO2:    "+ feature.properties.SO2 +"<br> CO:     "+ feature.properties.CO  ;

    layer.bindPopup(info);

}

var no2Layer = L.geoJSON(null, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, { radius: feature.properties.NO2, color: "yellow", opacity: 1, fillOpacity: 0.5});
    },
    filter: (feature) => {

        var num = feature.properties.Year;
        var n = num.toString();
        var numM = feature.properties.Month;
        var m = numM.toString();
        if (n == selectedYear && m == selectedMonth)
            return true

    }

}).addTo(map);

var so2Layer = L.geoJSON(null, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, { radius: feature.properties.SO2, color: "red", opacity: 1, fillOpacity: 0.4 });
    },
    filter: (feature) => {

        var num = feature.properties.Year;
        var n = num.toString();
        var numM = feature.properties.Month;
        var m = numM.toString();
        if (n == selectedYear && m == selectedMonth)
            return true

    }

}).addTo(map);

var coLayer = L.geoJSON(null, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, { radius: feature.properties.CO, color: "violet", opacity: 1, fillOpacity: 0.4 });
    },
    filter: (feature) => {

        var num = feature.properties.Year;
        var n = num.toString();
        var numM = feature.properties.Month;
        var m = numM.toString();
        if (n == selectedYear && m == selectedMonth)
            return true

    }

}).addTo(map);

var o3Layer = L.geoJSON(null, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, { radius: feature.properties.O3, color: "green", opacity: 1, fillOpacity: 0.6 });
    },
    filter: (feature) => {

        var num = feature.properties.Year;
        var n = num.toString();
        var numM = feature.properties.Month;
        var m = numM.toString();

        if (n == selectedYear && m == selectedMonth)
            return true

    }
}).addTo(map);

function updateCheckboxStates() {
    checkboxStates = {
        //	years: [],
        eventTypes: []
    }
    no2Layer.clearLayers()
    o3Layer.clearLayers()
    so2Layer.clearLayers()
    coLayer.clearLayers()
    for (let input of document.querySelectorAll('input')) {
        //console.log(input)
        if (input.checked) {
            switch (input.className) {
                case 'event-type': checkboxStates.eventTypes.push(input.value); break
                //  case 'year': checkboxStates.years.push(input.value); break
            }
        }
    }

    if (checkboxStates.eventTypes.includes("O3_AQI")) {
        o3Layer.addData(jsontest);
    }
    if (checkboxStates.eventTypes.includes("NO2_AQI")) {
        no2Layer.addData(jsontest);
    }

    if (checkboxStates.eventTypes.includes("SO2_AQI")) {
        so2Layer.addData(jsontest);
    }
    if (checkboxStates.eventTypes.includes("CO_AQI")) {
        coLayer.addData(jsontest);
    }



    // console.log(checkboxStates)
}

function changeMonth(sel) {
    selectedMonth = sel.options[sel.selectedIndex].value
    console.log(sel.options[sel.selectedIndex].value);
    updateCheckboxStates()
}
function changeYear(sel) {
    selectedYear = sel.options[sel.selectedIndex].value
    console.log(sel.options[sel.selectedIndex].value);
    updateCheckboxStates()

}

for (let input of document.querySelectorAll('input')) {
    //Listen to 'change' event of all inputs
    input.onchange = (e) => {
        updateCheckboxStates()
    }
}


/****** INIT ******/
updateCheckboxStates()
no2Layer.addData(jsontest);
o3Layer.addData(jsontest);

