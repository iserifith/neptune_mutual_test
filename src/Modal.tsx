import React, { FC, useState } from "react";

type Props = {
    children: React.ReactNode;
    showModal: Boolean;
    toggleModal: React.MouseEventHandler<HTMLButtonElement>;
    title: String;
};

const ModalView: FC<Props> = ({ children, showModal, toggleModal, title }) => (
    <>
        {showModal ? (
            <>
                <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                    <div className='relative my-6 mx-auto '>
                        <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                            <div className='relative p-6 min-w-[500px]'>
                                <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                                    <p className='font-semibold text-lg'>
                                        {title}
                                    </p>
                                    <button
                                        className='bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                                        onClick={toggleModal}
                                    >
                                        <span className='text-black text-2xl block outline-none focus:outline-none'>
                                            x
                                        </span>
                                    </button>
                                </div>
                                <div className='my-4 flex flex-col'>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
            </>
        ) : null}
    </>
);

const useModal = () => {
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);

    return { showModal, toggleModal };
};

export { ModalView, useModal };
