import mongoose from 'mongoose';

const { Schema } = mongoose;

const musicSchema = new Schema({
    name: {
      type: String,
    },
    author: {
      type: String,
    },
    url: {
      type: String,
    },
    links: {
      images: [
        {
          url: {
            type: String,
          }
        }
      ]
    }
  });
  
  const Music = mongoose.model('Music', musicSchema);

export default Music;