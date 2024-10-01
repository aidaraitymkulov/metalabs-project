import FixtureItem from "@/src/components/FixtureItem"
import { Fixture } from "@/types"

type PageProps = {
    fixturesData: Fixture[]
}

export default function FixturesByLeague({
    fixturesData
}: PageProps) {
    if (fixturesData.length > 0) {
        return fixturesData.slice(0, 5).map((match, i) => {
            return <FixtureItem
                match={match}
                index={i}
                key={match.fixture.id}
            />
        })
    }
}