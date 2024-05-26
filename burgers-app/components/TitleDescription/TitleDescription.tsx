
export interface TitleDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    children?: React.ReactNode;
}

const TitleDescription = ({
    title,
    description,
    children,
    style,
    ...props
}: TitleDescriptionProps): JSX.Element => {
    return (
        <div style={{...containerStyles, ...style}}>
            <h2>{title}</h2>
            {description && <p style={{marginTop: 4}}>{description}</p>}
            {children && <div style={{marginTop: 8}}>{children}</div>}
        </div>
    )
}

const containerStyles: React.CSSProperties = {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // width: '100%',
    // margin: '0 auto',
    // height: '400px',
    // maxHeight: '400px',
    // backgroundColor: 'lightgray',
    // borderRadius: '12px',
};

export default TitleDescription;