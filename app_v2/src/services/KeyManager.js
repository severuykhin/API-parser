class KeyManager {

    constructor(config) {
        this.keys = config.keys.yandex;
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
    }

}

export default KeyManager;