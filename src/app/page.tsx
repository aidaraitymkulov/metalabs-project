import { AllFixtures, Standing } from "@/types";
import getStandings from "../util/getStandings";
import Leagues from "./Home/Leagues";
import getFixturesForFiveLeagues from "../util/getFixturesForFiveLeagues";

export const revalidate = 60;

export default async function Home() {
  const standingsData: Standing[] = await getStandings();
  const filteredFixtures: AllFixtures[] = await getFixturesForFiveLeagues();

  return (
    <div>
      <Leagues standingsData={standingsData} filteredFixtures={filteredFixtures} />
    </div>
  )
}
