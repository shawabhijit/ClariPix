import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useState, type Dispatch, type SetStateAction } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type AppContextType = {
    backendUrl: string,
    image: File | boolean;
    setImage: Dispatch<SetStateAction<File | boolean>>;
    resultImage: string | boolean;
    setResultImage: Dispatch<SetStateAction<string | boolean>>;
    removeBg: (selectedImage: File) => Promise<void>;
    generateImage: (prompt: string) => {};
    getAIGeneratedImages: (inference_id: string, token: string | null) => {};
    generatedImages?: string[];
    setGeneratedImages?: Dispatch<SetStateAction<string[]>>;
    isGenerating?: boolean;
    setIsGenerating?: Dispatch<SetStateAction<boolean>>;
    editImage?: string | null;
    setEditImage?: Dispatch<SetStateAction<string | null>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    //console.log(backendUrl)

    const [image, setImage] = useState<boolean | File>(false);
    const [resultImage, setResultImage] = useState<string | boolean>(false);
    const [generatedImages, setGeneratedImages] = useState<string[]>([])
    const [isGenerating, setIsGenerating] = useState(false)

    const [editImage, setEditImage] = useState<string | null>(null);

    const { openSignIn } = useClerk();
    const { getToken } = useAuth();
    const { isSignedIn } = useUser();

    const navigate = useNavigate();


    const removeBg = async (selectedImage: any) => {
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

            const { data: base64Image } = await axios.post(backendUrl + "/images/remove-background", formData,
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
            const response = await axios.post(backendUrl + "/ai/text_to_image/create", { prompt: prompt }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Respose from AI Image generator ..", response);

            if (response.data.status === "ACCEPTED") {
                let inference_id = response.data.inference_id;
                getAIGeneratedImages(inference_id, token);
            }
        }
        catch (error) {
            console.error("Error generating image:", error);
            toast.error("Error generating image. Please try again.");
        }
    }

    const getAIGeneratedImages = async (inference_id: string , token : string | null) => {
        let attempt = 0;
        const maxAttempts = 10; // Maximum number of attempts

        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

        while (attempt < maxAttempts) {
            attempt++;
            const generatedImages = await axios.get(backendUrl + `/ai/images/${inference_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            )
            console.log("Images from AI Image generator ..", generatedImages.data);

            if (generatedImages.data.status === "FINISHED") {
                setIsGenerating(false);
                const urls = generatedImages.data.data.map((img: { url: string }) => img.url);
                setGeneratedImages(urls);
                return;
            } else if (generatedImages.data.status === "FAILED") {
                setIsGenerating(true);
                toast.error("Image generation failed. Please try again.");
                return;
            } else {
                // If still processing, wait for some time before the next attempt
                await delay(3000); // Wait for 3 seconds
            }
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
        getAIGeneratedImages,
        generatedImages,
        setGeneratedImages,
        isGenerating,
        setIsGenerating,
        editImage,
        setEditImage,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;



//a old man setting on a chair reading a book


/*

{
  "status": "FINISHED",
  "data": [
    {
      "id": "fa7baebf-f97d-481f-adac-c05abd087f58",
      "url": "https://aicdn.picsart.com/4ed5ec5b-e1d3-49f1-8b10-b32a352fb12c.jpg",
      "status": "DONE"
    }
  ]
}


981af2be-fde1-4aeb-96d9-095474c2f365
*/
