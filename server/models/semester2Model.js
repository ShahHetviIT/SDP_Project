const mongoose = require("mongoose");

const semester2Schema = new mongoose.Schema({
  username: String,
  external: {
    marksLecture: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAIE: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    marksLab: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAUP: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
      SDP: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalExamMarks: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAIE: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalLabMarks: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAUP: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
      SDP: [
        {
          type: Number,
          default: null,
        },
      ],
    },
  },
  sessional1: {
    marksLecture: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAIE: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    attendanceLecture: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAIE: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    attendanceLab: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAUP: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
      SDP: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalExamMarks: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAIE: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalAttendanceLecture: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAIE: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalAttendanceLab: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAUP: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
      SDP: [
        {
          type: Number,
          default: null,
        },
      ],
    },
  },
  sessional2: {
    marksLecture: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAIE: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    attendanceLecture: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAIE: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    attendanceLab: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAUP: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
      SDP: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalExamMarks: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAIE: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalAttendanceLecture: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAIE: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalAttendanceLab: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAUP: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
      SDP: [
        {
          type: Number,
          default: null,
        },
      ],
    },
  },
  sessional3: {
    marksLecture: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAIE: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    attendanceLecture: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAIE: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    attendanceLab: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAUP: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
      SDP: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalExamMarks: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAIE: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalAttendanceLecture: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAIE: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalAttendanceLab: {
      FSD: [
        {
          type: Number,
          default: null,
        },
      ],
      AOS: [
        {
          type: Number,
          default: null,
        },
      ],
      DAUP: [
        {
          type: Number,
          default: null,
        },
      ],
      LT: [
        {
          type: Number,
          default: null,
        },
      ],
      SDP: [
        {
          type: Number,
          default: null,
        },
      ],
    },
  },
  subjects: Array,
});

const semester2 = mongoose.model("semester2", semester2Schema);

module.exports = semester2;
