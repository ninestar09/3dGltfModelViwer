export function handleDrop(e, initProject, canvas) {
  const accessoryClass = document.getElementById("accessory-class");
  const shankClass = document.getElementById("shank-class");
  const loading = document.getElementById("loading");
  accessoryClass.textContent = "";
  shankClass.textContent = "";
  loading.style.display = "block";

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
        const parsedModel = e.target.result;
        initProject(canvas, parsedModel, "Rings");
        accessoryClass.textContent = `accessory class = ${jsonObject["accessory_class"]}`;
        shankClass.textContent = `shank class = ${jsonObject["shank_class"]}`;
      }

      reader.readAsDataURL(jsonObject.mesh);

    })
    .catch(error => alert(error))
    .finally(() => loading.style.display = "none");

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