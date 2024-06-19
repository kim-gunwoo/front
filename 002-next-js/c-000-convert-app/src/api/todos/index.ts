import { TodoResponseInterface } from '@/types/Todo.types';
import { baseInstance } from '../config';

export class TodoApi {
  static async getAll(params?: any): Promise<TodoResponseInterface[]> {
    try {
      const response = await baseInstance.get('/todos');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
