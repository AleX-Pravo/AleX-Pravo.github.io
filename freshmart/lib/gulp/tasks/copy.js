'use strict';

const gulp = require('gulp'),
    config = require('../config');

/**
 * Copy task
 * @return {Promise}
 */
gulp.task('copy', function() {
    // Promises array
    let promises = [];
    // Verify copies
    if (!('copy' in config) || !config.copy.length) {
        return Promise.resolve(true);
    }

    // Loop by copies
    for (let i = 0; i < config.copy.length; ++i) {
        promises.push(new Promise(function (resolve, reject) {
            gulp.src(config.copy[i].from).pipe(gulp.dest(config.copy[i].to))
                .on('end', function () {
                    config.log('From: ' + config.copy[i].from + '; To: ' + config.copy[i].to);
                    resolve(true);
                }).on('error', function() {
                    reject(false);
                });
        }));
    }

    return Promise.all(promises);
});
