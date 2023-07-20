import { Col, Input, Select } from 'antd'
import React from 'react'
import PrimaryButton from './Button'

const CommonSelectFilter = ({ optionData, pagination, value, setValue, setPagination, title }) => {
    return (
        <Col span={8} className="flex px-8 mx-3 justify-center">
            <Select
                className="cursor-pointer w-full"
                placeholder={`Select a ${title}`}
                options={optionData}
                showSearch
                optionFilterProp="children"
                value={value}
                onChange={(value) => {
                    setValue(value)
                    setPagination({ ...pagination, [title]: value })
                }}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
            />
        </Col>
    )
}

export default CommonSelectFilter

export const OnChangeFilter = ({ value, title, setValue, pagination, setPagination }) => {
    return (
        <Col span={6} className="flex px-6 justify-center w-full">
            <Input
                className="w-full"
                placeholder={`Enter ${title}`}
                allowClear
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                    if (e.target.value?.length > 3) {
                        setPagination({ ...pagination, [title]: e.target.value })
                    }
                }}
            />
        </Col>
    )
}

export const ClearButton = ({ setValue, setPagination }) => {
    return (
        <Col span={4} className="flex px-3  justify-center">
            <PrimaryButton
                className="my-auto mx-5"
                onClick={() => {
                    setValue(undefined);
                    setPagination({ pageSize: 0, skip: 0 })
                }}
                title="clear"
            />
        </Col>
    )
}