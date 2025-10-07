import { AppError } from "#Globals/Utils/AppError.js";
import status from "http-status";
import { ZodType, ZodError } from "zod";
import { Request } from "express";

export function ZodValidation(schema: ZodType<any>, dtoLocation: "body" | "params" | "query" = "body") {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const req: Request = args[0];
        const dto = req[dtoLocation];

        /* if (!dto || !Object.keys(dto).length) {
          dto = undefined;
        } */

        const parsedDto = await schema.parseAsync(dto);

        if (parsedDto)
          switch (dtoLocation) {
            case "body":
              req.body = parsedDto;
              break;

            case "params":
              Object.assign(req.params, parsedDto);
              break;

            default:
              break;
          }

        return originalMethod.apply(this, args);
      } catch (error: any) {
        if (error instanceof ZodError) {
          const message = error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
          throw new AppError(`Validation failed: ${message}`, status.BAD_REQUEST, error);
        }

        throw new AppError(`${error.message}`, status.BAD_REQUEST, error);
      }
    };

    return descriptor;
  };
}
