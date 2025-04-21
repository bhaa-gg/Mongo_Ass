import { Model } from "mongoose";



export const findBy = async (modal: Model<any>, keys: any) => {
    const item = await modal.findOne(keys)
    return item
}