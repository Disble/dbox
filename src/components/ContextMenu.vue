<template>
  <div
    class="ContextMenu"
    @contextmenu.prevent="handleClick"
  >
    <div
      class="dropdown"
      :class="{'is-active': isActiveMenu}"
    >
      <div class="dropdown-trigger">
        <slot />
      </div>
      <div
        id="dropdown-menu"
        ref="contextDropdown"
        class="dropdown-menu"
        role="menu"
        @click.prevent="() => false"
      >
        <div class="dropdown-content">
          <div
            v-for="(item, i) of itemsMenu"
            :key="i"
          >
            <hr
              v-if="item.isDivider"
              class="dropdown-divider"
            >
            <a
              v-else
              href="#"
              class="dropdown-item"
              @click.prevent="handleClickEmitter(item)"
            >
              {{ item.title }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        itemsMenu: {
            type: Array,
            default: () => {
                return [
                    {
                        id: '1',
                        title: 'Abrir',
                        type: 'item'
                    },
                    {
                        id: '2',
                        isDivider: true,
                        type: 'divider'
                    }
                ];
            }
        }
    },

    data() {
        return {
            isActiveMenu: false
        };
    },
    mounted() {
        const specifiedElement = this.$refs.contextDropdown;
        document.addEventListener('mouseup', event => {
            const isClickInside = specifiedElement.contains(event.target);

            if (!isClickInside) {
                this.isActiveMenu = false;
            }
        });
    },
    methods: {
        handleClick(event) {
            this.isActiveMenu = !this.isActiveMenu;
            // console.log('👉 You clicked here ', event);
            const contextDropdown = this.$refs.contextDropdown;
            const { x, y } = this.getRelativeCoordinates(
                event,
                contextDropdown.parentNode
            );
            contextDropdown.style.left = `${x}px`;
            contextDropdown.style.top = `${y}px`;
        },

        handleClickEmitter(item) {
            this.$emit('on-click', item);
            this.isActiveMenu = false;
        },

        getRelativeCoordinates(event, referenceElement) {
            const position = {
                x: event.pageX,
                y: event.pageY
            };

            const offset = {
                left: referenceElement.offsetLeft,
                top: referenceElement.offsetTop
            };

            let reference = referenceElement.offsetParent;

            while (reference) {
                offset.left += reference.offsetLeft;
                offset.top += reference.offsetTop;
                reference = reference.offsetParent;
            }

            return {
                x: position.x - offset.left,
                y: position.y - offset.top
            };
        }
    }
};
</script>

<style lang="scss" scoped>
.ContextMenu {
    position: relative;
}
.ContextMenu-dropdown {
    display: inline;
    position: absolute;
    background: whitesmoke;
    top: 0;
    left: 0;
}
.dropdown-divider {
    background-color: #555;
}
</style>
