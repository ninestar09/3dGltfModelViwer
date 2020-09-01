export function handleDrop(e, initProject) {
  const file = e.dataTransfer.files[0];

  var formData = new FormData();
  formData.append("file", new Blob([file]), "ringimg.jpg");

  var requestOptions = {
    method: 'POST',
    body: formData
  };

  fetch("http://192.168.0.125:5000/api/estimate", requestOptions)
    .then(response => response.formData())
    .then(result => {
      let jsonObject = {};

      for (const [key, value] of result) {
        jsonObject[key] = value;
      }

      let reader = new FileReader();
      reader.onload = e => {
        const parsedToArrayBufferModel = e.target.result;

        initProject(canvas, parsedToArrayBufferModel, "Rings");
      }

      reader.readAsDataURL(jsonObject.mesh);

    })
    .catch(error => console.log('error', error));

}

export function removeUselessEvents(dropArea) {
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
    document.body.addEventListener(eventName, preventDefaults, false)
  });

  ;['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
  });

  ;['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });

  function highlight(e) {
    dropArea.classList.add('highlight');
  }

  function unhighlight(e) {
    dropArea.classList.remove('highlight');
  }
}

function preventDefaults(e) {
  e.preventDefault()
  e.stopPropagation()
}