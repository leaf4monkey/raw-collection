// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See raw-collection-tests.js for an example of importing.
var wrapAsync = (Meteor.wrapAsync) ? Meteor.wrapAsync : Meteor._wrapAsync;
var register = function (method, rawMethod) {
    Mongo.Collection.prototype[method] = function () {
        var coll = this.rawCollection();
        return wrapAsync(coll[rawMethod].bind(coll)).apply(coll, arguments);
    };
};

(function () {
    if (Meteor.isClient) {
        return;
    }
    var c = new Mongo.Collection(Random.id());
    var rawCollection = c.rawCollection();
    var methods = [];
    for (var i in rawCollection) {
        var o = rawCollection[i];
        _.isFunction(o) && methods.push(i);
    }

    var registeredMethods = [];
    methods.forEach(function (method) {
        if (Mongo.Collection.prototype[method]) {
            return;
        }
        registeredMethods.push(method);
        register(method, method);
    });

    console.log('registered methods:', registeredMethods, 'for Mongo.Collection.');
}());

registerRawCollectionMethods = Meteor.isServer && function (extensions) {
    if (!extensions || !extensions.length) {
        return;
    }
    extensions.forEach(function (method) {
        register('_' + method + '_', method);
    });
    console.log('Registered extension methods:',
        extensions,
        'for Mongo.Collection. You can use these methods as "Collection._<method>_"\n');
};