const fs = require('fs')

module.exports = class Config {
    static settings;

    static init() {
        try {
            Config.settings = JSON.parse(fs.readFileSync(__dirname + '/../settings.json', 'utf-8'))
        } catch (err) {
            Config.reset();
            Config.save();
        }
    }

    static save() {
        fs.writeFileSync(__dirname + '/../settings.json', JSON.stringify(Config.settings, null, 2))
        Config.init()
    }
    static reset() {
        Config.settings = {
            "config": {
                "address": "",
                "port": 8080,
                "auth": {
                    "username": "",
                    "password": ""
                },
                "filters": [],
                "surround_year_with_parentheses": true,
                "format": "{title}{br}{h:m:s}/{h:m:s-length}"
            }
        }
    }
}