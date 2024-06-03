import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class AuthRepository extends Repository<User> {
    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
}