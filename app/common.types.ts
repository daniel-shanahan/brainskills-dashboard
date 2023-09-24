export type Student = {
  id: string;
  firstName: string;
  lastName: string;
};

export type BrainskillsSession = {
  studentId: string;
  startTime: Date;
  rounds: number;
  totalSeconds: number;
  completedSeconds: number;
};
