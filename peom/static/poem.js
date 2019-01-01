


var poemList = document.getElementsByClassName("text-are");

for (let index = 0; index < poemList.length; index++) {
    let element = poemList[index];
    let checkList = element.getElementsByTagName("li");
    for (let index = 0; index < checkList.length; index++) {
        let checkElement = checkList[index];
        if(index===0){
            //背
            checkElement.addEventListener("click",function(){
                
                console.log("recite");
                recitePoem(element);
            })
        }
        if(index===1){
            //赏
            checkElement.addEventListener("click",function(){
                console.log("shang");
                shangPoem(element);
            })
        }
        

        if(index===2){
            //注
            checkElement.addEventListener("click",function(){
                console.log("zushi");
                zushiPoem(element);
            })
        }
        if(index===3){
            //译
            checkElement.addEventListener("click",function(){
                console.log("fanyi");
                translatePoem(element);
            })
        }
        console.log(checkElement);
        
    }
    console.log(element);
    
}

// 译 要绑定的事件
function translatePoem(element){
    
    let spanTextList = element.getElementsByClassName("spanText");
    let recite = element.getElementsByClassName("textinput");
    let articl = element.getElementsByClassName("somearticl");
    let givelist = element.getElementsByClassName("givelist");
   
        //element是爷爷标签
        for (let index = 0; index < spanTextList.length; index++) {
            let childElement = spanTextList[index];
            if (childElement.style.display === "block") {
                childElement.style.display = "none";
            } else {
                childElement.style.display = "block";
    
            }
       }
       for (let index = 0; index < recite.length; index++) {
            let childElement = recite[index];
            if (childElement.style.display === "none") {
                childElement.style.display = "none";
            } else {
                childElement.style.display = "none";

            }
        }
        for (let index = 0; index < articl.length; index++) {
            let childElement = articl[index];
            if (childElement.style.display === "none"){
                childElement.style.display = "block"
            }
            else{
                childElement.style.display = "block";
            }
        }
        for (let index = 0; index < givelist.length; index++) {
            let childElement = givelist[index];
            if (childElement.style.display === "block") {
                childElement.style.display = "none";
            } 
            else {
                childElement.style.display = "none";  
            }
        }
    }
        


// 赏 要绑定的事件
function shangPoem(element){
    let shang = element.getElementsByClassName("shangText")
   
    let recite = element.getElementsByClassName("textinput");
    let articl = element.getElementsByClassName("somearticl");
    let givelist = element.getElementsByClassName("givelist");
   
        //element是爷爷标签
        for (let index = 0; index < shang.length; index++) {
            let childElement = shang[index];
            if (childElement.style.display==="block"){
                childElement.style.display="none";
            }
            else{
                childElement.style.display="block";
            }
        }
  
 
       for (let index = 0; index < recite.length; index++) {
            let childElement = recite[index];
            if (childElement.style.display === "none") {
                childElement.style.display = "none";
            } else {
                childElement.style.display = "none";

            }
        }
        for (let index = 0; index < articl.length; index++) {
            let childElement = articl[index];
            if (childElement.style.display === "none"){
                childElement.style.display = "block"
            }
            else{
                childElement.style.display = "block";
            }
        }
        for (let index = 0; index < givelist.length; index++) {
            let childElement = givelist[index];
            if (childElement.style.display === "block") {
                childElement.style.display = "none";
            } 
            else {
                childElement.style.display = "none";
            
            }
        }
    
    }

// 注 要绑定的事件
function zushiPoem(element){
   
    let recite = element.getElementsByClassName("textinput");
    let articl = element.getElementsByClassName("somearticl");
    let givelist = element.getElementsByClassName("givelist");
    let zushi = element.getElementsByClassName("zushiText") 
        //element是爷爷标签
        for (let index = 0; index < zushi.length; index++) {
            let childElement = zushi[index];
            if (childElement.style.display==="block"){
                childElement.style.display="none";
            }
            else{
                childElement.style.display="block";
            }
        }
  
       for (let index = 0; index < recite.length; index++) {
            let childElement = recite[index];
            if (childElement.style.display === "none") {
                childElement.style.display = "none";
            } else {
                childElement.style.display = "none";

            }
        }
        for (let index = 0; index < articl.length; index++) {
            let childElement = articl[index];
            if (childElement.style.display === "none"){
                childElement.style.display = "block"
            }
            else{
                childElement.style.display = "block";
            }
        }
        for (let index = 0; index < givelist.length; index++) {
            let childElement = givelist[index];
            if (childElement.style.display === "block") {
                childElement.style.display = "none";
            } 
            else {
                childElement.style.display = "none";
            
            }
        }
  
    }


// 背 要被绑定的事件
function recitePoem(element){
    let shang = element.getElementsByClassName("shangText")
    let recite = element.getElementsByClassName("textinput");
    let articl = element.getElementsByClassName("somearticl")
    let givelist = element.getElementsByClassName("givelist")
        //element是爷爷标签
        for (let index = 0; index < recite.length; index++) {
            let childElement = recite[index];
            if (childElement.style.display === "block") {
                childElement.style.display = "none";
            } else {
                childElement.style.display = "block";
    
            }
            
        }
        for (let index = 0; index < articl.length; index++) {
            let childElement = articl[index];
            if (childElement.style.display === "none"){
                childElement.style.display = "block"
            }
            else{
                childElement.style.display = "none";
            }
        }
        for (let index = 0; index < givelist.length; index++) {
            let childElement = givelist[index];
            if (childElement.style.display === "block") {
                childElement.style.display = "none";
            } 
            else {
                childElement.style.display = "block";
            
            }
        }
        for (let index = 0; index < shang.length; index++) {
            let childElement = shang[index];
            if (childElement.style.display === "block") {
                childElement.style.display = "none";
            } 
            else {
                childElement.style.display = "none";
            
            }
        }
        

}



$(function(){

    function creatpoemitem(data) { 
        let poemitem = ` <div class=text-are>
        <ul class="are-icon">
            <li><a href="javascript:void(0);" >背</a></li>
            <li><a href="javascript:void(0);" >赏</a></li>
            <li><a href="javascript:void(0);" >注</a></li>
            <li><a href="javascript:void(0);" >译</a></li>
        </ul>
        
        <h4 id="mon">${data[0]}</h4>
        <p style="font-size: 12px; color: #a2c241">${data[0][1]}</p>
        <textarea name="" class="textinput" cols="30" rows="8" autofocus="autofocus" placeholder="" ></textarea>
        <p class="somearticl">
           ${data[1]}<br>
            <span  class="spanText">${data[2]}<br></span>
            <span class="zushiText">${data[3]}<br></span>
        </p> 
        <article class="shangText"><hr>${daata[4]}<hr></article>
        <a style="font-size: 12px; color: #a2c241">春天，写花，月亮，思念，乐府</a>
        <div class="givelist">
            <a href="javascript:void(0);" id="giveup"  >放弃</a>
            <a href="javascript:void(0);"  >提交</a> 
        </div>
        <hr>`
     }    

     function onload(){
         
     }

})