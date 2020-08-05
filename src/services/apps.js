import NeDBLib from '../lib/nedb';

export default class AppService {
    constructor() {
        this.db = new NeDBLib('apps');
    }

    async getApps() {
        console.log('getApps');
        const apps = await this.db.getAll({});
        return apps || [];
    }

    async getApp({ appId }) {
        console.log('getApp', appId);
        const app = await this.db.getOnce({ _id: appId });
        return app || {};
    }

    async createApp({ app }) {
        console.log('createApp', app);
        return await this.db.create(app);
    }

    async updateApp({ appId, app }) {
        console.log('updateApp', appId, app);
        return await this.db.update({ _id: appId }, app);
    }

    async deleteApp({ appId }) {
        console.log('deleteApp', appId);
        return await this.db.delete({ _id: appId });
    }
}
