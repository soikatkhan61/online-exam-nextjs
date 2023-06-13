
export interface ExamData {
    id: number;
    name: string;
    topic: string;
    marks: number;
    duration: number;
    startTime: Date;
    endTime: Date;
    ans_published: boolean;
    questions?: number[]; // Add questions property here
    createdAt: Date;
  }