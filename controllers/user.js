var controller = {
  sayHi: function (req, res) {
    res.json({ message: 'hello there' });
  },
};

module.exports = controller;
