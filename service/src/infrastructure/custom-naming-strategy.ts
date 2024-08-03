import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { type NamingStrategyInterface, Table } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class CustomNamingStrategy
  extends SnakeNamingStrategy
  implements NamingStrategyInterface
{
  primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    return this.generateConstraintName(tableOrName, columnNames, 'pk');
  }

  foreignKeyName(tableOrName: Table | string, columnNames: string[]): string {
    return this.generateConstraintName(tableOrName, columnNames, 'fk');
  }

  uniqueConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
  ): string {
    return this.generateConstraintName(tableOrName, columnNames, 'uq');
  }

  indexName(tableOrName: Table | string, columnNames: string[]): string {
    return this.generateConstraintName(tableOrName, columnNames, 'idx');
  }

  joinTableName(firstTableName: string, secondTableName: string): string {
    return snakeCase(`${firstTableName}_${secondTableName}`);
  }

  tableName(className: string, customName: string): string {
    return super.tableName(
      className.endsWith('s') ? className : `${className}s`,
      customName,
    );
  }

  private generateConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
    suffix: string,
  ): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    return `${table}_${columnNames.join('_')}_${suffix}`;
  }
}
