import { useState, useEffect } from "react";
import API from "../utils/API"


function Shop() {

    const [coins, setCoins] = useState('');
    const [purchased, setPurchased] = useState('');
    const [ownedTitleArr, setOwnedTitleArr] = useState([]);
    const [titleArr, setTitleArr] = useState([]);
    // const [expansionArr, setExpansionArr] = useState(["Coming Soon!"]);
    // const [skinArr, setSkinArr] = useState(["Coming Soon!"]);

    const token = localStorage.getItem("token");
    const curUser = localStorage.getItem("username");

    async function profileData() {
        return await API.getProfile(curUser);
    }

    async function shopData() {
        return await API.getShop(token);
    }

    useEffect(()=>{
        profileData().then(data=>{
            setCoins(data.coins);
            setOwnedTitleArr(data.Bundles.filter(bundleObj => bundleObj.type === "Title"));
        });
        shopData().then(data=>{
            setTitleArr(data.filter(bundleObj => bundleObj.type === "Title"));
        })
    }, [purchased]);

    async function purchaseBundle(bundleId) {
        return await API.postBundle(curUser, bundleId, token)
    }

    function handlePurchase(e, bundleId) {
        e.preventDefault();
        purchaseBundle(bundleId)
        .then(res=>{
            if (res.status === 418) {
                alert("Whoops! Looks like that's a bit out of your price range. \nPlay to earn more coins.")
            } else {
                setPurchased(res.json().id);
                console.log(purchased)
            }
        })

    }

    return (
        <section className="page">
            <h2>Shop</h2>
            <section className="shop subpage">
                <h3>Your Coins: {coins}</h3>
                <p><i>Level up your farm by using your in-game winnings to "purchase" Titles, Skins, and Expansions </i></p>
                <h3>Titles</h3>
                <hr/>
                <p><i>NEW! </i>Titles purchased here in the shop will be available to select when editing your profile.</p>
                <ul>
                    {titleArr.length!==0 ? (
                        titleArr.map((titleObj) => (
                            <li key={titleObj.id}>
                                <span>
                                    {titleObj.name}: {titleObj.price} coins
                                </span>
                                <span>
                                    <button type="button" onClick={(e)=>handlePurchase(e, titleObj.id)}>Purchase</button>
                                </span>
                            </li>
                        ))
                    ):(
                        <li>WHOA NELLIE! Looks like you already own all the titles! Check back later for new additions.</li>
                    )
                    }
                    {ownedTitleArr.map((titleObj) => (
                        <li key={titleObj.id}>
                            <span>{titleObj.name}: {titleObj.price} coins</span>
                            <span><i> Purchased </i></span>
                        </li>
                    ))}
                </ul>
                <h3>Skins</h3>
                <hr/>
                <p><i>Coming Soon! </i> Tired of boring potatoes? Change up your in-game crops by purchasing Skins. </p>

                <h3>Expansions</h3>
                <hr/>
                <p><i>Coming Soon! </i> Upgrade your gameplay! Expansions purchased here in the shop will be available to select when hosting a game.</p>

            </section>
        </section>
    )
}

export default Shop;