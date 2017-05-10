import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  title: String,
  tags: String,
  content: String,
  cover_url: String,
}, {
  // referred to http://mongoosejs.com/docs/guide.html
  timestamps: {
    createdAt: 'created_at',
  },
  toJSON: {
    virtuals: true,
  },
});

// create model class
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
