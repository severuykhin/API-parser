class KeyManager {

    constructor(config) {
        this.keys = config.keys.yandex.map(key => { key.empty = false; return key });
        this.activeKey = 0;
    }

    getActiveKey() {
        if (this.activeKey > this.keys.length - 1) {
            return false;
        } 
        return this.keys[this.activeKey].key;
    }

    changeActiveKey() {
        this.keys[this.activeKey].empty = true;
        this.activeKey += 1;
        return this.keys[this.activeKey];
    }

    isAllKeysExpired() {
        let keysExpired = this.keys.filter(key => key.empty === true);
        return this.getActiveKey() === false && keysExpired.length === this.keys.length;
    }

}

export default KeyManager;