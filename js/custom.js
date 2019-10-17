// const api = "https://api.coindesk.com/v1/bpi/historical/close.jsion?start-2017-12-31&end-2018-04-01";
//
// document.addEventListener("DOMContentLoaded", function(event){
//     fetch(api)
//         .then(function(response){ return response.json();})
//         .then(function(data){
//             var parsedData = parseData(data);
//             drawChart(parsedData);
//         })
//         .catch(function(err){ console.log(err);})
// });

/*
* Parse data into key-value paris
* @param {object}data Object containing historical data of API
*  */
var data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]

function passD(data){
    var arr = [];
    for(var i in dataset){
        // console.log(i);
        arr.push({
            data: data[i],
            value: channelCapacityband(data[i])
        });
    }
    // drawband(arr);
    return arr;
}
// passD(data);
// function parseData(data){
//     var arr = [];
//     for(var i in data.bpi){
//         arr.push({
//             data: new Date(i),
//             value: +data.bpi[i]
//         });
//     }
//     console.log(arr);
//     return arr;
//
// }
var dataset = [1,2,3,4,5]

function passData(dataset){
    var arr = [];
    for(var i in dataset){
        // console.log(i);
        arr.push({
            data: dataset[i],
            value: channelCapacity(dataset[i])
        });
    }
    drawChart(arr);
    return arr;
}
passData(dataset);

/*
* Creates a chart using D3
* @param (object) data Object containing historical data of BPI
*  */

