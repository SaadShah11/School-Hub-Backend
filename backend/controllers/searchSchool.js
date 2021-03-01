

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
    let fee = req.body.filters.fee
    console.log("fee")
    console.log(fee)
    let distance = req.body.filters.distance
    console.log(distance)
    let schoolType = req.body.filters.schoolType;
    console.log(schoolType)
    let educationLevel = req.body.filters.educationLevel
    console.log(educationLevel)
    let educationType = req.body.filters.educationType
    console.log(educationType)

    const name = req.params.sName;
    console.log(name)
    let re = new RegExp(name);
    var query = { schoolName: re };

    if (schoolType != undefined) {
        //queryString=queryString+" "+schoolType
        query.schoolType = schoolType
    }
    if (educationLevel != undefined) {
        //queryString=queryString+" "+educationLevel
        query.educationLevel = educationLevel
    }
    if (educationType != undefined) {
        //queryString=queryString+" "+educationType
        query.educationType = educationType
    }

    console.log(query)
    const school = await School.find(query).exec(); //Converting this into a promise using .exec()
    console.log("Search Result")
    console.log(school)

    if (fee.min === undefined && fee.max === undefined) {
        console.log("if")
        return res.status(200).send(JSON.stringify(school))
    } else {
        console.log("else")
        let filteredSchools = []
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
        res.status(200).send(JSON.stringify(filteredSchools))
    }



}

const getAllSchool = async (req, res, next) => {

    //fee={min:0,max:5}
    let fee = req.body.fee
    //distance={min:0,max:5}
    let distance = req.body.distance
    let schoolType = req.body.schoolType;
    let educationLevel = req.body.educationLevel
    let educationType = req.body.educationType

    const name = req.params.sName;
    console.log(name)
    const school = await School.find().exec(); //Converting this into a promise using .exec()
    console.log("Empty Search Result")
    console.log(school)
    res.status(200).send(JSON.stringify(school))

}

const getAllSchools = async (req, res, next) => {
    const school = await School.find().exec(); //Converting this into a promise using .exec()
    console.log("Empty Search Result")
    console.log(school)
    res.status(200).send(JSON.stringify(school))
}


exports.getSchool = getSchool;
exports.getAllSchool = getAllSchool
exports.getAllSchools = getAllSchools
