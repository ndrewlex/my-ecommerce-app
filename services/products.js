import { baseUrl } from "../config";
import { handleApiError } from "./errors";

export default async function getProducts() {
  try {
    const res = await fetch(`${baseUrl}/products`);

    if (!res.ok) {
      throw new ApiError(res);
    }
    return {
      data: await res.json(),
    };
  } catch (e) {
    return handleApiError(e);
  }
}

export async function getProductById(id) {
  try {
    const res = await fetch(`${baseUrl}/products/${id}`);

    if (!res.ok) {
      throw new ApiError(res);
    }
    return {
      data: await res.json(),
    };
  } catch (e) {
    return handleApiError(e);
  }
}
