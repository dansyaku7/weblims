// import mongoose from "mongoose";

// const rincianSchema = new mongoose.Schema({
//   id: String,
//   area: String,
//   matriks: String,
//   parameter: String,
//   regulasi: String,
//   metode: String,
// });

// const fppsSchema = new mongoose.Schema(
//   {
//     nomorFpps: { type: String, required: true, unique: true },
//     nomorQuotation: String,
//     petugas: { type: [String], required: true },
//     namaPelanggan: String,
//     alamatPelanggan: String,
//     noTelp: String,
//     tanggalMasuk: String,
//     kegiatan: String,
//     namaPpic: String,
//     emailPpic: String,
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
//     rincian: [rincianSchema],
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Fpps || mongoose.model("Fpps", fppsSchema);