function drawChart(data){
    var svgWidth = 600, svgHeight = 400;
    var margin = { top: 50, right: 50, bottom: 50, left: 50};
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
        .curve(d3.curveMonotoneX) //apply smoothing to the line
        // .curve(d3.curveCardinal)
    x.domain(d3.extent(data, function(d) { return d.data}));
    // y.domain(d3.extent(data, function(d) { return d.value}));
    // x.domain([0,5]);
    y.domain([16,26]);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("fill","#000")
        .attr("transform","rotate(0)")
        .attr("x", width)
        .attr("y", 30)
        .attr("dx", "0.71em")
        .attr("text-anchor","end")
        .text("Device Radius, HBC (cm) ");
    // .remove();
    
    
    // writing on the graph 
    g.append("g")
        .attr("transform", "translate(150,"+ 0 + ")")
        .append("text")
        .attr("fill", "steelblue")
        .text("Channel Capacity HBC")
    
    g.append("g")
        .attr("transform", "translate(150,"+ 20 + ")")
        .append("text")
        .attr("fill", "#FF0000")
        .text("Channel Capacity Bluetooth")
    
    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill","#000")
        // .attr("transform","rotate(-90)")
        .attr("transform","rotate(-90)")
        .attr("y", -25)
        // .attr("dy", "0.7lem")
        .attr("text-anchor", "end")
        .text("Channel Capacity (Mbps)");

    var path = g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
        // .on("mousemove", mousemoved);
    
    
    g.append("line")
        .attr("x1", x(1))
        .attr("y1", y(22))
        .attr("x2", x(width))
        .attr("y2", y(22))
        .style("stroke-dasharray","5,5")//dashed array for line
        .attr("stroke", "red");
        // .attr("stroke-linejoin", "round")
        // .attr("stroke-linecap", "round")
        // .attr("stroke-width", 1.5)
    //svg.selectAll(".dot")
    // rad =[3, Math.log(1)];
    // rad =[1,1];
    var rad = 2 

    // // svg.selectAll(".dot")
    // g.append("path")
    //     .data(data.filter(function(d){ console.log(d); return d; }))
    //     .enter()
    //     .append("circle")
    //     .filter(function(d) { return d.data.toFixed(2) == rad })
    //     .attr("class", "dot")
    //     .attr("cx", line.x())
    //     .attr("cy", line.y())
    //     .attr("r", 3.5);

    g.selectAll("circle")
        .data(data.filter(function(d){ return d; }))
        .enter()
        .filter(function(d){
            // console.log(d);
            if(d.data == rad){

            }
            return d.data == rad; })
        // .data(rad).enter()
        .append("circle")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", "8px")
        .attr("fill", "rad")
    
    // var circle = svg.append("circle")
    //     .attr("cx", x(10))
    //     .attr("cy", y(10))
    //     .attr("r", 3.5);

    var line = svg.append("line");
    
    // svg.append("rect")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .on("mousemove", mousemoved);
    //
    // function mousemoved() {
    //     var m = d3.mouse(this),
    //         p = closestPoint(path.node(), m);
    //     console.log(m)
    //
    //     // console.log(path);
    //     line.attr("x1", x([0])).attr("y1", p[1]).attr("x2", m[0]).attr("y2", m[1]);
    //     circle.attr("cx", x(p[0])).attr("cy", y(p[1]));
    // }
    //
    // function closestPoint(pathNode, point) {
    //     var pathLength = pathNode.getTotalLength(),
    //         precision = 8,
    //         best,
    //         bestLength,
    //         bestDistance = Infinity;
    //
    //     // linear scan for coarse approximation
    //     for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
    //         if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
    //             best = scan, bestLength = scanLength, bestDistance = scanDistance;
    //         }
    //     }
    //
    //     // binary search for precise estimate
    //     precision /= 2;
    //     while (precision > 0.5) {
    //         var before,
    //             after,
    //             beforeLength,
    //             afterLength,
    //             beforeDistance,
    //             afterDistance;
    //         if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
    //             best = before, bestLength = beforeLength, bestDistance = beforeDistance;
    //         } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
    //             best = after, bestLength = afterLength, bestDistance = afterDistance;
    //         } else {
    //             precision /= 2;
    //         }
    //     }
    //
    //     best = [best.x, best.y];
    //     best.distance = Math.sqrt(bestDistance);
    //     return best;
    //
    //     function distance2(p) {
    //         var dx = p.x - point[0],
    //             dy = p.y - point[1];
    //         return dx * dx + dy * dy;
    //     }
    // }
    
    // for the visualizaiton
    var margin = {top: 20, right: 50, bottom: 50, left: 28},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var bandsvg = d3.select("#svg2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + width + "," + margin.top + ")");

    var gb = bandsvg.append("g")
        .attr("transform", "translate(" + margin.left/2 + "," + margin.top/2 + ")");

    var x = d3.scaleLinear()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var line = d3.line()
        .x(function(d) {return x(d.data)})
        .y(function(d) {return y(d.value)})
        // .curve(d3.curveMonotoneX) //apply smoothing to the line
        .curve(d3.curveCardinal)
    x.domain(d3.extent(data, function(d) { return d.data}));
    // y.domain(d3.extent(data, function(d) { return d.value}));
    // x.domain([0,5]);
    y.domain([1,100]);

    gb.append("gb")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("fill","#000")
        .attr("transform","rotate(0)")
        .attr("x", width)
        .attr("y", 30)
        .attr("dx", "0.71em")
        .attr("text-anchor","end")
        .text("Bandwidth, HBC (cm) ");
    // .remove();


    // writing on the graph
    gb.append("gb")
        .attr("transform", "translate(150,"+ 0 + ")")
        .append("text")
        .attr("fill", "steelblue")
        .text("Channel Capacity HBC")

    gb.append("gb")
        .attr("transform", "translate(150,"+ 20 + ")")
        .append("text")
        .attr("fill", "#FF0000")
        .text("Channel Capacity Bluetooth")

    gb.append("gb")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill","#000")
        // .attr("transform","rotate(-90)")
        .attr("transform","rotate(-90)")
        .attr("y", -25)
        // .attr("dy", "0.7lem")
        .attr("text-anchor", "end")
        .text("Channel Capacity (Mbps)");

    var path = gb.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    // .on("mousemove", mousemoved);


    gb.append("line")
        .attr("x1", x(1))
        .attr("y1", y(20))
        .attr("x2", x(width))
        .attr("y2", y(20))
        .style("stroke-dasharray","5,5")//dashed array for line
        .attr("stroke", "red");
    // .attr("stroke-linejoin", "round")
    // .attr("stroke-linecap", "round")
    // .attr("stroke-width", 1.5)

    var rad = 2



    gb.selectAll("circle")
        .data(data.filter(function(d){ return d; }))
        .enter()
        .filter(function(d){ return d.data == rad; })
        // .data(rad).enter()
        .append("circle")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5)
        .attr("fill", "rad")

    // svg.append("rect")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .on("mousemove", mousemoved);

    // for the visualizaiton

    // A function that update the chart when slider is moved?
    function updateband(bandwidth) {
        // recompute density estimation
        // console.log(x.ticks(radius))
        // kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(binNumber))
        // density =  kde( data.map(function(d){  return d.price; }) )
        band = bandwidth;
        var test =  //svg.append("g")
            gb.selectAll("circle")
                .attr("cx", x(band))
                .attr("cy", y(channelCapacityband(band)))
                .attr("fill", "red")

    }

    // Listen to the bandwidth slider
    d3.select("#bandwidthSider").on("change", function(d){
        bandValue = this.value;
        updateband(bandValue)
    }) 
    // A function that update the chart when slider is moved?
    function updateChart(radius) {
        // recompute density estimation
        // console.log("this is the x tick",x.ticks(radius))
        // var mydata= x.ticks(radius);
        // kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(binNumber))
        // density =  kde( data.map(function(d){  return d.price; }) )
        rad = radius;
        console.log(radius);
        // test
        //     .transition()
        //     .duration(1000)
        var test =  //svg.append("g")
            g.selectAll("circle")
                // .data(passData(rad))
                // .enter()
                // .filter(function(d){ console.log(d); return d.data == rad; })
                // .data(rad).enter()
                // .append("circle")
                .attr("cx", x(rad))
                .attr("cy", y(channelCapacity(rad)))
                .attr("r", "8px")
                .attr("fill", "red") 

    }

    // Listen to the slider?
    d3.select("#radius").on("change", function(d){
        selectedValue = this.value/100;
        updateChart(selectedValue)
    })

}

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}


function channelCapacity (a){
    var BW = 10;
    var VTx = 3.3;
    var R = 10;
    var Cl = 5 * Math.pow(10, -12 );
    var res = BW *(2*Math.log(getBaseLog(2, (VTx * Math.pow(a, 2))/(Cl* Math.sqrt(R*BW)))) - 5.2101)
    return res;
}


// function getBaseLog(x, y) {
//     return Math.log(y) / Math.log(x);
// }
function channelCapacityband(BW){
    // var radslider = document.getElementById("radius");
    // console.log("this is a: ",a);
    // var a = radslider.value/100

    var a = 2.5;
    var VTx = 3.3;
    var R = 10;
    var Cl = 5 * Math.pow(10, -12);
    var res = BW *(2*Math.log(getBaseLog(2, (VTx * Math.pow(a, 2))/(Cl* Math.sqrt(R*BW)))) - 5.2101)
    return res;
}