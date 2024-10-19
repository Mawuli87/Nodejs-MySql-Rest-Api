import { Permission } from "../entity/permission.entity";
import { Role } from "../entity/role.entity";
import {AppDataSource} from "../index";

AppDataSource.initialize()
    .then(async (dataSource) => {
        const permissionRepository = dataSource.getRepository(Permission);

        const perms = [
            'view_users',
            'edit_users',
            'view_roles',
            'edit_roles',
            'view_products',
            'edit_products',
            'view_orders',
            'edit_orders'
        ];

        let permissions = [];

        for (let i = 0; i < perms.length; i++) {
            permissions.push(await permissionRepository.save({
                name: perms[i]
            }));
        }

        const roleRepository = dataSource.getRepository(Role);

        await roleRepository.save({
            name: 'Admin',
            permissions
        });

        // Create Editor role with limited permissions
        delete permissions[3]; // Remove 'edit_roles'
        await roleRepository.save({
            name: 'Editor',
            permissions
        });

        // Create Viewer role with even more limited permissions
        delete permissions[1]; // Remove 'edit_users'
        delete permissions[5]; // Remove 'edit_products'
        delete permissions[7]; // Remove 'edit_orders'

        await roleRepository.save({
            name: 'Viewer',
            permissions
        });

        process.exit(0);
    })
    .catch((error) => {
        console.error("Error during Data Source initialization:", error);
        process.exit(1);
    });