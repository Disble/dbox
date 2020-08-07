<template>
  <div class="has-background-black-ter is-relative">
    <ValidationObserver
      ref="observer"
      v-slot="{ handleSubmit }"
    >
      <div class="has-background-grey-darker is-relative">
        <h1 class="has-text-white is-size-5 py-3 px-4">
          Nueva app
        </h1>
      </div>
      <section class="section dbox-form-modal">
        <ValidationProvider
          v-slot="{ errors, valid }"
          name="Título"
          rules="required"
        >
          <b-field
            label="Título"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
            custom-class="has-text-grey-light"
          >
            <b-input
              v-model="app.title"
              placeholder="Añade el título de tu app"
              custom-class="has-background-black-ter has-text-grey-light"
            />
          </b-field>
        </ValidationProvider>

        <b-field
          label="Dirección"
          :type="{ 'is-danger': errorPath.length > 0, 'is-success': errorPath.length === 0 }"
          :message="errorPath"
          custom-class="has-text-grey-light"
        >
          <div class="is-block">
            <b-dropdown
              aria-role="list"
              expanded
            >
              <button
                slot="trigger"
                slot-scope="{ active }"
                class="button is-dark is-fullwidth"
              >
                <span>Dirección de la app</span>
                <b-icon :icon="active ? 'sort-up' : 'sort-down'" />
              </button>

              <b-dropdown-item
                aria-role="listitem"
                @click="setLocalPath"
              >
                Local
              </b-dropdown-item>
              <b-dropdown-item
                aria-role="listitem"
                @click="setURLPath"
              >
                Link
              </b-dropdown-item>
            </b-dropdown>
            <p
              v-if="pathName"
              class="has-text-white-bis has-background-grey-darker has-text-centered mt-3 dbox-rounded-link"
            >
              {{ pathName }}
            </p>
          </div>
        </b-field>

        <b-field
          label="Portada"
          custom-class="has-text-grey-light"
        >
          <div class="is-block">
            <div
              v-if="app.tile !== ''"
              class="is-flex justify-content-center mb-3"
            >
              <div
                class="dbox-app-card"
                :style="{ backgroundImage: `url('${app.tile}')` }"
              />
            </div>

            <b-dropdown
              aria-role="list"
              expanded
            >
              <button
                slot="trigger"
                slot-scope="{ active }"
                class="button is-dark is-fullwidth mb-3"
              >
                <span>Seleccione una opción</span>
                <b-icon :icon="active ? 'sort-up' : 'sort-down'" />
              </button>

              <b-dropdown-item
                aria-role="listitem"
                @click="tileURL = false"
              >
                Local
              </b-dropdown-item>
              <b-dropdown-item
                aria-role="listitem"
                @click="tileURL = true"
              >
                Link
              </b-dropdown-item>
            </b-dropdown>

            <b-upload
              v-if="!tileURL"
              v-model="tile"
              drag-drop
              accept=".jpg,.jpeg,.png,.gif"
            >
              <section class="section-drop">
                <div class="content has-text-centered">
                  <p>
                    <b-icon
                      icon="upload"
                      size="is-small"
                      custom-class="dbox-icon-top-10"
                    />
                    Suelta tus archivos aquí o haz clic para subir
                  </p>
                </div>
              </section>
            </b-upload>

            <b-input
              v-if="tileURL"
              v-model="app.tile"
              placeholder="Añade una URL para la portada"
              custom-class="has-background-black-ter has-text-grey-light"
            />
          </div>
        </b-field>

        <b-field
          label="Fondo"
          custom-class="has-text-grey-light"
        >
          <div class="is-block">
            <div
              v-if="app.background !== ''"
              class="is-flex justify-content-center mb-3"
            >
              <div
                class="dbox-app-card dbox-app-card__16by7"
                :style="{ backgroundImage: `url('${app.background}')` }"
              />
            </div>

            <b-dropdown
              aria-role="list"
              expanded
            >
              <button
                slot="trigger"
                slot-scope="{ active }"
                class="button is-dark is-fullwidth mb-3"
              >
                <span>Seleccione una opción</span>
                <b-icon :icon="active ? 'sort-up' : 'sort-down'" />
              </button>

              <b-dropdown-item
                aria-role="listitem"
                @click="backgroundURL = false"
              >
                Local
              </b-dropdown-item>
              <b-dropdown-item
                aria-role="listitem"
                @click="backgroundURL = true"
              >
                Link
              </b-dropdown-item>
            </b-dropdown>

            <b-upload
              v-if="!backgroundURL"
              v-model="background"
              drag-drop
              accept=".jpg,.jpeg,.png,.gif"
            >
              <section class="section-drop">
                <div class="content has-text-centered">
                  <p>
                    <b-icon
                      icon="upload"
                      size="is-small"
                      custom-class="dbox-icon-top-10"
                    />
                    Suelta tus archivos aquí o haz clic para subir
                  </p>
                </div>
              </section>
            </b-upload>

            <b-input
              v-if="backgroundURL"
              v-model="app.background"
              placeholder="Añade una URL para el fondo"
              custom-class="has-background-black-ter has-text-grey-light"
            />
          </div>
        </b-field>

        <b-field
          label="Ícono"
          custom-class="has-text-grey-light"
        >
          <div class="is-block">
            <div
              v-if="app.icon !== ''"
              class="is-flex justify-content-center mb-3"
            >
              <div
                class="dbox-app-card dbox-app-card__square"
                :style="{ backgroundImage: `url('${app.icon}')` }"
              />
            </div>

            <b-dropdown
              aria-role="list"
              expanded
            >
              <button
                slot="trigger"
                slot-scope="{ active }"
                class="button is-dark is-fullwidth mb-3"
              >
                <span>Seleccione una opción</span>
                <b-icon :icon="active ? 'sort-up' : 'sort-down'" />
              </button>

              <b-dropdown-item
                aria-role="listitem"
                @click="iconURL = false"
              >
                Local
              </b-dropdown-item>
              <b-dropdown-item
                aria-role="listitem"
                @click="iconURL = true"
              >
                Link
              </b-dropdown-item>
            </b-dropdown>

            <b-upload
              v-if="!iconURL"
              v-model="icon"
              drag-drop
              accept=".jpg,.jpeg,.png,.gif"
            >
              <section class="section-drop">
                <div class="content has-text-centered">
                  <p>
                    <b-icon
                      icon="upload"
                      size="is-small"
                      custom-class="dbox-icon-top-10"
                    />
                    Suelta tus archivos aquí o haz clic para subir
                  </p>
                </div>
              </section>
            </b-upload>

            <b-input
              v-if="iconURL"
              v-model="app.icon"
              placeholder="Añade una URL para el ícono"
              custom-class="has-background-black-ter has-text-grey-light"
            />
          </div>
        </b-field>

        <b-field
          label="Etiquetas"
          custom-class="has-background-black-ter has-text-grey-light"
        >
          <b-taginput
            v-model="app.tags"
            :data="filteredTags"
            :allow-new="true"
            :open-on-focus="true"
            autocomplete
            field="name"
            icon="tag"
            type="is-dark"
            placeholder="Agrega una etiqueta"
            custom-class="has-background-black-ter has-text-grey-light"
            @typing="getFilteredTags"
          />
        </b-field>

        <b-field
          label="Rating"
          custom-class="has-background-black-ter has-text-grey-light"
        >
          <b-rate
            v-model="app.rating"
            icon-pack="fas"
          />
        </b-field>
      </section>

      <div class="footer-modal">
        <div class="buttons">
          <b-button
            type="is-light"
            outlined
            @click="cancel"
          >
            Cancelar
          </b-button>
          <b-button
            type="is-primary"
            @click="handleSubmit(submit)"
          >
            Confirmar
          </b-button>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { ipcRenderer } from 'electron';
