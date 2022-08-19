const { query } = require("express");
const asyncHandler = require("express-async-handler");

const Person = require("../models/Person");

// @desc Get all users
// @route GET /users
// @access Private

const getAllSuggest = asyncHandler(async (req, res) => {
  
  try {
    /* 
    const listAutoCompletePersons = await Person.find(q)
      .select({ name: 1, surname: 1, _id: 1 })
      .limit(10)
      .exec();
      */
     
    const listAutoCompletePersons = await Person.find({
        $or: [
        {name: { $regex: new RegExp(".*" + req.params.search.toLowerCase() + ".*", "i") }},
        {surname: { $regex: new RegExp(".*" + req.params.search.toLowerCase() + ".*", "i") }},
        ],
    })
    .select({ name: 1, surname: 1, birthyear: 1, birthplace:1, _id: 1 })
    .limit(10)
    .exec();

    /* 
    const listAutoCompletePersons = await Person.find(
        {name: { $regex: new RegExp(".*" + req.params.search.toLowerCase() + ".*", "i") },
    })
    .select({ name: 1, surname: 1, birthyear: 1, birthplace:1, _id: 1 })
    .limit(10)
    .exec();
     */
    res.status(200).json(listAutoCompletePersons);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = {
  getAllSuggest,
};
