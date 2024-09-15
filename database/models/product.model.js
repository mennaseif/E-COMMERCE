import mongoose, { Types } from "mongoose";


const schema = new mongoose.Schema({
    title:{
        type:String,
        unique: [true, 'title is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short product title']
    },
    slug:{
        type:String,
        lowercase: true,
        required: true
    },
    description:{
        type:String,
        required:true,
        minLength:30,
        maxLength:2000
    },
    sold:Number,
    stock:{
        type:Number,
        min:0
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category :{
        type: Types.ObjectId,
        ref: "Category"
    },
    subcategory :{
        type: Types.ObjectId,
        ref: "SubCategory"
    },
    brand :{
        type: Types.ObjectId,
        ref: "Brand"
    },
    rateAvg:{
        type:Number,
        min:0,
        max:5
    },
    rateCount:Number,
    priceAfterDiscount:{
        type:Number,
        required:true,
        min:0
    },
    imageCover:String,
    images:[String],
    createdBy:{
        type:Types.ObjectId,
        ref:"User"
    }
},{timestamps:true, versionKey:false, toJSON:{ virtuals: true }, id:false})

schema.virtual('myReviews',{
    ref:"Review",
    localField:"_id", //_id=in the same file
    foreignField:"product" //=foreign in the review
})

schema.pre('findOne', function(){
    this.populate('myReviews')
})

schema.post('init', function (doc){
   if(doc.imageCover) doc.imageCover =process.env.BASE_URL + "products/" + doc.imageCover
   if(doc.images) doc.images = doc.images.map(img => process.env.BASE_URL + "products/" + img) 
})




export const Product = mongoose.model ('Product', schema)