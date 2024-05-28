import * as React from 'react'
import Image from "next/image"
import Divider from '../Divider/Divider'

export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {

}

const FileUpload = ({
    style,
    ...props
}: FileUploadProps): JSX.Element => {
    //DYNAMIC ID GENERATION WITH UUID
    //const id = uuidv4();
    const [file, setFile] = React.useState<File | null>(null)
    const [imageSourceUrl, setImageSourceUrl] = React.useState("/images/ham-burger.jpg")
    const [loading, setLoading] = React.useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const tempFile = e.target.files[0]
        setLoading(true)
        try {
            if (tempFile) {
                setFile(tempFile);
                setTimeout(() => {
                    handleUpload(tempFile)
                    setLoading(false)
                }, 3000)
                // setIsFileUploaded(true);
                
            }
        }
        catch (error) {
            console.error(error);
        }
       
    }

    const handleUpload = async (file: File) => {

        // API CALL

        // const formData = new FormData()
        // formData.append('file', file)
        // try {
        //     const response = await fetch('http://localhost:3000/upload', {
        //         method: 'POST',
        //         body: formData
        //     });
        //     const data = await response.json();
        // }
        // catch (error) {
        //     console.error(error);
        // }
    }

    React.useEffect(() => {
        if (file)
            setImageSourceUrl(`https://${process.env.DYNAMODB_URL}/burgerPics/${file?.name}`)
    }, [imageSourceUrl, file])


    return (
        <div style={containerStyles}  >
            <div style={{...innerStyles, ...style}} {...props}>
                {!loading ? (
                    <div style={{display: 'flex', flexDirection: "column", justifyContent: 'space-around', alignItems: 'center', height: '60%', width: '75%'}}>
                        {/* <button >Choose File</button>
                        <input type="file" id="file-input" hidden />
                        <p id="file-name">No file chosen</p> */}
                    
                        <button 
                            className="file-button"
                            onClick={() => document.getElementById('file-input')?.click()}
                            style={buttonStyles}>Choose File</button>
                        <input 
                            id="file-input"
                            type="file"
                            name="burger_pic"
                            accept=".jpg, .jpeg, .png"
                            hidden
                            onChange={handleFileChange}
                            />
                        <p id="file-name">
                            {file ? file.name : 'No file chosen'}
                        </p>
                        
                        {/* IMAGE PREVIEW */}
                        {/* <Image src={imageSourceUrl} alt="Burger" fill /> */}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Divider />
            {/* UPLOAD BUTTON */}
             <button disabled={!file} style={buttonStyles}>Upload</button>
        </div>
    )
}

const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

};

const innerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200, 
    height: 200, 
    // backgroundColor: 'lightgray',
    border: '1px solid black',
    borderRadius: 12
};

const buttonStyles: React.CSSProperties = {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'black',
    color: 'white',
    cursor: 'pointer',
    minWidth: 100,
}



export default FileUpload;