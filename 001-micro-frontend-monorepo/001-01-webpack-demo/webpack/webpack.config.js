/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');

// dotenv
const dotenv = require('dotenv');

module.exports = (args) => {
    const PRODUCT_MODE = args.env || 'dev';

    dotenv.config({
        path: './environment/.env',
    });

    console.log('✅ PRODUCT_MODE : ', PRODUCT_MODE, ', process.env.MODE : ', process.env.MODE);

    return merge(require('./webpack.common.js')(PRODUCT_MODE), require(`./webpack.${PRODUCT_MODE}.js`)());
};
