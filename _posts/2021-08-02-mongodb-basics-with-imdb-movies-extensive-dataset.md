---
title: MongoDB Basics with IMDb movies extensive dataset
date: 2021-08-02 14:00:00 +0000
tags:
- 'MongoDB '
description: 'Learn how to set up your database and start exploring different ways
  to search, create, and analyze your data with MongoDB Compass. '
image: ''

---
### Connecting to MongoDB Using Compass

1. Please download Compass from the MongoDB Download Center. If you downloaded Compass before today, please make sure you are using version 1.8 or later and upgrade if necessary.
2. Install Compass on your computer from the download.
3. Launch Compass.

   When Compass opens you will see a page titled “Connect to Host”.

### Content

The movies dataset includes 85,855 movies with attributes such as movie description, average rating, number of votes, genre, etc.

The rating dataset includes 85,855 rating details from a demographic perspective.

The names dataset includes 297,705 cast members with personal attributes such as birth details, death details, height, spouses, children, etc.

The title principals dataset includes 835,513 cast members roles in movies with attributes such as IMDb title id, IMDb name id, order of importance in the movie, role, and characters played.

Download the IMDB movies data (CSV format) from the following website: [https://www.kaggle.com/stefanoleone992/imdb-extensive-dataset](https://www.kaggle.com/stefanoleone992/imdb-extensive-dataset "https://www.kaggle.com/stefanoleone992/imdb-extensive-dataset")

## Commands

`show dbs` -> show databases residing in a cluster.

`use video` -> switching to another database (with name `video`).

`show collections` -> command for displaying collections in a database.

`db` -> refers to the current referred database.

`db.movies.find().pretty()` -> seeing documents that are there in the `movies` collection of `video` database.

`db.movies.find().count()` -> count the number of documents in the `movies` collection of `video` database.

The Atlas clusters we’ve looked at are replica sets. Replica sets are designed so that if the primary node goes down, one of the other nodes will step up to take its place so that clients can continue reading and writing data as if nothing had happened. The mongo shell is one such client.

To begin creating your Atlas Sandbox cluster, visit [register for atlas](https://cloud.mongodb.com/links/registerForAtlas) and complete the account creation form you see on that page.

## Connecting to our Atlas sandbox cluster from the Mongo shell

`mongo "mongodb://sandbox-shard-00-00-2xiao.mongodb.net:27017,sandbox-shard-00-01-2xiao.mongodb.net:27017,sandbox-shard-00-02-2xiao.mongodb.net:27017/test?replicaSet=Sandbox-shard-0" --ssl --authenticationDatabase admin --username your-username --password your-password`

## Loading data (.js file) into your sandbox cluster

1. cd M001 (in your home directory which contains the .js file)
2. Run the MongoDB shell:

   `mongo "mongodb://sandbox-shard-00-00-2xiao.mongodb.net:27017,sandbox-shard-00-01-2xiao.mongodb.net:27017,sandbox-shard-00-02-2xiao.mongodb.net:27017/video?replicaSet=Sandbox-shard-0" --ssl --authenticationDatabase admin --username your-username --password your-password`

   `video` is the db that you are loading your collections into. We can change to some other db as well.
3. Once connected to sandbox cluster run `load("loadMovieDataSet.js")`

## Connecting to our Atlas sandbox cluster from Compass

1. Go to Compass -> Connect to host
2. In the [cloud.mongodb.com](https://cloud.mongodb.com/)

   a.) Select the sandbox cluster `Sandbox` -> Select `Primary` node and copy the Url `sandbox-shard-00-00-2xiao.mongodb.net` and paste in the hostname field of a compass.

   b.) In the authentication phase -> select `username/ password system` and provide the `username -> your-username` and `password -> your-password`

   c.) Add Favorite name `M001 Sandbox`. Click Connect

## Inserting Documents from MongoDB Shell

`use video`

`show collections`

## One document at a time

Without _id (default id is supplied)

`db.moviesScratch.insertOne({title:"Star Trek II: The Wrath of Khan", year:1982, imdb:"tt0084726"})`

With _id

`db.moviesScratch.insertOne({_id:"tt0084726", title:"Star Trek II: The Wrath of Khan", year:1982, imdb:"tt0084726"})`

