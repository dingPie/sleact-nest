import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { ChannelChats } from './src/entities/channel-chats';
import { ChannelMembers } from './src/entities/channel-members';
import { Channels } from './src/entities/channels';
import { DMs } from './src/entities/dms';
import { Mentions } from './src/entities/mentions';
import { Users } from './src/entities/users';
import { WorkspaceMembers } from './src/entities/workspace-members';
import { Workspaces } from './src/entities/workspaces';
import { DateEntity } from './src/@common/entities/date-entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  entities: [
    ChannelChats,
    ChannelMembers,
    Channels,
    DMs,
    Mentions,
    Users,
    WorkspaceMembers,
    Workspaces,
    DateEntity,
  ],
  migrations: [__dirname + '/src/database/migrations/*.ts'],
  synchronize: true,
  logging: true,
});

export default dataSource;
