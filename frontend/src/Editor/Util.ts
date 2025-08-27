export const caseAssetPath = (path :any, caseId = 'photo-editor-ui') =>
    `${process.env.NEXT_PUBLIC_URL_HOSTNAME}${process.env.NEXT_PUBLIC_URL}/cases/${caseId}${path}`;