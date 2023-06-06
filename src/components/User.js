import API from "../utils/API"

function User(props) {

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    // handles updating a friend status
    // TODO: all this function to work for a block button, as well
    function handleFriendConfirm(e) {
        e.preventDefault();
        console.log(props.username)
    }

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
                {/* TODO: Also render a cancel button that deletes the friendship? */}
                {props.friendBtn ? (
                    <div>       
                        <button
                            onClick={handleFriendConfirm}
                        >Confirm
                        </button>
                    </div>
                ) : null}
            </section>
        </section>
    )
}

export default User;