export type UploadImageInputDTO = {
  file: File
  folder?: string
}

export type UploadImageOutputDTO = {
  id: string
  publicUrl: string
  path: string
  fullPath: string
  fileName: string
}
