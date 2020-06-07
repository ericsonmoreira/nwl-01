import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi';


import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void
};

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {

  const [selextedFileUrl, setSelextedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    // criando a url do arquivo
    const fileUrl = URL.createObjectURL(file);
    // setando essa url.
    setSelextedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {selextedFileUrl ?
        (<img src={selextedFileUrl} alt="Point thumbnail" />) :
        (<p><FiUpload />Imagem do Estabelecimento</p>)
      }
    </div>
  )
}

export default Dropzone;