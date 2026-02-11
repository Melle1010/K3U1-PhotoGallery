const DOM_ImageSection = document.querySelector('#image-section');


async function getData() {
  try {
    const response = await fetch('assets/data/images.json');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function loadData(){
    const imageData = await getData();
    
    for(let i = 0; i < imageData.length; i++){
    let imgElement = document.createElement('img');
    imgElement.src = imageData[i].thumb;
    DOM_ImageSection.appendChild(imgElement); 
    }
}
loadData();


