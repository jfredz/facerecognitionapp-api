const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "7ed021fb4a0b4796be2973483b8c959a"
});

const handleApi = (req, res) => {
  app.models
    .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("unable to work with API "));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("unable to get entries count"));
};

module.exports = {
  handleImage: handleImage,
  handleApi: handleApi
};