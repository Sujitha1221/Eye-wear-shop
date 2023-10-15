import Rating from "../models/rating.model.mjs";

const ratingController = {
  addRating: async (req, res) => {
    try {
      const rating = new Rating(req.body);
      await rating.save();
      res.status(201).json(rating);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Retrieve ratings for a specific product
  getRatingsByProductId: async (req, res) => {
    try {
      const ratings = await Rating.find({ product: req.params.productId });
      res.json(ratings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a rating by ID
  updateRatingById: async (req, res) => {
    try {
      const updatedRating = await Rating.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedRating) {
        return res.status(404).json({ error: "Rating not found" });
      }
      res.json(updatedRating);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a rating by ID
  deleteRatingById: async (req, res) => {
    try {
      const deletedRating = await Rating.findByIdAndRemove(req.params.id);
      if (!deletedRating) {
        return res.status(404).json({ error: "Rating not found" });
      }
      res.json(deletedRating);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get ratings by user
  getRatingsByUserId: async (req, res) => {
    try {
      const ratings = await Rating.find({ user: req.params.userId });
      res.json(ratings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all ratings
  getAllRatings: async (req, res) => {
    try {
      const ratings = await Rating.find({});
      res.json(ratings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get ratings by user ID and product ID
  getRatingsByUserIdAndProductId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;

      const ratings = await Rating.find({ user: userId, product: productId });

      res.json(ratings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};

export default ratingController;
