import React from 'react';


export interface SwiperProps extends React.HTMLAttributes<HTMLDivElement> {
    // data: any[];
    // component: 

}

const Swiper = ({
    children,
    // data,
    style,
    ...props
}: SwiperProps): JSX.Element => {
    return (
        <div style={{...containerStyles, ...style}} {...props}>
            {/* REUSABLE SWIPER??? */}
            {/* {data.map((Component, index) => (
                <Component key={index} />
            ))} */}
            
            {/* THE MAP FUNCTION WILL BE THE CHILDREN */}
            {children}
        </div>
    )
}

const containerStyles: React.CSSProperties = {
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    // boxShadow: '0 0 12px rgba(0, 0, 0, 0.1)', 
};

export default Swiper;