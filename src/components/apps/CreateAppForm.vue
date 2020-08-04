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
              placeholder="Añade el título de tu aplicación"
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

        <ValidationProvider
          v-slot="{ errors }"
          name="Portada"
          rules="required|image"
        >
          <b-field
            label="Portada"
            :message="errors[0]"
            type="is-danger"
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
              <b-upload
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
                      Drop your files here or click to upload
                    </p>
                  </div>
                </section>
              </b-upload>
            </div>
          </b-field>
        </ValidationProvider>

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
            <b-upload
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
                    Drop your files here or click to upload
                  </p>
                </div>
              </section>
            </b-upload>
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
            <b-upload
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
                    Drop your files here or click to upload
                  </p>
                </div>
              </section>
            </b-upload>
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
            console.log('this.app.tile', this.app.tile);
        },

        icon() {
            const pathNormalize = path.normalize(this.icon.path);
            this.app.icon = pathNormalize.split('\\').join('/');
            console.log('this.app.icon', this.app.icon);
        },

        background() {
            const pathNormalize = path.normalize(this.background.path);
            this.app.background = pathNormalize.split('\\').join('/');
            console.log('this.app.background', this.app.background);
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

            console.log('Se envia y nada más que', this.app);

            this.createApp({ app: this.app }).then(app => {
                // Retorna el objeto creado en la base de datos
                console.log('App created...', app);
            });
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
    .taginput-container {
        max-width: 321px !important;
    }
}
</style>
