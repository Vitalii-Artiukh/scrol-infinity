import{a as y,S as L,i as c}from"./assets/vendor-d93b82f1.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const w="45488193-7ca777789e7fbcf45aeeb8195";y.defaults.baseURL="https://pixabay.com/api/";const h=async(e,s)=>{const o={params:{page:s,key:w,q:e,image_type:"photo",safesearch:!0,orientation:"horizontal",per_page:15}};return await y.get("",o)},g=e=>`<li class="gallery-card">
            <a href="${e.largeImageURL}" class="gallery-link">
              <img class="image-normal" src="${e.webformatURL}" alt="${e.tags}"/>
              <ul class="image-text">
                <li class="image-text-item">
                  <p class="key key-likes">Likes</p>
                  <p class="value value-likes">${e.likes}</p>
                </li>
                <li class="image-text-item">
                  <p class="key key-views">Viwes</p>
                  <p class="value value-views">${e.views}</p>
                </li>
                <li class="image-text-item">
                  <p class="key key-comments">Comments</p>
                  <p class="value value-comments">${e.comments}</p>
                </li>
                <li class="image-text-item">
                  <p class="key key-downloads">Downloads</p>
                  <p class="value value-downloads">${e.downloads}</p>
                </li>
              </ul>
            </a>
          </li>`,n=document.querySelector(".js-search-form"),p=document.querySelector(".js-gallery"),l=document.querySelector(".preloader-wrap"),x=document.querySelector(".js-scroll-infinity"),m=document.querySelector(".js-go-top");let u="",a=1,f=1;const b=new L(".js-gallery a",{captionsData:"alt",captionDelay:150}),k=async e=>{try{l.classList.remove("is-visible"),e.preventDefault(),a=1,u=n.elements.user_query.value;const s=await h(u,a);if(f=s.data.totalHits/15,p.innerHTML="",n.reset(),s.data.hits.length===0){l.classList.add("is-visible"),c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#ef4040",maxWidth:"432px",messageColor:"#fafafb",messageSize:"16px",messageLineHeight:"150%"});return}const o=s.data.hits.map(i=>g(i)).join("");p.innerHTML=o,q.observe(x)}catch(s){c.error({title:`${s}`,position:"center",backgroundColor:"#ef4040"}),n.reset(),l.classList.add("is-visible");return}l.classList.add("is-visible"),b.refresh(),a+=1},O={root:null,rootMargin:"0px 0px 400px 0px",threshold:1},P=async e=>{if(console.log(e),e[0].isIntersecting)try{const s=await h(u,a);if(Math.ceil(f)>=a){const o=s.data.hits.map(i=>g(i)).join("");p.insertAdjacentHTML("beforeend",o)}b.refresh(),a+=1,m.classList.remove("is-hidden"),Math.ceil(f)<a&&c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch(s){c.error({title:`${s}`,position:"center",backgroundColor:"#ef4040"})}},q=new IntersectionObserver(P,O);n.addEventListener("submit",k);const v=()=>{window.pageYOffset>0&&(window.scrollBy(0,-75),setTimeout(v,0)),m.classList.add("is-hidden")};m.addEventListener("click",v);
//# sourceMappingURL=commonHelpers.js.map
