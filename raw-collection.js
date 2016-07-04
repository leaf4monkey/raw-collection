// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See raw-collection-tests.js for an example of importing.
let {Mongo} = Package.mongo;
let c = new Mongo.Collection(Random.id());
let rawCollection = c.rawCollection();
let methods = [];
for (let i in rawCollection) {
    let o = rawCollection[i];
    _.isFunction(o) && methods.push(i);
}

let wrapAsync = (Meteor.wrapAsync) ? Meteor.wrapAsync : Meteor._wrapAsync;
let registeredMethods = [];
let register = function (method, rawMethod) {
    Mongo.Collection.prototype[method] = function (...args) {
        let coll = this.rawCollection();
        return wrapAsync(coll[rawMethod].bind(coll))(...args);
    }
};
methods.forEach(function (method) {
    if (Mongo.Collection.prototype[method]) {
        return;
    }
    registeredMethods.push(method);
    register(method, method);
});

console.log('registered methods:', registeredMethods, 'for Mongo.Collection.');

registerRawCollectionMethods = function (extensions = []) {
    if (!extensions || !extensions.length) {
        return;
    }
    extensions.forEach(function (method) {
        register('_' + method + '_', method);
    });
    console.log(`registered extension methods: ${extensions} for Mongo.Collection. \
    you can use these methods as "Collection._<method>_"\n`);
};