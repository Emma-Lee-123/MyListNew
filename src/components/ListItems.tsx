import React from "react";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import type { TaskItem, ListItemsProps } from "../models/TaskItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrash,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

const ListItems: React.FC<ListItemsProps> = ({
  taskItems,
  selectedTab,
  handleDeleteTaskItem,
  handleSetTaskItemComplete,
}) => {
  const filteredTaskItems: TaskItem[] =
    selectedTab === "All"
      ? taskItems
      : selectedTab === "Completed"
      ? taskItems.filter((item) => item && item.isCompleted)
      : taskItems.filter((item) => item && !item.isCompleted);

  return (
    <ListGroup variant="flush" className="px-2">
      {filteredTaskItems.length === 0 ? (
        <div className="text-center text-muted py-3">
          No tasks in this category.
        </div>
      ) : (
        filteredTaskItems.map((item) => (
          <ListGroup.Item key={item.id} className="mb-2 rounded shadow-sm">
            <Row className="align-items-center">
              <Col xs={12} sm={8} className="mb-2 mb-sm-0 text-wrap">
                <div
                  className={
                    item.isCompleted
                      ? "text-decoration-line-through text-muted"
                      : ""
                  }
                >
                  {item.taskName}
                </div>
              </Col>
              <Col xs={12} sm={4} className="d-flex justify-content-end gap-2">
                <Button
                  variant={item.isCompleted ? "secondary" : "success"}
                  size="sm"
                  onClick={() => handleSetTaskItemComplete(item.id)}
                >
                  <FontAwesomeIcon
                    icon={item.isCompleted ? faRotateLeft : faCheck}
                  />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteTaskItem(item.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))
      )}
    </ListGroup>
  );
};

export default ListItems;
