import express from "express";
import { getNote } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getNote);

export default router;
