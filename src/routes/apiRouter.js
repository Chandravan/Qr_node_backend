import { Router } from "express";

import { createStudent } from "../controllers/student.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { scanQR } from "../controllers/scanQR.js";
import { getOutStudents } from "../controllers/getOutStudents.js";
import { getStudentHistory } from "../controllers/getStudentHistory.js";
import { getDashboardStats } from "../controllers/getDashboardStats.js";
import { getAllStudents } from "../controllers/getAllStudents.js";
import { getLiveLogs } from "../controllers/getLiveLogs.js";
import { getStudentDetails } from "../controllers/getStudentDetails.js";
import { getStudentLogs } from "../controllers/getStudentLogs.js";
const router=Router()


router.route("/admin/students/create").post(upload.single("image"),createStudent);
router.route("/scanQR").post(scanQR),
router.route("/admin/who-is-out").get(getOutStudents),
router.route("/admin/history/:registrationNo").get(getStudentHistory)
router.route("/admin/getDashboardStats").get(getDashboardStats)
router.route("/admin/students").get(getAllStudents)
router.route("/admin/getLiveLogs").get(getLiveLogs)
router.route("/admin/students/:id").get(getStudentDetails)
router.route("/admin/students/:id/logs").get(getStudentLogs)

export default router;