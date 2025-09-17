"use client";

import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import { Play } from "lucide-react";

export default function LaptopMockupDemoVideo({
    imageSrc,
    videoSrc,
    alt = "Demo Video",
}: {
    imageSrc: string;
    videoSrc: string;
    alt?: string;
}) {
    return (
        <div className="relative w-[100%] md:max-w-6xl flex justify-center items-center">
            <div className="relative w-full">
                <div className="relative">
                    <div className="bg-primary/30 from-gray-800 to-gray-900 rounded-xl p-4 shadow-2xl">
                        <div className="relative bg-black rounded-lg overflow-hidden shadow-inner">
                            <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center relative">
                                {/* Dialog Trigger (Play Button) */}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer  transition">
                                            <img src={imageSrc} alt="" className="w-full h-full object-cover brightness-60" />
                                            <button className="p-4 absolute rounded-full gradient-primary backdrop-blur-lg transition shadow-md">
                                                <Play className="w-8 h-8 text-white" />
                                            </button>
                                        </div>
                                    </DialogTrigger>

                                    {/* Dialog Content */}
                                    <DialogContent
                                        className=" w-[100%] md:min-w-7xl h-[60%] md:h-[90%] p-0 flex items-center justify-center rounded-xl overflow-hidden"
                                    >
                                        <video
                                            src={videoSrc}
                                            controls
                                            autoPlay
                                            loop
                                            muted
                                            className="w-full h-full object-cover bg-black"
                                        />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Overall Shadow */}
                <div className="absolute -bottom-8 left-8 right-8 h-12 bg-green-400/10 rounded-full blur-xl"></div>
            </div>
        </div>
    );
}
