import Student from "../model/studentModel.js";
import Log from "../model/logModel.js"; // Log model ko import karna mat bhulna

export const scanQR = async (req, res) => {
  
  try {
    const { registrationNo } = req.body;

    // 1. Validation
    if (!registrationNo) {
      return res.status(400).json({ message: "Registration number is required" });
    }

    // 2. Student ko find karo
    const student = await Student.findOne({ registrationNo });
    if (!student) {
      
      return res.status(404).json({ message: "Student not registered in the system" });
    }
    

    // 3. Toggle Logic: Current status ke base par action decide karo
    const currentStatus = student.status; // 'IN' or 'OUT'
    const newStatus = currentStatus === "IN" ? "OUT" : "IN";
    const actionType = currentStatus === "IN" ? "EXIT" : "ENTRY";

    // 4. Student status update karo DB mein
    student.status = newStatus;
    await student.save();

    // 5. Log entry create karo (History tracking)
    const logEntry = await Log.create({
      studentId: student._id,
      registrationNo: student.registrationNo,
      action: actionType,
      timestamp: new Date()
    });

    // 6. Response (Scanner/Guard ko dikhane ke liye)
    
    return res.status(200).json({
      success: true,
      message: `${student.name} marked as ${actionType}`,
      details: {
        name: student.name,
        branch: student.branch,
        imageUrl: student.imageUrl, // Guard face verify kar sakega
        newStatus: student.status,
        time: logEntry.createdAt
      }
    });

  } catch (error) {
    console.error("Scan Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};