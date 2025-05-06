class AnalyzerHalfed {
    constructor(disks) {
        let sum = 0;
        disks.forEach(disk => {
            sum += parseInt(disk.capacity);
        });
        let data = disks.map(disk => ({
            name: disk.name,
            y: (100 / (sum / 1000)) / ((100 / parseInt(disk.capacity)) * parseInt(disk.avail)),
            color: '#1D6676'
        }));
        console.log(data, sum);
        Highcharts.chart('halfed-pie-chart',{
                chart: {
                    type: 'pie',
                    backgroundColor: null,
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    height: null,
                    dataLabels: {
                        plotEdges: true,
                    }
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: "This PC",
                    align: 'center',
                    x: -60,
                    verticalAlign: 'center',
                    style: {
                        fontSize: '1.1em',
                        color: 'white',
                    }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        startAngle: -180,
                        endAngle: 0,
                        center: ['50%', '50%'],
                        size: '100%',
                        animation: {
                            duration: 1000,
                            defer: 500
                        },
                        dataLabels: {
                            enabled: true,
                            distance: -55,
                            style: {
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        }
                    }
                },
                series:[{
                        name: 'Used',
                        innerSize: '50%',
                        data: data,
                    }]
            });

    }
}
class AnalyzerBubble {
    constructor(disks) {
        let sum = 0;
        disks.forEach(disk => {
            sum += parseInt(disk.capacity);
        });
        // let data = disks.map(disk => ({
        //         color: '#1D6676',
        //         name: 'Test web page performance',
        //         shortName: 'Test page',
        //         value: parseInt(disk.capacity),
        // }));
        let series = disks.map(disk => ({
            name: disk.name,
            color: '#00A7CC',
            data: [{
                color: '#1D6676',
                name: 'Test web page performance',
                shortName: 'Test page',
                value: 5
            }, 
            {
                color: '#1D6676',
                name: 'Code-review meeting',
                shortName: 'CR',
                value: 4
            },{
                color: '#1D6676',
                name: 'Allow user to change nickname',
                shortName: 'Nickname',
                value: 2
            }]
        }))
        console.log(series);
        Highcharts.chart('packed-bubble', {
            series: series,
            chart: {
                type: 'packedbubble',
                backgroundColor: null,
            },
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '<b>{point.name}</b> {point.value}'
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                packedbubble: {
                    minSize: '30%',
                    maxSize: '80%',
                    layoutAlgorithm: {
                        maxSpeed: 1,
                        seriesInteraction: false,
                        gravitationalConstant: 1,
                        splitSeries: true,
                        bubblePadding: 15,
                        dragBetweenSeries: false,
                        friction: -0.6,
                        parentNodeOptions: {
                            maxSpeed: 1,
                            bubblePadding: 20,
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.shortName}',
                        parentNodeFormat: '{point.series.name}',
                        style: {
                            color: 'white',
                            fontWeight: 'bold',
                            textOutline: 'none',
                            fontSize: '100%',
                        },
                    }
                },
            },        
        });  
    }  
}