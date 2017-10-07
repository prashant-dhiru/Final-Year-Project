//importing required packages installed by npm
const _ = require('lodash');

/**
 * @param {any[]} collection
 * @param {String} factor
 * @return {Number} pluckAndReduce
 */
var pluckAndReduce = function (collection, factor) {
    //collection.map() reduces the array of object into a simple array with all value of the key passed
    //Similar to javascript pluck() method
    var pluckedArray = collection.map((collectionItem) => collectionItem[factor]);
    //lodash reduce method finds sum of all the values in the array.
    //the sum value is then divided by array length to find the average
    return ( _.reduce( pluckedArray, (total, n) => ( total + n ) ) / pluckedArray.length );
};

/**
 * @param {any[]} objArray 
 * @param {String[]} valueArray
 * @return {any} specialMinifier
 */
var specialMinifier = function (objArray, valueArray) {
    var obj = {};
    //looping through each value in valueArray passed
    valueArray.forEach((valueKey) => {
        //using pluckandreduce method to reduce the array of object to the loops' value and assigning it as
        //object key value
        obj[valueKey] = pluckAndReduce(objArray, valueKey);
    });
    //returning the object
    return obj;
};

/**
 * 
 * @param {any[]} collection
 * @param {String} baseOfReduction
 * @param {String[]} valueArray
 * @return {any[]} specialPAR
 */
var specialPAR = function (collection, baseOfReduction, valueArray) {
    
    //this method will sort the array of objects question
    //in the form of an object with each question as key, and array of objects as its value
    var arrangedObject = _.groupBy(collection, function(er) {return er[baseOfReduction]});
    
    var finalObj = {};
    
    //this loop will reduce array of objects into object for each key
    //each object will have then two keys, as used in function
    Object.keys(arrangedObject).forEach((questionArray) => {
        finalObj[questionArray] = specialMinifier(arrangedObject[questionArray], valueArray);
    });

    //returning the object
    return finalObj;
};

//exporting the methods here to be used in the routes
module.exports = {pluckAndReduce, specialMinifier, specialPAR};