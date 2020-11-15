import { query } from "express";
import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AlterProviderFieldToProviderId1605481735302 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('appointments', 'provider');

      await queryRunner.addColumn(
        'appointments',
        new TableColumn({
          name: 'provider_id',
          type: 'uuid',
          isNullable: true,
          // default: 'uuid_generate_v4()'
        })
      );

      await queryRunner.createForeignKey('appointments', new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        // When delete, all of the appointments associated with this user will
        // be deleted
        // onDelete: 'CASCADE',
        // Doesn't allow to delete user
        // onDelete: 'RESTRICT',
        // Set as null
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }),);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

      await queryRunner.dropColumn('appointments', 'provider_id');

      await queryRunner.addColumn('appointments', new TableColumn({
          name: 'provider',
          type: 'varchar',
      }))
    }

}
