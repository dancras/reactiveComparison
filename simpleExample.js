var ko = require('knockout'),
    lib = require('reactiveExperiment'),
    createCallCounter = require('./callCounter').createCallCounter;

(function() {

    var countCalls = createCallCounter(),
        a = ko.observable('foo'),
        b = ko.pureComputed(countCalls(function() {
            return a() + 'b';
        })),
        c = ko.pureComputed(countCalls(function() {
            return a() + b() + 'c';
        }));

    console.log('*** KNOCKOUT SUBSCRIBING ***');

    c.subscribe(function(value) {
        console.log('value =', value);
    });

    console.log('calls =', countCalls.count);
    countCalls.count = 0;

    console.log('*** KNOCKOUT UPDATING ***');

    a('bar');

    console.log('calls =', countCalls.count);

})();

(function() {

    var countCalls = createCallCounter(),
        a = lib.data('foo'),
        b = lib.junction(countCalls(function() {
            return a() + 'b';
        })),
        c = lib.junction(countCalls(function() {
            return a() + b() + 'c';
        }));

    console.log('*** EXPERIMENT UPDATING ***');

    c.watch(function(value) {
        console.log('value =', value);
    });

    console.log('calls =', countCalls.count);
    countCalls.count = 0;

    console.log('*** EXPERIMENT UPDATING ***');

    a('bar');

    console.log('calls =', countCalls.count);

})();