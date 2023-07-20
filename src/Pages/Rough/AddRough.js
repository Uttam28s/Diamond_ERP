import React from 'react'
import Layout from '../../PageComponent/Layout'
import { Tabs } from "antd";
import { useState } from 'react';
import AddRoughForm from './AddRoughForm';
import SortingRoughForm from './SortingRoughForm';
import AssignRoughForm from './AssignRoughForm';

const { TabPane } = Tabs;

const AddRough = () => {

    const [activeTab, setActiveTab] = useState("addRough");

    const handleTabChange = (key) => {
        setActiveTab(key);
    };


    return (
        <>
            <div className="w-full max-w-4xl mx-10 mt-10">
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                    <TabPane tab="Add Rough" key="addRough">
                        <AddRoughForm />
                    </TabPane>
                    <TabPane tab="Sorting Rough" key="sortingRough">
                        <SortingRoughForm />
                    </TabPane>
                    <TabPane tab="Assign Rough" key="assignRough">
                        <AssignRoughForm />
                    </TabPane>
                </Tabs>
            </div>

        </>
    )
}

export default AddRough