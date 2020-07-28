import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: String,
  password: Number,
  name: String,
  salt: String,
  role: Number,
});