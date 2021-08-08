const { Router } = require('express');
const router = Router();

const {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete
} = require("../controllers/user");



router.get("/", userGet );

router.post("/", userPost);

router.put("/:id", userPut);

router.patch("/", userPatch);

router.delete("/", userDelete);






module.exports = router;