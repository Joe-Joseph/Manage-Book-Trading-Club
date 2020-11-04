import { model, Schema } from 'mongoose'

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    city: String,
    state: String,
    address: String
});

const User = model('user', userSchema);

export default User;