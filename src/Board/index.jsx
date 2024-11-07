import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import { Box, Typography } from "@mui/material";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useDataProvider, useListContext } from "react-admin";
import { useMutation } from "react-query";
import { ItemsByStatus, getItemsByStatus, statuses } from "../helpers/statuses";
import { MyDataProvider } from "../services/dataProvider";
import BoardColumn from "../BoardColumn";
import BoardView from "../BoardView";
import apiFetch from "../services/apiFetch";

export const Board = () => {
  // const { data: unorderedItems, isLoading, refetch } = useListContext();
  const isLoading = false;
  const [unorderedItems, setUnorderedItem] = useState();

  useEffect(() => {
    if (!unorderedItems) {
      apiFetch(`applications?token=${window.localStorage.getItem("token")}`, {
        method: "GET",
      }).then(async (data) => {
        data.json().then((data) => setUnorderedItem(data));
      });
    }
  }, [unorderedItems]);

  const [itemsByStatus, setItemsByStatus] = useState(getItemsByStatus([]));

  useEffect(() => {
    if (unorderedItems) {
      const newItemsByStatus = getItemsByStatus(unorderedItems);
      if (!isEqual(newItemsByStatus, itemsByStatus)) {
        setItemsByStatus(newItemsByStatus);
      }
    }
  }, [unorderedItems]);

  if (isLoading) return null;

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;
    const sourceItem = itemsByStatus[sourceStatus][source.index] || {};
    const destinationItem = itemsByStatus[destinationStatus][
      destination.index
    ] ?? {
      status: destinationStatus,
      index: undefined, // undefined if dropped after the last item
    };

    // compute local state change synchronously
    setItemsByStatus(
      updateItemStatusLocal(
        sourceItem,
        { status: sourceStatus, index: source.index },
        { status: destinationStatus, index: destination.index },
        itemsByStatus
      )
    );

    apiFetch(
      `applications/${sourceItem.id}?token=${window.localStorage.getItem(
        "token"
      )}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: destinationItem.status,
        }),
      }
    ).then(async (data) => {});

    console.warn(`[sourceItem, destinationItem]`, sourceItem, destinationItem);

    // trigger the mutation to persist the changes
  };

  return (
    <Box sx={{ paddingY: 5, paddingX: 5, width: "100vw", overflow: "scroll" }}>
      <Typography variant="h2" sx={{ marginBottom: 3 }}>
        Mon suivi de candidatures
      </Typography>

      <DragDropContext onDragEnd={onDragEnd}>
        <Box display="flex" gap={2}>
          {itemsByStatus &&
            statuses.map((status) => (
              <BoardColumn
                status={status}
                items={itemsByStatus[status]}
                key={status}
              />
            ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

const updateItemStatusLocal = (
  sourceItem,
  source,
  destination,
  itemsByStatus
) => {
  if (source.status === destination.status) {
    // moving deal inside the same column
    const column = itemsByStatus[source.status];
    column.splice(source.index, 1);
    column.splice(destination.index ?? column.length + 1, 0, sourceItem);
    return {
      ...itemsByStatus,
      [destination.status]: column,
    };
  } else {
    // moving deal across columns
    const sourceColumn = itemsByStatus[source.status];
    const destinationColumn = itemsByStatus[destination.status];
    sourceColumn.splice(source.index, 1);
    destinationColumn.splice(
      destination.index ?? destinationColumn.length + 1,
      0,
      sourceItem
    );
    return {
      ...itemsByStatus,
      [source.status]: sourceColumn,
      [destination.status]: destinationColumn,
    };
  }
};

export default Board;
