# raw-collection
expose some methods from mongo driver.
## APIs
`registerRawCollectionMethods (extensions)`: register some raw collection methods on mongo driver, the methods' name will be `_<method>_`, for example:
```js
registerRawCollectionMethods (['insert']);
Coll = new Mongo.Collection('coll');
// then you can insert an array
Coll.insert([{_id: '0', key1: 'val1', key2: 'val2'}, {key1: 'val1', key2: 'val2'}]);
Coll.find().fetch(); // then you will get 2 entries.
// /* 1 */
// {
//     "_id" : ObjectId("5774e6527e175c9405153551"),
//     "key1" : "val1",
//     "key2" : "val2"
// }
//
// /* 2 */
// {
//     "_id" : "2",
//     "key1" : "val1",
//     "key2" : "val2"
// }
```