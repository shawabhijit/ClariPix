import { useContext, useEffect, useState } from "react"
import { useAuth, useUser } from "@clerk/clerk-react"
import { AppContext } from "./AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const UserSyncHandler = () => {

    const {isLoaded , isSignedIn , getToken } = useAuth();
    const {user} = useUser();
    const [synced , setSynced] = useState(false);
    const {backendUrl} = useContext<any>(AppContext);


    useEffect(() => {

        const saveUser = async () => {
            if (!isLoaded || !isSignedIn || synced) {
                return;
            }

            try {
                const token = await getToken();

                const userData = {
                    clerkId: user?.id,
                    email: user?.primaryEmailAddress?.emailAddress,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                };

                const response = await axios.post(`${backendUrl}/users`, userData, {
                    headers: {
                        "Authorization" : `Bearer ${token}`,
                    },
                });
                console.log("User synced successfully:", response.data);
                if (response.data.success == true) {
                    // toast.success("User synced successfully");
                    console.log('User Successfully created.');
                }
                setSynced(true);
                //TODO : update the user credits
            }
            catch (error) {
                console.error("Error syncing user:", error);
                toast.error("User sync failed. Please try again later.");
            }
        }
        saveUser();
    },[isLoaded , isSignedIn , user , synced , getToken])
    return null
}

export default UserSyncHandler