const fs = require('fs');
const dir = __dirname + '/providers/';
const files = fs.readdirSync(dir).map(c => ({ [c]: require(dir + c) }));
const providers = Object.assign(...files);

module.exports = {
    configure: ({ providerName }) => {
        if (!providerName)
            throw new Error('missing provider name');

        const provider = providers[`${providerName}.js`];
        if (!provider)
            throw new Error(`provider "${providerName}" not exist`);

        return new provider();
    }
}