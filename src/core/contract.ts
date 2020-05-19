import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BasicRepositoryI } from "../core/basic";
import { Template } from "./template";
import {Account} from "./accounts";

export type ContractStage =
  | "Draft"
  | "Negotiating"
  | "Signed"
  | "Finished"
  | "Cancelled"
  | "Hidden";

@Entity()
export class Contract {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: "" })
  name: string;

  @Column()
  date: Date;

  @Column({ default: "" })
  address: string;

  @Column({ default: "" })
  content: string;

  @ManyToOne((type) => Account, (contract) => contract.ownerContracts)
  owner: Account;

  @ManyToOne((type) => Account, (contract) => contract.partnerContracts)
  partner: Account

  @ManyToOne((type) => Template, (template) => template.contracts)
  template: Template;

  @Column({ default: false })
  isDeployed: boolean;

  @Column({default: true})
  ownerIsSupplier: boolean;

  isIOwner: boolean = false;
}

export interface ContractCreateDTO {
  template_id: string;
}

export interface ContractUpdateDTO {
  id: string;
  name: string;
  date: Date;
  content: string;
  partnerID: string;
  address: string;
  isDeployed: boolean;
  ownerIsSupplier: boolean
}

export const contractCreateDTOSchema = {
  type: "object",
  required: ["template_id"],
  properties: {
    template_id: {
      type: "string",
    },
  },
};

export const contractUpdateDTOSchema = {
  type: "object",
  required: ["id", "name", "date", "content", "ownerIsSupplier"],
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    date: {
      type: "string",
    },
    content: {
      type: "string",
    },
    adderss: {
      type: "string",
    },
    isDeployed: {
      type: "boolean",
    },
    ownerIsSupplier: {
      type: "boolean",
    },
  },
};

export interface ContractsRepositoryI extends BasicRepositoryI<Contract> {
  listByUser(owner: Account): Promise<Contract[] | undefined>;
}

export interface ContractsServiceI {
  create(userID: string, dto: ContractCreateDTO): Promise<Contract>;
  list(userID: string): Promise<Contract[] | undefined>;
  findById(userID: string, id: string): Promise<Contract | undefined>;
  update(userId: string, dto: ContractUpdateDTO): Promise<Contract | undefined>;
}
