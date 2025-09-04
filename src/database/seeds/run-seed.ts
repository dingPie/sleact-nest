import dataSource from '../../../data-source';
import { CreateInitialData } from './create-initial-data';

async function runSeed() {
  try {
    await dataSource.initialize();
    console.log('데이터베이스 연결 성공');

    const seeder = new CreateInitialData();
    await seeder.run(dataSource);

    console.log('시드 실행 완료');
  } catch (error) {
    console.error('시드 실행 중 오류:', error);
  } finally {
    await dataSource.destroy();
  }
}

runSeed();
