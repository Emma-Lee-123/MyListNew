export type TaskItem = {
  id: number;
  userId: number;
  taskName: string;
  isCompleted: boolean;
  category: string;
};

export type TabsProps = {
  taskItems: TaskItem[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  handleDeleteTaskItem: (id: number) => void;
  handleSetTaskItemComplete: (id: number) => void;
};

export type ListItemsProps = {
  taskItems: TaskItem[];
  selectedTab: string; // 'All' | 'Completed' | 'Active';
  handleDeleteTaskItem: (id: number) => void;
  handleSetTaskItemComplete: (id: number) => void;
};

export type ListItemInputProps = {
  handleAddTaskItem: (taskName: string) => void;
};
