'use client'

import { Fixture } from "@/types";
import moment from 'moment';
import Image from "next/image";
import Link from "next/link";
import styles from './FixtureItem.module.scss';
import Localtime from "../Localtime";

type PageProps = {
    match: Fixture,
    index: number
}

export default function FixtureItem({
    match,
    index
}: PageProps) {
    const today = moment();
    const matchDate = moment(match.fixture.date);

    return today.isBefore(matchDate) ? (
        <Link
            href={`/match/${match.fixture.id}`}
            key={match.fixture.id}
            className={styles.fixtureItem}
        >
            <div className={styles.teamInfo}>
                <Image
                    src={match.teams.home.logo}
                    alt="HomeLogo"
                    width={70}
                    height={70}
                    className={styles.teamLogo}
                    priority
                />
                <p className={styles.teamName}>{match.teams.home.name}</p>
            </div>
            <div className={styles.matchInfo}>
                <div className={styles.matchDate}>
                    <Localtime fixture={match} />
                </div>
                <p className={styles.vs}>vs</p>
                <div className={styles.placeholder}></div>
            </div>
            <div className={styles.teamInfo}>
                <Image
                    src={match.teams.away.logo}
                    alt="AwayLogo"
                    width={70}
                    height={70}
                    className={styles.teamLogo}
                    priority
                />
                <p className={styles.teamName}>{match.teams.away.name}</p>
            </div>
        </Link>
    ) : null;
}
