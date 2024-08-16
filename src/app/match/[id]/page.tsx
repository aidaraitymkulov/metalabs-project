import getFixtureByFixtureId from '@/src/util/getFixtureByFixtureId';
import styles from './Match.module.scss';
import { Fixture } from "@/types"
import Image from "next/image"
import Link from "next/link"
import Localtime from '@/src/components/Localtime';

type PageProps = {
    params: {
        id: string
    }
}

export default async function Match({
    params
}: PageProps) {
    let fixtureByFixtureId: Fixture | null = await getFixtureByFixtureId(parseInt(params.id));

    if (!fixtureByFixtureId) {
        return (
            <div className={styles.matchContainer}>
                <div>
                    No Fixture Info Available
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className={styles.logoSection}>
                <div className={styles.logoLeft}>
                    <Link href={`../team/${fixtureByFixtureId.teams.home.id}`}>
                        <Image src={fixtureByFixtureId.teams.home.logo} alt="HomeLogoMatch" width={250} height={250} priority/>
                    </Link>
                </div>
                <div className={styles.matchDetails}>
                    <div className={styles.date}>
                        <Localtime fixture={fixtureByFixtureId} />
                    </div>
                    <div className={styles.score}>
                        <div className={styles.homeScore}>
                            {fixtureByFixtureId.score.fulltime.home}
                            {fixtureByFixtureId.score.penalty.home !== null ? (
                                <div className={styles.penalty}>
                                    <div>(et. ) {fixtureByFixtureId.score.extratime.home}</div>
                                    <div>(pen. ) {fixtureByFixtureId.score.penalty.home}</div>
                                </div>
                            ) : fixtureByFixtureId.score.extratime.home !== null ? (
                                <div className={styles.penalty}>(et. ) {fixtureByFixtureId.score.extratime.home}</div>
                            ) : null}
                        </div>
                        <div className={styles.scoreSeparator}>-</div>
                        <div className={styles.awayScore}>
                            {fixtureByFixtureId.score.fulltime.away}
                            {fixtureByFixtureId.score.penalty.away !== null ? (
                                <div className={styles.penalty}>
                                    <div>(et. ) {fixtureByFixtureId.score.extratime.away}</div>
                                    <div>(pen. ) {fixtureByFixtureId.score.penalty.away}</div>
                                </div>
                            ) : fixtureByFixtureId.score.extratime.away !== null ? (
                                <div className={styles.penalty}>(et. ) {fixtureByFixtureId.score.extratime.away}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className={styles.matchInfo}></div>
                </div>
                <div className={styles.logoRight}>
                    <Link href={`../team/${fixtureByFixtureId.teams.away.id}`}>
                        <Image src={fixtureByFixtureId.teams.away.logo} alt="AwayLogoMatch" width={250} height={250} priority/>
                    </Link>
                </div>
            </div>
            <div className={styles.infoSection}>
                <div className={styles.leagueInfo}>
                    <div>{fixtureByFixtureId.league.name}</div>
                    <div>{fixtureByFixtureId.league.round}</div>
                </div>
                <div className={styles.teamNames}>
                    <div className={styles.teamHome}>
                        <div className={styles.teamName}>
                            {fixtureByFixtureId.teams.home.name}
                        </div>
                    </div>
                    <div className={styles.teamAway}>
                        <div className={styles.teamName}>
                            {fixtureByFixtureId.teams.away.name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
