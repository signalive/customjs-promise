exports.promisify = function(instance, method) {
    return function(opt_options) {
        return new Promise(function(resolve, reject) {
            try {
                instance[method](resolve, reject, opt_options);
            } catch(err) {
                reject(err);
            }
        });
    };
}
