const mongoose = require('mongoose');
const modelUser = mongoose.model('User');
const modelClass = mongoose.model('Class');

exports.mainView = (req, res) => {
    res.render('Search')
}

exports.listTeachers = async (req, res) => {
    try {
        let search = req.query.text

        let searchResult = await modelUser.find({username: {$regex: search, $options: "si"}}, "-password").exec()

        res.send(searchResult)
    } catch (err) {
        console.log(err)
        res.send('erro')
    }
};


exports.listClass = async (req, res) => {
    try {
        let search = req.query.text

        let searchResult = await modelClass.find().exec()

        res.send(searchResult)
    } catch (err) {
        console.log(err)
        res.send('erro')
    }
}

exports.adminView = function (req, res) {
    res.render('Admin')
};

exports.deleteVal = async (req, res) => {
    try {
        let model = type = req.query.type == 'teacher' ? modelUser : modelClass;

        let searchResult = await model.findByIdAndDelete(req.query.val).exec()

        res.send({success: searchResult ? true : false})
            
    } catch (err) {
        console.log(err)
        res.send({success: false})
    }
}

exports.addClass = async (req, res) => {
    try {
        let newClass = new modelClass({
            label: req.query.val
        });

        newClass.save()
          .then(() => res.send({success: true}))
          .catch((err) => res.send({ success: false, message: err, statusCode: 500}));
            
    } catch (err) {
        console.log(err)
        res.send({success: false})
    }
}

exports.getTeacherByClass = async (req, res) => {
    let typeClass = req.query.class

    let responseDBMain = await modelUser.find({mainClass: typeClass}).exec()
    let responseDBSecond = await modelUser.find({secondClass: typeClass}).exec()

    let finalResponse = responseDBMain.concat(responseDBSecond)

    console.log(responseDBMain)
    console.log('---------------------')
    console.log(responseDBSecond)

    res.send(finalResponse)
}