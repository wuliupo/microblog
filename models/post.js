var mongodb = require('./db');
var ObjectID = require('mongodb').BSONPure.ObjectID;
function Post (username, post, time, id) {
    this.user = username;
    this.post = post;
    this.time = time || new Date().toLocaleDateString();
    this.id = id || '';
}

module.exports = Post;

Post.prototype.save = function save(callback) {
    var post = {
        user: this.user,
        post: this.post,
        time: this.time
    };
    mongodb.open(function (err, db) {
        if(err){
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err){
                mongodb.close();
                return callback(err);
            }
            collection.ensureIndex('user');
            collection.insert(post, {safe: true}, function (err) {
				collection.findOne(post, function (err, doc) {
					mongodb.close();
					doc.id = doc._id;
					callback(err, doc);
				});
            });
        });
    });
};

Post.remove = function remove(id, callback) {
    mongodb.open(function (err, db) {
        if(err){
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err){
                mongodb.close();
                return callback(err);
            }
            collection.remove({'_id': new ObjectID(id)}, {safe: true}, function (err) {
                mongodb.close();
				console.log('remove post: ' + id);
                callback(err);
            });
        });
    });
};

Post.get = function get (username, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if (username) {
                query.user = username;
            }
            collection.find(query).sort({time: -1}).toArray(function (err, docs) {
                mongodb.close();

                if (err) {
                    callback(err, null);
                }
                var posts = [];
                docs.forEach(function (doc, index) {
                    var post = new Post(doc.user, doc.post, doc.time, doc._id);
                    posts.push(post);
                });
                callback(null, posts);
            });
        });
    });
};