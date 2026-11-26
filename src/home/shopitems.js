import React, { useState, useEffect } from "react";
import styles from "../home/home.module.css";
import { axiosInstance } from "../api/axiosConfig";
import Shop from "./shop";
import Timer from "../components/timer/timer";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function ShopItems() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        alert("Error occurred");
      });
  }, []);

  const firstTwoItems = data.slice(0, 2);
  const remainingItems = data.slice(2);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = [...data];
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);

    setData(updatedItems);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.blogList}
            >
              <Timer />
              {firstTwoItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Shop list={item} />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.nextList}
            >
              {remainingItems.map((item) => (
                <Draggable key={item.id} draggableId={item.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Shop list={item} />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default ShopItems;
