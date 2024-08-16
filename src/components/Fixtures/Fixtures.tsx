'use client'
import { Fixture } from "@/types";
import moment from 'moment';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Localtime from "../Localtime";
import styles from './Fixture.module.scss';

type PageProps = {
    fixturesByTeamId: Fixture[],
    teamId: number
}

export default function Fixtures({
    fixturesByTeamId,
    teamId
}: PageProps) {

    const [viewType, setViewType] = useState<'past' | 'future'>('future');
    const [visibleItemsCount, setVisibleItemsCount] = useState(10);

    const handleShowMore = () => {
        setVisibleItemsCount((prevCount) => prevCount + 5);
    }

    const today = moment().format('YYYY-MM-DD');
    const fixturesDone = fixturesByTeamId
        .filter(fixture => {
            const fixtureDate = moment(fixture.fixture.date).format('YYYY-MM-DD');
            return fixtureDate < today;
        })

    const fixturesFuture = fixturesByTeamId.filter(fixture => {
        const fixtureDate = moment(fixture.fixture.date).format('YYYY-MM-DD');
        return fixtureDate > today;
    });

    const reversedFixturesDoneData = [...fixturesDone].reverse();
    const displayedFixtures = viewType === 'past' ? reversedFixturesDoneData.slice(0, visibleItemsCount) : fixturesFuture.slice(0, visibleItemsCount);


    return (
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
                <button
                    className={`${styles.button} ${viewType === 'future' ? styles.future : styles.past}`}
                    onClick={() => setViewType('future')}
                >
                    Upcoming Matches
                </button>
                <button
                    className={`${styles.button} ${viewType === 'past' ? styles.past : styles.future}`}
                    onClick={() => setViewType('past')}
                >
                    Match Results
                </button>
            </div>

            {displayedFixtures.map((fixture, i) => (
                <div
                    key={i}
                    className={styles.fixtureCard}
                >
                    <Link
                        href={`/match/${fixture.fixture.id}`}
                        className={styles.fixtureCard}
                    >
                        <div className={styles.teamLogo}>
                            <Image
                                src={fixture.teams.home.logo}
                                alt="HomeLogo"
                                width={70}
                                height={70}
                            />
                            <div>{fixture.teams.home.name}</div>
                        </div>
                        <div className={styles.matchDetails}>
                            <div className={styles.leagueName}>{fixture.league.name}</div>
                            <div className={styles.fixtureTime}>
                                <Localtime fixture={fixture} />
                            </div>
                            <div className={styles.score}>
                                <div>{viewType === 'past' ? fixture.score.fulltime.home : ''}</div>
                                <div>-</div>
                                <div>{viewType === 'past' ? fixture.score.fulltime.away : ''}</div>
                            </div>
                            <div className={styles.venueName}>{fixture.fixture.venue.name}</div>
                        </div>
                        <div className={styles.teamName}>
                            <Image
                                src={fixture.teams.away.logo}
                                alt="AwayLogo"
                                width={70}
                                height={70}
                            />
                            <div>{fixture.teams.away.name}</div>
                        </div>
                    </Link>
                </div>
            ))}

            {visibleItemsCount < fixturesByTeamId.length && (
                    <button
                        className={styles.showMoreButton}
                        onClick={handleShowMore}
                    >
                        Show More
                    </button>
            )}
        </div>
    );
}
