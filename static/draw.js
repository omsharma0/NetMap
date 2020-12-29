function drawNE(NEDetail)
{
    let doc = document.getElementById('drawNE')
    while (doc.lastChild) {
    doc.removeChild(doc.lastChild);
    }

    drawRect(doc,"NE",100,50,200,105,"NEl")
    addText(doc,110,80,NEDetail.name,0,"rotate(0)")

//------------Draw Interfaces ------------------------------------


    var x = 100; var y=180; var yShift=25; var xShift = 70; var xInterface = 0;
  
    let doneSubnets =[];

    NEDetail.interfaces.forEach(interface => {
        let doneSubnet = doneSubnets.find(doneSubnet=>doneSubnet.name === interface.subnet.name);
        
        if (doneSubnet === undefined){

        let doneSubnet = {
                "name" : "",
                "x"    : "",
                "y"    : ""
            };
        
        drawRect(doc,"NE",x,y,xShift,20,"subnet");
        addText(doc,x+5,y+15,interface.subnet.name, 60,"rotate(0)");
        doneSubnet.name = interface.subnet.name
        doneSubnet.x = x;
        doneSubnet.y = y;
        doneSubnets.push(doneSubnet);
        drawRect(doc,"interfaceBox",doneSubnet.x+8,130,12,30,"interface");
        addText(doc,doneSubnet.x+10,133,interface.name,20,`rotate(90,${doneSubnet.x+10},133)`);
        connectDots(doc,doneSubnet.x+8+6,160,doneSubnet.x+8+6,y,"lineClass","dotClass");
        x = x + xShift-10;
        y = y + yShift;
        //xInterface = xInterface + 25;
        }
        else {
            xInterface = xInterface + 23;
            drawRect(doc,"interfaceBox",doneSubnet.x+xInterface,130,12,30,"interface");
            connectDots(doc,doneSubnet.x+xInterface+6,160,doneSubnet.x+xInterface+6,doneSubnet.y,"lineClass","dotClass") 
            addText(doc,doneSubnet.x+xInterface+2,133,interface.name,20,`rotate(90,${doneSubnet.x+xInterface+2},133)`);
        }
    
    });
//--------------------Draw interface END-------------------------  

//--------------------Draw Domain ---------------------------------

var lastSubnet = doneSubnets[doneSubnets.length - 1];

var x_d = 100; var y_d=lastSubnet.y+yShift+10; var yShift_d=25; var xShift_d = 70; domainConnectionShift = 28;
console.log(lastSubnet.name)    
console.log(y_d)
    let doneDomains =[];

    NEDetail.interfaces.forEach(interface => {
        let doneDomain = doneDomains.find(doneDomain=>doneDomain.name === interface.subnet.domain.name);
        console.log(interface.subnet.domain.name);
        if (doneDomain === undefined){

        let doneDomain = {
                "subnet":"",
                "name" : "",
                "x"    : "",
                "y"    : ""
            };
        
        drawRect(doc,"NE",x_d,y_d,xShift_d,20,"domain");
        addText(doc,x_d+5,y_d+15,interface.subnet.domain.name,60,"rotate(0)");
        doneDomain.subnet = interface.subnet.name;
        doneDomain.name = interface.subnet.domain.name;
        doneDomain.x = x_d;
        doneDomain.y = y_d;
        doneDomains.push(doneDomain);
        let theSubnet = doneSubnets.find(doneSubnet=>doneSubnet.name === interface.subnet.name)
        connectDots(doc,theSubnet.x+8+6,theSubnet.y+20,doneDomain.x+8+6,y_d,"lineClass","dotClass");
        x_d = x_d + xShift_d-10;
        y_d = y_d + yShift_d;
        //xInterface = xInterface + 25;
        }
        else {
            let doneDomainSubnet = doneDomains.find(doneDomain=>doneDomain.subnet === interface.subnet.name);
            if(doneDomainSubnet==undefined){
                let theSubnet = doneSubnets.find(doneSubnet=>doneSubnet.name === interface.subnet.name)
                connectDots(doc,theSubnet.x+8+6,theSubnet.y+20,doneDomain.x+domainConnectionShift,y_d-yShift_d,"lineClass","dotClass");
                domainConnectionShift = domainConnectionShift + 14
            }
             
        }
    
    });
    if(lastSubnet.x >= 200){
        doc.getElementById('NEl').setAttribute("width", lastSubnet.x);
    }
    


}

