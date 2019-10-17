// parameters
var outerWidth = 300;
var outerHeight = 250;
var margin = { left: 60, top: 5, right: 5, bottom: 60 };
var rMin = 1; // "r" stands for radius
var rMax = 6;

var xColumn = "sepal_length";
var yColumn = "petal_length";
var rColumn = "sepal_width";
var colorColumn = "species";

var xAxisLabelText = "Sepal Length (cm)";
var xAxisLabelOffset = 48;

var yAxisLabelText = "Petal Length (cm)";
var yAxisLabelOffset = 30;

var innerWidth  = outerWidth  - margin.left - margin.right;
var innerHeight = outerHeight - margin.top  - margin.bottom;

// selecting element on the page
var svg = d3.select("body").append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight);
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var xAxisG = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + innerHeight + ")")
var xAxisLabel = xAxisG.append("text")
    .style("text-anchor", "middle")
    .attr("x", innerWidth / 2)
    .attr("y", xAxisLabelOffset)
    .attr("class", "label")
    .text(xAxisLabelText);
var yAxisG = g.append("g")
    .attr("class", "y axis");
var yAxisLabel = yAxisG.append("text")
    .style("text-anchor", "middle")
    .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
    .attr("class", "label")
    .text(yAxisLabelText);

var xScale = d3.scale.linear().range([0, innerWidth]);
var yScale = d3.scale.linear().range([innerHeight, 0]);
var rScale = d3.scale.linear().range([rMin, rMax]);
var colorScale = d3.scale.category10();

var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
    .ticks(5)
    .tickFormat(d3.format("s"))
    .outerTickSize(0);
var yAxis = d3.svg.axis().scale(yScale).orient("left")
    .ticks(5)
    .tickFormat(d3.format("s"))
    .outerTickSize(0);

function render(data){
    xScale.domain(d3.extent(data, function (d){ return d[xColumn]; }));
    yScale.domain(d3.extent(data, function (d){ return d[yColumn]; }));
    rScale.domain(d3.extent(data, function (d){ return d[rColumn]; }));

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    var circles = g.selectAll("circle").data(data);
    circles.enter().append("circle");
    circles
        .attr("cx",      function (d){ return       xScale(d[xColumn]);     })
        .attr("cy",      function (d){ return       yScale(d[yColumn]);     })
        .attr("r",       function (d){ return       rScale(d[rColumn]);     })
        .attr("fill",    function (d){ return   colorScale(d[colorColumn]); });

    circles.exit().remove();
}

function type(d){
    d.sepal_length = +d.sepal_length;
    d.sepal_width  = +d.sepal_width;
    d.petal_length = +d.petal_length;
    d.petal_width  = +d.petal_width;
    return d;
}

d3.csv("data/iris.csv", type, render);