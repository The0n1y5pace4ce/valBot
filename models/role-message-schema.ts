import mongoose from "mongoose";

const reqString = {
    type: String,
    required: true,
}

const schema = new mongoose.Schema({
    _id: reqString,
    channelId: reqString,
    messageId: reqString,
})

const name = 'button-roles-tutorial'

export default mongoose.models[name] || mongoose.model(name, schema, name)