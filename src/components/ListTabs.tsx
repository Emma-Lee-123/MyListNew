import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import ListItems from "./ListItems";
import type { TabsProps } from "../models/TaskItem";

const ListTabs: React.FC<TabsProps> = ({
  taskItems,
  selectedTab,
  setSelectedTab,
  handleDeleteTaskItem,
  handleSetTaskItemComplete,
}) => {
  const tabs: string[] = ["All", "Active", "Completed"];

  const getFilteredCount = (tab: string) => {
    if (tab === "All") return taskItems.length;
    if (tab === "Active")
      return taskItems.filter((item) => !item.isCompleted).length;
    return taskItems.filter((item) => item.isCompleted).length;
  };

  return (
    <Tabs
      activeKey={selectedTab}
      onSelect={(key) => key && setSelectedTab(key)}
      className="mb-3"
      justify
    >
      {tabs.map((tab) => (
        <Tab
          key={tab}
          eventKey={tab}
          title={
            <span>
              {tab}{" "}
              <span className="text-muted">({getFilteredCount(tab)})</span>
            </span>
          }
        >
          <ListItems
            taskItems={taskItems}
            selectedTab={tab}
            handleDeleteTaskItem={handleDeleteTaskItem}
            handleSetTaskItemComplete={handleSetTaskItemComplete}
          />
        </Tab>
      ))}
    </Tabs>
  );
};

export default ListTabs;
