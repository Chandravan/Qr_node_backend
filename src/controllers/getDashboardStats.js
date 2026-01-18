import Student from "../model/studentModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Teeno counts ko parallel mein fetch karte hain performance ke liye
    const [total, inside, outside] = await Promise.all([
      Student.countDocuments(),
      Student.countDocuments({ status: "IN" }),
      Student.countDocuments({ status: "OUT" }),
    ]);

    res.status(200).json({
      success: true,
      total,
      inside,
      outside,
    });
  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};