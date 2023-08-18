const showImages =()=>{
    const imagesInput=document.getElementById('imageInput')
    const imagePreview=document.getElementById('imagePreview')
    document.getElementById('imagePreview').innerHTML=null
    const selectedImages=imagesInput.files
    for (let i=0; i < selectedImages.length; i++){
        const image=document.createElement('img')
        image.src=URL.createObjectURL(selectedImages[i])
        image.style.width="150px";
        image.style.margin="3px"
        imagePreview.appendChild(image)
    }
    }