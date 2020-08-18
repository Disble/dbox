<template>
  <charts :data-chart="dataChart" />
</template>

<script>
import Charts from '@/components/Charts.vue';

const planetChartData = {
    type: 'bar',
    data: {
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
                // one line graph
                label: 'Number of Moons',
                data: [0, 0, 1, 2, 67, 62, 27, 14],
                backgroundColor: [
                    'rgba(140, 103, 239, 1)',
                    'rgba(140, 103, 239, 1)',
                    'rgba(140, 103, 239, 1)',
                    'rgba(140, 103, 239, 1)',
                    'rgba(140, 103, 239, 1)',
                    'rgba(140, 103, 239, 1)',
                    'rgba(140, 103, 239, 1)'
                ],
                borderWidth: 0
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
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
                        fontColor: '#DDDDDD',
                        beginAtZero: true
                    }
                }
            ]
        }
    }
};

export default {
    components: {
        Charts
    },

    data() {
        return {
            dataChart: planetChartData
        };
    }
};
</script>
