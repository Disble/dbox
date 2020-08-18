<template>
  <canvas
    id="canvas-chart"
    ref="canvas"
  />
</template>

<script>
import Chart from 'chart.js';

export default {
    props: {
        dataChart: {
            type: Object,
            default: null
        }
    },
    mounted() {
        this.createChart('canvas-chart', this.dataChart);
    },
    methods: {
        createChart(chartId, chartData) {
            // const ctx = document.getElementById(chartId);
            const canvas = this.$refs.canvas;
            var ctx = canvas.getContext('2d');
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(250,174,50,1)');
            gradient.addColorStop(1, 'rgba(250,174,50,0)');

            console.log('context', ctx);
            new Chart(canvas, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options
            });
        }
    }
};
</script>

<style>
</style>
