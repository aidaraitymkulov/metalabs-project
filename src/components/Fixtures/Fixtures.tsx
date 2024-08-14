'use client'
import { Fixture } from "@/types"
import moment from 'moment';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Localtime from "../Localtime";

type PageProps = {
    fixturesByTeamId: Fixture[],
    teamId: number
}

export default function Fixtures({
    fixturesByTeamId,
    teamId
}: PageProps) {

    const [viewType, setViewType] = useState<'past' | 'future'>('future');
    const [visibleItemsCount, setVisibleItemsCount] = useState(5);

    const handleShowMore = () => {
        setVisibleItemsCount((prevCount) => prevCount + 5);
    }

    const today = moment().format('YYYY-MM-DD');
    const fixturesDone = fixturesByTeamId.filter(fixture => {
        const fixtureDate = moment(fixture.fixture.date).format('YYYY-MM-DD')
        return fixtureDate < today;
    })
    const fixturesFuture = fixturesByTeamId.filter(fixture => {
        const fixtureDate = moment(fixture.fixture.date).format('YYYY-MM-DD')
        return fixtureDate > today;
    })

    const displayedFixtures = viewType === 'past' ? fixturesDone.slice(0, visibleItemsCount) : fixturesFuture.slice(0, visibleItemsCount);

    return (
        <div className="flex flex-col w-full justify-center items-center text-neutral-100">
            <div className="flex flex-row w-full justify-center items-center space-x-4 mb-4">
                <button
                    className={`p-2 ${viewType === 'future' ? 'bg-red-800/80' : 'bg-gray-600'}`}
                    onClick={() => setViewType('future')}
                >
                    Upcoming Matches
                </button>
                <button
                    className={`p-2 ${viewType === 'past' ? 'bg-red-800/80' : 'bg-gray-600'}`}
                    onClick={() => setViewType('past')}
                >
                    Match Results
                </button>
            </div>

            {displayedFixtures.map((fixture, i) => (
                <div
                    key={i}
                    className="flex w-full text-neutral-100 items-center h-36
                        bg-gradient-to-r from-black/90 to-black/40 hover:bg-red-800">
                    <Link
                        href={`/match/${fixture.fixture.id}`}
                        className="w-full flex text-neutral-100 items-center h-36
                            bg-gradient-to-r from-black/90 to-black/40 hover:bg-red-800"
                    >
                        <div className="flex flex-col justify-center items-center w-3/12 text-sm text-center">
                            <Image
                                src={fixture.teams.home.logo}
                                alt="HomeLogo"
                                width={70}
                                height={70}
                            />
                            <div className="text-center">{fixture.teams.home.name}</div>
                        </div>
                        <div className="flex flex-col justify-center items-center w-1/2">
                            <div className="h-1/6 text-center text-[8px] md:text-xs">{fixture.league.name}</div>
                            <div className="h-1/6 text-center text-[8px] md:text-xs">
                                <Localtime fixture={fixture} />
                            </div>
                            <div className="flex w-full justify-between items-center h-2/6 md:text-2xl">
                                <div className="flex flex-col justify-center items-center">
                                    {viewType === 'past' ? fixture.score.fulltime.home : ''}
                                </div>
                                <div>-</div>
                                <div className="flex flex-col justify-center items-center">
                                    {viewType === 'past' ? fixture.score.fulltime.away : ''}
                                </div>
                            </div>
                            <div className="h-1/6 text-center text-[8px] md:text-xs">{fixture.fixture.venue.name}</div>
                        </div>
                        <div className="flex flex-col justify-center items-center w-3/12 text-sm text-center">
                            <Image
                                src={fixture.teams.away.logo}
                                alt="AwayLogo"
                                width={70}
                                height={70}
                            />
                            <div className="text-center">{fixture.teams.away.name}</div>
                        </div>
                    </Link>
                </div>
            ))}

            {visibleItemsCount < displayedFixtures.length && (
                <div className="p-2">
                    <button
                        className="bg-gradient-to-r from-gray-900/80 to-black/60 p-4"
                        onClick={handleShowMore}
                    >
                        Show More
                    </button>
                </div>
            )}
        </div>
    )
}
