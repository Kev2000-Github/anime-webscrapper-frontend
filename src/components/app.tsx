import * as React from 'react';
import axios from 'axios';
const { useState, useEffect } = React;
import { SideMenu } from './sideMenu/sideMenu';
import { Main } from './main/main';
import { BurgerButton } from './burgerButton/burger';
import utils from '../utils/constants';

let params = ["exclude=Chinese_Animation&", "sort=false&"];

export const App: React.FunctionComponent = () => {
    const [animeList, setAnimeList] = useState([]);
    const [urlParam, setUrlParam] = useState(params[0]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortByPopularity, setSortByPopularity] = useState(false);
    const [nextPage, setNextPage] = useState(utils.initialPage);
    const [openMenu, setOpenMenu] = useState(false);
    const fetchAnimes = async (reset: boolean = false) => {
        if (reset) {
            const { data } = await axios.get(utils.URL + "?" + urlParam + utils.initialPage);
            setAnimeList(data.docs);
            setNextPage("page=" + data.nextPage);
            return;
        }
        if (nextPage.split('=')[1] == 'null') return;
        const { data } = await axios.get(utils.URL + "?" + urlParam + nextPage);
        if (animeList.length == 0) setAnimeList(data.docs);
        setAnimeList(prevAnimes => [...prevAnimes, ...data.docs]);
        setNextPage("page=" + data.nextPage);
    }
    const updateLoading = (flag: boolean) => setIsLoading(flag);
    const changeUrlParam = (changeType: string) => {
        switch (changeType) {
            case "Anime":
                params[0] = params[0].replace("include", "exclude");
                break;
            case "Donghua":
                params[0] = params[0].replace("exclude", "include");
                break;
            case "popularity":
                params[1] = params[1].replace("sort=false", "sort=true");
                break;
            case "date":
                params[1] = params[1].replace("sort=true", "sort=false");
                break;
            default:
        }
        setUrlParam(params.join(""));
    };
    const changeSort = (popularity) => setSortByPopularity(popularity);
    const openBurger = (checked) => setOpenMenu(checked);
    useEffect(() => {
        if (!isLoading) return () => { };
        fetchAnimes();
        return () => setIsLoading(false)
    }, [isLoading]);
    useEffect(() => setIsLoading(false), [animeList]);
    useEffect(() => { fetchAnimes(true) }, [urlParam]);
    useEffect(() => { sortByPopularity ? changeUrlParam("popularity") : changeUrlParam("date") }, [sortByPopularity]);
    return (
        <>
            <BurgerButton openBurger={openBurger} openMenu={openMenu} />
            <SideMenu
                changeUrlParam={changeUrlParam}
                sortByPopularity={changeSort}
                openMenu={openMenu}
            />
            <Main
                openBurger={openBurger}
                openMenu={openMenu}
                animeList={animeList}
                isLoading={isLoading}
                updateLoading={updateLoading}
                sortByPopularity={sortByPopularity}
                lastPage={nextPage.split('=')[1] == "null" ? true : false}
            />
        </>
    )
};