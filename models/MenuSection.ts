import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
});

const subSectionSchema = new mongoose.Schema({
  section: { type: String, default: "" },
  items: [menuItemSchema],
});

const menuSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sections: [subSectionSchema],
}, {
  timestamps: true,
});

// Check if the model exists before creating a new one
export const MenuSection = mongoose.models.MenuSection || mongoose.model('MenuSection', menuSectionSchema);
