'use client'
import { AllFixtures, Standing } from "@/types";
import Link from "next/link";
import { useState, useRef } from "react";
import styles from './Leagues.module.scss';
import FixturesByLeague from "./FixturesByLeague";

export default function Leagues({
    standingsData,
    filteredFixtures
}: {
    standingsData: Standing[],
    filteredFixtures: AllFixtures[]
}) {

    const menuItems = ['EPL', 'La Liga', 'BundesLiga', 'Serie A', 'Ligue 1'];
    const [activeTab, setActiveTab] = useState(0);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        menuRef.current?.children[index]?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
    };

    return (
        <div className='container'>
            <section className={styles.leaguesSection}>
                <div className={styles.leagueContent}>
                    <h2 className={styles.title}>LEAGUES</h2>
                    <nav className={styles.menu}>
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                className={index === activeTab ? styles.active : ''}
                                onClick={() => handleTabClick(index)}
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                    <div ref={menuRef} className={styles.standingsList}>
                        {standingsData.map((data, index) => (
                            <div
                                key={data.league.id}
                                className={`${styles.standings} ${index !== activeTab && 'hidden'}`}
                            >
                                <div className={styles.tableHeader}>
                                    <div className={styles.rank}></div>
                                    <div className={styles.name}></div>
                                    <div className={styles.stats}>
                                        {['M', 'W', 'D', 'L', 'P', 'GF', 'GA', 'GD'].map(stat => (
                                            <p key={stat}>{stat}</p>
                                        ))}
                                    </div>
                                    <p className={styles.form}>Form</p>
                                </div>
                                {data.league.standings[0].map((team, i) => (
                                    <Link
                                        href={`/team/${team.team.id}`}
                                        key={i + team.team.name}
                                        className={`${styles.tableRow} ${i % 2 === 0 && styles.even}`}
                                    >
                                        <p className={styles.rank}>{i + 1}</p>
                                        <p className={styles.name}>{team.team.name}</p>
                                        <div className={styles.stats}>
                                            {[team.all.played, team.all.win, team.all.draw, team.all.lose, team.points, team.all.goals.for, team.all.goals.against, team.goalsDiff].map((stat, index) => (
                                                <div key={index}>{stat}</div>
                                            ))}
                                        </div>
                                        <span className={styles.form}>
                                            {team.form?.split('').map((char, j) => (
                                                <span key={char + j} className={`${styles.formDot} ${char === 'L' ? styles.lose : char === 'D' ? styles.draw : styles.win}`} />
                                            ))}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
    <section className={styles.upcomingMatches}>
        <div className={styles.upcomingMatchesHeader}>
            Upcoming Matches
        </div>
        <div className={styles.upcomingMatchesContent}>
            {
                menuItems.map((leagueName, i) => {
                    return (
                        activeTab === i && (
                            filteredFixtures.map((league, j) => {
                                if (league.name === leagueName) {
                                    return (
                                        <FixturesByLeague
                                            fixturesData={league.fixtures}
                                            key={league.name + j}
                                        />
                                    )
                                }
                            })
                        )
                    )
                })
            }
        </div>
    </section>
</div>
    )
}
