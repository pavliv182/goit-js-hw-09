const t={startBtnEl:document.querySelector("[data-start]"),stopBtnEl:document.querySelector("[data-stop]"),bodyEl:document.querySelector("body")};let e=null;t.stopBtnEl.setAttribute("disabled",1),t.startBtnEl.addEventListener("click",(()=>{e=setInterval((()=>{t.bodyEl.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.startBtnEl.setAttribute("disabled",1),t.stopBtnEl.removeAttribute("disabled")})),t.stopBtnEl.addEventListener("click",(()=>{clearInterval(e),t.startBtnEl.removeAttribute("disabled"),t.stopBtnEl.setAttribute("disabled",1)}));
//# sourceMappingURL=01-color-switcher.f98a3342.js.map
