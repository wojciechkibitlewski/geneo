const asyncHandler = require('express-async-handler');

const Person = require('../models/Person');

// @desc Get all users
// @route GET /users
// @access Private

const getAllSuggest = asyncHandler( async(req,res) => {
    const { search } = req.params;
    
})



module.exports = {
    getAllSuggest
}