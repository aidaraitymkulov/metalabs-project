import Fixtures from "@/src/components/Fixtures";
import getFixturesByTeamId from "@/src/util/getFixturesByTeamId";
import getTeamInfoByTeamId from "@/src/util/getTeamInfoByTeamId";
import type { Fixture, Team } from "@/types";
import Image from "next/image";
import styles from './Team.module.scss';

type PageProps = {
    params: {
        id: string
    }
}

export default async function Team({
    params
}: PageProps) {

    let teamInfo: Team | undefined = await getTeamInfoByTeamId(parseInt(params.id));
    let fixturesByTeamId: Fixture[] = await getFixturesByTeamId(parseInt(params.id));

    if (!teamInfo) {
        return (
            <div className={styles.container}>
                <div className={`${styles.content} text-neutral-100`}>
                    Team Info Not Available
                </div>
            </div>
        );
    }

    return (
        <div className='container'>
            <div className={styles.content}>
                <div className={styles.teamInfo}>
                    <Image
                        src={teamInfo.team.logo}
                        alt="TeamLogo"
                        width={150}
                        height={150}
                        className={styles.logo}
                    />
                    <div className={styles.teamName}>{teamInfo.team.name}</div>
                    <div className={styles.details}>
                        <div className={styles.stat}>{`#${teamInfo.rank}`}</div>
                        <div className={styles.stat}>{teamInfo.group}</div>
                        <div className={styles.stat}>
                            <div>Form</div>
                            <div className={styles.form}>
                                {teamInfo.form?.split('').map((char, i) => (
                                    <div
                                        key={char + i}
                                        className={`${styles.formItem} ${char === 'L' ? styles.lose : char === 'D' ? styles.draw : styles.win}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.statsTable}>
                        <div className={styles.header}>
                            <div className="cell">P</div>
                            <div className="cell">M</div>
                            <div className="cell">W</div>
                            <div className="cell">D</div>
                            <div className="cell">L</div>
                            <div className="cell">GF</div>
                            <div className="cell">GA</div>
                            <div className="cell">GD</div>
                        </div>
                        <div className={styles.row}>
                            <div className="cell">{teamInfo.points}</div>
                            <div className="cell">{teamInfo.all.played}</div>
                            <div className="cell">{teamInfo.all.win}</div>
                            <div className="cell">{teamInfo.all.draw}</div>
                            <div className="cell">{teamInfo.all.lose}</div>
                            <div className="cell">{teamInfo.all.goals.for}</div>
                            <div className="cell">{teamInfo.all.goals.against}</div>
                            <div className="cell">{teamInfo.goalsDiff}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.fixtures}>
                    <Fixtures fixturesByTeamId={fixturesByTeamId} teamId={parseInt(params.id)} />
                </div>
        </div>
    );
}
