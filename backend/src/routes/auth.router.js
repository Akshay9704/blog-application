import { Router } from "express";
import { User } from "../models/user.model.js";

const router = Router();

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
);

export default router;