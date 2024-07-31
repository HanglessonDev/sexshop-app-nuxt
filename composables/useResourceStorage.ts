import { ResourceStorageGatewaySupabase } from '~/src/data/resource-storage.gateway.supabase'
import type {
  UploadImageInputDTO,
  UploadImageOutputDTO,
} from '~/src/domain/dto/resource-storage.dto'
import { UploadImageUseCase } from '~/src/usecases/resource-storage/upload-image.usecase'

export const useResourceStorage = () => {
  const supabase = useSupabaseClient()
  const resourceStorageGateway = ResourceStorageGatewaySupabase.create(supabase)
  const uploadImageUseCase = UploadImageUseCase.create(resourceStorageGateway)

  const uploadImage = async (data: UploadImageInputDTO): Promise<UploadImageOutputDTO> => {
    return uploadImageUseCase.execute(data)
  }

  return { uploadImage }
}
