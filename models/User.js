import { model, Schema } from 'mongoose'

const userSchema = new Schema({
    username: String,
    googleId: String
});

const User = model('user', userSchema);

export default User;