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

export type LogMsgTask = {
    message: string;
};

export type CalcTask = {
    valueA: number;
    valueB: number;
    op: Operator;
}

export type TaskType = {
  type: 'SendEmailTask' | 'LogMsgTask' | 'CalcTask';
  payload: SendEmailTask | LogMsgTask | CalcTask;
};