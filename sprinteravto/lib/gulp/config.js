'use strict';

// Require package and bundle helper
var pkg = require('../../package.json'),
    pngquant = require('imagemin-pngquant'),
    bundler = require('./helpers/bundler'),
    notifier = require('./helpers/notifier');

// Assigns main paths
var srcDir = './source/',
    prodDir = './prod/',
    devDir = './dev/',
    bowerDir = './bower/';

// Assign build dir
var buildDir = IS_DEV ? devDir : prodDir,
    minSuffix = IS_DEV ? '' : '.min';

var runTimestamp = Math.round(Date.now()/1000);

// Assigns assets paths
var assetsDirs = {
    js: 'assets/js/',
    css: 'assets/css/',
    img: 'assets/images/',
    fonts: 'assets/fonts/',
    html: 'html/'
};

// Assigns default actions
var defaultActions = {
    html: {
        pug: {
            pretty: '    ',
            data: {
                bowerDir: BOWER_DIR,
                minSuffix: minSuffix
            }
        },
        prettify: {
            'unformatted': ['pre', 'code']
        },
        //rigger: void(0),
        //lec: void(0),
    },
    css: {
        sass: {
            precision: 6
        },
        autoprefixer: {
            browsers: ['> 1%', 'last 2 versions'],
            cascade: false
        },
        compress: void(0),
    },
    js: {
        rigger: void(0),
        compress: void(0),
        // lint: {
        //     options: pkg.lintOptions,
        // }
    },
    img: {
        imagemin: {
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()],
            interlaced: true
        }
    }
};

if (IS_DEV) {
    delete defaultActions.css.compress;
    delete defaultActions.js.compress;
}

// Our bundles
var bundles = [
    {
        type: 'html',
        src: srcDir + assetsDirs.html,
        dest: buildDir,
        fileName: '*.pug',
        actions: void(0),
        options: {}
    },
    {
        type: 'css',
        src: srcDir + assetsDirs.css,
        dest: buildDir + assetsDirs.css,
        fileName: '*.scss',
        actions: void(0),
        include: [
            'normalize'
        ],
        options: {}
    },
    {
        type: 'js',
        src: srcDir + assetsDirs.js,
        dest: buildDir + assetsDirs.js,
        fileName: '**/*.js',
        actions: void(0),
        options: {}
    },
    {
        type: 'img',
        src: srcDir + assetsDirs.img,
        dest: buildDir + assetsDirs.img,
        fileName: '**/*.*',
        actions: void(0),
        options: {}
    },
    {
        type: 'img',
        src: srcDir + 'data/',
        dest: buildDir + 'data/',
        fileName: '**/*.*',
        actions: void(0),
        options: {}
    }
];

// Return config object
module.exports = {
    assets: assetsDirs,
    bundles: bundler(bundles, {
        srcDir: srcDir,
        buildDir: buildDir,
        assetsDirs: assetsDirs,
        defaultActions: defaultActions
    }),
    /**
     * Default clean directories
     */
    clean: [prodDir + '*', '!' + prodDir + '.gitignore', devDir + '*', '!' + devDir + '.gitignore', './tmp/*', '!./tmp/.gitignore'],
    /**
     * Default directories for copy
     */
    copy: [
        {
            from: srcDir + '*icon*',
            to: buildDir
        }
    ],
    /**
     * Main error object
     * @type {Object}
     */
    error: {
        /**
         * Show error function
         * @param {mixed} error
         * @return void
         */
        show: function (error) {
            // Show error in console
            console.log(error.toString());
            this.emit('end');
        }
    },
    /**
     * Main notifier
     */
    log: notifier,
    /**
     * Additional paths
     */
    paths: {
        srcDir: srcDir,
        buildDir: buildDir,
        actions: '../actions/',
        includes: '../includes/'
    },
    /**
     * Server config
     */
    server: {
        server: {
            baseDir: buildDir,
            routes: {
                '/bower': 'bower'
            }
        },
        host: 'localhost',
        port: 3900,
        logPrefix: 'Dev'
    },
    /**
     * Watch assets array
     */
    watchAssets: {
        js: [srcDir + 'assets/js/'],
        css: [srcDir + 'assets/css/'],
        img: [srcDir + 'assets/images/', srcDir + 'data/'],
        fonts: [srcDir + 'assets/fonts/'],
        html: [srcDir + 'html/']
    }
};
