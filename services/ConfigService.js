class ConfigService {
    static instance = new ConfigService();

    constructor() {
        this.cnf = require('../config.json');
    }

    get(key) {
        return this.cnf[key];
    }
}

module.exports = ConfigService;