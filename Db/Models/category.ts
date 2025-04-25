import { model, Schema } from "mongoose"




export interface ICategory extends Document {
    userId: Schema.Types.ObjectId
    name: string
    isActive: boolean
}


const categorySchema = new Schema<ICategory>({
    userId: { type: Schema.Types.ObjectId, required: true , ref: 'User' },
    name: { type: String, required: true, trim: true, minlength: 3, maxlength: 30 , unique: true },

    isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true, autoCreate: true, versionKey: false })


const Category = model<ICategory>('Category', categorySchema)


export default Category
