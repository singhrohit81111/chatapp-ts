import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { BsDot } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import styles from './styles/styles.module.css';

const UsersList = () => {
    const [users, setUsers] = useState<any>([]);
    const userID = useSelector((state: any) => state.senderId);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const firestore = getFirestore();
                const usersCollection = collection(firestore, "rooms");
                const usersSnapshot = await getDocs(usersCollection);

                const usersData = usersSnapshot.docs.map((doc) => ({
                    name: doc.get("name"),
                    id: doc.get("id"),
                }));

                setUsers([...usersData]);
                console.log(userID);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);


    return (
        <div className={styles.usersList}>
            <h1 className={styles.usersListHeading}>Users List</h1>
            <ul style={{height:`70vh`,overflow:`scroll`}}>
                {users.map((user: any) => (
                    <li key={user.id} style={{ listStyleType: `none`, display: `flex`, justifyContent: `space-between`, marginBottom: `13px` }}>
                        <div>
                            <span className={styles.usersListSymbol}>R</span>
                            <span className={styles.username}>{user.name}</span>
                        </div>
                        <div className={styles.usersListOnlineStatus}>
                            <span style={{ marginTop: `17px` }}>
                                <BsDot size="20" color="green" />
                            </span>
                            online
                        </div>

                        {/* Add other user data fields as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
