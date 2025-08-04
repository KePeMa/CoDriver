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
        Highcharts.chart('halfed-pie-chart', {
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
            series: [{
                name: 'Used',
                innerSize: '50%',
                data: data,
            }]
        });

    }
}
class AnalyzerBubble {
    constructor(disks) {
        this.init(disks);
    }

    init(disks) {
        let series = [];
        let counter = 0;
        let lastCount = 1;

        disks = [disks[0]]; // TODO: REMOVE!!!

        disks.forEach(async disk => {
            let dirs = await invoke("get_disk_dirs", { path: disk.path });
            dirs.sort((a, b) => b.size - a.size);

            let used = parseInt(disk.capacity) - parseInt(disk.avail);
            let capacity = parseInt(disk.capacity);
            let fillPercent = (used / capacity) * 100;
            let usageBubbleValue = fillPercent;
            console.log(disk.path, "used:", used, "capacity:", capacity, "fillPercent:", fillPercent, "usageBubbleValue:", usageBubbleValue);
            // Dummy-Parent-Bubble für die Größe (nicht sichtbar oder interaktiv)
            let data = [{
                name: '',
                value: usageBubbleValue,
                color: 'transparent',
                dataLabels: { enabled: false },
                showInLegend: false,
                enableMouseTracking: false,
                includeInDataExport: false
            }];

            // Top 3 Dateien als sichtbare Child-Bubbles
            for (let i = 0; i < 3 && i < dirs.length; i++) {
                data.push({
                    color: '#1D6676',
                    name: dirs[i].name,
                    shortName: dirs[i].name,
                    value: parseInt((dirs[i].size * 100) / (disk.capacity / 1000))
                });
            }

            series.push({
                name: disk.name,
                color: '#00A7CC',
                data: data
            });

            counter++;
        });

        let interval = setInterval(() => {
            if (counter >= lastCount) {
                lastCount++;
                Highcharts.chart('packed-bubble', {
                    series: series,
                    chart: {
                        type: 'packedbubble',
                        backgroundColor: null
                    },
                    title: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    },
                    tooltip: {
                        pointFormat: '<b>{point.name}</b>: {point.value}',
                        formatter: function () {
                            return this.point.name
                                ? `<b>${this.point.name}</b>: ${this.point.value}`
                                : false;
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        packedbubble: {
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
                                    bubblePadding: 20
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
                                    fontSize: '100%'
                                }
                            }
                        }
                    }
                });
            }

            if (counter === disks.length) {
                clearInterval(interval);
            }
        }, 500);
    }
}