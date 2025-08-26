import axios from "axios";
import { createContext, useState, type Dispatch, type SetStateAction} from "react";
import { useNavigate } from "react-router-dom";

type AppContextType = {
    backendUrl: string,
    image: File | boolean;
    setImage: Dispatch<SetStateAction<File | boolean>>;
    resultImage: string | boolean;
    setResultImage: Dispatch<SetStateAction<string | boolean>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    //console.log(backendUrl)

    const [image , setImage ] = useState<boolean | File>(false);
    const [resultImage , setResultImage ] = useState<string | boolean>(false);

    const navigate = useNavigate();

    const contextValue: AppContextType = {
        backendUrl,
        image,
        setImage,
        resultImage,
        setResultImage
    }

    const removeBg = async (selectedImage : any) => {
        try {
            // if (!isSignedIn) {
            //     return openSignIn();
            // }

            setImage(selectedImage);
            setResultImage(false);

            // navigate("/result");

            // const token = await getToken();
            const formData = new FormData();
            selectedImage && formData.append("file", selectedImage);

            const { data : base64Image } = await axios.post("http://localhost:8080/api/v1/remove-background", formData);

            setResultImage(`data:image/png;base64,${base64Image}`);

            // setCredit((prev) => prev - 1);
        }
        catch (error) {
            console.error("Error removing background:", error);
        }
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;