import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: String,
  age: { type: Number, min: 18, max: 65, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  batch: { type: String, enum: ['6-7AM', '7-8AM', '8-9AM', '5-6PM'], required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  // paymentId:{ type: mongoose.Schema.Types.ObjectId, ref: "Payment", default:null}, // Reference to Payment table4
  nextBatch:{type: String, enum: ['6-7AM', '7-8AM', '8-9AM', '5-6PM'], default:null}
  // paymentId:{ type: Boolean,  default:false} // Reference to Payment table
});

const User = mongoose.model('User', userSchema);
export default User;