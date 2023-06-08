import { useState } from "react";

function Shop() {

    const [bundles, setBundles] = useState([]);

    

    return (
        <section className="page">
            <h2>Shop</h2>
            <section className="shop subpage">
                <h3>Your Coins: 130</h3>
                <h3>Expansions</h3>
                <hr/>
                <ul>
                    <li>The Riverside Expansion</li>
                </ul>
                <h3>Titles</h3>
                <hr/>
                <ul>
                    <li>Crop King</li>
                    <li>Farmhand</li>
                    <li>Grainee</li>
                    <li>Potato Main</li>
                </ul>
                <h3>Skins</h3>
                <hr/>
                <ul>
                    <li>Mega Carrot</li>
                    <li>Pears</li>
                </ul>
            </section>
        </section>
    )
}

export default Shop;