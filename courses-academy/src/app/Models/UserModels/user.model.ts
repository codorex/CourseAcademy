import { Role } from '../../Enums/role.enum';

export default interface User {
    id: number,
    Name: string,
    Email: string,
    Password: string,
    Role: Role,
    IsBlocked: boolean
}