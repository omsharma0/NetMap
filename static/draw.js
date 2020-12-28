function drawNE(NEDetail)
{
    let doc = document.getElementById('drawNE')
    while (doc.lastChild) {
    doc.removeChild(doc.lastChild);
    }
    drawRect(doc,"NE",100,50,200,100)
    addText(doc,110,80,NEDetail.name,0)

//------------Draw Interfaces ------------------------------------


    var x = 100; var y=180; var yShift=25; var xShift = 60; var xInterface = x+10;
  
    let doneSubnets =[];

    NEDetail.interfaces.forEach(interface => {
        let doneSubnet = doneSubnets.find(doneSubnet=>doneSubnet.name === interface.subnet.name);
        
        if (doneSubnet === undefined){

        let doneSubnet = {
                "name" : "",
                "x"    : "",
                "y"    : ""
            };
        drawRect(doc,"interfaceBox",xInterface,140,10,20);
        drawRect(doc,"NE",x,y,60,20);
        connectDots(doc,x+15,160,x+15,y,"lineClass","dotClass")
        addText(doc,x+10,y+15,interface.subnet.name, 40);
        doneSubnet.name = interface.subnet.name
        doneSubnet.x = x;
        doneSubnet.y = y;
        doneSubnets.push(doneSubnet);
        x = x + xShift;
        y = y + yShift;
        xInterface = xInterface + 30;
        }
        else {
        
            drawRect(doc,"interfaceBox",doneSubnet.x+40,140,10,20);
            connectDots(doc,xInterface+5,160,xInterface+5,doneSubnet.y,"lineClass","dotClass") 
            xInterface = xInterface + 30;
        }
//--------------------Draw interface END-------------------------

        
        
    });


}

function drawRect(doc,theClass,x,y,w,h)
{
let NERect = document.createElementNS('http://www.w3.org/2000/svg','rect');
// NERect Attributes
NERect.setAttribute('class',theClass);
NERect.setAttribute('x',x);
NERect.setAttribute('y',y);
NERect.setAttribute('width',w);
NERect.setAttribute('height',h);
doc.appendChild(NERect);
    
}

function addText(doc,x,y,theText,textLength)
{
let textElement = document.createElementNS('http://www.w3.org/2000/svg','text');
    // Text Attributes
textElement.setAttribute('class','NEText');
textElement.setAttribute('x', x);
textElement.setAttribute('y', y);

    if(!textLength==0){
        textElement.setAttribute('textLength', textLength);
        textElement.setAttribute('lengthAdjust', "spacingAndGlyphs");
    }
var textNode = document.createTextNode(theText);
textElement.appendChild(textNode);
doc.appendChild(textElement);
}

function connectDots(doc,x1,y1,x2,y2,lineClass,dotClass){
    var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    var startDot = document.createElementNS('http://www.w3.org/2000/svg','circle');
    var endDot = document.createElementNS('http://www.w3.org/2000/svg','circle');

    newLine.setAttribute('class',lineClass);
    newLine.setAttribute('x1',x1);
    newLine.setAttribute('y1',y1+3);
    newLine.setAttribute('x2',x2);
    newLine.setAttribute('y2',y2-3);

    startDot.setAttribute('class', dotClass);
    startDot.setAttribute('cx', x1);
    startDot.setAttribute('cy', y1);
    startDot.setAttribute('r', 4);

    endDot.setAttribute('class', dotClass);
    endDot.setAttribute('cx', x2);
    endDot.setAttribute('cy', y2);
    endDot.setAttribute('r', 4);

    doc.appendChild(startDot);
    doc.appendChild(endDot);
    doc.appendChild(newLine);
}