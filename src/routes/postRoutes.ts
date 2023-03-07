import express from "express";
import asyncHandler from "express-async-handler";
import {
  deletePost,
  index,
  showPost,
  updatePost,
} from "../controllers/postControllers";

const router = express.Router();

router
  .route("/:id")
  .get(asyncHandler(showPost))
  .put(asyncHandler(updatePost))
  .delete(asyncHandler(deletePost));
router.route("/").get(asyncHandler(index));

export default router;
