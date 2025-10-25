import { IGetManyQueryRequest } from "#Application/Interfaces/Request/SharedRequests.js";
import { Prisma } from "#Infrastructure/Database/Prisma/index.js";

export function buildFindManyArgs<T extends keyof Prisma.TypeMap["model"]>(
  criteria: IGetManyQueryRequest,
  options?: {
    searchableFields?: string[]; // ✅ simpler and flexible
  },
): Prisma.TypeMap["model"][T]["operations"]["findMany"]["args"] {
  // Default page is now 1 (first page)
  const { page = 1, limit = 10, sortBy, sortOrder = "asc", search } = criteria;

  // Guard against a zero or negative page value – treat it as the first page
  const safePage = Math.max(page, 1);

  const args: Prisma.TypeMap["model"][T]["operations"]["findMany"]["args"] = {
    skip: (safePage - 1) * limit,
    take: Math.min(limit, 100),
  };

  if (sortBy) {
    args.orderBy = { [sortBy]: sortOrder };
  }

  if (search && options?.searchableFields?.length) {
    args.where = {
      OR: options.searchableFields.map((field) => ({
        [field]: { contains: search },
      })),
    };
  }

  return args;
}
