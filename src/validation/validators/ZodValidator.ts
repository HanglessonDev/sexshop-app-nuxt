import { z, ZodSchema } from 'zod'

export class ZodValidator {
  public static validate<T>(schema: ZodSchema<T>, data: unknown): T {
    try {
      return schema.parse(data)
    } catch (err) {
      const errorMessages = (err as z.ZodError).errors.map((error) => error.message).join(', ')

      throw new Error(`Validation error: ${errorMessages}`)
    }
  }
}
