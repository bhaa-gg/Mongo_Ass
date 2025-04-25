import { model, Schema } from "mongoose"
import { ImageInterface } from './../../src/Types';




interface IProduct extends Document {
    userId: Schema.Types.ObjectId
    categoryId: Schema.Types.ObjectId;
    name: string
    description: string
    Image: ImageInterface
    totalPrice: number
    userPrice: number,
    price: number
    gain: number
    stock: number
    isActive: boolean
}


const productSchema = new Schema<IProduct>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    categoryId: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    name: { type: String, required: true, trim: true, minlength: 3, maxlength: 30, unique: true },
    description: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
    Image: {
        secure_url: {
            type: String,
            required: true,  
        },
        public_id: {
            type: String,
            required: true,
        },
    },
    price: { type: Number, required: true },
    gain: { type: Number, required: true },
    totalPrice: { type: Number, required: true, default: function () { return (this as any).price + (this as any).gain } },
    stock: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true, autoCreate: true, versionKey: false })


const Product = model<IProduct>('Product', productSchema)


export default Product
