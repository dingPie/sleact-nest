import { DataSource } from 'typeorm';
import { Channels } from '../../entities/channels';
import { Workspaces } from '../../entities/workspaces';

export class CreateInitialData {
  public async run(dataSource: DataSource): Promise<void> {
    const workspaceRepository = dataSource.getRepository(Workspaces);
    const channelRepository = dataSource.getRepository(Channels);

    // 기존 데이터가 있는지 확인
    const existingWorkspace = await workspaceRepository.findOne({
      where: { name: 'Sleact' },
    });

    if (!existingWorkspace) {
      // Workspace 생성
      const workspace = workspaceRepository.create({
        name: 'Sleact',
        url: 'sleact',
      });
      await workspaceRepository.save(workspace);

      // Channel 생성
      const channel = channelRepository.create({
        name: '일반',
        workspaceId: workspace.id,
        private: false,
      });
      await channelRepository.save(channel);

      console.log('초기 데이터가 성공적으로 생성되었습니다.');
    } else {
      console.log('초기 데이터가 이미 존재합니다.');
    }
  }
}
