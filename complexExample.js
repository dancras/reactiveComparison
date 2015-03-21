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
            return a() + 'c';
        })),
        d = ko.pureComputed(countCalls(function() {
            return b() + c() + 'd';
        })),
        e = ko.pureComputed(countCalls(function() {
            return a() + 'e';
        })),
        f = ko.pureComputed(countCalls(function() {
            return a() + 'f';
        })),
        g = ko.pureComputed(countCalls(function() {
            return e() + f() + 'g';
        })),
        h = ko.pureComputed(countCalls(function() {
            return c() + g() + d() + 'h';
        })),
        example = ko.pureComputed(countCalls(function() {
            return a() + h() + b() + f();
        }));

    console.log('*** KNOCKOUT SUBSCRIBING ***');

    example.subscribe(function(value) {
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
            return a() + 'c';
        })),
        d = lib.junction(countCalls(function() {
            return b() + c() + 'd';
        })),
        e = lib.junction(countCalls(function() {
            return a() + 'e';
        })),
        f = lib.junction(countCalls(function() {
            return a() + 'f';
        })),
        g = lib.junction(countCalls(function() {
            return e() + f() + 'g';
        })),
        h = lib.junction(countCalls(function() {
            return c() + g() + d() + 'h';
        })),
        example = lib.junction(countCalls(function() {
            return a() + h() + b() + f();
        }));

    console.log('*** EXPERIMENT UPDATING ***');

    example.watch(function(value) {
        console.log('value =', value);
    });

    console.log('calls =', countCalls.count);
    countCalls.count = 0;

    console.log('*** EXPERIMENT UPDATING ***');

    a('bar');

    console.log('calls =', countCalls.count);

})();