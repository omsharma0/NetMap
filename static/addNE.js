function showSubnets(){
    const url = "/api/getSubnets/"
    console.log(url);
    const ul = document.getElementById('subnetList');
    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(subnets) {
        console.log(subnets);
        subnets.forEach(subnet => {
        console.log(subnet);  
        let li = createNode('li');
        let button = createNode ('button')
        let buttonDiv = createNode('div')
        let outerDiv = createNode('div')
        let statusDiv = createNode('div')
        let statusSpan = createNode('span')

        button.className = "btn1"
        //var detailUrl = `/api/getSubnetDetail/${subnet.id}`
        button.onclick = function(){showDetail(`/api/getSubnetDetail/${subnet.id}`)}
        button.innerHTML = `${subnet.name} : ${subnet.ipV4Net} `
        //span.innerHTML = `${subnet.ipV4Net}`
        buttonDiv.className = "inline"
        outerDiv.className = "NEL"
        statusDiv.className = "inline1"
        statusSpan.style.fontSize = "20px"
        statusSpan.innerHTML = "&#9679"

        
        appendNode(buttonDiv, button);
        appendNode(outerDiv, buttonDiv);
        //appendNode(outerDiv, span);
        
        
        
        
        switch(subnet.status){
          case "IN-SERVICE" :
            statusSpan.style.color = "lawngreen";
            appendNode (statusDiv, statusSpan);
            appendNode(outerDiv, statusDiv);
            break;
          case "DRAFT" :
            statusSpan.style.color = "grey";
            appendNode (statusDiv, statusSpan);
            appendNode(outerDiv, statusDiv);
        }

        appendNode(li, outerDiv);
        appendNode(ul, li);
    });
    highlightButton1();
    });
    snackBar();
  
}



function showDetail(url){
    const detailUrl = url
    console.log(url);
    const table = document.getElementById('NE');
    while (table.firstChild) {
        table.removeChild(table.lastChild);
      }
    fetch(detailUrl)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(subnet) {
        console.log(subnet);
        for (const [key, value] of Object.entries(subnet)){
            let tableRow = createNode('tr');
            let tableColKey = createNode('td');
            let tableColValue = createNode('td');
            tableColKey.innerHTML = key;
            tableColValue.innerHTML = value;
            appendNode(tableRow, tableColKey);
            appendNode(tableRow, tableColValue);
            appendNode(table, tableRow);
        }
        commentsFor = `${subnet.name} Updates`
        showComments(subnet.subnetComments,commentsFor);
        setComments("/api/createSubnetComment/", subnet.id )
        const updateForm = document.getElementById('updateForm');
        let button = createNode ('button');
        //let span = createNode('span')
        button.innerHTML = 'Update'
        button.type = 'Submit'
        button.className = 'Xbutton'
        updateForm.action = `/api/getSubnetDetail/${subnet.id}`
        appendNode(updateForm,button);

    })
    
}








function createNode(element) {
    return document.createElement(element);
}

function appendNode(parent, el) {
    return parent.appendChild(el);
}