const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student"
    },
    onboardingCompleted: {
      type: Boolean,
      default: false
    },
    targetGpa: {
      type: Number,
      default: 8.0,
      min: 0,
      max: 10
    },
    currentStreak: {
      type: Number,
      default: 0
    },
    consistencyScore: {
      type: Number,
      default: 100, // 0 to 100
      min: 0,
      max: 100
    },
    weeklyStudyTargetHours: {
      type: Number,
      default: 20
    }
  },
  {
    timestamps: true
  }
);

// Pre-save hook to hash password
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
