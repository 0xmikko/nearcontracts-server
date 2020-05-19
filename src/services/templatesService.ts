import {
  Template,
  TemplateDTO,
  TemplatesRepositoryI,
  TemplatesServiceI,
} from "../core/template";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class TemplatesService implements TemplatesServiceI {
  private _repository: TemplatesRepositoryI;

  public constructor(
    @inject(TYPES.TemplatesRepository) repository: TemplatesRepositoryI
  ) {
    this._repository = repository;
  }

  create(userId: string, dto: TemplateDTO): Promise<Template> {
    const newDoc = new Template();
    newDoc.content = dto.content;
    newDoc.name = dto.name;
    newDoc.description = dto.description;
    newDoc.ownerID = userId;
    newDoc.isPublic = dto.isPublic;
    return this._repository.upsert(newDoc);
  }

  list(userId: string): Promise<Template[] | undefined> {
    return this._repository.listByUser(userId);
  }

  findById(userId: string, id: string): Promise<Template | undefined> {
    return this._repository.findOne(id);
  }

  async update(userId: string, dto: TemplateDTO): Promise<Template | undefined> {
    const template = await this._repository.findOne(dto.id);
    if (template===undefined) {
      throw 'Template not found'
    }
    template.name = dto.name;
    template.description = dto.description;
    template.content = dto.content;
    template.isPublic = dto.isPublic

    return this._repository.upsert(template);
  }
}
