import * as React from 'react';
const { useState, useEffect } = React;
import './style.scss';

const sideBtn = [{
    asianChar: "アニメ",
    title: "Anime",
    id: "animeBtn"
},
{
    asianChar: "动画",
    title: "Donghua",
    id: "donghuaBtn"
}
];

interface sideMenuProps {
    changeUrlParam: Function,
    sortByPopularity: Function,
    openMenu: boolean
}

export const SideMenu: React.FC<sideMenuProps> = ({ changeUrlParam, sortByPopularity, openMenu }) => {
    const [animeType, setAnimeType] = useState(sideBtn[0].title);
    const pressButton = e => setAnimeType(e.target.classList[0]);
    const changeSort = e => sortByPopularity(e.target.checked);
    useEffect(() => {
        changeUrlParam(animeType);
    }, [animeType]);
    return (
        <div className={`sideMenu ${openMenu ? "open" : ""}`}>
            {sideBtn.map(btnData => (
                <div key={btnData.id} onClick={pressButton} className={`${btnData.title} sideMenuItem button ${animeType == btnData.title ? "active" : ""}`} id={btnData.id}>
                    <h1>{btnData.asianChar}</h1>
                    <h2>{btnData.title}</h2>
                </div>
            ))}
            <div className="sideMenuItem sort">
                <div className="sortContainer">
                    <h2>SORT</h2>
                    <label htmlFor="sortCheckBox" className="switch">
                        <input onChange={changeSort} type="checkbox" name="sortCheckBox" id="sortCheckBox" />
                        <span className="slider round"></span>
                    </label>
                    <h2>Popularity</h2>
                </div>
            </div>
        </div>
    )
}