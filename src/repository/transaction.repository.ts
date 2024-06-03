import { Injectable } from "@nestjs/common";
import { DataSource, Repository, Transaction } from "typeorm";

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
    constructor(private readonly dataSource: DataSource) {
        super(Transaction, dataSource.createEntityManager());
    }
}