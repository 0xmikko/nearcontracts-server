import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BasicRepositoryI } from "../core/basic";
import { Contract } from "./contract";

@Entity()
export class Template {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: "" })
  name: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: "" })
  content: string;

  @Column({ default: "" })
  ownerID: string;

  @Column({ default: false })
  isPublic: boolean;

  @OneToMany((type) => Contract, (contract) => contract.template)
  contracts: Contract[];
}

export interface TemplateDTO {
  id: string;
  name: string;
  description: string;
  content: string;
  isPublic: boolean;
}

export const templateDTOSchema = {
  type: "object",
  required: ["id", "name", "content", "isPublic"],
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    content: {
      type: "string",
    },
    isPublic: {
      type: "boolean",
    },
  },
};

export interface TemplatesRepositoryI extends BasicRepositoryI<Template> {
  listByUser(userID: string): Promise<Template[] | undefined>;
}

export interface TemplatesServiceI {
  create(userID: string, dto: TemplateDTO): Promise<Template>;
  list(userID: string): Promise<Template[] | undefined>;
  findById(userID: string, id: string): Promise<Template | undefined>;
  update(userID: string, dto: TemplateDTO): Promise<Template | undefined>;
}
