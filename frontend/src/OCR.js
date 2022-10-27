import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";


export default function OCR() {
    const [result, setResult] = useState('')
    const [loading, setLoading] = useState(false)

    const {
        getRootProps,
        getInputProps,
        acceptedFiles,
        open,
        isDragActive
    } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg']
        },
        noClick: true,
        noKeyboard: true,
    });


    const lists = acceptedFiles.map((list) => (
        <li key={list.path}>
            {list.path} - {list.size} bytes
        </li>
    ));

    const isFormValid = !lists.length

    useEffect(() => {
        if (isFormValid) setResult('')

    }, [isFormValid])

    const handleSubmit = (event) => {
        event.preventDefault();

        let form_data = new FormData()
        acceptedFiles.forEach((file) => {
            setLoading(true)
            form_data.append('file', file)
            axios({
                url: 'http://127.0.0.1:8000/v1/api/ocr-file/',
                method: 'POST',
                data: form_data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    setLoading(false)
                    setResult(res.data.result)

                }).catch((error) => {
                    return error.response;
                })
        })
    };

    return (
        <Box sx={{
            marginTop: 2,
            marginBottom: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'

        }}>
            <Typography component="h1" variant="h5">
                Extracting text in image
            </Typography>
            <Box
                sx={{
                    width: '75%',
                    marginTop: 2,
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '3px #eeeeee dashed',
                    backgroundColor: '#fafafa'
                    

                }}
                {...getRootProps()}
            >

                <Input {...getInputProps()} />
                {isDragActive ? (
                    <p>
                        Release to drop the file here
                    </p>
                ) : (
                    <p>Drag 'n' drop an image file to parse text</p>
                )}
                <Button
                    type="submit"
                    variant="outlined"
                    sx={{ mt: 3, mb: 2, borderRadius: 3, height: 50 }}
                    onClick={open}
                >
                    Select a file
                </Button>
                <aside>
                    <ul>{lists}</ul>
                </aside>
            </Box>
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
                disabled={isFormValid}
            >
                Submit
            </Button>
            {loading ? (
                <CircularProgress />
            ) : (
                <FormLabel id="result-label">Extracted text: {result} </FormLabel>
            )}


        </Box>
    )
}