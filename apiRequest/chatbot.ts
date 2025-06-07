import http from "@/lib/http";


const chatbotApiRequest = {
    get: () => http.get<any>(`/sessions/`),
    post: (body: { query: string }) => http.post<any>(`/question`, body),
}

export default chatbotApiRequest