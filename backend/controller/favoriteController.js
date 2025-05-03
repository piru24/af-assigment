const Favorite = require('../model/Favorite');

exports.toggleFavorite = async (req, res) => {
  const { countryName } = req.body;
  const userId = req.user.userId; // Use userId from JWT payload

  try {
    const existing = await Favorite.findOne({ userId, countryName });
    if (existing) {
      await existing.deleteOne();
      return res.json({ isFavorite: false });
    } else {
      await Favorite.create({ userId, countryName });
      return res.json({ isFavorite: true });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFavorites = async (req, res) => {
  const userId = req.user.userId;
  try {
    const favorites = await Favorite.find({ userId });
    const countryNames = favorites.map(f => f.countryName);
    res.json(countryNames);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
