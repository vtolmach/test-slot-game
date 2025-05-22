import { ApiResponse } from "../types/game.types.ts";
import config from '../config/main';

export default class ApiClient {

    private readonly DEFAULT_OPTIONS: RequestInit = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    async request<T>(path: string, method: string, defaultError = 'Failed to make request'): Promise<T> {
        const response = await fetch(`${config.baseUrl}${path}`, {
            ...this.DEFAULT_OPTIONS,
            method
        });
        const data: ApiResponse<T> = await response.json();
        if (data.error || !data.data) throw new Error(defaultError);
        return data.data;
    }

}

