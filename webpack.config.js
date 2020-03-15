const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    entry: entrySettings([
        './my-vue-router/src/index',
        './my-vuex/src/index'
    ]),
    output: {
        filename: '[name].js',
        path: __dirname
    },
    module: {
        rules: [
            // ... 其它规则
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        // 请确保引入这个插件！
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.js', '.vue']
    }
}

function entrySettings(entrys) {
    const settings = {};
    entrys.forEach(item => {
        settings[item.replace('src', 'dist').slice(2)] = item;
    });
    return settings;
}