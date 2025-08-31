import React, { useCallback, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/Components/ui/button";

interface ImageUploadProps {
    onImageSelect: (file: File) => void;
    selectedImage?: File | null;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    onImageSelect,
    selectedImage,
}) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        const imageFile = files.find(file => file.type.startsWith('image/'));

        if (imageFile) {
            onImageSelect(imageFile);
            const url = URL.createObjectURL(imageFile);
            setPreviewUrl(url);
        }
    }, [onImageSelect]);


    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            onImageSelect(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    }, [onImageSelect]);


    return (
        <div className="w-full max-w-md mx-auto">
            {!previewUrl ? (
                <div
                    className={`rounded-xl p-8 border-2 border-dashed bg-primary/20 text-center transition-all duration-300 ${isDragOver ? 'dragover' : ''
                        }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                            <Upload className="w-8 h-8 text-white" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-foreground">
                                Drop your image here
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                or click to browse files
                            </p>
                        </div>

                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />

                        <Button
                            variant="outline"
                            onClick={() => document.getElementById('image-upload')?.click()}
                            className="glass-card border-2"
                        >
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Choose Image
                        </Button>

                        <p className="text-xs text-muted-foreground">
                            Supports JPG, PNG, WebP • Max 10MB
                        </p>
                    </div>
                </div>
            ) : (
                <div className="glass-card rounded-xl p-4 animate-scale-in">
                    <div className="relative">
                        <img
                            src={previewUrl}
                            alt="Selected image"
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>

                    <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium text-foreground">
                            {selectedImage?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {selectedImage && (selectedImage.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};