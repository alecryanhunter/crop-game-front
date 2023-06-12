import API from "../utils/API";
import "../assets/styles/User.css"

function User(props) {

    const token = localStorage.getItem("token");
    const curUser = localStorage.getItem("username");

    return (
        <section className="userbar">
            <img src={props.profile_pic ? props.profile_pic : "https://placekitten.com/50"} alt="" />
            <section className="userinfo">
                <h3>{props.username}</h3>
                <p>{props.title}</p>
                <div>
                {/* Renders a message if one is passed */}
                {props.message ? (
                    <p>{props.sender ? "Last Sent: " : "Last Received: "}"{props.message}"</p>
                ) : null}
                </div>
                {/* Renders a button if one is passed */}
                {props.friendBtn ? (
                    <div>       
                        <button
                            name={props.username}
                            onClick={props.handleFriendConfirm}
                        >Confirm
                        </button>
                    </div>
                ) : null}
            </section>
        </section>
    )
}

export default User;