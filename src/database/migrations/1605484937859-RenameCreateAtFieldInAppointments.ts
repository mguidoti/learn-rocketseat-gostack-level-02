import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RenameCreateAtFieldInAppointments1605484937859
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'createAt');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'createdAt');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'createAt',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }
}
