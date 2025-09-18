import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useState, type Dispatch, type SetStateAction } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type AppContextType = {
    backendUrl: string,
    nitro: boolean | number | string;
    setNitro: Dispatch<SetStateAction<boolean | number | string>>;
    getUserNitroCount?: () => {};
    image: any;
    setImage: Dispatch<SetStateAction<File | boolean>>;
    resultImage: any;
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
    history?: any[];
    setHistory?: Dispatch<SetStateAction<any[]>>;
    getAllUserHistory?: () => {};
    saveUserHistory?: ({ image, sorceType }: { image: string, sorceType: string }) => {};
    deleteUserHistory?: (image: string) => {};
    bgChnageUsingPrompt?: (selectedImage: any, prompt: string | null) => {};
    bgChnageUsingImage?: (selectedImage: any, bgImage: any, bgImageurl: any) => {};
    bgChanged?: boolean;
    setBgChanged?: Dispatch<SetStateAction<boolean>>;
    upScaleImage?: (selectedImage: any) => {};
    imageConverter?: (selectedImage: any, format: string, quality: number, width: number, height: number) => {};
    removeText?: (selectedImage: any) => {};
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [image, setImage] = useState<boolean | File>(false);
    const [resultImage, setResultImage] = useState<string | boolean>(false);
    const [nitro, setNitro] = useState<boolean | number | string>(false);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [editImage, setEditImage] = useState<string | null>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [bgChanged, setBgChanged] = useState(true);

    const { openSignIn } = useClerk();
    const { getToken } = useAuth();
    const { isSignedIn, user } = useUser();

    const navigate = useNavigate();

    const getUserNitroCount = async () => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }
            const token = await getToken();
            const response = await axios.get(backendUrl + `/users/${user.id}/nitroCount`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log("User nitro count ..", response);
            setNitro(response.data);
        }
        catch (error) {
            console.error("Error fetching user nitro count:", error);
            toast.error("Error fetching user nitro count. Please try again.");
        }
    }

    const removeBg = async (selectedImage: any) => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }

            setImage(selectedImage);
            setResultImage(false);

            navigate("/ai/result");

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
            //console.error("Error removing background:", error);
            toast.error("Error removing background. Please try again.");
        }
    }

    const bgChnageUsingPrompt = async (selectedImage: any, prompt: string | null) => {
        try {

            if (!isSignedIn) {
                return openSignIn();
            }

            setImage(selectedImage);
            setResultImage(false);

            const token = await getToken();

            const formdata = new FormData();
            selectedImage && formdata.append("file", selectedImage);
            prompt && formdata.append("prompt", prompt);

            const { data: base64Image } = await axios.post(backendUrl + "/images/replace-background_prompt", formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            setResultImage(`data:image/png;base64,${base64Image}`);
        }
        catch (error) {
            //console.error("Error changing background by prompt:", error);
            toast.error("Error changing background by pormpt , kindly use your personal background.")
        }
    }

    const bgChnageUsingImage = async (selectedImage: any, bgImage: any, bgImageurl: any) => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }
            setImage(selectedImage);
            setResultImage(false);

            const token = await getToken();

            const formdata = new FormData();
            selectedImage && formdata.append("image", selectedImage);
            bgImage && formdata.append("bg_image", bgImage);
            bgImageurl && formdata.append("bg_image_url", bgImageurl);

            const response = await axios.post(backendUrl + "/images/replace-background_image", formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            //console.log("Response from bg change using image ..", response);

            if (response.data) {
                setResultImage(response?.data?.data.url);
            }
            else {
                toast.error("Error changing background by image , kindly use your personal background.")
            }
        }
        catch (error) {
            //console.error("Error changing background by image:", error);
            toast.error("Error changing background by image , kindly use your personal background.")
        }
    }

    const upScaleImage = async (selectedImage: any) => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }

            const token = await getToken();
            setResultImage(false);
            setIsGenerating(true);

            const formdata = new FormData();
            selectedImage && formdata.append("image_file", selectedImage);

            navigate("/ai/upscale-result");

            const response = await axios.post(backendUrl + "/images/upscale", formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                // responseType: "blob",
            })
            console.log("Response from image upscaler ..", response);

            if (response.data) {
                setResultImage(response?.data?.data.url);
            }
            setIsGenerating(false);
        }
        catch (error) {
            console.error("Error upscaling image:", error);
            toast.error("Error upscaling image. Please try again.");
        }
    }

    const imageConverter = async (selectedImage: any, format: string, quality: number, width: number, height: number) => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }
            console.log("Selected image for converter ..", selectedImage, format, quality, width, height);
            const token = await getToken();
            setResultImage(false);
            const formdata = new FormData();
            selectedImage && formdata.append("file", selectedImage);
            formdata.append("format", format);
            // formdata.append("preset" , preset.toString());
            // formdata.append("quality" , quality.toString());

            const { data: arrayBuffer } = await axios.post(
                backendUrl + "/convert/images",
                formdata,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: "arraybuffer", // IMPORTANT for raw bytes
                }
            );
            console.log("Response from image converter ..", arrayBuffer);

            let mimeType = `image/${format.toLowerCase()}`;

            const blob = new Blob([arrayBuffer], { type: mimeType });
            const objectUrl = URL.createObjectURL(blob);

            setResultImage(objectUrl);
        }
        catch (error) {
            console.error("Error converting image:", error);
            toast.error("Error converting image. Please try again.");
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
                getAIGeneratedImages(inference_id);
            }
        }
        catch (error : any) {
            console.error("Error generating image:", error);
            toast.error(error.response?.data?.error || "Error generating image. Please try again.");
        }
    }

    const getAIGeneratedImages = async (inference_id: string) => {
        const token = await getToken();
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

    const getAllUserHistory = async () => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }

            const token = await getToken();

            const response = await axios.get(backendUrl + `/history/get?clerkId=${user?.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            //console.log("User history ..", response.data);
            setHistory(response.data);
        }
        catch (error) {
            //console.error("Error fetching user history:", error);
            toast.error("Error fetching user history. Please try again.");
        }
    }

    const saveUserHistory = async ({ image, sorceType }: { image: any, sorceType: string }) => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }

            const token = await getToken();

            const imageType = image.endsWith('png') ? 'png' : 'jpg';

            const response = await axios.post(backendUrl + `/history/save_image`, {
                clerkId: user?.id,
                image: image,
                imageType: imageType,
                sourceType: sorceType,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                //console.log("Saved user history ..", response.data);
                toast.success("Image saved to history.");
            }
            else {
                toast.error("Error saving image. Please try again.");
            }
        }
        catch (error) {
            //console.error("Error saving user history:", error);
            toast.error("Error saving user history. Please try again.");
        }
    }

    const deleteUserHistory = async (image: string) => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }
            const token = await getToken();
            const response = await axios.delete(backendUrl + `/history/delete?image=${image}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                //console.log("Deleted user history ..", response.data);
                // Update the local history state by removing the deleted image
                setHistory((prevHistory) => prevHistory?.filter((item) => item.image !== image) || []);
                toast.success("Image deleted from history.");
            }
            else {
                toast.error("Error deleting image. Please try again.");
            }
        }
        catch (error) {
            //console.error("Error deleting user history:", error);
            toast.error("Error deleting user history. Please try again.");
        }
    }

    const removeText = async (selectedImage: any) => {
        try {
            if (!isSignedIn) {
                return openSignIn();
            }
            setResultImage(false);
            setIsGenerating(true);

            const token = await getToken();
            const formData = new FormData();
            selectedImage && formData.append("image_file", selectedImage);
            const { data: base64Image } = await axios.post(backendUrl + "/images/remove-text", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            //console.log("Response from text remover ..", base64Image);
            setResultImage(`data:image/png;base64,${base64Image}`);
            setIsGenerating(false);
        }
        catch (error) {
            //console.error("Error removing text from image:", error);
            toast.error("Error removing text from image. Please try again.");
        }
    }

    const contextValue: AppContextType = {
        backendUrl,
        nitro,
        setNitro,
        getUserNitroCount,
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
        history,
        setHistory,
        getAllUserHistory,
        saveUserHistory,
        deleteUserHistory,
        bgChnageUsingPrompt,
        bgChnageUsingImage,
        bgChanged,
        setBgChanged,
        upScaleImage,
        imageConverter,
        removeText,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
