import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(name: string, password: string): Promise<User> {
    const user = new User();
    const hashedPassword = await bcrypt.hash(password, 10);

    user.name = name;
    user.password = hashedPassword;
    user.myImgBase64Data = null;
    user.myImgFileName = null;

    const savedUser = this.userRepository.save(user);
    return savedUser;
  }

  async findByUsernameAndPassword(
    name: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { name } });
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }

  async getUserInfo(userId: number): Promise<User | null> {
    const userInfo = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!userInfo) {
      return null;
    }

    return userInfo;
  }

  async upMyImg(
    myImgData: { base64File: string; fileName: string },
    userId: number,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return null;
    }
    user.myImgBase64Data = myImgData.base64File;
    user.myImgFileName = myImgData.fileName;

    const updatedUser = await this.userRepository.save(user);
    return updatedUser;
  }
}
