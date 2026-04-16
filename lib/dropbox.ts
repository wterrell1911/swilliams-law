const DROPBOX_API_URL = "https://api.dropboxapi.com/2"
const DROPBOX_CONTENT_URL = "https://content.dropboxapi.com/2"

export async function getDropboxAccessToken(): Promise<string> {
  const refreshToken = process.env.DROPBOX_REFRESH_TOKEN
  const appKey = process.env.DROPBOX_APP_KEY
  const appSecret = process.env.DROPBOX_APP_SECRET

  if (!refreshToken || !appKey || !appSecret) {
    throw new Error("Dropbox OAuth credentials not configured (DROPBOX_REFRESH_TOKEN, DROPBOX_APP_KEY, DROPBOX_APP_SECRET)")
  }

  const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: appKey,
      client_secret: appSecret,
    }),
  })

  if (!response.ok) {
    const errBody = await response.text()
    throw new Error(`Dropbox token refresh failed: ${response.status} ${errBody}`)
  }

  const data = await response.json()
  return data.access_token
}

export async function createDropboxFolder(token: string, path: string): Promise<void> {
  const response = await fetch(`${DROPBOX_API_URL}/files/create_folder_v2`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path, autorename: false }),
  })

  if (!response.ok) {
    const errBody = await response.text()
    if (errBody.includes("path/conflict") || response.status === 409) {
      return
    }
    throw new Error(`Dropbox create_folder failed for ${path}: ${response.status} ${errBody}`)
  }
}

export async function uploadToDropbox(
  token: string,
  path: string,
  fileData: File | Blob
): Promise<void> {
  const arrayBuffer = await fileData.arrayBuffer()

  const response = await fetch(`${DROPBOX_CONTENT_URL}/files/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/octet-stream",
      "Dropbox-API-Arg": JSON.stringify({
        path,
        mode: "add",
        autorename: true,
        mute: false,
      }),
    },
    body: arrayBuffer,
  })

  if (!response.ok) {
    const errBody = await response.text()
    throw new Error(`Dropbox upload failed for ${path}: ${response.status} ${errBody}`)
  }
}

export async function getDropboxTemporaryLink(token: string, path: string): Promise<string> {
  const response = await fetch(`${DROPBOX_API_URL}/files/get_temporary_link`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path }),
  })

  if (!response.ok) {
    const errBody = await response.text()
    throw new Error(`Dropbox get_temporary_link failed for ${path}: ${response.status} ${errBody}`)
  }

  const data = await response.json()
  return data.link
}
