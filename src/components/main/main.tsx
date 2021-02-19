import * as React from 'react';
const { useEffect, useState, useRef, useCallback } = React;
import './style.scss';
import './ripple.scss';

interface mainProps {
    animeList?: Array<object>,
    isLoading: boolean,
    updateLoading: Function,
    lastPage: boolean,
    sortByPopularity: boolean,
    openMenu: boolean,
    openBurger: Function
};

export const Main: React.FC<mainProps> = ({ animeList, isLoading, lastPage, updateLoading, sortByPopularity, openMenu, openBurger } = { animeList: [], isLoading: false, lastPage: false, sortByPopularity: false, openMenu: false, updateLoading: () => { }, openBurger: () => { } }) => {
    const [animes, setAnimes] = useState([]);
    const observer = useRef(null);
    const closeMenu = ({ target }) => {
        if (target.classList.contains("open")) return openBurger(false);
        return;
    }
    const lastItem = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                updateLoading(true);
            }
        })
        if (node) observer.current.observe(node);
    }, [isLoading])
    useEffect(() => {
        if (animeList.length == 0) return;
        const animeYears = animeList.map(anime => anime['numYear']);
        const minYear = Math.min(...animeYears);
        const maxYear = Math.max(...animeYears);
        const arr = Array.from(Array(maxYear - minYear + 1).keys()).reverse();
        const result = arr.map(num => {
            const year = num + minYear;
            const animes = animeList.filter(anime => anime['numYear'] == year);
            return { year, animes }
        });
        setAnimes([...result]);
    }, [animeList]);

    return (
        <div
            className={`mainBody ${openMenu ? "open" : ""}`}
            onClick={closeMenu}
        >
            {sortByPopularity ?
                <div className="animesInYear">
                    <h2>Most popular animes</h2>
                    <div className="animesContainer">
                        {animes.reduce((prev, current) => [...prev, ...current.animes], []).map(({ img, link, title }, i, animes) => {
                            const ref = animes.length == i + 1 ? { ref: lastItem } : {}
                            return (
                                <div {...ref} key={`${title}-${i}`} className="animeCard">
                                    <a href={link}>
                                        <div className="image">
                                            <img src={img} alt="animeItem" />
                                        </div>
                                        <h3>{title}</h3>
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
                :
                animes.map(({ year, animes }) => {
                    return (
                        <div key={year} className="animesInYear">
                            <h2>Anime {year}</h2>
                            <div className="animesContainer">
                                {animes.map(({ img, link, title }, i, animes) => {
                                    const ref = animes.length == i + 1 ? { ref: lastItem } : {}
                                    return (
                                        <div {...ref} key={`${title}-${i}`} className="animeCard">
                                            <a href={link}>
                                                <div className="image">
                                                    <img src={img} alt="animeItem" />
                                                </div>
                                                <h3>{title}</h3>
                                            </a>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })
            }
            {isLoading && !lastPage ?
                <div className="lds-ripple"><div></div><div></div></div>
                :
                ""
            }
        </div>
    )
}
