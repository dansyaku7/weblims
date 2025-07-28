// import mongoose, { Schema } from "mongoose";

// const CoverDataSchema = new Schema(
//   {
//     nomorFpps: { type: String, default: "" },
//     customer: { type: String, default: "" },
//     address: { type: String, default: "" },
//     phone: { type: String, default: "" },
//     contactName: { type: String, default: "" },
//     email: { type: String, default: "" },
//     subjects: [String],
//     sampleTakenBy: [String],
//     receiveDate: Date,
//     analysisDateStart: Date,
//     analysisDateEnd: String,
//     reportDate: String,
//     signatureUrl: String,
//     directorName: String,
//     certificateNo: String,
//     showKanLogo: { type: Boolean, default: true },
//   },
//   { _id: false }
// );

// const ReportSchema: Schema = new Schema(
//   {
//     _id: {
//       type: String,
//       required: true,
//     },
//     coverData: CoverDataSchema,
//     activeTemplates: {
//       type: Array,
//       default: [],
//     },
//     status: {
//       type: String,
//       enum: [
//         "pendaftaran",
//         "penyuratan",
//         "sampling",
//         "analisis",
//         "sertifikat",
//         "selesai",
//       ],
//       default: "pendaftaran",
//     },
//   },
//   {
//     timestamps: true,
//     _id: false,
//   }
// );

// export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
