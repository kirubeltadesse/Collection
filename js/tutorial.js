// heros = ['Hulk', 'Dr. Strange', 'Capt. America', 'Kelekagebrehana']
// d3.select("h2").style("font-size", "20px");
// d3.select("ul")
//     .selectAll("li")
//     .data(heros)
//     .enter()
//     .append("li")
//     .text(hero => hero + " !");
//     var numbers = [20, 30, 50, 30, 10, 90];
//     var barHeight = 40;
//
//     var dataset = [1, 2, 3, 4, 5]
// d3.select("svg")
//     .selectAll("rect")
//     .data(numbers)
//     .enter()
//     .append("rect")
//     .attr("width", d => d)
//     .attr("height", barHeight - 4)
//     .attr("transform", (d, i) => "translate(100, " +i * barHeight +" )");
//
//
//
// d3.select('body')
//     .selectAll('p')
//     .data(dataset)
//     .enter()
//     .append('p')
//     // .text('D3 is awesome !!');
//     .text(function(d){ return d;});


// d3.select("body").style("background-color", "black");

// creating a barchart

// javascript
// var dataset = [80, 100, 56, 120, 180, 30, 120, 160];
//
// var svgWidth = 500, svgHeight = 300, barPadding = 5;
// var barWidth = (svgWidth / dataset.length);
//
//
// var svg = d3.select('svg')
//     .attr("width", svgWidth)
//     .attr("height", svgHeight);
//
//
// // introducing scale
// var xScale = d3.scaleLinear()
//     .domain([0, d3.max(dataset)])
//     .range([0, svgWidth]);
//
// var yScale = d3.scaleLinear()
//     .domain([0, d3.max(dataset)])
//     .range([svgHeight, 0]);
//
// var x_axis = d3.axisBottom().scale(xScale);
//
// var y_axis = d3.axisLeft().scale(yScale);
//
// svg.append("g")
//     .attr("transform","translate(50, 10)")
//     .call(y_axis);
//
// var xAxisTranslate = svgHeight - 20;
//
// svg.append("g")
//     .attr("transform", "translate(50, " + xAxisTranslate +")")
//     .call(x_axis);
//
//
//
// var barChart = svg.selectAll("rect")
//     .data(dataset)
//     .enter()
//     .append("rect")
//     .attr("y", function(d){
//         return svgHeight - yScale(d);
//     })
//     .attr("height", function(d){
//         return yScale(d);
//     })
//     .attr("width", barWidth - barPadding)
//     .attr("transform", function (d, i){
//         var translate = [barWidth * i, 0];
//         return "translate("+ translate + ")";
//     });
//
// var text = svg.selectAll("text")
//     .data(dataset)
//     .enter()
//     .append("text")
//     .text(function(d){
//         return d;
//     })
//     .attr("y", function(d, i){
//         return svgHeight -yScale(d) - 2;
//     })
//     .attr("x", function(d, i){
//         return barWidth * i;
//     })
//     .attr("fill", "#A64c38");



// creating element in d3js
// var svgWidth = 600, svgHeight = 500;
// var svg = d3.select("svg")
//     .attr("width", svgWidth)
//     .attr("height", svgHeight)
//     .attr("class", "svg-container");
//
// var line = svg.append("line")
//     .attr("x1", 100)
//     .attr("x1", 500)
//     .attr("y1", 50)
//     .attr("y2", 50)
//     .attr("stroke", "red")
//     .attr("stroke-width", 5);
//
// var rect = svg.append("rect")
//     .attr("x",100)
//     .attr("y", 100)
//     .attr("width", 200)
//     .attr("height", 100)
//     .attr("fill", "#9B95FF");
//
// var circle = svg.append("circle")
//     .attr("cx", 200)
//     .attr("cy", 300)
//     .attr("r", 80)
//     .attr("fill", "#7CE805");



// creating pie chart
// var data = [
//     {"platform": "Android", "percentage": 40.11},
//     {"platform": "Windows", "percentage": 36.69},
//     {"platform": "iOS", "percentage": 13.06}
// ];
//
// var svgWidth = 500, svgHeight = 300, radius = Math.min(svgWidth, svgHeight) / 2;
// var svg = d3.select('svg')
//     .attr("width", svgWidth)
//     .attr("width", svgHeight);
//
// //Create group element to hold pie chart
// var g = svg.append("g")
//     .attr("transform", "translate(" + radius +","+ radius + ")");
//
// var color = d3.scaleOrdinal(d3.schemeCategory10);
//
// var pie = d3.pie().value(function(d){
//     return d.parcentage;
// })
//
// var path = d3.arc()
//     .outerRadius(radius)
//     .innerRadius(0);
//
// var arc = g.selectAll("arc")
//     .data(pie(data))
//     .enter()
//     .append("g");
//
// arc.append("path")
//     .attr("d", path)
//     .attr("fill", function(d){ return color(d.data.percentage);});
//
// var label = d3.arc()
//     .outerRadius(radius)
//     .innerRadius(0);


// Creating line chart for the Bitcoin Price Index

const api = "https://api.coindesk.com/v1/bpi/historical/close.jsion?start-2017-12-31&end-2018-04-01";

document.addEventListener("DOMContentLoaded", function(event){
    fetch(api)
        .then(function(response){ return response.json();})
        .then(function(data){
            console.log(data);
            var parsedData = parseData(data);
            drawChart(parsedData);
        })
        .catch(function(err){ console.log(err);})
});
//
/*
* Parse data into key-value paris
* @param {object}data Object containing historical data of API
*  */

function parseData(data){
    var arr = [];
    for(var i in data.bpi){
        arr.push({
            data: new Date(i),
            value: +data.bpi[i]
        });
    }
    // console.log(arr);
    return arr;

}
/*
var dataset = {
    x:[1,2,3,4,5,6],
    y:[1,4,9,16,25,36]
    // y:[function(x){return x}]
}

 */


// function passData(dataset){
//     var arr = [];
//     for(var i in dataset.x){
//         arr.push({
//             data: 
//         })
//     }
// }



/*
* Creates a chart using D3
* @param (object) data Object containing historical data of BPI
*  */

function drawChart(data){
    var svgWidth = 1500, svgHeight = 400;
    var margin = { top: 10, right: 20, bottom: 30, left: 50};
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var line = d3.line()
        .x(function(d) {return x(d.data)})
        .y(function(d) {return y(d.value)})
        x.domain(d3.extent(data, function(d) { return d.data}));
        y.domain(d3.extent(data, function(d) { return d.value}));
       


    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain")
        .remove();

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill","#000")
        .attr("transform","rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.7lem")
        .attr("text-anchor", "end")
        .text("Price ($)");

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
}





