import path from 'path';

export default {
    data() {
        return {
            tile: {},
            icon: {},
            background: {},
            file: {},
            errorPath: '',
            tileURL: false,
            iconURL: false,
            backgroundURL: false,
            tags: [
                {
                    name: 'Productividad'
                },
                {
                    name: 'Entretenimiento'
                },
                {
                    name: 'Referencias'
                }
            ],
            filteredTags: [],
            app: {
                title: '',
                create_date: null,
                rating: 0,
                tags: [],
                visiblity: true,
                tile: '',
                background: '',
                icon: '',
                path: ''
            }
        };
    },

    computed: {
        pathName() {
            return this.app.path !== ''
                ? `${this.app.path.substring(0, 35)}...`
                : null;
        }
    },

    watch: {
        tile() {
            const pathNormalize = path.normalize(this.tile.path);
            this.app.tile = pathNormalize.split('\\').join('/');
        },

        icon() {
            const pathNormalize = path.normalize(this.icon.path);
            this.app.icon = pathNormalize.split('\\').join('/');
        },

        background() {
            const pathNormalize = path.normalize(this.background.path);
            this.app.background = pathNormalize.split('\\').join('/');
        }
    },

    methods: {
        ...mapActions(['createApp']),

        async getPath() {
            let paths = await ipcRenderer.invoke('/tools/dialog', {
                options: {
                    title: 'Seleccionar',
                    properties: ['openFile'],
                    filters: [
                        {
                            name: 'Images',
                            extensions: ['jpg', 'jpeg', 'png', 'gif']
                        }
                    ]
                }
            });
            console.log('paths', paths[0]);
        },

        getFilteredTags(text) {
            this.filteredTags = this.tags.filter(option => {
                return (
                    option.name
                        .toString()
                        .toLowerCase()
                        .indexOf(text.toLowerCase()) >= 0
                );
            });
        },

        async setLocalPath() {
            let paths = await ipcRenderer.invoke('/tools/dialog', {
                options: {
                    title: 'Seleccionar',
                    properties: ['openFile']
                }
            });
            this.app.path = paths[0];
        },

        setURLPath() {
            this.$buefy.dialog.prompt({
                message: 'URL',
                inputAttrs: {
                    placeholder: 'Link'
                },
                trapFocus: true,
                onConfirm: value => (this.app.path = value)
            });
        },

        submit() {
            this.app.create_date = new Date();
            if (this.app.path.length === 0) {
                this.errorPath = 'El campo Dirección es obligatorio.';
                return;
            } else {
                this.errorPath = '';
            }

            this.createApp({ app: this.app }).then(() => {
                // Retorna el objeto creado en la base de datos
                this.$emit('close', { submited: true });
            });
        },

        cancel() {
            this.$emit('close', { submited: false });
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep {
    .section {
        padding-top: 24px;
        padding-bottom: 24px;
        box-shadow: inset 0 -20px 20px -20px #2b2a2a;
        min-width: 377.13px;
    }
    .section-drop {
        padding: 12px;
    }
    .dbox-form-modal {
        position: relative;
        max-height: 70vh;
        overflow: auto;
    }
    .dbox-icon-top-10 {
        padding-top: 10px;
    }
    .dbox-rounded-link {
        border-radius: 4px;
        padding: 6px 8px;
    }
    .footer-modal {
        display: flex;
        justify-content: flex-end;
        padding: 10px 20px;
        border-top: 1px solid #80808040;
    }

    ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: hsl(0, 0%, 29%);
        opacity: 1; /* Firefox */
    }

    ////////////
    .dbox-app-card {
        border: 1px solid #ffffff33;
        width: 110px;
        height: 146.67px;
        border-radius: 5px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
    }
    .dbox-app-card:hover {
        filter: brightness(110%);
    }
    .dbox-app-card:active {
        filter: brightness(120%);
    }
    .dbox-app-card__16by7 {
        width: 240px;
        height: 105px;
    }
    .dbox-app-card__square {
        width: 110px;
        height: 110px;
    }
    .control,
    .field,
    .taginput-container {
        max-width: 321px !important;
    }
}
</style>
