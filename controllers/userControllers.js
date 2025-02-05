import express from "express";
import asyncHandler from 'express-async-handler'
import User from  '../models/User.js'
import Payment from  '../models/Payment.js'

export const createUsers=asyncHandler(async(req,res)=>{
    const{name,age,email,batch}=req.body;

    if (age < 18 || age > 65) {
        return res.status(400).json({ error: 'Age must be between 18 and 65' });
      }

      const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'User already registered' });
  }
    const user=await User.create({
        name,
        age,
        email,
        batch,
        month:new Date().getMonth()+1,
        year:new Date().getFullYear()

    })
    res.status(200).json({
        user
    })
    console.log(user);
    
})


export const entry=asyncHandler(async(req,res)=>{
    res.json("hello world")
    console.log('hello world');
    
})

 const CompletePayment = () => {
  // Simulate a successful payment (this can be modified to simulate different outcomes)
  const paymentSuccess = 1;

  if (paymentSuccess) {
      return {
          success: true,
          message: 'Payment completed successfully',
          paymentStatus: 'Completed'
      };
  } else {
      return {
          success: false,
          message: 'Payment failed',
          paymentStatus: 'Failed'
      };
  }
};

// Route to process the payment
export const payment= asyncHandler(async (req, res) => {
         const {email} = req.body;
         
        // Check if the user exists
        
        const user=await User.findOne({email});
        if(user.nextBatch!=null && user.nextBatch!=""){
            user.batch=user.nextBatch;
            user.nextBatch=null;
            await user.save();
        }
        return  res.status(200).json("payment successful");


});

export const updateUser=asyncHandler(async (req, res) => {

        let{email,batch,name,age,phone}=req.body;
        
        const data=await User.findOne({email});
        name = (name=="") ? data.name : name;
        phone = (phone=="") ? data.phone : phone;
        age = (age=="") ? data.age : age;
        batch = (batch=="") ? data.batch : batch;
        const response=await User.findOneAndUpdate({email},{ $set: {name,phone,age,nextBatch:batch} });
        
        return res.status(200).json("updated");

});
