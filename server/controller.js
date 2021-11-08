const data = require("./db.json");

module.exports = {
  getCompliments: (req, res) => {
    res.status(200).send(data);
  },

  deleteCompliment: (req, res) => {
    let index = data.findIndex(datas => datas.id === +req.params.id);

    data.splice(index, 1);

    res.status(200).send(data);
  },
  addQuote: (req, res) => {
    const { id, quote, favorite } = req.body;

    let newData = {
      id,
      quote,
      favorite
    };

    data.push(newData);
    res.status(200).send(data);
  },

  changeQuoteFavorite: (req, res) => {
    let index = data.findIndex(datas => datas.id === +req.params.id);
    data[index].favorite = !data[index].favorite;
    res.status(200).send(data);
  }
};
