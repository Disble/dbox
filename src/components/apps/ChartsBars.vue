<template>
  <charts :data-chart="dataChart" />
</template>

<script>
import Chart from 'chart.js';
import Charts from '@/components/Charts.vue';

export default {
    components: {
        Charts
    },

    props: {
        dataBars: {
            type: Object,
            default: () => {
                return {
                    data: ctx => {
                        const gradient = ctx.createLinearGradient(0, 0, 0, 450);

                        // Se pueden agregar más addColorStop para tener más colores.
                        gradient.addColorStop(0, 'hsla(141, 53%, 53%, 1)');
                        gradient.addColorStop(0.4, 'hsla(141, 53%, 53%, 0.1)');
                        return {
                            labels: [
                                'Mercury',
                                'Venus',
                                'Earth',
                                'Mars',
                                'Jupiter',
                                'Saturn',
                                'Uranus',
                                'Neptune'
                            ],
                            datasets: [
                                {
                                    label: 'Number of Moons',
                                    data: [0, 0, 1, 2, 67, 62, 27, 14],
                                    backgroundColor: gradient,
                                    borderWidth: 0
                                }
                            ]
                        };
                    }
                };
            }
        }
    },

    data() {
        return {
            dataChart: {
                type: 'bar',
                data: this.dataBars.data,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    },
                    tooltips: {
                        mode: 'label',
                        display: false
                    },
                    hover: {
                        animationDuration: 0
                    },
                    animation: {
                        duration: 1,
                        onComplete: function() {
                            const chartInstance = this.chart,
                                ctx = chartInstance.ctx;

                            ctx.font = Chart.helpers.fontString(
                                11,
                                'bold',
                                Chart.defaults.global.defaultFontFamily
                            );
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillStyle = '#ddd';

                            this.data.datasets.forEach(function(dataset, i) {
                                const meta = chartInstance.controller.getDatasetMeta(
                                    i
                                );
                                meta.data.forEach(function(bar, index) {
                                    const data = dataset.data[index];
                                    ctx.fillText(
                                        data,
                                        bar._model.x,
                                        bar._model.y - 5
                                    );
                                });
                            });
                        }
                    },
                    scales: {
                        xAxes: [
                            {
                                display: true,
                                gridLines: {
                                    display: false
                                },
                                scaleLabel: {
                                    display: false,
                                    fontColor: '#DDDDDD',
                                    labelString: 'Month'
                                },
                                ticks: { fontColor: '#DDDDDD' }
                            }
                        ],
                        yAxes: [
                            {
                                display: false,
                                gridLines: {
                                    display: false
                                },
                                scaleLabel: {
                                    display: false,
                                    fontColor: '#DDDDDD',
                                    labelString: 'Value'
                                },
                                ticks: {
                                    display: false,
                                    fontColor: '#DDDDDD',
                                    beginAtZero: true
                                }
                            }
                        ]
                    }
                }
            }
        };
    }
};
</script>
