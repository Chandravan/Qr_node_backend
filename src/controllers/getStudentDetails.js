import Student from "../model/studentModel.js";

/**
 * GET /admin/students/:id
 * Fetch single student details
 */
export const getStudentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id).lean();

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json(student);
  } catch (error) {
    console.error("Get Student Details Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch student details",
    });
  }
};
