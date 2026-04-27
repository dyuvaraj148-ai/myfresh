import React, { useEffect, useState } from 'react'

const DemoBanner = () => {
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        // Check if user has already seen the banner
        const hasSeenBanner = localStorage.getItem('demoBannerSeen')
        if (!hasSeenBanner) {
            setShowModal(true)
            localStorage.setItem('demoBannerSeen', 'true')
        }
    }, [])

    const handleClose = () => {
        setShowModal(false)
    }

    return (
        <>
            {showModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-gradient-to-r from-yellow-400 to-red-500 p-8 rounded-lg shadow-2xl max-w-md text-center'>
                        <h2 className='text-2xl font-bold text-white mb-4'>⚠️ Demo Website</h2>
                        <p className='text-white text-lg mb-6'>
                            This is a demo website for educational purposes only. No real transactions will occur.
                        </p>
                        <button 
                            onClick={handleClose}
                            className='bg-white text-red-500 font-bold px-8 py-2 rounded-lg hover:bg-gray-100 transition'
                        >
                            I Understand
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default DemoBanner
