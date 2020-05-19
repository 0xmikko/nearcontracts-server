import {MigrationInterface, QueryRunner} from "typeorm";

export class templateChanges1589633771346 implements MigrationInterface {
    name = 'templateChanges1589633771346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "template" DROP COLUMN "owner"`, undefined);
        await queryRunner.query(`ALTER TABLE "template" ADD "name" character varying NOT NULL DEFAULT ''`, undefined);
        await queryRunner.query(`ALTER TABLE "template" ADD "ownerID" character varying NOT NULL DEFAULT ''`, undefined);
        await queryRunner.query(`ALTER TABLE "template" ALTER COLUMN "content" SET DEFAULT ''`, undefined);
        await queryRunner.query(`ALTER TABLE "template" ALTER COLUMN "isPublic" SET DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "template" ALTER COLUMN "isPublic" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "template" ALTER COLUMN "content" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "template" DROP COLUMN "ownerID"`, undefined);
        await queryRunner.query(`ALTER TABLE "template" DROP COLUMN "name"`, undefined);
        await queryRunner.query(`ALTER TABLE "template" ADD "owner" character varying NOT NULL`, undefined);
    }

}
