exports.createCallCounter = function() {
    var countCallFn = function(func) {
        return function() {
            countCallFn.count++;
            return func.apply(this, arguments);
        };
    };

    countCallFn.count = 0;

    return countCallFn;
};