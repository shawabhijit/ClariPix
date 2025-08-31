export const uploadToCloudninary = async (image: any) => {
    const cloud_name = "dvkvr88db";
    const upload_preset = "CleriPix";

    if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/upload`, {
            method: "POST",
            body: data
        });

        const fileData = await res.json();
        //console.log("Cloudinary Response:", fileData); // 👈 check full response

        return fileData.secure_url; // ✅ use secure_url instead of url
    } else {
        console.log("error : Pics not found");
    }
};


// base64 to File
export function base64ToFile(base64String: string, filename: string): File {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)![1]; // extract MIME type (e.g. image/png)
    const bstr = atob(arr[1]); // decode base64
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}
