import mongoose from 'mongoose';

//Схема для створення профілю
const userSchema = new mongoose.Schema({
    firstname: String,
    secondname:String,
    email: String,
    password: String,
    level:String,
  });
  
  
const User = mongoose.model('User', userSchema);
export default User;


  
 
  