
export interface TitleDescriptionProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
}

const TitleDescription = ({
    title,
    description,
    children
}: TitleDescriptionProps): JSX.Element => {
    return (
        <div style={containerStyles}>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
            {children}
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