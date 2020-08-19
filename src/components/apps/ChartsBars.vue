<template>
  <charts :data-chart="dataChart" />
</template>

<script>
import Charts from '@/components/Charts.vue';
import dataBarsDefault from '@/lib/charjs-bars-defaults';

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
                        gradient.addColorStop(0, 'hsla(141, 0%, 40%, 1)');
                        gradient.addColorStop(0.4, 'hsla(141, 0%, 40%, 0.1)');
                        return {
                            labels: ['A', 'B', 'C', 'D', 'E'],
                            datasets: [
                                {
                                    label: 'Defaults values',
                                    data: [2, 2, 2, 2, 2],
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
            dataChart: dataBarsDefault(this.dataBars)
        };
    },

    watch: {
        dataBars() {
            this.dataChart = dataBarsDefault(this.dataBars);
        }
    }
};
</script>
