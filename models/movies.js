const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {type: String, required: true},
    info: {type: String, required: true},
    length: {type: String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number, required: true},
    image: {type: String, required: true},
    genre: [],
    releaseDate: {type: String, required: true},
    createdDate: {type: Date}
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;

/**
 * TODO
 * Filter by price, rating, genre, releaseDate
 * Sorting
 * Pagination
 */

function getCount(query={}){
    return new Promise((resolve, reject) => {
        Movie.countDocuments(query)
            .then(movies => {
                resolve(movies)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}

module.exports.getMoviesModel = function(limit, page, offset, sortBy, field, filtering, filter, category){
    return new Promise((resolve, reject) => {
        /**
         *? we can seperate these as functions
         */
        if(filter != null && category != null){
            /**
             * for both
             */
        }else if(filter != null){
            /**
             * example price >= 20
             * release date <= 2011
             */
            filtering = '$'+filtering;
            let query = { field : { filtering: filter }};
            
            console.log(query)
            getCount(query)
                .then(count => {
                    if(offset > count){
                        reject('Wrong Page')
                    }
                    Movie.find(query).select({}).limit(limit).skip(offset).sort(sortBy)
                        .then(movies => {
                            resolve({
                                data: movies,
                                count,
                                page,
                                limit,
                                offset,
                                sortBy,
                                category,
                                field,
                                filtering,
                                filter
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            reject(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        }else if(category != null){
            let query = {'genre': category}
            getCount(query)
                .then(count => {
                    if(offset > count){
                        reject('Wrong Page')
                    }
                    Movie.find(query).select(field).limit(limit).skip(offset).sort(sortBy)
                        .then(movies => {
                            resolve({
                                data: movies,
                                count,
                                page,
                                limit,
                                offset,
                                sortBy,
                                category,
                                field,
                                filtering,
                                filter
                            })
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
                .catch(err => {
                    reject(err)
                })
        }else{
            getCount()
                .then(count => {
                    if(offset > count){
                        reject('Wrong Page')
                    }
                    Movie.find().select(field).limit(limit).skip(offset).sort(sortBy)
                        .then(movies => {
                            resolve({
                                data: movies,
                                count,
                                page,
                                limit,
                                offset,
                                sortBy,
                                category,
                                field,
                                filtering,
                                filter
                            })
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
                .catch(err => {
                    reject(err)
                })
        }
    })
}

module.exports.getMovieModel = function(movieID){
    return new Promise((resolve, reject) => {
        Movie.findOne({_id: movieID})
            .then(movies => {
                resolve(movies)
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports.addMovieModel = function(movieData){
    return new Promise((resolve, reject) => {
        let now = Date.now();
        movieData.createdDate = now;

        let newMovie = new Movie(movieData);
        newMovie.save()
            .then(movie => {
                resolve(movie)
            })  
            .catch(err => {
                reject(err)
            })
    })
}

module.exports.modifyMovieModel = function(movieID, modifiedData){
    return new Promise((resolve, reject) => {
        Movie.findByIdAndUpdate(movieID, modifiedData)
            .then(resp => {
                resolve(resp)
            })  
            .catch(err => {
                reject(err)
            })
    })
}

module.exports.updateMovieModel = function(movieID, updatedData){
    return new Promise((resolve, reject) => {
        Movie.findByIdAndUpdate(movieID, updatedData)
            .then(resp => {
                resolve(resp)
            })  
            .catch(err => {
                reject(err)
            })
    })
}

module.exports.removeMovieModel = function(movieID){
    return new Promise((resolve, reject) => {
        Movie.findByIdAndRemove(movieID)
            .then(resp => {
                resolve(resp)
            })  
            .catch(err => {
                reject(err)
            })
    })
}