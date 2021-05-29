

// var MongoClient = require('mongodb').MongoClient;
// var url = "'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/school?retryWrites=true&w=majority'";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var query = { schoolName: name };
//   console.log("DBO")
//   console.log(dbo)
//   dbo.collection.find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

const mongoose = require('mongoose');
const geolib = require('geolib');

const School = require('../models/school');
//const HttpError = require('../models/http-error');
//const { json } = require('body-parser');

mongoose.connect(
    'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/school?retryWrites=true&w=majority'
).then(() => {
    console.log("DB connected")
}).catch(() => {
    console.log('Error occured, DB connection failed ')
})

const getSchool = async (req, res, next) => {

    //fee={min:0,max:5}
    let fee = req.body.fee
    console.log("fee")
    console.log(fee)
    let distance = req.body.distance
    //distance = distance * 1000
    console.log(distance)
    let schoolType = req.body.schoolType;
    console.log(schoolType)
    let educationLevel = req.body.educationLevel
    console.log(educationLevel)
    let educationType = req.body.educationType
    console.log(educationType)

    let currentLocation = req.body.currentLocation
    console.log("current Location")
    console.log(currentLocation)

    let newSchools;

    const name = req.params.sName;
    console.log(name)
    //var res = name.toLowerCase();
    //let re = new RegExp(name);
    //let re = `/{name}/i`;
    let re = new RegExp(name, "i");
    let query;
    if (name == undefined) {
        query = {}
    } else {
        query = { schoolName: re };
    }


    if (schoolType != undefined) {
        //queryString=queryString+" "+schoolType
        query.schoolType = schoolType
    }
    if (educationLevel != undefined) {
        //queryString=queryString+" "+educationLevel
        // query.educationLevel = educationLevel
    }
    if (educationType != undefined) {
        //queryString=queryString+" "+educationType
        query.educationType = educationType
    }

    console.log(query)
    const school = await School.find(query).exec(); //Converting this into a promise using .exec()
    console.log("Search Result")
    console.log(school)

    //-----------------------Distance--------------------------------
    let withinRadius = (newLatitude, newLongitude) => {
        return geolib.isPointWithinRadius(
            { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
            { latitude: newLatitude, longitude: newLongitude },
            distance * 1000
        );
    }

    let schoolsWithinRadius = (schools) => {
        let newSchools = []
        schools.map((i) => {
            if (withinRadius(i.schoolCoordinates.latitude, i.schoolCoordinates.longitude)) {
                newSchools.push(i)
            }
        })
        console.log("new Schools")
        console.log(newSchools)
        return newSchools
    }

    if (distance !== undefined) {
        newSchools = schoolsWithinRadius(school)
    } else {
        console.log("Distance is undefined")
    }

    //------------------------Fee------------------------------------
    if (fee.min === undefined && fee.max === undefined) {
        if (distance === undefined) {
            return res.status(200).send(JSON.stringify(school))
        } else {
            return res.status(200).send(JSON.stringify(newSchools))
        }
    } else {
        console.log("else")
        let filteredSchools = []

        if (distance === undefined) {
            let filterSchools = school.map((i) => {
                console.log("Min Max")
                console.log(fee.min)
                console.log(fee.max)
                console.log("Values")
                console.log(i.schoolName)
                console.log(i.feeStructure[0].tutionFee)
                if (i.feeStructure[0].tutionFee >= fee.min && i.feeStructure[0].tutionFee <= fee.max) {
                    console.log("inside If If")
                    filteredSchools.push(i)
                }
            })
            console.log("Filtered Schools")
            console.log(filteredSchools)

        } else {
            let filterSchools = newSchools.map((i) => {
                console.log("Min Max")
                console.log(fee.min)
                console.log(fee.max)
                console.log("Values")
                console.log(i.schoolName)
                console.log(i.feeStructure[0].tutionFee)
                if (i.feeStructure[0].tutionFee >= fee.min && i.feeStructure[0].tutionFee <= fee.max) {
                    console.log("inside If If")
                    filteredSchools.push(i)
                }
            })
            console.log("Filtered Schools")
            console.log(filteredSchools)

        }
        return res.status(200).send(JSON.stringify(filteredSchools))


    }
}


const getAllSchools = async (req, res, next) => {
    const school = await School.find().exec(); //Converting this into a promise using .exec()
    console.log("Empty Search Result")
    // console.log(school)
    res.status(200).send(JSON.stringify(school))
}

const getSpecificSchool = async (req, res, next) => {
    console.log("Inside getSpecificSchool")
    const id = req.params.sid;
    console.log(id)

    var query = { _id: id };
    console.log(query)
    const school = await School.find(query).exec(); //Converting this into a promise using .exec()
    return res.status(200).send(JSON.stringify(school))
}

exports.getSpecificSchool = getSpecificSchool;
exports.getSchool = getSchool;
exports.getAllSchools = getAllSchools
