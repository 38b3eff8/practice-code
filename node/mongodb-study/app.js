const MongoClient = require('mongodb').MongoClient,
    assert = require("assert");

const url = "mongodb://zhouyifan.win:27017/test";

let insertDocuments = function (db, callback) {
    let collection = db.collection('documents');
    collection.insertMany([
        { a: 1 }, { a: 2 }, { a: 3 }
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 docuemnts into the collection");
        callback(result);
    });
}

let findDocuments = function (db, callback) {
    let collection = db.collection('documents');
    collection.find().toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following recoeds");
        console.log(docs);
        callback(docs);
    });
}

let updateDocument = function (db, callback) {
    let collection = db.collection('documents');
    collection.updateOne({ a: 2 }, { $set: { b: 1 } }, function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field a equal to 2");
        callback(result);
    });
}

let removeDocument = function (db, callback) {
    let collection = db.collection('documents');

    collection.deleteOne({ a: 3 }, function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the document with the field a equal to 3");
        callback(result);
    });
}

let getInsertPromise = function (db) {
    return new Promise(function (resolve, reject) {
        let collection = db.collection("documents");

        collection.insertMany([
            { a: 1 }, { a: 2 }, { a: 3 }
        ], function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log("Inserted 3 docuemnts into the collection");
                resolve(result);
            }
        });


    })
};

let getFindPromise = function (db) {
    return new Promise(function (resolve, reject) {
        let collection = db.collection("documents");

        collection.find().toArray(function (err, docs) {
            if (err) {
                reject(err);
            } else {
                console.log("Found the following recoeds");
                resolve(docs);
            }
        });
    });
}

let getUpdatePromise = function (db) {
    return new Promise(function (resolve, reject) {
        let collection = db.collection("documents");
        collection.updateOne({ a: 2 }, { $set: { b: 1 } }, function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log("Updated the document with the field a equal to 2");
                resolve(result);
            }
        });
    });
}

let getRemovePromise = function (db) {
    return new Promise(function (resolve, reject) {
        let collection = db.collection("documents");
        collection.deleteOne({ a: 3 }, function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log("Removed the document with the field a equal to 3");
                resolve(result);
            }
        });
    });
}

MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connect successfully to server");

    /*
    insertDocuments(db, function () {
        findDocuments(db, function () {
            updateDocument(db, function () {
                findDocuments(db, function () {
                    removeDocument(db, function () {
                        findDocuments(db, function () {
                            db.close();
                        });
                    });
                });
            });
        });
    });
    */

    let insertPromise = getInsertPromise(db);
    insertPromise.then(() => {
        return getFindPromise(db);
    }).then((docs) => {
        console.log(docs);
        return getUpdatePromise(db);
    }).then(() => {
        return getFindPromise(db);
    }).then((docs) => {
        console.log(docs);
        return getRemovePromise(db);
    }).then(() => {
        return getFindPromise(db);
    }).then((docs) => {
        console.log(docs);
        db.close();
    });
});