import { Template, TemplatesRepositoryI } from "../core/template";
import { TypeORMRepository } from "./typeORMRepository";
import { injectable } from "inversify";
import { getManager } from "typeorm";

@injectable()
export class TemplatesRepository extends TypeORMRepository<Template>
  implements TemplatesRepositoryI {
  constructor() {
    super(Template);
  }

  listByUser(userID: string): Promise<Template[] | undefined> {
    return getManager()
      .getRepository<Template>(Template)
      .find({ where: { ownerID: userID } });
  }
}
