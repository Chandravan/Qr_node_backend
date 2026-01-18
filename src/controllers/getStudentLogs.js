import Log from "../model/logModel.js"

/**
 * GET /admin/students/:id/logs
 * Fetch entry/exit logs of a student
 */
export const getStudentLogs = async (req, res) => {
  try {
    const { id } = req.params;

    const logs = await Log.find({ studentId: id })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(logs);
  } catch (error) {
    console.error("Get Student Logs Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch student logs",
    });
  }
};
