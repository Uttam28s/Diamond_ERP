import { Avatar, Dropdown } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "../routes/route";
import logo from "../assets/logo.png"
export const HeaderTitle = () => {
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
        <div className="text-black bg-white font-bold shadow-md flex justify-between py-2 top-0 sticky">
            <div className=" text-black text-lg px-1 font-bold w-2/12 text-center">
                   Diamond ERP
                
            </div>
            <div className="flex justify-end me-2 w-10/12">
                <div className="flex justify-center items-center">
                    <div className="me-2 text-pink">
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
                            <Avatar className="text-white bg-pink font-bold text-lg cursor-pointer">A</Avatar>

                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
};