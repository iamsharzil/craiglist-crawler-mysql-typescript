import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  title: String,
  datePosted: String,
  neighbourhood: String,
  url: String,
  jobDescription: String,
  compensation: String
});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
// module.exports = Listing;
