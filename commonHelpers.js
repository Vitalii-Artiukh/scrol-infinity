import{a as y,S as w,i as c}from"./assets/vendor-d93b82f1.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const L="45488193-7ca777789e7fbcf45aeeb8195";y.defaults.baseURL="https://pixabay.com/api/";const g=async(e,s)=>{const r={params:{page:s,key:L,q:e,image_type:"photo",safesearch:!0,orientation:"horizontal",per_page:15}};return await y.get("",r)},h=e=>`<li class="gallery-card">
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
          </li>`,l=document.querySelector(".js-search-form"),p=document.querySelector(".js-gallery"),n=document.querySelector(".preloader-wrap"),x=document.querySelector(".js-scroll-infinity"),m=document.querySelector(".js-go-top");let u="",a=1,f=1;const v=new w(".js-gallery a",{captionsData:"alt",captionDelay:150}),k=async e=>{try{n.classList.remove("is-visible"),e.preventDefault(),a=1,u=l.elements.user_query.value;const s=await g(u,a);if(f=s.data.totalHits/15,p.innerHTML="",l.reset(),s.data.hits.length===0){n.classList.add("is-visible"),c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#ef4040",maxWidth:"432px",messageColor:"#fafafb",messageSize:"16px",messageLineHeight:"150%"});return}const r=s.data.hits.map(i=>h(i)).join("");p.innerHTML=r,q.observe(x)}catch(s){c.error({title:`${s}`,position:"center",backgroundColor:"#ef4040"}),l.reset(),n.classList.add("is-visible");return}n.classList.add("is-visible"),v.refresh(),a+=1},O={root:null,rootMargin:"0px 0px 400px 0px",threshold:1},P=async e=>{if(console.log(e),e[0].isIntersecting)try{const s=await g(u,a);if(Math.ceil(f)>=a){const r=s.data.hits.map(i=>h(i)).join("");p.insertAdjacentHTML("beforeend",r)}v.refresh(),a+=1,Math.ceil(f)<a&&c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch(s){c.error({title:`${s}`,position:"center",backgroundColor:"#ef4040"})}},q=new IntersectionObserver(P,O);l.addEventListener("submit",k);const b=()=>{window.pageYOffset>0&&(window.scrollBy(0,-75),setTimeout(b,0)),m.classList.add("is-hidden")},M=()=>{const e=window.pageYOffset,s=document.documentElement.clientHeight;e>s&&m.classList.remove("is-hidden")};m.addEventListener("click",b);addEventListener("scroll",M);
//# sourceMappingURL=commonHelpers.js.map
