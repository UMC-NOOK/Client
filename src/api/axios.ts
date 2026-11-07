import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  const isAuthRequest =
    config.url?.includes("/auth/oauth") ||
    config.url?.includes("/auth/dev/login") ||
    config.url?.includes("/auth/reissue");

  if (accessToken && !isAuthRequest) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// HTTP 429 공통 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (
      !axios.isAxiosError(error) ||
      error.response?.status !== 429
    ) {
      return Promise.reject(error);
    }

    const data = error.response.data as {
      result?: {
        title?: string;
        description?: string;
      } | null;
    } | null;

    const title =
      data?.result?.title ||
      "요청 횟수를 초과했습니다.";

    const description =
      data?.result?.description ||
      "잠시 후 다시 시도해 주세요.";

    window.dispatchEvent(
      new CustomEvent("api-rate-limit", {
        detail: { title, description },
      }),
    );

    return Promise.reject(error);
  },
);

if (import.meta.env.DEV) {
  (
    window as Window & {
      test429?: () => Promise<void>;
    }
  ).test429 = async () => {
    try {
      await api.request({
        url: "/test-429",
        method: "GET",

        // 실제 서버 요청 없이 가짜 429 응답 생성
        adapter: async (config) => {
          throw new axios.AxiosError(
            "Request failed with status code 429",
            "ERR_BAD_REQUEST",
            config,
            undefined,
            {
              data: {
                isSuccess: false,
                code: "COMMON-006",
                message:
                  "요청 횟수를 초과했습니다. 잠시 후 다시 시도해 주세요.",
                result: {
                  title: "요청 횟수를 초과했습니다.",
                  description: "잠시 후 다시 시도해 주세요.",
                },
              },
              status: 429,
              statusText: "Too Many Requests",
              headers: {},
              config,
            },
          );
        },
      });
    } catch (error) {
      console.log("429 테스트 완료:", axios.isAxiosError(error));
    }
  };
}