<template>
  <canvas ref="canvas" />
</template>

<script>
import Chart from 'chart.js';
import '@/lib/charjs-bars-rounded';

export default {
    props: {
        dataChart: {
            type: Object,
            default: null
        }
    },
    mounted() {
        this.createChart(this.dataChart);
    },
    methods: {
        createChart(chartData) {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext('2d');
            const dataChart = chartData.data(ctx);
            chartData.options.scales.yAxes[0].ticks.max =
                Math.max(...dataChart.datasets[0].data) + 15;

            new Chart(canvas, {
                type: chartData.type,
                data: dataChart,
                options: chartData.options
            });
        }
    }
};
</script>

<style>
</style>
