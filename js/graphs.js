(function(){
    const dataFormat = d3.time.format('%Y-%m')

    //product mock data
    function generateData() {
        const generator = new MersenneTwister(12346);
        const startDate = +new Date('2016-01-01');
        const endDate = +new Date('2017-01-01');

        return _.range(100)
            .map( i =>({
                date: new Date(generator.random() * (endDate - startDate) + startDate),
                value: Math.round(generator.random() * 3000 + 100)
            }));
    }
    function createCumulativeGroup(group){
        function aggregate(list){
            return list.reduce((acc, item, inde) => {
                acc[index] ={
                    key: item.key,
                    value: item.value + (index > 0 ? acc[index - 1].value : 0)
                };

                return acc;
            }, []);
        }

    //    methods to implement: all(), top(n) and dispose() are enought to draw a chart.
        return{
            all(){
                return aggregate(group.all());
            },

            top(n){
                return aggregate(group.top(Infinity)).splice(0, n);
            },

            dispose(){
                if (group.dispose){
                    group.dispose();
                }
            }

        };
    }

    function render(data){
        const ndx = crossfilter(data);

        const dateDimension = ndx.dimension(d => dateFormat(d.date));

        const dateGroup = dateDimension
            .group()
            .reduceSum(d => d.value);

        dc.lineChart('#chart1')
            .width(900)
            .height(200)
            .margins({top: 20, right: 20, bottom: 20, left: 50})
            .dimension(dateDimension)
            .group(dateGroup)
            .keyAccessor(d => new Date(d.key + '-01'))
            .x(d3.time.scale().domain([new Date(2016, 0, 1), new Date(2017, 0, 1)]))
            .round(d3.time.months)
            .xUnits(d3.time.months)
            .elasticY(true);

        dc.lineChart('#chart2')
            .width(900)
            .height(200)
            .margins({top: 20, right: 20, bottom: 20, left: 50})
            .dimension(dateDimension)
            .group(createCumulativeGroup(dateGroup)) // using the fake group instead of real group
            .keyAccessor(d => new Date(d.key + '-01'))
            .x(d3.time.scale().domain([new Date(2016, 0, 1), new Date(2017, 0, 1)]))
            .round(d3.time.month.round)
            .xUnits(d3.time.months)
            .elasticY(true);
    }

    render(generateDate());

    dc.renderAll();

}());