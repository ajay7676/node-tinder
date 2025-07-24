const mongoose =  require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type : mongoose.Schema.Types.ObjectId,
        required: true
    },
     toUserId:{
        type : mongoose.Schema.Types.ObjectId,
        required: true
    },
     status:{
        type : String,
        required: true,
        enum:{
             values:["igonred", "interested" ,"accepted" , "rejected"],
             message: `{VALUES} is incorrect status type`
        }
    }
},
 {timestamps: true}
)
 connectionRequestSchema.index({fromUserId: 1 , toUserId : 1 })
connectionRequestSchema.pre('save' , function(next){
     const connectionRequest = this;
    // Check if the fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Can not send connection request to yourself !!")
    }
    next();
})

const ConnectRequestModel = new mongoose.model("ConnectionRequest" , connectionRequestSchema);

module.exports = ConnectRequestModel;