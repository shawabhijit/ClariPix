import { useContext, useState } from "react"
import { Upload, Crop, Type, SlidersHorizontal, Smile, Settings, ArrowLeft } from "lucide-react"
import { AppContext } from "@/context/AppContext"
import { motion } from "framer-motion"
import CaseComponent from "@/Editor/CaseComponent"
import { toast } from "react-hot-toast"
import { Button } from "@/Components/ui/button"
import { useNavigate } from "react-router-dom"

const EditorPage = () => {
    const { editImage, setEditImage } = useContext(AppContext) || {}
    const [dragActive, setDragActive] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const appContext = useContext(AppContext);
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditImage?.(null) // reset previous image
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setEditImage?.(reader.result as string) // convert file to base64 url
            }
            reader.readAsDataURL(file)
        }
    }

    const handleFiles = (files: File[]) => {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            appContext?.setResultImage?.(false);
        } else {
            toast.error("Please upload a valid image file.");
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFiles(files);
        }
    };

    const features = [
        { icon: Crop, text: "Crop & Resize" },
        { icon: Type, text: "Add Text" },
        { icon: SlidersHorizontal, text: "Filters & Effects" },
        { icon: Smile, text: "Stickers & Emojis" },
        { icon: Settings, text: "Adjust Colors & Brightness" }
    ]

    return (
        <div className="relative min-h-screen flex md:flex-col justify-center items-center bg-background max-w-7xl mx-auto px-4 space-y-16">
            <nav className="absolute left-0 top-4 p-4 ">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/')}
                                className="text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Home
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
            {!editImage && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    {/* Left - Upload Box */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight ">
                            Powerful Image
                            <span className="ml-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent text-glow">
                                Editor
                            </span>
                        </h1>
                        <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Edit your images with ease. From basic adjustments to creative
                            enhancements, explore a full set of tools:
                        </p>
                        <ul className="space-y-4">
                            {features.map((f, i) => (
                                <motion.li
                                    key={i}
                                    className="flex items-center space-x-3 text-gray-400"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                >
                                    <f.icon className="w-6 h-6 text-blue-500" />
                                    <span className="text-lg">{f.text}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right - Features */}
                    <motion.label
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full flex flex-col items-center justify-center 
              border-2 border-dashed border-primary rounded-2xl p-16 cursor-pointer 
              hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 
              shadow-lg bg-primary/20"
                    >
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-primary/10 hover:bg-primary/15 p-6 rounded-2xl">
                                <h3 className="text-xl font-semibold mb-4 text-center">Upload Your Image</h3>
                                {/* Upload Zone */}
                                <div
                                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${dragActive
                                        ? 'border-primary bg-primary/10 scale-105'
                                        : 'border-primary/30 hover:border-primary hover:bg-primary/5'
                                        }`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    // onClick={() => fileInputRef.current?.click()}
                                >
                                    <input
                                        // ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />

                                    <div className="space-y-3">
                                        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                                            <Upload className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">Click, paste, or drop files here</p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                JPG, PNG up to 20MB
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Sample Images */}
                                {/* <div className="mt-6">
                                    <div className="flex items-center mb-3">
                                        <div className="flex-1 border-t border-border"></div>
                                        <span className="px-3 text-sm text-muted-foreground bg-background">or try samples</span>
                                        <div className="flex-1 border-t border-border"></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {removeTextSampleImages.map((sample, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSampleImageClick(sample.url)}
                                                className="relative group overflow-hidden rounded-lg border border-border hover:border-primary transition-all duration-300"
                                                title={sample.description}
                                            >
                                                <img
                                                    src={sample.url}
                                                    alt={sample.label}
                                                    className="w-full h-20 object-cover transition-transform group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="absolute bottom-1 left-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <p className="text-xs font-medium text-white truncate">{sample.label}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </motion.label>
                </div>
            )}

            {/* Preview Area */}
            {editImage && (
                <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="min-h-screen bg-background rounded-2xl shadow-xl p-4"
                >
                    <CaseComponent image={editImage} />
                </motion.div>
            )}
        </div>
    )
}

export default EditorPage
