import { Router } from "express";
import {AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword} from "./controller/auth.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";
import {CreateUser, DeleteUser, GetUser, UpdateUser, Users} from "./controller/user.controller";
import {PermissionController} from "./controller/permission.controller";
import {CreateRole, DeleteRole, GetRole, Roles} from "./controller/role.controller";
import {CreateProduct, DeleteProduct, GetProduct, Products, UpdateProduct} from "./controller/product.controller";
import {Upload} from "./controller/image.controller";
import multer from "multer";
import {extname} from "path";




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
  // @ts-ignore
  router.get('/api/permissions', AuthMiddleware, PermissionController);

  // @ts-ignore
  router.get('/api/roles', AuthMiddleware, Roles);
   // @ts-ignore
  router.post('/api/create_roles', AuthMiddleware, CreateRole);
   // @ts-ignore
  router.get('/api/roles/:id', AuthMiddleware, GetRole);
  // router.put('/api/roles/:id', AuthMiddleware, UpdateRole);
   // @ts-ignore
  router.delete('/api/roles/:id', AuthMiddleware, DeleteRole);

  // @ts-ignore
  router.get('/api/products', AuthMiddleware, Products);
  // @ts-ignore
  router.post('/api/products', AuthMiddleware, CreateProduct);
  // @ts-ignore
  router.get('/api/products/:id', AuthMiddleware, GetProduct);
  // @ts-ignore
  router.put('/api/products/:id', AuthMiddleware, UpdateProduct);
  // @ts-ignore
  router.delete('/api/products/:id', AuthMiddleware, DeleteProduct);

  //image storage
  const storage = multer.diskStorage({
    destination:'./uploads',
    filename(_, file, callback) {
      const randomName = Math.random().toString(20).substr(2, 12);
      return callback(null, `${randomName}${extname(file.originalname)}`)
    }
  })
  // @ts-ignore
  router.post('/api/upload', AuthMiddleware,multer({storage}).single('image'), Upload);
  //router.use('/api/uploads', express.static('./uploads'));
};

