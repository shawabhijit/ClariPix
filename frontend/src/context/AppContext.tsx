import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useState, type Dispatch, type SetStateAction} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type AppContextType = {
    backendUrl: string,
    image: File | boolean;
    setImage: Dispatch<SetStateAction<File | boolean>>;
    resultImage: string | boolean;
    setResultImage: Dispatch<SetStateAction<string | boolean>>;
    removeBg: (selectedImage: File) => Promise<void>;
    generateImage : (prompt: string) => {};
    generatedImages?: string[];
    setGeneratedImages?: Dispatch<SetStateAction<string[]>>;
    isGenerating?: boolean;
    setIsGenerating?: Dispatch<SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    //console.log(backendUrl)

    const [image , setImage ] = useState<boolean | File>(false);
    const [resultImage , setResultImage ] = useState<string | boolean>(false);
    const [generatedImages, setGeneratedImages] = useState<string[]>([])
    const [isGenerating, setIsGenerating] = useState(false)

    const { openSignIn } = useClerk();
    const {getToken} = useAuth();
    const {  isSignedIn } = useUser();

    const navigate = useNavigate();


    const removeBg = async (selectedImage : any) => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }

            setImage(selectedImage);
            setResultImage(false);

            // navigate("/result");

            const token = await getToken();
            const formData = new FormData();
            selectedImage && formData.append("file", selectedImage);

            const { data: base64Image } = await axios.post(backendUrl +"/images/remove-background", formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setResultImage(`data:image/png;base64,${base64Image}`);

            // setCredit((prev) => prev - 1);
        }
        catch (error) {
            console.error("Error removing background:", error);
        }
    }

    const generateImage = async (prompt: string) => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }

            const token = await getToken();

            setIsGenerating(true);
            const response = await axios.post(backendUrl + "/ai/text_to_image/create" , { prompt: prompt },{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Respose from AI Image generator .." , response);

            if (response.data.status === "ACCEPTED") {
                const generatedImages = await axios.get(backendUrl + `/ai/images/${response.data.inference_id}` , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },}
                )
                console.log("Images from AI Image generator .." , generatedImages);
                setGeneratedImages(generatedImages.data);
                setIsGenerating(false);
            }
        }
        catch (error) {
            console.error("Error generating image:", error);
            toast.error("Error generating image. Please try again.");
        }
    }

    const contextValue: AppContextType = {
        backendUrl,
        image,
        setImage,
        resultImage,
        setResultImage,
        removeBg,
        generateImage,
        generatedImages,
        setGeneratedImages,
        isGenerating,
        setIsGenerating
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;



//a old man setting on a chair reading a book 