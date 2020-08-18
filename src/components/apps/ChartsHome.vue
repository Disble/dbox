<script>
import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,
    props: {
        labels: {
            type: Array,
            default: () => ['A', 'B', 'C']
        },
        datalabel: {
            type: String,
            default: 'Downloads per Week'
        },
        chartdata: {
            type: Array,
            default: () => [100, 40, 106]
        },
        options: {
            type: Object,
            default: () => {
                return {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    title: {
                        display: false,
                        text: 'Chart.js Line Chart'
                    },
                    tooltips: {
                        mode: 'label',
                        display: false
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
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
                                display: true,
                                gridLines: {
                                    display: false
                                },
                                scaleLabel: {
                                    display: false,
                                    fontColor: '#DDDDDD',
                                    labelString: 'Value'
                                },
                                ticks: {
                                    fontColor: '#DDDDDD',
                                    beginAtZero: true
                                }
                            }
                        ]
                    }
                };
            }
        }
    },
    data() {
        return {
            gradient: null
        };
    },
    mounted() {
        this.gradient = this.$refs.canvas
            .getContext('2d')
            .createLinearGradient(0, 0, 0, 450);

        this.gradient.addColorStop(0, 'rgba(140, 103, 239, 0.5)');
        this.gradient.addColorStop(0.5, 'rgba(140, 103, 239, 0.25)');
        this.gradient.addColorStop(1, 'rgba(140, 103, 239, 0)');

        this.renderChart(
            {
                labels: this.labels,
                datasets: [
                    {
                        label: this.datalabel,
                        borderColor: '#8c67ef',
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        pointBorderColor: 'white',
                        backgroundColor: this.gradient,
                        data: this.chartdata
                    }
                ]
            },
            this.options
        );
    }
};
</script>

<style>
</style>
