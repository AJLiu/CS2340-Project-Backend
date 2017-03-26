import { Document, Schema, model, connection } from 'mongoose';
import { IUser } from './user';
import * as autoIncrement from 'mongoose-auto-increment'

export enum waterType {
  Bottled,
  Well,
  Stream,
  Lake,
  Spring,
  Other
}

export enum waterCondition {
  Waste,
  TreatableClear,
  TreatableMuddy,
  Potable
}

export interface IWaterSourceReport {
  timestamp: number,
  reportNumber: number,
  submitter: IUser,
  location: { lat: number, long: number },
  waterType: waterType,
  waterCondition: waterCondition
}
interface IWaterSourceReportModel extends IWaterSourceReport, Document {}

const SourceReportSchema = new Schema({
  timestamp: { type: Number, required: true },
  submitter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true }
  },
  waterType: { type: String, required: true },
  waterCondition: { type: String, required: true }
});

autoIncrement.initialize(connection);
SourceReportSchema.plugin(autoIncrement.plugin, {
  model: 'Source',
  field: 'reportNumber'
});

export const SourceReport = model<IWaterSourceReportModel>('Source', SourceReportSchema);