## Many documents at a time

    //Ordered
    
    db.moviesScratch.insertMany(
    [
    {
    "_id" : "tt0084726",
    "title" : "Star Trek II: The Wrath of Khan",
    "year" : 1982,
    "type" : "movie"
    },
    {
    "_id" : "tt0796366",
    "title" : "Star Trek",
    "year" : 2009,
    "type" : "movie"
    },
    {
    "_id" : "tt0084726",
    "title" : "Star Trek II: The Wrath of Khan",
    "year" : 1982,
    "type" : "movie"
    },
    {
    "_id" : "tt1408101",
    "title" : "Star Trek Into Darkness",
    "year" : 2013,
    "type" : "movie"
    },
    {
    "_id" : "tt0117731",
    "title" : "Star Trek: First Contact",
    "year" : 1996,
    "type" : "movie"
    }
    ]
    );
    

    //Unordered
    
    db.moviesScratch.insertMany(
    [
    {
    "_id" : "tt0084726",
    "title" : "Star Trek II: The Wrath of Khan",
    "year" : 1982,
    "type" : "movie"
    },
    {
    "_id" : "tt0796366",
    "title" : "Star Trek",
    "year" : 2009,
    "type" : "movie"
    },
    {
    "_id" : "tt0084726",
    "title" : "Star Trek II: The Wrath of Khan",
    "year" : 1982,
    "type" : "movie"
    },
    {
    "_id" : "tt1408101",
    "title" : "Star Trek Into Darkness",
    "year" : 2013,
    "type" : "movie"
    },
    {
    "_id" : "tt0117731",
    "title" : "Star Trek: First Contact",
    "year" : 1996,
    "type" : "movie"
    }
    ],
    {
    "ordered": false 
    }
    );
    

## Filtering with queries

**In compass**

`{$and:[{"awards.wins":2},{"awards.nominations":2}]}`

**In MongoDB command shell**

`db.movieDetails.find({$and:[{"awards.wins":2},{"awards.nominations":2}]}).count()`

`db.movies.find({cast:["Jeff Bridges", "Tim Robbins"]}).pretty()`

`db.movieDetails.find({genres: 'Family'}).count()`

`db.movieDetails.find({"genres.1": 'Western'}).count()`

## Cursors

The `find()` the method returns a cursor. A cursor is essentially a pointer to the current location in a result set. For queries that return more than just a few documents, MongoDB will return the results in batches to our client (Mongo Shell). We use the cursor in our client to iterate through the results.

## Projections

Projections reduce the network overhead and processing requirements by limiting the fields that are returned in the resulting documents. In the query, projection is added as the second argument to `find()` method.

**Example:**

`db.movies.find({genre:"Action, Adventure"}, {title: 1})`

`_id` the field is returned as well by default and you can exclude it by supplying `_id:0` as follows `db.movies.find({genre:"Action, Adventure"}, {title: 1, _id: 0})`

If we want to exclude a couple of fields then we need to type as: `db.movies.find({genre:"Action, Adventure"}, {viewerRating: 0, viewerVotes: 0, runtime: 0, _id: 0})`

## Updating documents

    db.movieDetails.updateOne({
    title: "The Martian"
    },{
    $set:{
    poster: ""    
    }
    })
    

    db.movieDetails.updateOne({
    title: "The Martian"
    },{
    $set:{
    "awards": {
    "wins": 8,
    "nominations": 14,
    "text": "Nominated for 3 Golden Globes. Another 8 wins and 14 nominations."
    }    
    }
    });
    

`$set` replaces the value of the field with the specified value.

The difference between updateOne and updateMany is that updateMany will make the same modification to all documents that match the filter.

    db.movieDetails.updateMany({
    rated: null
    },{
    $unset:{
    rated: ""    
    }
    })
    

We can insert while doing the update step as shown in the below example.

    db.movieDetails.updateOne({
    "imdb.id": detail.imdb.id
    },{
    $set: detail
    },{
    upsert: true
    });
    

Upsert updates the documents matching the filter. If there are none, insert the update document as the new document in the collection.

    db.movieDetails.replaceOne({
    "imdb.id": detail.imdb.id
    },
    detailDoc
    );
    

## QUERY OPERATORS

`db.movieDetails.find({runtime: {$gt: 90}})`

`db.movieDetails.find({runtime: {$gt: 90}}, {_id: 0, title: 1, runtime: 1})`

`db.movieDetails.find({runtime: {$gt: 90, $lt: 120}}, {_id: 0, title: 1, runtime: 1})`

`db.movieDetails.find({runtime: {$gte: 90, $lte: 120}}, {_id: 0, title: 1, runtime: 1})`

`db.movieDetails.find({runtime: {$gte: 180}, "tomato.meter": 100}, {_id: 0, title: 1, runtime: 1})`

`db.movieDetails.find({rated: {$ne: "UNRATED"}}, {_id: 0, title: 1, rated: 1})`

`db.movieDetails.find({rated: {$in: ["G", "PG"]}}, {_id: 0, title: 1, rated: 1})`

`db.movieDetails.find({rated: {$in: ["G", "PG", "PG-13"]}}, {_id: 0, title: 1, rated: 1}).pretty()`

`db.movieDetails.find({rated: {$in: ["R", "PG-13"]}}, {_id: 0, title: 1, rated: 1}).pretty()`

## COMPARISON OPERATORS

`db.movies.find({cast: {$in: ["Jack Nicholson", "John Huston"]}, viewerRating: {$gt: 7}, mpaaRating: "R"}).count()`

**Note:** The above post is in reference to material related to M001-Basics course offered by MongoDB University.

### Reference

[Learn MongoDB from MongoDB - M001: MongoDB Basics](https://university.mongodb.com/courses/M001/about)