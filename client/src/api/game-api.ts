import { CashOutResponse, SpinResponse, StartResponse, StateResponse } from '../types/game.types';
import ApiClient from './api-client.ts';


class GameApi {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  currentState() {
    return this.apiClient.request<StateResponse>('/current', 'GET', 'Error on current state request');
  }

  spin() {
    return this.apiClient.request<SpinResponse>('/spin', 'POST', 'Error on spin request');
  }

  cashOut() {
    return this.apiClient.request<CashOutResponse>('/cash-out', 'POST', 'Error on cash out request');
  }

  async start() {
    return this.apiClient.request<StartResponse>('/start', 'POST', 'Error on start request');
  }

}

const gameApi = new GameApi();
export default gameApi;