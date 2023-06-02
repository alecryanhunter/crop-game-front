function User(props) {
    return (
        <section className="userbar">
            <img src="https://placekitten.com/50"></img>
            <section className="userinfo">
                <h3>{props.username}</h3>
                <p>{props.title}</p>
                <div>
                {props.message ? (
                    <>
                        <p>{props.sender ? "You sent: " : "They sent: "}{props.message}</p>
                    </>
                ) : null}
                </div>
            </section>
        </section>
    )
}

export default User;