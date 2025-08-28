import CaseComponent from "@/Editor/CaseComponent"
import { useState } from "react"
import { Upload } from "lucide-react"

const EditorPage = () => {
    const [image, setImage] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result as string) // convert file to base64 url
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className={`min-h-screen p-6 ${!image ? 'flex items-center justify-center' : ''}`}>
            {/* Upload Box */}
            {
                !image && (
                    <label className="w-full max-w-md flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-2xl p-20 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 shadow-sm">
                        <Upload className="w-12 h-12 text-gray-500 mb-4" />
                        <p className="text-gray-600 font-medium">Click to upload</p>
                        <p className="text-gray-400 text-sm mt-1">PNG, JPG up to 5MB</p>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                )
            }

            {/* Preview */}
            {image && (
                <div className="min-h-screen bg-background">
                    <CaseComponent image={image} />
                </div>
            )}
        </div>
    )
}

export default EditorPage
