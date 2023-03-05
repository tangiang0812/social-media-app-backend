import express from "express";
import { showPost } from "../controllers/postControllers";

const router = express.Router();

router.route("/:id").get(showPost);

export default router;
