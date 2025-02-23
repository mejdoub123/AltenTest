export interface FetchResponse<T> {
  data: T;
  status: number;
}

async function fetchData<T>(
  url: string,
  options?: RequestInit,
  params?: Record<string, any>
): Promise<FetchResponse<T>> {
  try {
    let fullUrl = url;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          queryParams.append(key, params[key].toString());
        }
      });
      fullUrl = `${url}?${queryParams.toString()}`;
    }
    const defaultHeaders = new Headers(options?.headers || {});
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      defaultHeaders.set("Authorization", `Bearer ${userToken}`);
    }

    const fetchOptions: RequestInit = {
      ...options,
      headers: defaultHeaders,
    };
    const response = await fetch(fullUrl, fetchOptions);

    if (response.status === 403) {
      window.location.href = "/signin";
      throw new Error("Access denied. Please sign in.");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return {
      data,
      status: response.status,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default fetchData;