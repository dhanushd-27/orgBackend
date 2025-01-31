import { Router } from "express";

const AdminRoutes = Router();

AdminRoutes.put("/update/add", (req, res) => {
  res.send("Add Members to the org");
});

AdminRoutes.put("/update/remove", (req, res) => {
  res.send("Remove Members from the org");
});

export default AdminRoutes;