//****************************************************************************************** */
function drawNE1(NEDetail)
{
    let doc = document.getElementById('drawNE')
    while (doc.lastChild) {
    doc.removeChild(doc.lastChild);
    }

    drawRect(doc,"NE",100,50,200,105,"NEl")
    addText(doc,110,80,NEDetail.name,0,"rotate(0)")

//------------Draw Interfaces ------------------------------------


    var x = 100; var y=180; var yShift=15; var xShift = 70; var xInterface = 0;

    let colors = ["darkmagenta","blue","darkblue","green","yellow","orange","red","pink","black"]
    var colorIndex = 0;
  
    let doneSubnets =[];
    addText(doc,2,y-3,"- Subnets", 70,"rotate(0)","gray(16)");
    addText(doc,2,y+2,"-----------", 70,"rotate(0)","gray(16)");
    NEDetail.interfaces.forEach(interface => {
        let doneSubnet = doneSubnets.find(doneSubnet=>doneSubnet.name === interface.subnet.name);
        
        if (doneSubnet === undefined){

        let doneSubnet = {
                "name" : "",
                "x"    : "",
                "y"    : "",
                "color": ""
            };
        
        //drawRect(doc,"NE",x,y,xShift,20,"subnet");
        drawHLine(doc,"SubnetLine",62,y+8,350,colors[colorIndex],`subnet-${interface.subnet.name}`)
        addText(doc,2,y+12,interface.subnet.name, 60,"rotate(0)",colors[colorIndex]);
        doneSubnet.name = interface.subnet.name
        doneSubnet.x = x;
        doneSubnet.y = y;
        doneSubnet.color = colors[colorIndex];
        doneSubnets.push(doneSubnet);
        drawRect(doc,"interfaceBox",doneSubnet.x+8,130,12,30,"interface");
        addText(doc,doneSubnet.x+10,133,interface.name,20,`rotate(90,${doneSubnet.x+10},133)`);
        connectDots(doc,doneSubnet.x+8+6,160,doneSubnet.x+8+6,y+8,"","",colors[colorIndex]);
        x = x + xShift-10;
        y = y + yShift;
        colorIndex++;
        //xInterface = xInterface + 25;
        }
        else {
            xInterface = xInterface + 23;
            drawRect(doc,"interfaceBox",doneSubnet.x+xInterface,130,12,30,"interface");
            connectDots(doc,doneSubnet.x+xInterface+6,160,doneSubnet.x+xInterface+6,doneSubnet.y+8,"","",doneSubnet.color) 
            addText(doc,doneSubnet.x+xInterface+2,133,interface.name,20,`rotate(90,${doneSubnet.x+xInterface+2},133)`);
        }
    
    });
//--------------------Draw interface END-------------------------  

//--------------------Draw Domain ---------------------------------

var lastSubnet = doneSubnets[doneSubnets.length - 1];

var x_d = 100; var y_d=lastSubnet.y+yShift+30; var yShift_d=20; var xShift_d = 70; domainConnectionShift = 8; 
console.log(lastSubnet.name)    
console.log(y_d)
addText(doc,2,y_d-3,"- Domains",70,"rotate(0)","gray(16)");
addText(doc,2,y_d+2,"----------",70,"rotate(0)","gray(16)");
    let doneDomains =[];

    NEDetail.interfaces.forEach(interface => {
        let doneDomain = doneDomains.find(doneDomain=>doneDomain.name === interface.subnet.domain.name);
        console.log(interface.subnet.domain.name);
        if (doneDomain === undefined){

        let doneDomain = {
                "subnet":"",
                "name" : "",
                "x"    : "",
                "y"    : ""
            };
        
        //drawRect(doc,"NE",5,y_d,xShift_d,20,"domain");
        addText(doc,5+5,y_d+15,interface.subnet.domain.name,60,"rotate(0)");
        doneDomain.subnet = interface.subnet.name;
        doneDomain.name = interface.subnet.domain.name;
        doneDomain.x = x_d;
        doneDomain.y = y_d;
        doneDomains.push(doneDomain);
        let theSubnet = doneSubnets.find(doneSubnet=>doneSubnet.name === interface.subnet.name)
        connectDots_1(doc,70+domainConnectionShift,theSubnet.y+8,5+xShift_d,y_d+10,"","", theSubnet.color);
        x_d = x_d + xShift_d-10;
        y_d = y_d + yShift_d;
        domainConnectionShift = domainConnectionShift + 8;
        //xInterface = xInterface + 25;
        }
        else {
            let doneDomainSubnet = doneDomains.find(doneDomain=>doneDomain.subnet === interface.subnet.name);
            if(doneDomainSubnet==undefined){
                let theSubnet = doneSubnets.find(doneSubnet=>doneSubnet.name === interface.subnet.name)
                //connectDots(doc,theSubnet.x+8+6,theSubnet.y+20,doneDomain.x+domainConnectionShift,y_d-yShift_d,"lineClass","dotClass");
                connectDots_1(doc,70+domainConnectionShift,theSubnet.y+8,5+xShift_d,y_d-yShift_d+10,"","", theSubnet.color);
                domainConnectionShift = domainConnectionShift + 14
            }
             
        }
    
    });
    if(lastSubnet.x >= 200){
        doc.getElementById('NEl').setAttribute("width", lastSubnet.x);
    }
    


}


