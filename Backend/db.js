const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "counsellor", "admin"], 
      required: true,
    },
    refId: {
      type: ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);


const adminSchema = new Schema(
  {
    name: { type: String, required: true },
    campusId: { type: String, required: true },
    campusName: { type: String, required: true },
  },
  { timestamps: true }
);


const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    campusId: { type: String, required: true },
    campusName: { type: String, required: true },
    bookings: [
      {
        startTime: String,
        endTime: String,
        counsellorId: { type: ObjectId, ref: "Counsellor" },
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

const counsellorSchema = new Schema(
  {
    name: { type: String, required: true },
    campusId: { type: String, required: true },
    campusName: { type: String, required: true },
    specialization: { type: String, required: true }, 
    availability: [
      {
        date: { type: Date, required: true },
        day: { type: String },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        isBooked: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const resourceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ["article", "video", "audio"],
      required: true,
    },
    link: { type: String, required: true },
    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "pending",
    },
    uploadedBy: { type: ObjectId, ref: "Counsellor" },
  },
  { timestamps: true }
);


const helplineSchema = new Schema({
  organization: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  availability: { type: String, required: true },
  type: { type: String, required: true },
  languages: [String],
});


const bookingSchema = new Schema(
  {
    studentId: { type: ObjectId, ref: "Student" },
    counsellorId: { type: ObjectId, ref: "Counsellor" },
    date: { type: Date },
    slot: String,
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    notes: String,
  },
  { timestamps: true }
);


const userModel = mongoose.model("User", userSchema);
const adminModel = mongoose.model("Admin", adminSchema);
const studentModel = mongoose.model("Student", studentSchema);
const counsellorModel = mongoose.model("Counsellor", counsellorSchema);
const resourceModel = mongoose.model("Resource", resourceSchema);
const helplineModel = mongoose.model("Helpline", helplineSchema);
const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = {
  userModel,
  adminModel,
  studentModel,
  counsellorModel,
  resourceModel,
  helplineModel,
  bookingModel,
};
