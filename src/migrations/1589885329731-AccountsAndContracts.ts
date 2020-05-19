import {MigrationInterface, QueryRunner} from "typeorm";

export class AccountsAndContracts1589885329731 implements MigrationInterface {
    name = 'AccountsAndContracts1589885329731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contract" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL DEFAULT '', "date" TIMESTAMP NOT NULL, "address" character varying NOT NULL DEFAULT '', "content" character varying NOT NULL DEFAULT '', "isDeployed" boolean NOT NULL DEFAULT false, "ownerIsSupplier" boolean NOT NULL DEFAULT true, "ownerId" uuid, "partnerId" uuid, "templateId" uuid, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_a45df5a99d61f11c78719bd6129" FOREIGN KEY ("ownerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_1622f57e6fd5d12f7e36c1626c8" FOREIGN KEY ("partnerId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_a4eab482b88f43c8ba0498abde8" FOREIGN KEY ("templateId") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_a4eab482b88f43c8ba0498abde8"`, undefined);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_1622f57e6fd5d12f7e36c1626c8"`, undefined);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_a45df5a99d61f11c78719bd6129"`, undefined);
        await queryRunner.query(`DROP TABLE "account"`, undefined);
        await queryRunner.query(`DROP TABLE "contract"`, undefined);
    }

}
