import express from "express";
import { wiki_homepage } from "../controllers/searchControler";

const router = express.Router()

router.get('/',wiki_homepage);
router.post('/:title') //查询

export default router