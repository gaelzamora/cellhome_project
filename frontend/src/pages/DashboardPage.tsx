import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "../store/auth";
import jwt_decode from 'jwt-decode';
import { Token, User } from "../Interfaces";
import { useQuery } from "@tanstack/react-query";
import { get_user } from "../api/users";
import { informationToCards } from "../ts/data";
import CardInformation from "../components/CardInformation";
import { Loader } from "../components/Loader";
import { useState } from "react";
import ShippingAddressModal from "../modal/ShippingAddressModal";

function DashboardPage() {
    const [isOpenAddress, setIsOpenAddress] = useState(false);
    const token: string = useAuthStore.getState().access;
    const tokenDecoded: Token = jwt_decode(token);
    const id = tokenDecoded.user_id;

    const {data: user, isLoading} = useQuery<User>({
        queryKey: ['users', id],
        queryFn: () => get_user(id)
    });

    return (
        <>      
            <div className="w-screen py-6 bg-[#F5F5F7]">
                <div className="w-[73%] mx-auto">
                    <div className="flex border-b-[1px] border-gray-400 pb-3">
                        <p className="flex items-center text-gray-900 font-semibold text-xl">
                            Account
                        </p>
                        <div className="flex flex-1" />
                        <p className="text-blue-600 flex pt-2.5 gap-1 text-xs cursor-pointer">
                            Sign out 
                            <ChevronRightIcon className="w-3" />
                        </p>
                    </div>

                    <div className="capitalize mt-10 font-semibold text-3xl">
                        Hi, {user?.first_name}.
                    </div>
                </div>
            </div>  

            <div className="w-[73%] py-10 mx-auto">
                {isLoading && <Loader />}
                <p className="font-semibold text-3xl">Account Settings</p>
                <div className="mt-5 flex gap-10 my-14">
                    <p className="text-xl font-semibold mr-24">Shipping</p>
                    <div>
                        <p className="font-semibold text-lg">Shipping address</p>
                        <p className="capitalize">{user?.first_name + ' ' + user?.last_name}</p>
                        <p 
                            className="text-blue-600 cursor-pointer"
                            onClick={() => setIsOpenAddress(true)}
                        >
                            Edit
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-lg">Contact information</p>
                        <p className="text-blue-600 cursor-pointer">Edit</p>
                    </div>
                </div>
                <div className="flex mt-2 gap-10">
                    <p className="text-xl font-semibold mr-28">Privacy</p>
                    <div className="w-full">
                        <p className="font-semibold text-lg ">Personal information</p>
                        <p>You're in control of your personal information and can manage your data or delete your account at any time. Apple is committed to protecting your privacy.</p>
                        <p className="text-blue-600 cursor-pointer flex gap-1">Manage my personal information <ChevronRightIcon className="w-3 mt-1" /></p>
                    </div>
                </div>
            </div>
            <div className="py-10 w-screen bg-[#F5F5F7] mt-10">
                <div className="w-[73%] mx-auto">
                    {informationToCards.map(card => (
                        <CardInformation key={card.title} title={card.title} content={card.content} link={card.link} />
                    ))}
                </div>
            </div>

            <ShippingAddressModal isOpenAddress={isOpenAddress} setIsOpenAddress={setIsOpenAddress} />
        </>
    );
}

export default DashboardPage;