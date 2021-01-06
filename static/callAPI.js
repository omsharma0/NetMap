function getClusterDetail(cluster)
{
    var url = "api/getClusterDetail/"+cluster
    console.log(url);
    const ul = document.querySelector('.elementList');
    var HTML = "";
    var x ="";
    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(cluster) {
        console.log(cluster);
        cluster.clusterNEList.forEach(ne => {
        console.log(ne);  
        x =   `<li><div class="NEL"><div class = "inline"><button class="btn1"  onClick="getNEDetail( \`${ ne.id }\` )" > ${ne.name} : ${ne.product} ${ne.swRelease} </button></div>`
        
        switch(ne.status){
          case "IN-SERVICE" :
            x = x +`<div class = "inline1"><span style='color:lawngreen ; font-size:20px;'</span>&#9679  </div></div></li>`;
            break;
          case "DRAFT" :
            x = x +`<div class = "inline1"><span style='color:grey ; font-size:20px;'</span>&#9679  </div></div></li>`;
        }
        
        HTML = HTML + x
    });
    ul.innerHTML = `<li><h3 style="text-decoration:underline">Network Elements</h3></li>` + HTML 
    
    const ul1 = document.querySelector('.NEDetail');
    ul1.innerHTML = `<li><h3 style="text-decoration:underline">Cluster Details</h3></li>
                      <li>Name: ${cluster.name}</li>
                      <li>Type: ${cluster.clusterType}</li>
                      <li>Site: ${cluster.clusters}</li>`
  
    commentsFor = `Cluster ${cluster.name} Updates`
    showComments(cluster.clustercomments,commentsFor);
    setComments("/api/createClusterComment/", cluster.id )
    highlightButton1();
  })
highlightButton();

}


//******************get NE Details ********************************* */

function getNEDetail(NE)
{
    console.log(NE)
    var url = "api/getNEDetail/"+NE;
    const ul = document.querySelector('.NEDetail');
    var HTML = '<table id="NE">';
    var x ="";
    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(NEDetail) {
    for (const [key, value] of Object.entries(NEDetail)){
    console.log(`${key}: ${value}`);
    var displayFields = ["name", "cluster", "networkFunction", "tenant", "created_by"]
    if(key=="interfaces")
      {
       x = `<tr><td>Interfaces:</td><td>`
          
       value.forEach(interface => {
           x = x + `<ul id="myUL2">
                          <li><span class="caret2">${interface.name}</span>
                          <ul class="nested2">
                              <li>Ipv4Address: ${interface.ipv4Address}</li>
                              <li>Ipv6Address: ${interface.ipv6Address}</li>
                              <li>Reference Point: ${interface.referencePoint}</li>
                          </ul>
                        </li>
                    </ul>`;
      // console.log(interface.name);
                  
        })
        x = x + "</td>";
        HTML = HTML + x;
      }
      else if(displayFields.includes(key) ){
        
        x =  `<tr> <td> ${key}</td><td> ${value} </td></tr>`;
        HTML = HTML + x;
      }
      
      console.log(`${key}`);
    
    }
    ul.innerHTML = `<li><h3 style="text-decoration:underline">NE Details</h3></li>` + HTML + "</table>";
    
    commentsFor = `NE ${NEDetail.name} Updates`
    showComments(NEDetail.necomments,commentsFor);
    setComments("/api/createNEComment/", NEDetail.id )
    createTreeView2();
    drawNE1(NEDetail);
    });
 
}


//********************Get Site Details***********************************************/

function getSiteDetail(site)
{
    console.log(document.querySelector('[name=csrfmiddlewaretoken]').value)
    var url = "/api/getSiteDetail/"+site;
    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(SiteDetail) {
    for (const [key, value] of Object.entries(SiteDetail)){
    console.log(`${key}: ${value}`);
    }
    console.log(SiteDetail.sitecomments);
    const ul1 = document.querySelector('.NEDetail');
    ul1.innerHTML = `<li><h3 style="text-decoration:underline">Site Details</h3></li>
                      <li>Name: ${SiteDetail.name}</li>`
                      
    commentsFor = `Site ${SiteDetail.name} Updates`
    
    showComments(SiteDetail.sitecomments,commentsFor);
    setComments("/api/createSiteComment/", SiteDetail.id )
  })



}



//***********************Comments Sections ******************************************/

function showComments(comments, commentsFor) {
  const ul = document.querySelector('.commentsSection');
  var HTML = "<li>*******************************</li>"
  comments.forEach(comment => {
    console.log(comment)
    var d = new Date(comment.created_at)
    HTML = HTML + `<li>By:  ${comment.created_by} , At: ${d.toLocaleString()}</li>
                  <li>------------------------------</li>
                  <li>${comment.title}</li>
                  <li>${comment.comment}</li>
                  <li>*******************************</li>`
  })
  ul.innerHTML = `<h3 style="text-decoration:underline">${commentsFor}</h3>`+HTML

}


//***********************Set Comments ******************************************/

function setComments(url, id) {
  const ul = document.querySelector('.box-form')
  
  var HTML = `<form action="${url}" method="POST" enctype="multipart/form-data" novalidate="" id="commentform">
              <input type="hidden" name="comments" value="${id}">
              <input type=text name="title" placeholder="Enter Update title" required></input>
              <textarea rows="6" name="comment" placeholder="Enter Update details" required></textarea>
              <input type=submit></input>
              </form>`
ul.innerHTML = HTML  
const commentForm = document.getElementById("commentform");
commentForm.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
	event.preventDefault();
	const form = event.currentTarget;
  const url = form.action;
  if (validateForm()!=false){
	try {
		const formData = new FormData(form);
		const responseData = await postFormDataAsJson({ url, formData });
    console.log({ responseData });
    alert("Update recorded");
    form.reset();
	} catch (error) {
    console.error(error);
    alert("Blank Update Form");
  }
}
}

async function postFormDataAsJson({ url, formData }) {
	const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);
  const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
      Accept: "application/json",
      'X-CSRFToken': csrf_token,
		},
		body: formDataJsonString,
	};

	const response = await fetch(url, fetchOptions);

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

	return response.json();
}

function validateForm() {
  var x = document.forms["commentform"]["title"].value;
  if (x == "") {
    alert("Title must be filled out");
    return false;
  }
  var x = document.forms["commentform"]["comment"].value;
  if (x == "") {
    alert("Comment must be filled out");
    return false;
  }
}