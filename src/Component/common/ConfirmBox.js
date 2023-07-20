import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

export const ConfirmBox = ({ title, onOk, flag}) => {

    return Modal.confirm({
        title: `${flag === 'user' ? title : `Are you sure want to delete this ${title} ?`}`,
        icon: <ExclamationCircleFilled />,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: onOk,
    });
}; 