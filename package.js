Package.describe({
    name: 'leaf4monkey:raw-collection',
    version: '0.0.12',
    // Brief, one-line summary of the package.
    summary: 'expose some methods from mongo driver.',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/leaf4monkey/raw-collection.git',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('METEOR@1.2.1');
    api.use([
        'underscore',
        'random',
        'mongo'
    ], ['server']);
    api.addFiles('raw-collection.js', ['server']);
    api.export('registerRawCollectionMethods', ['server']);
});