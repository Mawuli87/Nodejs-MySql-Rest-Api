import { Router } from "express";
import {AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword} from "./controller/auth.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {CreateUser, DeleteUser, GetUser, UpdateUser, Users} from "./controller/user.controller";


export const routes = (router: Router) => {
  // @ts-ignore
  router.post("/api/v1/register", Register);
  // @ts-ignore
  router.post("/api/v1/login", Login);
  // @ts-ignore
  router.get("/api/v1/authenticatedUser",AuthMiddleware, AuthenticatedUser);
  // @ts-ignore
  router.post("/api/v1/logout",AuthMiddleware, Logout);

  // @ts-ignore
  router.put('/api/users/update_user_info', AuthMiddleware, UpdateInfo);
  // @ts-ignore
  router.put('/api/users/update_password', AuthMiddleware, UpdatePassword);

  // @ts-ignore
  router.get('/api/users', AuthMiddleware, Users);
  // @ts-ignore
  router.post('/api/create_user', AuthMiddleware, CreateUser);
  // @ts-ignore
  router.get('/api/users/:id', AuthMiddleware, GetUser);
  // @ts-ignore
  router.put('/api/update_user/:id', AuthMiddleware, UpdateUser);
  // @ts-ignore
  router.delete('/api/users/:id', AuthMiddleware, DeleteUser);
};

