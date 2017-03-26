import { Document, Schema, model, connection } from 'mongoose';
import { IUser } from './user';
import * as autoIncrement from 'mongoose-auto-increment'

export enum waterCondition {
  Safe,
  Treatable,
  Unsafe
}

export interface IWaterPurityReport {
  timestamp: number,
  reportNumber: number,
  submitter: IUser,
  location: { lat: number, long: number },
  waterCondition: waterCondition,
  virusPPM: number,
  contaminantPPM: number
}
interface IWaterPurityReportModel extends IWaterPurityReport, Document {}

const PurityReportSchema = new Schema({
  timestamp: { type: Number, required: true },
  submitter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true }
  },
  waterCondition: { type: String, required: true },
  virusPPM: { type: Number, required: true},
  contaminantPPM: {type: Number, required: true}
});

autoIncrement.initialize(connection);
PurityReportSchema.plugin(autoIncrement.plugin, {
  model: 'Purity',
  field: 'reportNumber'
});

export const PurityReport = model<IWaterPurityReportModel>('Purity', PurityReportSchema);