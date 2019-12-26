const Tags = require('../models/tags');

exports.getTags = (req, res) => {
    const tags = Tags.find()
        .then((tags) => {
            res.json(tags);
        })

        .catch(err => console.log(err));
  };


  exports.putTags = (newtags) => {
        const tags = Tags.find({tagName: newTags})
        console.log(tags)
  };