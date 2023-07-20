import React from 'react'
import vpplex from '../assets/logo.png'
import { DiscountPrice, currencyFormat } from '../Pages/OrderDetail'
import { dateConverter } from '../Component/const'

const OrderFields = ({ title, value }) => {
    return (
        <div className='flex  my-1'>
            <div className='text-sm text-gray-500  font-semibold'>{title} : </div>
            <div className='text-sm font-semibold ml-1'> {value}</div>
        </div>
    )
}
const TotalField = ({ title, value }) => {
    return <div className='flex w-full justify-end text-base font-normal'>
        <div className='flex justify-end px-4 w-[50%]'> {title}</div>
        <div className='flex justify-end w-[30%] text-black font-semibold'> {value}</div>
    </div>
}

const BillTemplate = ({ data }) => {
    const address = data?.address
    return (
        <div className="p-5">
            <div className='px-5 h-[96vh] border-[1px] border-gray-400 rounded'>
                <div className="flex-col justify-around items-center">
                    <div className=''>
                        <div className='flex justify-center'>
                            <img src={vpplex} alt="Not Found" className='h-24 w-24 object-contain' />
                        </div>
                        <div className='font-semibold text-gray-600'>Address of Vpplex</div>
                    </div>
                    <hr className='my-2' />
                    <div className="flex flex-col justify-start mt-2">
                        {/* <p className='font-semibold text-sm underline'>BILL TO</p> */}
                        <div className='mt-1'>
                            <div className='w-full flex'>

                                <div className='flex-col w-1/2 '>
                                    <OrderFields title='OrderId' value={data?.orderId} />
                                    <OrderFields title='Name' value={data?.userId?.firstName + ' ' + data?.userId?.lastName} />
                                </div>
                                <div className='flex-col w-1/2 '>
                                    <OrderFields title='Date' value={dateConverter(data?.orderDate)} />
                                    <OrderFields title='Phone Number' value={data?.userId?.phoneNumber} />
                                </div>
                            </div>
                            <OrderFields title='Address' value={`${address?.area}, ${address?.city}, ${address?.state}, ${address?.country} - ${address?.pinCode} `} />
                        </div>
                    </div>
                </div>
                <div className='mt-4 mb-2'>
                    <hr />
                    <div className='text-center font-semibold py-1'>
                        TAX INVOICE
                    </div>
                    <hr className='w-full'/>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead className='border-b-[1px]'>
                            <tr>
                                <th>Index</th>
                                <th>Product Name</th>
                                <th>Variant</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <div className='h-2'></div>
                        <tbody>
                            {data?.products?.map((ele, index) => (
                                <>
                                    <tr key={index} className="align-middle border-b-[1px]">
                                        <td><p className='text-center'>{index + 1}</p></td>
                                        <td className='flex mb-1 ml-3'>
                                            <img src={ele?.variantId ? ele?.variantData?.image?.[0] : ele?.productId?.image?.[0]} alt='Not Found' className='w-12 h-12 rounded-md' />
                                            <p className='ml-3 text-sm font-[500]'>
                                                {
                                                    ele?.variantId
                                                        ? ele?.variantData?.title?.length > 70 ? ele?.variantData?.title?.slice(0, 70) + '..' : ele?.variantData?.title
                                                        : ele?.productId?.product_name > 70 ? ele?.productId?.product_name?.slice(0, 70) + '..' : ele?.productId?.product_name
                                                }
                                            </p>
                                        </td>
                                        <td className=''>{
                                            ele?.variantId ?
                                                <>
                                                    {ele?.variantData?.variants_type?.map((ele, index) => {
                                                        return (
                                                            <div className='flex justify-center items-center'>
                                                                <span className='text-gray-500 text-sm font-semibold'>{ele?.type}:</span>
                                                                <span className='font-[500] text-xs ml-1'>{ele?.value}</span>
                                                            </div>
                                                        )
                                                    })}

                                                </>
                                                :
                                                <div className='flex justify-center items-center'> - </div>

                                        }</td>
                                        <td className='font-[500] text-center  '>{ele?.quantity}</td>
                                        <td className='font-[500] text-center '>{DiscountPrice(ele?.amount, ele?.discount)}/- {data?.priceType === 'inr' ? "Rs." : "AED"}</td>
                                    </tr>
                                    <div className='h-1'> </div>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>


                {/* <hr className='my-4' /> */}
                <div className='flex justify-content-between align-items-start mt-6'>
                    <div className='w-1/2'>
                        <div className='text-xl'>
                            From Vpplex
                        </div>
                        <div className='mt-12 text-base'>Auth. Sign</div>
                    </div>
                    <div className="text-right w-1/2">
                        <TotalField title='Total Amount' value={`${data?.orderAmount}/- ${data?.priceType === 'inr' ? 'Rs.' : 'AED'}`} />
                        <TotalField title='Shipping Charge' value={`${data?.shippingCharge}/- ${data?.priceType === 'inr' ? 'Rs.' : 'AED'}`} />
                        <div className='flex justify-end my-2'> <hr className='w-3/4' /> </div>
                        <TotalField title='Grand Total' value={`${currencyFormat(data?.totalAmount)}/- ${data?.priceType === 'inr' ? 'Rs.' : 'AED'}`} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillTemplate
