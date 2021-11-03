const mongoose = require('mongoose');
const modelUser = mongoose.model('User');
const modelClass = mongoose.model('Class');

exports.mainView = function (req, res) {
  res.render('User')
};

exports.getList = async function (req, res) {
  let count = await modelUser.count()

  let usedItems = [], limit = req.query.limit || 20

  limit = count < limit ? count : limit;

  function getRandomNumber() {
    let n = Math.floor(Math.random() * count)
    if (usedItems.indexOf(n) === -1) {
      usedItems.push(n)
      return n
    } else {
      return getRandomNumber(count)
    }
  }

  async function randomUser() {
    const rand = getRandomNumber();
    const randomDoc = await modelUser.findOne().skip(rand);
    return randomDoc;
  };

  let results = []
  for (let i = 0; i < limit; i++) {
    results.push(await randomUser())
  }

  res.json(results)
};

exports.getInfos = function (req, res) {
  modelUser.findById(req.query.id, "-password", (err, result) => {
    res.json(result)
  })
};