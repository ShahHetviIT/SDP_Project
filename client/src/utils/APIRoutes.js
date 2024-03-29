export const host = "https://mentor-mingle-api.onrender.com";
// export const host = "http://localhost:3001";
export const loginRoute = `${host}/api/auth/login`;
export const marksAttendanceRoute = `${host}/api/auth/addMarksAttendance`;
export const marksAttendanceExternalRoute = `${host}/api/auth/addMarksAttendanceExternal`;
export const getMarksAttendanceRoute = `${host}/api/auth/getMarksAttendance`;
export const getMarksAttendanceExternalRoute = `${host}/api/auth/getMarksAttendanceExternal`;
export const getTotalMarksAttendanceRoute = `${host}/api/auth/getTotalMarksAttendance`;
export const getTotalMarksAttendanceExternalRoute = `${host}/api/auth/getTotalMarksAttendanceExternal`;
export const getTeacherSubjectRoute = `${host}/api/auth/getTeacherSubjectName`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;
export const setProfileImageRoute = `${host}/api/auth/setProfileImage`;
export const allUsersRouteTeachers = `${host}/api/auth/allusersteacher`;
export const allUsersRouteStudents = `${host}/api/auth/alluserstudent`;
export const getCurrentStudentRoute = `${host}/api/auth/getCurrentStudent`;
export const getCurrentStudentMarksRoute = `${host}/api/auth/getCurrentStudentMarks`
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const getFilesClassroom =`${host}/api/classroom/get-files`;
export const getClassroomDetailsRoute = `${host}/api/classroom/getClassroomDetails`;
export const addClassroomDetailsRoute = `${host}/api/classroom/addClassroomDetails`;

export const uploadFilesClassroom = `${host}/api/classroom/upload-files`;
export const getFilesMessages = `${host}/api/messages/get-files`;
export const uploadFilesMessages = `${host}/api/messages/upload-files`;
export const createPdfRoute = `${host}/api/external/create-pdf`;
export const fetchPdfRoute = `${host}/api/external/fetch-pdf`;

export const deleteClassroomDetailsRoute = `${host}/api/classroom/deleteClassroomDetails`;
export const getAllTodoDetails = `${host}/api/todo/getAllTodoDetails`;
export const createTodoDetails =`${host}/api/todo/createTodoDetails`;
export const updateTodoDetails = `${host}/api/todo/updateTodoDetails/:id`;
export const deleteTodoDetails = `${host}/api/todo/deleteTodoDetails/:id`;
export const getArchiveClassroomDetailsRoute = `${host}/api/classroom/getArchiveClassroomDetails`;

export const emailRoute = `${host}/api/email/sendEmail`;