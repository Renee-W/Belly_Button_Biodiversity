//Use d3.json() to fetch data from JSON file
//incoming data is internally referred to as incompingData
var metadata, names, samples;

d3.json("static/js/data/samples.json").then((incomingData) => {
    metadata = incomingData.metadata;
    names=incomingData.names;
    samples=incomingData.samples;

    //put names in dropdown
    var dropdown = d3.select("#selDataset");
    names.forEach (no=>{
        dropdown.append("option").text(no).property("value",no);
    })

    // data.sort(function (a, b){
    //     return parseFloat(b.idSearchResults)-(a.idSearchResults);
    // });
    // data=data.slice(0,10);

    // var trace1={
    //     x: data.map(row=> row.idSearchResults),
    //     y: data.map(row=> row.idSearchname),
    //     text: data.map(row=>row.idSearchname),
    //     name: "OTU-ID",
    //     type: "bar",
    //     orientation: "h"
    // }
    var firstid=names[0]
    buildDashboard(firstid)
});

function optionChanged (currentID){
    buildDashboard(currentID)
}
function buildDashboard(currentid){
    var metaresult=metadata.filter(object=>object.id==currentid)
    var curmeta=metaresult[0]
    var sampleresult=samples.filter(object=>object.id==currentid)
    var cursample=sampleresult[0]
    var panel =d3.select("#sample-metadata")
    panel.html("")
    Object.entries(curmeta).forEach(([key,value])=>{
        panel.append("h6").text(`${key}: ${value}`)
    })
    var otu_id=cursample.otu_ids
    var otu_label=cursample.otu_labels
    var otu_samples=cursample.sample_values
    //adding chart
    var ytix=otu_id.map(id=>`OTU ${id}`).slice(0,10).reverse()
    var barData=[{
        x:otu_samples.slice(0,10).reverse(),
        y:ytix,
        text:otu_label.slice(0,10).reverse(),
        type:"bar",
        orientation:"h"
        
    }]
    var stylebar={
        title: "Belly Button Biodiversity"
    }
    Plotly.newPlot("bar", barData, stylebar);
}