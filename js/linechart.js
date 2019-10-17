// Set the dimesions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);


// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);


// Define the line
var valueline= d3.svg.line()
    .x(function(d) {return x(d.date);})
    .y(function(d) {return y(d.value);});

// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Get the data
// d3.csv("../data/data.csv", function(error, data){
data = [{
        "date": "1-May-12",
        "value": 58.13
    }, {
        "date": "30-Apr-12",
        "value": 53.9
    }, {
        "date": "27-Apr-12",
        "value": 67
    }, {
        "date": "26-Apr-12",
        "value": 89.7
    },
    {
        "date": "25-Apr-12",
        "value": 99
    },
    {
        "date": "24-Apr-12",
        "value": "130."
    },
    {
        "date": "23-Apr-12",
        "value": "166."
    },
    {
        "date": "20-Apr-12",
        "value": "234."
    },
    {
        "date": "19-Apr-12",
        "value": "345."
    },
    {
        "date": "18-Apr-12",
        "value": "443."
    },
    {
        "date": "17-Apr-12",
        "value": "543."
    },
    {
        "date": "16-Apr-12",
        "value": "580."
    },
    {
        "date": "13-Apr-12",
        "value": "605."
    },
    {
        "date": "12-Apr-12",
        "value": "622."
    },
    {
        "date": "11-Apr-12",
        "value": "626."
    },
    {
        "date": "10-Apr-12",
        "value": "628."
    },
    {
        "date": "9-Apr-12",
        "value": 636.2
    },
    {
        "date": "5-Apr-12",
        "value": 633.6
    },
    {
        "date": "4-Apr-12",
        "value": 624.3
    },
    {
        "date": "3-Apr-12",
        "value": 629.3
    },
    {
        "date": "2-Apr-12",
        "value": 618.6
    },
    {
        "date": "30-Mar-12",
        "value": "599."
    },
    {
        "date": "29-Mar-12",
        "value": "609."
    },
    {
        "date": "28-Mar-12",
        "value": "617."
    },
    {
        "date": "27-Mar-12",
        "value": "614."
    },
    {
        "date": "26-Mar-12",
        "value": "606."
    }
]

d3.json(data, function(row){
    console.log(row[0])
    data.forEach(function (d){
        d.date = parseDate(d.date);
        d.value = +d.value;
    });
    
    // Sclae the rainge of the data
    x.domain(d3.extent(data, function(d){ return d.date; }));
    y.domain([0, d3.max(data, function(d){ return d.value; })]);
    
    // Add the valueline path.
    svg.append("path")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    
    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
});

var inter = setInterval(function(){
    updateData();
}, 5000);

//** update data section (Called from the onclick)
function updateData(){
    // Get the data again
    d3.csv("../data/data-alt.csv", function(error, data){
        data.forEach(function(d){
            d.date = parseDate(d.date);
            d.value = +d.value;
        });

        // Scale the range of the data again
        x.domain(d3.extent(data, function(d){ return d.date; }));
        x.domain([0, d3.max(data, function(d){ return d.value;})]);
        
        // select the section we want to apply our changes to 
        var svg = d3.select("body").transition();
        
        // Make the changes 
        svg.select(".line")  // change the line
            .duration(750)
            .attr("d", valueline(data));
        svg.select(".x.axis") // change the x axis
            .duration(750)
            .call(xAxis);
        svg.select(".y.axis")  // change the y axis 
            .duration(750)
            .call(yAxis);
    });
}
