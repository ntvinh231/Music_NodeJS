import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  list_music: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Music'   
  }
]
});

const User = mongoose.model('User', userSchema);

export default User;