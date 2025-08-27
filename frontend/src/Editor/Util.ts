export const caseAssetPath = (path :any, caseId = 'photo-editor-ui') =>
    `${import.meta.env.NEXT_PUBLIC_URL_HOSTNAME}${import.meta.env.VITE_CESDK_LICENSE_KEY}/cases/${caseId}${path}`;