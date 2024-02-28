const mongoose = require("mongoose");

const semester5Schema = new mongoose.Schema({
  username: String,
  external: {
    marksLecture: {
      TAFL: [
        {
          type: Number,
          default: null,
        },
      ],
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ],
      CO: [
        {
          type: Number,
          default: null,
        },
      ],
      ECES: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    marksLab: {
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ]
    },
    totalExamMarks: {
      TAFL: [
        {
          type: Number,
          default: null,
        },
      ],
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ],
      CO: [
        {
          type: Number,
          default: null,
        },
      ],
      ECES: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalLabMarks: {
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ]
    },
  },
  sessional1: {
    marksLecture: {
      TAFL: [
        {
          type: Number,
          default: null,
        },
      ],
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ]
    },
    attendanceLecture: {
      TAFL: [
        {
          type: Number,
          default: null,
        },
      ],
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ],
      CO: [
        {
          type: Number,
          default: null,
        },
      ],
      ECES: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    attendanceLab: {
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalExamMarks: {
      TAFL: [
        {
          type: Number,
          default: null,
        },
      ],
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalAttendanceLecture: {
      TAFL: [
        {
          type: Number,
          default: null,
        },
      ],
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ],
      CO: [
        {
          type: Number,
          default: null,
        },
      ],
      ECES: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalAttendanceLab: {
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ]
    },
  },
  sessional2: {
    marksLecture: {
      TAFL: [
        {
          type: Number,
          default: null,
        },
      ],
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ]
    },
    attendanceLecture: {
      TAFL: [
        {
          type: Number,
          default: null,
        },
      ],
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ],
      CO: [
        {
          type: Number,
          default: null,
        },
      ],
      ECES: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    attendanceLab: {
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalExamMarks: {
      TAFL: [
        {
          type: Number,
          default: null,
        },
      ],
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalAttendanceLecture: {
      TAFL: [
        {
          type: Number,
          default: null,
        },
      ],
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ],
      CO: [
        {
          type: Number,
          default: null,
        },
      ],
      ECES: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalAttendanceLab: {
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ]
    },
  },
  sessional3: {
    marksLecture: {
      TAFL: [
        {
          type: Number,
          default: null,
        },
      ],
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ]
    },
    attendanceLecture: {
      TAFL: [
        {
          type: Number,
          default: null,
        },
      ],
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ],
      CO: [
        {
          type: Number,
          default: null,
        },
      ],
      ECES: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    attendanceLab: {
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalExamMarks: {
      TAFL: [
        {
          type: Number,
          default: null,
        },
      ],
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalAttendanceLecture: {
      TAFL: [
        {
          type: Number,
          default: null,
        },
      ],
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ],
      CO: [
        {
          type: Number,
          default: null,
        },
      ],
      ECES: [
        {
          type: Number,
          default: null,
        },
      ],
    },
    totalAttendanceLab: {
      AJT: [
        {
          type: Number,
          default: null,
        },
      ],
      SE: [
        {
          type: Number,
          default: null,
        },
      ],
      AD: [
        {
          type: Number,
          default: null,
        },
      ]
    },
  },
  subjects: Array,
});

const semester5 = mongoose.model("semester5", semester5Schema);

module.exports = semester5;
