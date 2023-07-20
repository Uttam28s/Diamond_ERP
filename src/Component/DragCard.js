import React, { useState } from "react";
import { ListManager } from "react-beautiful-dnd-grid";
import { DeleteIconButton } from "./common/IconButton";
import { useEffect } from "react";

const DragCard = ({ listItems, setListItems,handleRemoveImage }) => {
    useEffect(() => {
        setListItems(sortList(listItems))
    }, [])
    const sortList = (list) => {
        return list.slice().sort((first, second) => first.order - second.order);
    };

    const reorderList = (sourceIndex, destinationIndex) => {
        if (destinationIndex === sourceIndex) {
            return;
        }
        const updatedList = [...listItems];
        const sourceItem = updatedList[sourceIndex];

        if (destinationIndex === 0) {
            sourceItem.order = updatedList[0].order - 1;
            setListItems(sortList(updatedList));
            return;
        }

        if (destinationIndex === updatedList.length - 1) {
            sourceItem.order = updatedList[updatedList.length - 1].order + 1;
            setListItems(sortList(updatedList));
            return;
        }

        if (destinationIndex < sourceIndex) {
            sourceItem.order =
                (updatedList[destinationIndex].order + updatedList[destinationIndex - 1].order) / 2;
            setListItems(sortList(updatedList));
            return;
        }

        sourceItem.order =
            (updatedList[destinationIndex].order + updatedList[destinationIndex + 1].order) / 2;
        setListItems(sortList(updatedList));
    };

    const ListElement = ({ item, index }) => {
        return (
            <div className="item">
                <div
                    className="border border-gray h-32 w-32 rounded-lg m-1"
                    style={{ position: "relative" }}
                >
                    <img
                        src={item.image}
                        alt="Not Found"
                        className="rounded-lg p-2 h-full w-full object-contain"
                    />
                    <div className="absolute top-3">
                        <DeleteIconButton
                            buttonColor="text-red"
                            className="delete-icon h-3 w-3"
                            handleClick={() => handleRemoveImage(index)}
                            style={{ position: 'absolute', top: '0', right: '0', zIndex: 1 }}
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="App">
            <ListManager
                items={listItems}
                direction="horizontal"
                maxItems={3}
                render={(item,index) => <ListElement item={item} index={item?.order} />}
                onDragEnd={reorderList}
            />
        </div>
    );
};

export default DragCard