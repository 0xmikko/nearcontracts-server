import {MigrationInterface, QueryRunner} from "typeorm";

export class description1589916105818 implements MigrationInterface {
    name = 'description1589916105818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "template" ADD "description" character varying NOT NULL DEFAULT ''`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "template" DROP COLUMN "description"`, undefined);
    }

}
