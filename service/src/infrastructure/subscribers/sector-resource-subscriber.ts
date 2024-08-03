import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  LoadEvent,
  RecoverEvent,
  RemoveEvent,
  SoftRemoveEvent,
  TransactionCommitEvent,
  TransactionRollbackEvent,
  TransactionStartEvent,
  UpdateEvent,
} from 'typeorm';
import { SectorResourceCluster } from '../../core/domain/sector-resource';
import {
  AfterQueryEvent,
  BeforeQueryEvent,
} from 'typeorm/subscriber/event/QueryEvent';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class SectorResourceClusterSubscriber
  implements EntitySubscriberInterface<SectorResourceCluster>
{
  listenTo() {
    return SectorResourceCluster;
  }

  private readonly logger = new Logger(SectorResourceClusterSubscriber.name);

  // afterLoad(
  //   entity: SectorResourceCluster,
  //   event?: LoadEvent<SectorResourceCluster>,
  // ): Promise<any> | void {
  //   console.log('AFTER LOAD ENTITY:', event?.metadata?.name);
  // }
  //
  //
  //   afterLoad(
  //     entity: SectorResourceCluster,
  //     event?: LoadEvent<SectorResourceCluster>,
  //   ): Promise<any> | void {
  //     const { metadata, queryRunner, connection, manager } = event;
  //     console.log('AFTER LOAD ENTITY:', metadata.name);
  //   }
  //
  //   beforeQuery(
  //     event: BeforeQueryEvent<SectorResourceCluster>,
  //   ): Promise<any> | void {
  //     const { queryRunner, connection, manager, query, parameters } = event;
  //     console.log('BEFORE QUERY ENTITY:', query);
  //   }
  //
  //   afterQuery(
  //     event: AfterQueryEvent<SectorResourceCluster>,
  //   ): Promise<any> | void {
  //     const { queryRunner, connection, manager, query, parameters } = event;
  //     console.log('AFTER QUERY ENTITY:', query);
  //   }
  //
  // beforeInsert(event: InsertEvent<SectorResourceCluster>): Promise<any> | void {
  //   const { metadata, queryRunner, connection, manager, entityId } = event;
  //   console.log('BEFORE INSERT ENTITY:', metadata.name, entityId);
  // }
  //
  //   afterInsert(event: InsertEvent<SectorResourceCluster>): Promise<any> | void {
  //     const { metadata, queryRunner, connection, manager, entityId } = event;
  //     console.log('AFTER INSERT ENTITY:', metadata.name, entityId);
  //   }
  //
  beforeUpdate(event: UpdateEvent<SectorResourceCluster>): Promise<any> | void {
    const { metadata, queryRunner, connection, manager, entity } = event;

    const beforeData = event.databaseEntity;
    const pkValues = metadata.primaryColumns.map((column) => {
      return `${column.propertyName}: ${beforeData[column.propertyName]}`;
    });
    event.updatedColumns.forEach((column) => {
      this.logger.debug(
        `Updated ${metadata.name} - column ${column.propertyName} from ${beforeData[column.propertyName]} to ${entity[column.propertyName]} (PK: ${pkValues.join(', ')})`,
      );
    });
  }
  //
  //   afterUpdate(event: UpdateEvent<SectorResourceCluster>): Promise<any> | void {
  //     console.log('AFTER UPDATE ENTITY:', event.metadata.name);
  //   }
  //
  //   beforeRemove(event: RemoveEvent<SectorResourceCluster>): Promise<any> | void {
  //     console.log('BEFORE REMOVE ENTITY:', event.metadata.name);
  //   }
  //
  //   afterRemove(event: RemoveEvent<SectorResourceCluster>): Promise<any> | void {
  //     console.log('AFTER REMOVE ENTITY:', event.metadata.name);
  //   }
  //
  //   beforeSoftRemove(
  //     event: SoftRemoveEvent<SectorResourceCluster>,
  //   ): Promise<any> | void {
  //     console.log('BEFORE SOFT REMOVE ENTITY:', event.metadata.name);
  //   }
  //
  //   afterSoftRemove(
  //     event: SoftRemoveEvent<SectorResourceCluster>,
  //   ): Promise<any> | void {
  //     console.log('AFTER SOFT REMOVE ENTITY:', event.metadata.name);
  //   }
  //
  //   beforeRecover(
  //     event: RecoverEvent<SectorResourceCluster>,
  //   ): Promise<any> | void {
  //     console.log('BEFORE RECOVER ENTITY:', event.metadata.name);
  //   }
  //
  //   afterRecover(
  //     event: RecoverEvent<SectorResourceCluster>,
  //   ): Promise<any> | void {
  //     console.log('AFTER RECOVER ENTITY:', event.metadata.name);
  //   }
  //
  //   beforeTransactionStart(event: TransactionStartEvent): Promise<any> | void {
  //     //console.log('BEFORE TRANSACTION START ENTITY:', event);
  //   }
  //
  //   afterTransactionStart(event: TransactionStartEvent): Promise<any> | void {
  //     // console.log('AFTER TRANSACTION START ENTITY:', event);
  //   }
  //
  //   beforeTransactionCommit(event: TransactionCommitEvent): Promise<any> | void {
  //     //console.log('BEFORE TRANSACTION COMMIT ENTITY:', event);
  //   }
  //
  //   afterTransactionCommit(event: TransactionCommitEvent): Promise<any> | void {
  //     //console.log('AFTER TRANSACTION COMMIT ENTITY:', event);
  //   }
  //
  //   beforeTransactionRollback(
  //     event: TransactionRollbackEvent,
  //   ): Promise<any> | void {
  //     // console.log('BEFORE TRANSACTION ROLLBACK ENTITY:', event);
  //   }
  //
  //   afterTransactionRollback(
  //     event: TransactionRollbackEvent,
  //   ): Promise<any> | void {
  //     // console.log('AFTER TRANSACTION ROLLBACK ENTITY:', event);
  //   }
}
