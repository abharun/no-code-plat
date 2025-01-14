export enum Operator {
    ADDITION = 'ADD',
    SUBTRACT = 'SUBTRACT',
    MULTIPLY = 'MULTIPLY',
    DIVIDE = 'DIVIDE'
}

export type SendEmailTask = {
  from: string;
  to: string;
  content: string;
};

export type LogMessageTask = {
    message: string;
};

export type CalculationTask = {
    valueA: number;
    valueB: number;
    op: Operator;
}

export type TaskType = {
  type: 'SendEmailTask' | 'LogMessageTask' | 'CalculationTask';
  payload: SendEmailTask | LogMessageTask | CalculationTask;
};