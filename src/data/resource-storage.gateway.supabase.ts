import type { ResourceStorageGateway } from '../domain/gateways/resource-storage.gateway'
import { SupabaseClient } from '@supabase/supabase-js'
import { generate } from 'short-uuid'
import type { ImageResource } from '../domain/entities/image-resource.entity'

export class ResourceStorageGatewaySupabase implements ResourceStorageGateway {
  private constructor(private readonly supabase: SupabaseClient) {}

  public static create(supabase: SupabaseClient) {
    return new ResourceStorageGatewaySupabase(supabase)
  }
  public async upload(file: File, folder: string | null = null): Promise<ImageResource> {
    if (!file) throw new Error('File not found')

    try {
      const fileName = this.generateFileName(file)
      const filePath = folder ? `${folder}/${fileName}` : fileName

      const { data, error } = await this.supabase.storage.from('app-images').upload(filePath, file)

      if (error) throw error
      if (!data) throw new Error('Upload failed')

      return {
        ...data,
        fileName: fileName,
        publicUrl: this.generatePublicUrl(data.fullPath),
      }
    } catch (err) {
      throw err instanceof Error ? err.message : 'Unknown error'
    }
  }

  private generateFileName(file: File): string {
    const fileExtension = file.name.split('.').pop()
    return `${generate()}.${fileExtension}`
  }

  private generatePublicUrl(path: string): string {
    const baseUrl = 'https://uyzporyljyvnztlgiiex.supabase.co/storage/v1/object/public/'
    return `${baseUrl}${path}`
  }
}
