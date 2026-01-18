import Student from "../model/studentModel.js";
import Log from "../model/logModel.js";

export const getOutStudents = async (req, res) => {
  try {
    // 1. Un students ko dhoondo jinka status 'OUT' hai
    const studentsOut = await Student.find({ status: 'OUT' })
      .select("name registrationNo branch batch image updatedAt") // Sirf kaam ki fields
      .sort({ updatedAt: -1 }); // Jo sabse last mein gaya wo sabse upar

    // 2. Agar koi bahar nahi hai
    if (studentsOut.length === 0) {
      return res.status(200).json({
        success: true,
        message: "All students are inside the hostel",
        count: 0,
        students: []
      });
    }

    // 3. Response bhejo
    return res.status(200).json({
      success: true,
      count: studentsOut.length,
      students: studentsOut.map(student => ({
        id: student._id,
        name: student.name,
        regNo: student.registrationNo,
        branch: student.branch,
        batch: student.batch,
        imageUrl: student.imageUrl,
        exitTime: student.updatedAt // updatedAt hi uska exit time hai kyunki status last wahin badla tha
      }))
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    return res.status(500).json({ success: false, message: "Server error while fetching out students" });
  }
};