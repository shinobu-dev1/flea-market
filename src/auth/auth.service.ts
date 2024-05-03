import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository) {}

    async signUp(CreateUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.createUser(CreateUserDto);
    }
}
