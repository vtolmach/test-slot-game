import { SpinResult, StateResponse } from '../types/game.types';


export class GameApi {
    private static readonly BASE_URL = 'http://localhost:3000/api/game';
    private static readonly DEFAULT_OPTIONS: RequestInit = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    static async currentState(): Promise<StateResponse> {
        const response = await fetch(`${this.BASE_URL}/current`, {
            ...this.DEFAULT_OPTIONS,
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
    }

    static async spin(): Promise<SpinResult> {
        const response = await fetch(`${this.BASE_URL}/spin`, {
            ...this.DEFAULT_OPTIONS,
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
    }


    static async cashOut(): Promise<{ status: string, credits: number, cachedOut: number}> {
        const response = await fetch(`${this.BASE_URL}/cash-out`, {
            ...this.DEFAULT_OPTIONS,
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
    }

    static async start(): Promise<{ status: string, credits: number}> {
        const response = await fetch(`${this.BASE_URL}/start`, {
            ...this.DEFAULT_OPTIONS,
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
    }

    //
    // static async cashOut(sessionId: string): Promise<CashOutResult> {
    //     const response = await fetch(`${this.BASE_URL}/cashout/${sessionId}`, {
    //         ...this.DEFAULT_OPTIONS,
    //         method: 'POST'
    //     });
    //     const data: ApiResponse<CashOutResult> = await response.json();
    //     if (!data.success || !data.data) throw new Error('Failed to cash out');
    //     return data.data;
    // }
}