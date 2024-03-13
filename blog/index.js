let a = "";
    
function gettter(id){
  fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Update the div with the content of the first blog post
    for(let i=0;i<data.Blog.length;i++){
      if(id === i){
      a += `<div id="myModal" class="modal">
      <div class="modal-content">
        <div class="modal-header1">
          <span id="sp2" class="close" onclick="modelClose()">&times;</span>
          <h2>${data.Blog[i].heading}</h2>
        </div>
        <div class="modal-body">
        ${data.Blog[i].content}
      </div>
    </div>
    </div>`
      }
    }
    document.getElementById('modals').innerHTML = a 
    openModel()
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

}

function openModel(){
	var modal = document.getElementById('myModal');
	modal.style.display = "block"
}

function modelClose(){
	document.getElementById('myModal').style.display = "none";
}

window.onclick = function(event) {
  event.target == document.getElementById('myModal')  ? modelClose() : null
}