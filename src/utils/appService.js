const { shell } = require('electron');
import UpdateAppForm from '@/components/apps/UpdateAppForm.vue';

/**
 * Servicio que da los métodos comunes para las apps.
 * 
 * NOTA: El `this` que se usa en estos métodos son del componente desde el cual
 * se llama, por lo tanto objetos del store como `this.app` no van a existir
 * (darán `undefined`) a menos que ya existan en el componente padre.
 */
const appService = {
  async openApp() {
    this.$buefy.notification.open({
      message: '¡Abriendo!',
      type: 'is-black'
    });
    await shell.openExternal(this.app.path);
    this.app.numLaunch++;
    if (this.app.firstLaunchDate === null) {
      this.app.firstLaunchDate = new Date();
    }
    this.app.lastLaunchDate = new Date();
    this.updateApp({ appId: this.app._id, app: this.app });
  },

  updateAppDetail() {
    this.$buefy.modal.open({
      parent: this,
      component: UpdateAppForm,
      hasModalCard: true,
      customClass: 'acrylic__modal',
      trapFocus: true,
      events: {
        close: args => {
          const { submited } = args;
          if (submited === true) {
            this.getApps();
            this.$buefy.notification.open({
              message: 'App actualizada',
              type: 'is-success'
            });
          }
        }
      }
    });
  },

  removeAppDetail() {
    this.$buefy.dialog.confirm({
      title: `Borrando "${this.app.title}"`,
      message: `Estas apunto de borrar "${this.app.title}". </ br> ¿Estás seguro?`,
      confirmText: 'Borrar',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: () =>
        this.deleteApp({ appId: this.app._id }).then(() => {
          this.$router.push({ name: 'Home' });
        })
    });
  },

  deleteAppFromBox() {
    this.$buefy.dialog.confirm({
      title: `Borrando "${this.app.title}"`,
      message: `Estas apunto de borrar "${this.app.title}" de <b>${this.box.title}</b>.<br> ¿Estás seguro?`,
      confirmText: 'Borrar',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: async () => {
        const box = this.box;
        box.apps = box.apps.filter(appId => appId !== this.app._id);
        box.modifiedDate = new Date();
        await this.updateBox({ boxId: box._id, box });
        await this.getAppsById({ appsId: box.apps });
        this.$buefy.dialog.confirm({
          title: `Éxito`,
          message: `${this.app.title} se elimino de ${this.box.title}`,
          confirmText: 'Ok',
          type: 'is-success',
          hasIcon: true,
        })
      }
    });
  }
};

export default appService;
