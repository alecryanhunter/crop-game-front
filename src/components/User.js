function User(props) {
    return (
        <section className="userbar">
            <img src={props.img ? props.img : "https://placekitten.com/50" } />
            <section className="userinfo">
                <h3>{props.username}</h3>
                <p>{props.title}</p>
                <div>
                {/* Renders a message if one is passed */}
                {props.message ? (
                    <p>{props.sender ? "You sent: " : "They sent: "}{props.message}</p>
                ) : null}
                </div>
                {/* Renders a button if one is passed */}
                {props.friendBtn ? (
                    <div>       
                        <button>
                            Add Friend
                        </button>
                    </div>
                ) : null}
            </section>
        </section>
    )
}

export default User;