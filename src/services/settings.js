import setting from '../lib/setting';

export default class SettingService {
    constructor() {
        this.setting = setting;
    }

    setFirstTime() {
        if (!this.setting.has('firstTime')) {
            this.setting.set({
                firstTime: {
                    home: true,
                    appDeatil: true,
                    box: true
                }
            });
        }
    }

    hasSetting(key) {
        return this.setting.has(key);
    }
    /**
     * 
     * @param {string} key key
     * @param {any} defaulValue dedault value
     * @returns {any}
     */
    getSetting(key, defaulValue) {
        return this.setting.get(key, defaulValue);
    }

    setSetting(key, value) {
        if (typeof key === 'object') return this.setting.set(key);
        return this.setting.set(key, value);
    }
}
