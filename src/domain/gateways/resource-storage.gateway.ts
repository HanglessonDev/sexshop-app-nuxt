import type { ImageResource } from '../entities/image-resource.entity'

export interface ResourceStorageGateway {
  upload: (file: File, folder: string | null) => Promise<ImageResource>
}