//-----------------------Modules------------------------------------------

function drawHLine(doc,theClass,x,y,length,color,theId){

    let HLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    HLine.setAttribute('class',theClass);
    HLine.setAttribute('id',theId);
    HLine.setAttribute('x1',x);
    HLine.setAttribute('y1',y);
    HLine.setAttribute('x2',x+length);
    HLine.setAttribute('y2',y);
    HLine.setAttribute('stroke',color);
    doc.appendChild(HLine);

}


function drawRect(doc,theClass,x,y,w,h,theId)
{
let NERect = document.createElementNS('http://www.w3.org/2000/svg','rect');
// NERect Attributes
NERect.setAttribute('class',theClass);
NERect.setAttribute('id',theId);
NERect.setAttribute('x',x);
NERect.setAttribute('y',y);
NERect.setAttribute('width',w);
NERect.setAttribute('height',h);
doc.appendChild(NERect);
    
}

function addText(doc,x,y,theText,textLength,transform,color)
{
let textElement = document.createElementNS('http://www.w3.org/2000/svg','text');
    // Text Attributes
textElement.setAttribute('class','NEText');
textElement.setAttribute('x', x);
textElement.setAttribute('y', y);
textElement.setAttribute('transform',transform);
textElement.setAttribute('fill',color);

    if(!textLength==0){
        textElement.setAttribute('textLength', textLength);
        textElement.setAttribute('lengthAdjust', "spacingAndGlyphs");
    }
var textNode = document.createTextNode(theText);
textElement.appendChild(textNode);
doc.appendChild(textElement);
}

function connectDots(doc,x1,y1,x2,y2,lineClass,dotClass,color){
    var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    var startDot = document.createElementNS('http://www.w3.org/2000/svg','circle');
    var endDot = document.createElementNS('http://www.w3.org/2000/svg','circle');

    newLine.setAttribute('class',lineClass);
    newLine.setAttribute('x1',x1);
    newLine.setAttribute('y1',y1+3);
    newLine.setAttribute('x2',x2);
    newLine.setAttribute('y2',y2-3);
    newLine.setAttribute('stroke',color);

    startDot.setAttribute('class', dotClass);
    startDot.setAttribute('cx', x1);
    startDot.setAttribute('cy', y1);
    startDot.setAttribute('r', 4);
    startDot.setAttribute('fill', color);

    endDot.setAttribute('class', dotClass);
    endDot.setAttribute('cx', x2);
    endDot.setAttribute('cy', y2);
    endDot.setAttribute('r', 4);
    endDot.setAttribute('fill', color);

    doc.appendChild(startDot);
    doc.appendChild(endDot);
    doc.appendChild(newLine);
}

function connectDots_1(doc,x1,y1,x2,y2,lineClass,dotClass,color){
    var newLine = document.createElementNS('http://www.w3.org/2000/svg','polyline');
    var startDot = document.createElementNS('http://www.w3.org/2000/svg','circle');
    var endDot = document.createElementNS('http://www.w3.org/2000/svg','circle');

    newLine.setAttribute('class',lineClass);
    newLine.setAttribute('points',`${x1},${y1} ${x1},${y2} ${x2},${y2}`);
    //newLine.setAttribute('y1',y1+3);
    //newLine.setAttribute('x2',x2);
    //newLine.setAttribute('y2',y2-3);
    newLine.setAttribute('stroke',color);
    newLine.setAttribute('fill', "none")

    startDot.setAttribute('class', dotClass);
    startDot.setAttribute('cx', x1);
    startDot.setAttribute('cy', y1);
    startDot.setAttribute('r', 4);
    startDot.setAttribute('fill', color);

    endDot.setAttribute('class', dotClass);
    endDot.setAttribute('cx', x2);
    endDot.setAttribute('cy', y2);
    endDot.setAttribute('r', 4);
    endDot.setAttribute('fill', color);

    //doc.appendChild(startDot);
    //doc.appendChild(endDot);
    doc.appendChild(newLine);
}