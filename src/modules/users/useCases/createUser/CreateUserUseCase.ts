import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const userAlreadExists = this.usersRepository.findByEmail(email);
    if (userAlreadExists) {
      throw new Error("Usuário já existe!");
    }
    this.usersRepository.create({ name, email });
    const user = this.usersRepository.findByEmail(email);
    return user;
  }
}

export { CreateUserUseCase };
