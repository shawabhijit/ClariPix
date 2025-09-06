

export default function LaptopMockup({ imageSrc, alt = "" } : { imageSrc: string; alt?: string }) {
    return (
        <div className="relative w-full flex justify-center lg:justify-end">
            <div className="relative w-full">
                <div className="relative">
                    <div className="bg-primary/30 from-gray-800 to-gray-900 rounded-xl p-4 shadow-2xl">
                        <div className="relative bg-black rounded-lg overflow-hidden shadow-inner">
                            <div className="aspect-video bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center relative">
                                <img
                                    src={"https://imgs.search.brave.com/L0aPYDsCqYzH-_m0pzzoeqKyyUMiTzNvPm4o3mmtas0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE5/Nzg0NzIwNC9waG90/by9saXZlLXZpZGVv/LWNvbnRlbnQtb25s/aW5lLXN0cmVhbWlu/Zy1tYXJrZXRpbmct/Y29uY2VwdC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9N0x4/ck1jam4xb0RHV3lS/Vjl1aEhGZXZncHd4/NFIxZy1OTktYc3Nf/QWpLOD0"}
                                    alt={alt}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-lg"></div>
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