function User(props) {
    return (
        <section className="userbar">
            <img src="https://placekitten.com/50"></img>
            <h3>{props.username}</h3>
            <p>{props.title}</p>
        </section>
    )
}

export default User;