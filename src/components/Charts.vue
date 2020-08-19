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
    data() {
        return {
            chart: null
        };
    },
    watch: {
        dataChart() {
            this.chart.destroy();
            this.createChart(this.dataChart);
        }
    },
    mounted() {
        this.createChart(this.dataChart);
    },
    methods: {
        createChart(chartData) {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext('2d');
            const dataset = chartData.data(ctx);
            chartData.options.scales.yAxes[0].ticks.max =
                Math.max(...dataset.datasets[0].data) + 18;

            this.chart = new Chart(canvas, {
                type: chartData.type,
                data: dataset,
                options: chartData.options
            });
        }
    }
};
</script>

<style>
</style>
