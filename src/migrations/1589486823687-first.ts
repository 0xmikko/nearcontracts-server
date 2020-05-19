import {MigrationInterface, QueryRunner} from "typeorm";

export class first1589486823687 implements MigrationInterface {
    name = 'first1589486823687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "template" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "owner" character varying NOT NULL, "isPublic" boolean NOT NULL, CONSTRAINT "PK_fbae2ac36bd9b5e1e793b957b7f" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "template"`, undefined);
    }

}
