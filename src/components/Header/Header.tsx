import { Team } from '@/types';
import SearchBar from '../SearchBar';
import styles from './Header.module.scss';
import getTeams from '../../util/getTeams';

export default async function Header() {
    let teamsData: Team[] = await getTeams();

    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContainer}`}>
                <div className={styles.logoBox}>
                    <a href={"/"} className={styles.logoBox__link}>
                        <img src="/logo.png" alt="logo" className={styles.header__logo}/>
                        <h1 className={styles.header__title}>FOOTBAZA</h1>
                    </a>
                </div>
                <SearchBar teamsData={teamsData} />
            </div>
        </header>
    );
}