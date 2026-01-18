import Log from "../model/logModel.js"

export const getLiveLogs = async (req, res) => {
    try {
        // Hum Logs fetch karenge aur studentId ko 'populate' karenge 
        // taaki humein student ka name mil sake
        const logs = await Log.find()
            .populate({
                path: 'studentId',
                select: 'name' // Sirf name chahiye Student model se
            })
            .sort({ createdAt: -1 }) // Newest scans first
            .limit(50);

        // Frontend ke format ke hisaab se data map karna
        const formattedLogs = logs.map(log => ({
            _id: log._id,
            studentName: log.studentId ? log.studentId.name : "Unknown",
            rollNo: log.registrationNo,
            type: log.action, // "ENTRY" ya "EXIT"
            timestamp: log.createdAt,
            // Late logic (optional): Maan lo 9 PM ke baad ENTRY late hai
            isLate: log.action === "ENTRY" && new Date(log.createdAt).getHours() >= 21
        }));

        res.status(200).json(formattedLogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching logs", error: error.message });
    }
};