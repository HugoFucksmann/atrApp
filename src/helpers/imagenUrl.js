const base_url = process.env.REACT_APP_URL;

export const imagenUrl = (img) => {
    if (!img) {
      return `${base_url}/upload/noticias/no-image`;
    } else if (img.includes("https")) {
      return img;
    } else if (img) {
      return `${base_url}/upload/noticias/${img}`;
    } else {
      return `${base_url}/upload/noticias/no-image`;
    }
}

export const fileUrl = (file) => {
  if(!file){
    return '';
  }else if (file.includes('https')){
    return file;
  }else{
    return `${base_url}/upload/files/${file}`;
  }
}

export const publiUrl = (img) => {
  if (!img) {
    return `${base_url}/upload/publi/no-image`;
  } else if (img.includes("https")) {
    return img;
  } else if (img) {
    return `${base_url}/upload/publi/${img}`;
  } else {
    return `${base_url}/upload/no-image`;
  }
};