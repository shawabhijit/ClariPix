import {motion , AnimatePresence} from "framer-motion";

const ImagePopover = (
        { clickedImage, setSelectedImage, isGenerating = false }: 
        { clickedImage: any, setSelectedImage : any , isGenerating : boolean}) => 
    {
    return (
        <AnimatePresence>
            {clickedImage && !isGenerating && (
                <motion.div
                    className="fixed w-full h-full inset-0 bg-background bg-opacity-70 flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.img
                        src={clickedImage}
                        alt="Popup"
                        className="rounded-xl max-w-[90vw] max-h-[90vh] shadow-2xl cursor-pointer"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ImagePopover