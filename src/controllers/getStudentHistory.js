import Log from "../model/logModel.js";

export const getStudentHistory = async (req, res) => {
  try {
    const { registrationNo } = req.params; // URL se regNo lenge

    // Log table mein dhoondo aur latest entry upar rakho
    const history = await Log.find({ registrationNo })
      .sort({ createdAt: -1 })
      .limit(50); // Sirf last 50 entries dikhayenge

    if (!history || history.length === 0) {
      return res.status(404).json({ message: "No history found for this student" });
    }

    res.status(200).json({
      success: true,
      registrationNo,
      totalMovements: history.length,
      logs: history
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching history" });
  }
};