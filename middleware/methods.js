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
        //using pluckandreduce method to reduce the array of object to the loops' value
        // and assigning it as object key value
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

/**
 * @param {any} arrayTwoId 
 * @param {any[]} arrayOne 
 * @param {string} arrayOneKey
 * @return {number} hasID
 * this function is only an auxilary function to the below mergeArrays function
 */
function hasID (arrayTwoId, arrayOne, arrayOneKey) {

    // traversing the array to its entire length
    for (var i = 0; i < arrayOne.length; i++) {
        // chcking if the object's key's value is equal to the passed key's value
        if (_.isEqual(arrayOne[i][arrayOneKey], arrayTwoId)) {
            // if is the condition, returning the position of the key in the array of objects back
            return i;
        }
    }

    // if key not found in entire array of objects, returning negative value for unsuccess case
    return -1;

};

/**
 * @param {any[]} arrayOne 
 * @param {string} arrayOneKey 
 * @param {any[]} arrayTwo 
 * @param {string} arrayTwoKey
 * @return {any[]} mergeArrays
 */
function mergeArrays (arrayOne, arrayOneKey, arrayTwo, arrayTwoKey) {

    // traversing the array to its whol length
    for (var i = 0; i<arrayTwo.length; i++) {

        // finding the location of object in arrayOne whose key matches with the current iteration of second array of objects
        var idIndex = hasID(arrayTwo[i][arrayTwoKey], arrayOne, arrayOneKey);

        // checking if any such key is found
        if (idIndex >= 0) {

            // if key is found, merging the contents of object of secong array into the object of first array
            // var sometempvar = Object.assign({}, arrayOne[idIndex], arrayTwo[i]);
            _.merge(arrayOne[idIndex], arrayTwo[i]);
            // for (var key in arrayTwo[i]) {            
            //     Object.defineProperty(arrayOne[idIndex], key, {value: arrayTwo[i][key]});
            //     // arrayOne[idIndex][key] = arrayTwo[i][key];
            // }
    
            // newArray.push(sometempvar);
        } else {
            // if not found, pushing the object of array two into array one
            arrayOne.push(arrayTwo[i]);
        }
    
    }

    //returing arrayone back as this array now contains all the merged value, original array has been lost
    return arrayOne;
}

//exporting the methods here to be used in the routes
module.exports = {pluckAndReduce, specialMinifier, specialPAR, mergeArrays};