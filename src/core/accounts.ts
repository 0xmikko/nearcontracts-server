import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Contract } from "./contract";
import { BasicRepositoryI } from "./basic";

export type ProfileStatus = "CONNECTING_ACCOUNT" | "READY" | "ERROR";

@Entity()
export class Account {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  status: ProfileStatus;

  @OneToMany((type) => Contract, (contract) => contract.owner)
  ownerContracts: Contract[];

  @OneToMany((type) => Contract, (contract) => contract.partner)
  partnerContracts: Contract[];
}

export interface AccountUpdateDTO {
  name: string;
  address: string;
}

export const accountUpdateDTOSchema = {
  type: "object",
  required: ["name", "address"],
  properties: {
    name: {
      type: "string",
    },
    address: {
      type: "string",
    },
  },
};

export interface AccountsRepositoryI extends BasicRepositoryI<Account> {}

export interface AccountsServiceI {
  get(userID: string): Promise<Account>;
  list(): Promise<Account[] | undefined>;
  update(userId: string, dto: AccountUpdateDTO): Promise<Account>;
}
