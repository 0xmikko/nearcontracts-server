import { Contract, ContractsRepositoryI } from "../core/contract";
import { TypeORMRepository } from "./typeORMRepository";
import { injectable } from "inversify";
import { getManager } from "typeorm";
import { Account } from "../core/accounts";

@injectable()
export class ContractsRepository extends TypeORMRepository<Contract>
  implements ContractsRepositoryI {
  constructor() {
    super(Contract);
  }

  findOne(id: string): Promise<Contract | undefined> {
    return getManager()
      .getRepository<Contract>(Contract)
      .findOne(id, { relations: ["owner", "partner"] });
  }

  listByUser(owner: Account): Promise<Contract[] | undefined> {
    return new Promise<Contract[] | undefined>(async (resolve, reject) => {
      const contractsOwner = await getManager()
        .getRepository<Contract>(Contract)
        .find({ where: { owner }, relations: ["owner", "partner"] });

      const contractPartner = await getManager()
        .getRepository<Contract>(Contract)
        .find({ where: { partner: owner }, relations: ["owner", "partner"] });

      resolve([
        ...contractsOwner.map((e) => {
          e.isIOwner = true;
          return e;
        }),
        ...contractPartner.map((e) => {
          e.isIOwner = false;
          return e;
        }),
      ]);
    });
  }
}
