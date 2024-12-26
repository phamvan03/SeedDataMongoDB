const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/DocProfileDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};
const docProfileSchema = new mongoose.Schema({
  docId: { type: String, required: true },
  docSoHieu: { type: String, required: true },
  docMaVB: { type: String, required: true },
  docTenVB: { type: String, required: true },
  docCapPD: { type: String, required: true },
  docDonViSoan: { type: String, required: true },
  docNguoiKy: { type: String, required: true },
  docNgayHieuLuc: { type: Date, required: true },
  docQuyenTruyCap: { type: String, required: true, enum: ["Y", "N"] },
  docPath: { type: String, required: true },
  docCategoryId: { type: String, required: true },
  docFullText: { type: String, required: true },
  docFullTextRM: { type: String, required: true },
  docDown: { type: Number, default: 0 },
  docPrint: { type: Number, default: 0 },
  docView: { type: Number, default: 0 },
  docStatus: { type: Number, default: 0 }, // 0: hiệu lực; 1: hết hiệu lực; 2: tạm đình chỉ; -1: chưa hiệu lực
  docInitBy: { type: String },
  docInitTime: { type: Date, default: Date.now },
  docAuthBy: { type: String },
  docAuthTime: { type: Date, default: Date.now },
  docIsAuth: { type: Number, default: 0 }, // 0: chưa duyệt, 1: đã duyệt
  docVersion: { type: String, default: "1.0" },
  docOriginal: { type: Number, default: 1 },
  docQA: { type: String },
  docIsShow: { type: String, enum: ["Y", "N"] },
  docNgayHetHieuLuc: { type: Date },
  docParent: { type: String },
  docLinkVBThayThe: { type: String },
  docVBSuaDoiId: { type: String },
  docLinkVBSuaDoi: { type: String },
  docVBHopNhatId: { type: String },
  docLinkVBHopNhat: { type: String },
  docNoiGuiNhan: { type: String },
  docNgayBanHanh: { type: Date },
  docKinhChuyen: { type: String },
  docIsClose: { type: Number, default: 0 },
  docHoTenNgKy: { type: String },
  docPath_QA: { type: String },
  docFullText_QA: { type: String },
  docUpdateTime: { type: Date, default: Date.now },
  docCatList: { type: String },
  docAddress: { type: String },
  docDeleteAt: { type: Date },
});

const DocProfile = mongoose.model("DocProfile", docProfileSchema);

module.exports = { connectDB, DocProfile };
