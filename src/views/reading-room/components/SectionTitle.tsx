import React from 'react';

const SectionTitle = () => {

    return (
        <div className='flex flex-col w-full text-white mt-45'>
            <div className='flex items-start text-xl font-semibold'>
                내 리딩룸
            </div>  
            
            <div className='flex flex-row justify-between w-full items-center'>
                <div className='flex justify-center items-center text-lg font-light'>
                    오늘은 어떤 룸에서 책을 읽을까요?
                </div>
                
                <div className='flex flex-row items-center gap-5'>
                    <div className='flex justify-center items-center text-sm'>
                        모든 리딩룸 보기
                    </div>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="5" height="9" viewBox="0 0 5 9" fill="none">
                        <path d="M0.454545 8.99997C0.394931 9.00069 0.335824 8.98906 0.281026 8.96583C0.226228 8.94261 0.176951 8.90829 0.136364 8.8651C-0.0454545 8.68528 -0.0454545 8.40656 0.136364 8.22674L3.90909 4.49549L0.136364 0.773224C-0.0454545 0.593404 -0.0454545 0.314684 0.136364 0.134865C0.318182 -0.0449549 0.6 -0.0449549 0.781818 0.134865L4.86364 4.1898C5.04545 4.36961 5.04545 4.64833 4.86364 4.82815L0.772727 8.8651C0.681818 8.95501 0.563636 8.99997 0.454545 8.99997Z" fill="white"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default SectionTitle;