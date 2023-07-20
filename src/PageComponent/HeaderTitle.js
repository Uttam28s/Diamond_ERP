import { Avatar, Dropdown } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../routes/route";
import { UnorderedListOutlined } from "@ant-design/icons";

export const HeaderTitle = ({ open, setOpen }) => {
    const navigate = useNavigate()
    const items = [
        {
            key: '1',
            label: (
                <NavLink className={({ isActive }) => (isActive ? 'no-underline font-bold !bg-white' : 'no-underline font-normal')} to={routes.login} onClick={() => {
                    localStorage.clear();
                    navigate('/')
                }}>
                    Logout
                </NavLink>
            ),
        },
    ]

    return (
        <div className="text-white bg-black font-bold shadow-md flex justify-between py-2 top-0 sticky">
            <div className="flex items-center">
             <UnorderedListOutlined className='ml-2 text-lg pb-1' onClick={() =>setOpen(!open)}/> 
                <div className="text-lg px-1 font-semibold text-center ml-3">
                    Diamond ERP
                </div>
            </div>
            <div className="flex justify-end me-2 w-9/12">
                <div className="flex justify-center items-center">
                    <div className="me-2">
                        admin
                    </div>
                    <div>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottomRight"
                            arrow={{
                                pointAtCenter: true,
                            }}
                        >
                            <Avatar className="text-black bg-white font-bold text-lg cursor-pointer">A</Avatar>

                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
};