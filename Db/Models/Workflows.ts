import { model, Schema } from "mongoose"
import { WorkflowStatus } from "../../src/utils"




interface IWorkflow extends Document {
    userId: Schema.Types.ObjectId
    products: { id: Schema.Types.ObjectId, quantity: number }[]
    status: WorkflowStatus
    totalSalary: number
    Discount: number
}


const workflowSchema = new Schema<IWorkflow>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    products: [
        {
            id: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }

    ],
    status: { type: String, required: true, enum: Object.values(WorkflowStatus) },
    totalSalary: { type: Number, required: true },
    Discount: { type: Number, required: false, default: 0 },
}, { timestamps: true, autoCreate: true, versionKey: false })


const Workflow = model<IWorkflow>('Workflow', workflowSchema)


export default Workflow
