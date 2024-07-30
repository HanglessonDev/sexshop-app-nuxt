export interface Usecase<InputDTO, OutputDTO> {
  execute(data: InputDTO): Promise<OutputDTO>
}
