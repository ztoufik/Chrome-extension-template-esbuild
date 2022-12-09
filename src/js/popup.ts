const root = document.querySelector('#root');
const btn = document.createElement('button');
btn.textContent = "click here";
btn.onclick=()=>{
    console.log("clicked")
}
root.appendChild(btn);
