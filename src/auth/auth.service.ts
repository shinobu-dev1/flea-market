import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(CreateUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.createUser(CreateUserDto);
    }

    async signIn(
        credentialsDto: CredentialsDto
    ): Promise<{ accessToken: string}> {
        const { username, password } = credentialsDto;
        const user = await this.userRepository.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password ))) {
            const payload = { id: user.id, username: user.username };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };            
        }

        throw new UnauthorizedException(
            'ユーザー名またはパスワードを確認してください。',
        );
    }
}
