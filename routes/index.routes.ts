import { Router } from "https://deno.land/x/oak/mod.ts";
import * as indexController from "../controllers/index.controllers.ts";

const router = new Router();

router.get("/", ({ response }) => {
  response.body = "Hello denon";
});

router.get('/user/:id', indexController.getUser);
router.get("/users", indexController.getUsers);
router.post('/users', indexController.createUser);
router.put('/users/:id', indexController.updateUser);
router.delete('/users/:id', indexController.deleteUser);

export default router;
