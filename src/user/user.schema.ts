import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  shortUrls: [{ shortUrl: String, originalUrl: String }],
});

export interface User extends mongoose.Document {
  email: string;
  password: string;
  shortUrls: Array<{ shortUrl: string; originalUrl: string }>;
}
