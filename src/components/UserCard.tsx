import styles from "./userCard.module.css";
import UserCardBody from "./UserCardBody";
import UserCardFooter from "./UserCardFooter";
import UserCardHeader from "./UserCardHeader";
import { UserCardProvider } from "../hooks/useUserCardContext";
import type { User } from "../context/UsersContext";


const UserCard: React.FC<{ user: User }> = ({ user }) => {
return (
<UserCardProvider user={user}>
<div className={styles.card}>
<UserCardHeader />
<UserCardBody />
<UserCardFooter />
</div>
</UserCardProvider>
);
};


export default UserCard;

