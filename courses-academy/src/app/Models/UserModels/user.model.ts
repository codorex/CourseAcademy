import { Role } from '../../Enums/role.enum';

export default interface User {
    Name: string,
    Email: string,
    Password: string,
    Role: Role,
    IsBlocked: boolean
}