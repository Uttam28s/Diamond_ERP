import { Spin } from "antd"

const Spinner = ({ size, className }) => {
    return (
        <div className='flex justify-center items-center w-full h-screen'>
            <Spin size={"large"} className={`${className} text-green`} />
        </div>
    )
}

export const ButtonSpinner = ({ size, color }) => {
    return (
        <div className='ml-2'>
            <Spin size={size} className="text-white" />
        </div>
    )
}
export default Spinner;