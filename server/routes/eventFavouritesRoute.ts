import { Router } from "express";
import { createUserFavourites, deleteUserFavourites, getUserFavourites } from "../controllers/eventFavouritesController";

const router = Router()

router.get("/", getUserFavourites)
router.post("/", createUserFavourites)
router.delete("/", deleteUserFavourites)