import React from "react";
import { useUsersContext } from "../context/UsersContext";
import UserCard from "../components/UserCard";
import styles from "./home.module.css";

const Home: React.FC = () => {
  const { status, error, users, refetch } = useUsersContext();

  if (status === "loading")
    return (
      <main className={styles.container}>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <span className={styles.loader}></span>
        </div>
      </main>
    );

  if (status === "error")
    return (
      <main className={styles.container}>
        <p>Could not load users. {error}</p>
        <button onClick={refetch}>Try again</button>
      </main>
    );

  return (
    <main className={styles.container}>
      <h1>Users</h1>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={refetch}>Reload users</button>
      </div>
      <div className={styles.grid}>
        {users.map((u) => (
          <div key={u.id} className={styles.cardItem}>
            <UserCard user={u} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;

