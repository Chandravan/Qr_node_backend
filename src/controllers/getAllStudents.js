import Student from "../model/studentModel.js";

export const getAllStudents = async (req, res) => {
  try {
    // Query params
    const { branch, batch, search, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (branch) filter.branch = branch;
    if (batch) filter.batch = batch;
    if (search) {
      // case-insensitive partial match for name or registrationNo
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { registrationNo: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Total count for pagination
    const total = await Student.countDocuments(filter);

    // Fetch students with pagination
    const students = await Student.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select("-__v");

    res.status(200).json({
      success: true,
      students,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    console.error("Error in getAllStudents:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
