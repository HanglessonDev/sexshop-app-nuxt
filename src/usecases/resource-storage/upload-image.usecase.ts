import type { ResourceStorageGateway } from '~/src/domain/gateways/resource-storage.gateway'
import type { Usecase } from '../usecases'
import type {
  UploadImageInputDTO,
  UploadImageOutputDTO,
} from '~/src/domain/dto/resource-storage.dto'

export class UploadImageUseCase implements Usecase<UploadImageInputDTO, UploadImageOutputDTO> {
  constructor(private readonly resourceStorageGateway: ResourceStorageGateway) {}

  public static create(resourceStorageGateway: ResourceStorageGateway) {
    return new UploadImageUseCase(resourceStorageGateway)
  }

  public async execute(input: UploadImageInputDTO): Promise<UploadImageOutputDTO> {
    const output = await this.resourceStorageGateway.upload(input.file, input.folder ?? null)
    return this.presentOutput(output)
  }
  private presentOutput(output: UploadImageOutputDTO) {
    return {
      id: output.id,
      publicUrl: output.publicUrl,
      path: output.path,
      fullPath: output.fullPath,
      fileName: output.fileName,
    }
  }
}
