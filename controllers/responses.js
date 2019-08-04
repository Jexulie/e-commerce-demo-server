/**
 * handle responses properly
 */

module.exports = {
    /**
     * Todo Resp Format
     */
    createResponse: (res, statusCode, payload) => {
        return res.status(statusCode).json({data: payload})
    },

    createErrorResponse: (res, statusCode, errorMsg) => {
        return res.status(statusCode).json({error: errorMsg})
    }
}