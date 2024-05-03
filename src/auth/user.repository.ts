import { User } from "src/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(CreateUserDto: CreateUserDto): Promise<User> {
        const { username, password, status } = CreateUserDto;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const user = this.create({ username, password: hashPassword, status });

        await this.save(user);
        return user;
    }

}