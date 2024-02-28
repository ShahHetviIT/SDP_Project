module.exports = ({
  subjectDetailsArray,
  studentName,
  studentSem,
  studentRollNo,
  studentId,
  examDate,
  totalCredit,
  totalEarnedCredit,
  result,
}) => {
  const calculateResult = () => {
    let overallResult = "PASS";

    subjectDetailsArray.forEach((subject) => {
      // Assuming each subject object has a property named 'status'
      if (subject.subjectStaus !== "PASS") {
        console.log(subject.subjectStaus);
        overallResult = "FAIL";
        return; // Exit loop if any subject fails
      }
    });

    return overallResult;
  };
  // Function to generate rows for subject details
  // console.log(subjectDetailsArray);
  const generateSubjectRows = () => {
    if (subjectDetailsArray) {
      return subjectDetailsArray
        .map((subject) => {
          return `
                    <tr>
                        <td>${subject.subjectCode}</td>
                        <td>${subject.subjectName}</td>
                        <td>${subject.subjectCredit}</td>
                        <td>${subject.subjectPoint}</td>
                        <td>${subject.subjectGrade}</td>
                    </tr>
                `;
        })
        .join("");
    } else {
      return `
            <tr>
                <td>hello</td>
            </tr>
            `;
    }
  };

  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Provisional Marksheet</title>
            <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th,
            td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #f2f2f2;
            }
            tr:nth-child(even) {
              background-color: #f2f2f2;
            }
            h1 {
              text-align: center;
            }
      
            .universityDescription {
                letter-spacing:1px;
              text-align: center;
              font-size: 25px;
              display: flex;
              flex-direction: column;
              gap: 10px;
              padding-bottom: 30px;
            }
            .personalInfo{
                font-size: 20px;
                letter-spacing:1px;
              display: flex;
              flex-direction: column;
              gap: 15px;
              padding-bottom: 30px;
            }
            .tableInfo{
              padding-bottom: 200px;
              font-size: 20px;
            }
            .result {
                font-size:20px;
                font-weight:500;
                display: flex;
                align-items: center;
                /* justify-content: center; */
                padding-bottom: 30px;
                gap: 15px;
                padding-top:400px
              }
              .resultContainer{
                display: flex;
                flex-direction: column;
                align-items: flex-end;
              }
              div{
                margin: 5px 0;
              }
          </style>
        </head>
        <body>
            <div class="universityDescription">
                <div>DHARMSINH DESAI UNIVERSITY</div>
                <div style="font-size: 20px">(Formerly D. D. Institute of Technology - Deemed University)</div>
                <div>NADIAD - 387 001 (INDIA)</div>
                <div>PROVISIONAL MARKSHEET</div>
            </div>
            <div class="personalInfo">
                <div>Statement of grade obtained in each subject at the Bachelor of Technology Semester - ${studentSem}</div>
                <div>Examination held in: ${examDate}</div>
                <div>Identity No: ${studentId}</div>
                <div>Seat No: ${studentRollNo}</div>
                <div>Name: ${studentName}</div>
            </div>
            <div class="tableInfo">
                <table>
                    <thead>
                        <tr>
                            <th>Sub.Code</th>
                            <th>Subjects</th>
                            <th>Credit</th>
                            <th>SubPoint</th>
                            <th>SubGrade</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${generateSubjectRows()}
                    </tbody>
                </table>
            </div>
            <div class="result">
                <div class="resultContainer">
                    <div>SPICredit : ${totalCredit}</div>
                    <div>SPIPoint: ${totalEarnedCredit}</div>
                    <div>SPI: ${totalEarnedCredit / totalCredit}</div>
                    <div>Result : ${calculateResult()}</div>
                </div>
            </div>
        </body>
        </html>
    `;
};
