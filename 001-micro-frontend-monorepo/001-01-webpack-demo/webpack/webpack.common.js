/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

// micro frontend setting
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('../package.json').dependencies;

// default setting
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (PRODUCT_MODE) => {
    console.log(`🚀 PRODUCT_MODE : `, PRODUCT_MODE);

    // const remotesHostUrl = 'http://localhost:8000';
    // const remotesHostProfile = 'local';
    const isDev = PRODUCT_MODE !== 'prod';
    const remotesList = [];

    // const remotesList = [
    //     {
    //         key: 'AlertService',
    //         id: 'AlertServiceRemote',
    //         serviceName: 'alert-service',
    //     },
    // ];

    return {
        name: 'webpack-demo',
        entry: {
            app: ['./src/index.tsx'],
        },
        output: {
            filename: '[name].[hash].bundle.js',
            path: path.resolve('./dist'),
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_module/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                                plugins: [
                                    '@babel/plugin-proposal-class-properties',
                                    isDev && require.resolve('react-refresh/babel'),
                                ].filter(Boolean),
                            },
                        },
                        { loader: 'ts-loader', options: { transpileOnly: true } },
                    ],
                },
                {
                    test: /\.html$/,
                    use: [{ loader: 'html-loader', options: { minimize: true } }],
                },
                {
                    test: /\.(css|s[ac]ss)$/i,
                    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                    exclude: /\.module\.(css|s[ac]ss)$/i,
                },
                {
                    test: /\.module\.(css|s[ac]ss)$/i,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|jpeg|jpg|woff|woff2|eot|ttf|svg|gif)$/i,
                    use: [{ loader: 'url-loader', options: { limit: 1024000 } }, 'file-loader'],
                    exclude: /node_modules/,
                },
            ],
        },
        plugins: [
            new Dotenv({ path: path.resolve(__dirname, './../environment/.env') }), // new Dotenv(),
            new HtmlWebpackPlugin({ template: 'public/index.html' }),
            isDev && new RefreshWebpackPlugin(),
            new ForkTsCheckerWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css',
            }),
            new ModuleFederationPlugin({
                name: 'OnBoardingServiceRemote',
                filename: 'remoteEntry.js',
                remotes: remotesList.map((remote) => {
                    return {
                        // [remote.key]: `${remote.id}@${remotesHostUrl}/${remotesHostProfile}/${remote.serviceName}/remoteEntry.js`,
                        [remote.key]: `${remote.id}@http://localhost:8000/local/${remote.serviceName}/remoteEntry.js`,
                    };
                }),
                // remotes: [{ a: `a@@http://localhost:8000/local/${remote.serviceName}/remoteEntry.js` }],
                exposes: {
                    './Routes': './src/CustomRouter',
                },
                shared: {
                    react: { requiredVersion: deps.react, singleton: true, eager: true },
                    'react-dom': { requiredVersion: deps['react-dom'], singleton: true, eager: true },
                    'react-router-dom': { requiredVersion: deps['react-router-dom'], singleton: true, eager: true },
                },
            }),
        ].filter(Boolean),
    };
};
