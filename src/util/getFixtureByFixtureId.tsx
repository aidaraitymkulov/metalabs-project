import { Fixture } from '@/types';
import getFixtures from './getFixtures';

export default async function getFixtureByFixtureId(id: number): Promise<Fixture | null> {
    try {
        const allFixturesByLeague = await getFixtures();

        for (const league of allFixturesByLeague) {
            const fixture = league.fixtures.find(fixture => fixture.fixture.id === id);
            if (fixture) {
                return fixture;
            }
        }

        return null;
    } catch (error) {
        console.error('Error occurred while fetching fixture by fixture Id:', error);
        return null; 
    }
}
