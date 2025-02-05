import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    cardNumber: { type: String, require: true },
    cvv: { type: String, require: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // Reference to User table (Table 1)
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;