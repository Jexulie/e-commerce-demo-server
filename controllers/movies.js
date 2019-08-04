const Movie = require('../models/movies');
const { createErrorResponse, createResponse } = require('./responses');

module.exports = {
    getMovies: function(req, res){
        let limit = req.query.limit || 2;
        let page = req.query.page || 0;
        let offset = req.query.offset || limit * page;
        let filter = req.query.filter || null;
        let filtering = req.query.filtering || null;
        let sort = req.query.sort || 'releaseDate';
        let sorting = req.query.sorting || 'asc';
        let field = req.query.field || {};
        let category = req.query.category || null;

        /**
         * Filtering Options Control
         * gte, gt, lte, lt, eq
         */
        const filteringOps = [
            'gte', 'gt', 'lte', 'lt', 'eq'
        ]
        if(filtering != null && !filteringOps.includes(filtering)){
            return createErrorResponse(res, 404, 'Filtering option is not supported');
        }

        if(sorting === 'desc'){
            sort = '-'+sort;
        }

        Movie.getMoviesModel(
            parseInt(limit), 
            parseInt(page), 
            parseInt(offset), 
            sort, 
            field, 
            filtering, 
            parseInt(filter), 
            category)
                .then(resp => {
                    // special response for page, offset, limit 
                    return res.status(200).json(resp);
                })
                .catch(err => {
                    return createErrorResponse(res, 404, err);
                })
        // pagination, filtering
        // for showing return name-image-price ? few info
    },

    getMovie: function(req, res){
        let id = req.params.id;
        if(!id){
            return createErrorResponse(res, 400, 'Parameter Not Provided')
        }
        Movie.getMovieModel(id)
            .then(resp => {
                return createResponse(res, 200, resp);
            })
            .catch(err => {
                return createErrorResponse(res, 404, err);
            })
    },

    addMovie: function(req, res){
        let body = req.body;
        if(body.title && body.info && body.length && body.price &&
            body.rating && body.image && body.genre && body.releaseDate){
            let movieData = {
                title: body.title,
                info: body.info,
                length: body.length,
                price: body.price,
                rating: body.rating,
                image: body.image,
                genre: body.genre,
                releaseDate: body.releaseDate,
            }

            Movie.addMovieModel(movieData)
                .then(resp => {
                    return createResponse(res, 201, resp);
                })
                .catch(err => {
                    let errorInfo = {
                        msg: 'mongoose Error',
                        original: err.errmsg
                    }

                    if(err.code === 11000){
                        errorInfo = {
                            msg: 'Duplicate Entry',
                            original: err.errmsg
                        }
                    }

                    return createErrorResponse(res, 400, errorInfo);
                })
        }else{
            return createErrorResponse(res, 400, 'Not All Parameters Provided')
        }
    },

    modifyMovie: function(req, res){
        let id = req.params.id;
        if(!id){
            return createErrorResponse(res, 400, 'Parameter Not Provided')
        }
        let body = req.body;
        if(!body){
            return createErrorResponse(res, 400, 'Parameter Not Provided')
        }
        Movie.modifyMovieModel(id, body)
            .then(resp => {
                return createResponse(res, 204, null);
            })
            .catch(err => {
                return createErrorResponse(res, 404, err);
            })
    },

    updateMovie: function(req, res){
        let id = req.params.id;
        if(!id){
            return createErrorResponse(res, 400, 'Parameter Not Provided')
        }
        let body = req.body;
        if(!body){
            return createErrorResponse(res, 400, 'Parameter Not Provided')
        }
        Movie.updateMovieModel(id, body)
            .then(resp => {
                return createResponse(res, 204, null);
            })
            .catch(err => {
                return createErrorResponse(res, 404, err);
            })
    },

    removeMovie: function(req, res){
        let id = req.params.id;
        if(!id){
            return createErrorResponse(res, 400, 'Parameter Not Provided')
        }
        Movie.removeMovieModel(id)
            .then(resp => {
                return createResponse(res, 204, null);
            })
            .catch(err => {
                return createErrorResponse(res, 404, err);
            })
    },
}