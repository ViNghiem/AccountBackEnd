const IndexControler = {
  getIndex: async (req, res) => {
    try {
      res.render('index',{title:'index'});

    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
}

module.exports = IndexControler ;









