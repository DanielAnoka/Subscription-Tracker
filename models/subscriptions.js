import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: 0,
        max: 1000,
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP","NGN"],
        default: "USD",
        required: [true, "Currency is required"],
        trim: true,
        minLength: 3,
        maxLength: 3,
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
        default: "monthly",
    },
    category: {
        type: String,
        enum: ["business", "entertainment", "general", "health", "science", "sports", "technology"],
        required: true, 
    },
    paymentMethod: {
        type: String,
        enum: ["Credit Card", "debit card", "paypal", "stripe"],
        required: [true, "Payment method is required"],
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "cancelled","expired"],
        default: "active",
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true, 
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: "Start date must be a past",
        },
    },
    renewalDate: {
        type: Date,
        default: Date.now,
        required: true, 
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: "Renewal date must be a future date",
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
}, { timestamps: true });

//Auto calculate renewal date
subscriptionSchema.pre("save", function (next) {
   if(!this.renewalDate){
        const renewalPeriods ={
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
   }

   //Auto-update the status
    if(this.renewalDate < Date.now()){
         this.status = "expired";
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;