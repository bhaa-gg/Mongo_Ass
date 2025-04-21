import { model, Schema } from "mongoose"
import { WorkflowStatus } from "../../src/utils"




interface IWorkflow extends Document {
    userId: Schema.Types.ObjectId
    productId: Schema.Types.ObjectId
    status: WorkflowStatus
    amount: number
}


const workflowSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true , ref: 'User' },
    productId: { type: Schema.Types.ObjectId, required: true , ref: 'Product' },
    status: { type: String, required: true, enum: Object.values(WorkflowStatus) },
    amount: { type: Number, required: true },
}, { timestamps: true, autoCreate: true, versionKey: false })


const Workflow = model<IWorkflow>('Workflow', workflowSchema)


export default Workflow
