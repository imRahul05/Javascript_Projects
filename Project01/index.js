const btn = document.getElementById('btnn')
const bg = document.getElementById('color')
console.log(btn)
console.log(bg)
btn.addEventListener('click',function(){
    console.log("bvfjgvj")
    const letters = '0123456789ABCDEF'
    let colors = '#'
    for(let i=0;i<6;i++){
        colors+= letters[Math.floor(Math.random()*16)] 
     }

   
    bg.innerHTML=`Background color:${colors}`
    bg.style.color=colors
    document.body.style.backgroundColor=colors
     
})
