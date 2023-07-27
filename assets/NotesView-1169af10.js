import{o as n,f as i,g as e,d as P,i as q,a as G,c as S,b as I,s as J,v as d,w as u,j as M,n as L,h as o,m as a,p as K,x as V,t as B,F as O,k as F,y as Q,z as W,A as X,_ as Y}from"./index-c7b5d166.js";import{N as H}from"./NoteDisplay-7de33a15.js";const ee={class:"slidev-icon",viewBox:"0 0 32 32",width:"1.2em",height:"1.2em"},te=e("path",{fill:"currentColor",d:"M8 12h10v2H8z"},null,-1),oe=e("path",{fill:"currentColor",d:"M21.448 20A10.856 10.856 0 0 0 24 13a11 11 0 1 0-11 11a10.856 10.856 0 0 0 7-2.552L27.586 29L29 27.586ZM13 22a9 9 0 1 1 9-9a9.01 9.01 0 0 1-9 9Z"},null,-1),ne=[te,oe];function se(_,c){return n(),i("svg",ee,ne)}const le={name:"carbon-zoom-out",render:se},ae={class:"slidev-icon",viewBox:"0 0 32 32",width:"1.2em",height:"1.2em"},ie=e("path",{fill:"currentColor",d:"M18 12h-4V8h-2v4H8v2h4v4h2v-4h4v-2z"},null,-1),ce=e("path",{fill:"currentColor",d:"M21.448 20A10.856 10.856 0 0 0 24 13a11 11 0 1 0-11 11a10.856 10.856 0 0 0 7-2.552L27.586 29L29 27.586ZM13 22a9 9 0 1 1 9-9a9.01 9.01 0 0 1-9 9Z"},null,-1),re=[ie,ce];function de(_,c){return n(),i("svg",ae,re)}const ue={name:"carbon-zoom-in",render:de},_e={class:"h-full flex flex-col"},pe={key:0,class:"px-5 py-2 max-h-60 overflow-auto border-t border-gray-400 border-opacity-20"},me={class:"flex-none border-t border-gray-400 border-opacity-20"},ve={class:"flex gap-1 items-center px-6 py-3"},he=e("div",{class:"flex-auto"},null,-1),fe={class:"p2 text-center"},xe=P({__name:"NotesView",setup(_){q(G);const c=S.titleTemplate.replace("%s",S.title||"Slidev");I({title:`Notes - ${c}`});const{isFullscreen:T,toggle:p}=Q,s=J("slidev-notes-font-size",18),l=d(()=>{var t;return((t=u.lastUpdate)==null?void 0:t.type)==="viewer"?u.viewerPage:u.page}),m=d(()=>M.find(t=>t.path===`${l.value}`)),r=d(()=>M.find(t=>t.path===`${l.value+1}`));function Z(){s.value=s.value+1}function j(){s.value=s.value-1}return(t,v)=>{var h,f,x,g,b,y,z,$,w,N,k,C;const A=W,D=X,R=ue,U=le;return n(),i(O,null,[e("div",{class:"fixed top-0 left-0 h-2px bg-teal-500 transition-all duration-500",style:L({width:`${(l.value-1)/o(F)*100}%`})},null,4),e("div",_e,[e("div",{class:"px-5 flex-auto h-full overflow-auto",style:L({fontSize:`${o(s)}px`})},[a(H,{note:(x=(f=(h=m.value)==null?void 0:h.meta)==null?void 0:f.slide)==null?void 0:x.note,"note-html":(y=(b=(g=m.value)==null?void 0:g.meta)==null?void 0:b.slide)==null?void 0:y.noteHTML,placeholder:`No notes for Slide ${l.value}.`},null,8,["note","note-html","placeholder"])],4),r.value?(n(),i("div",pe,[a(H,{class:"opacity-50",note:(w=($=(z=r.value)==null?void 0:z.meta)==null?void 0:$.slide)==null?void 0:w.note,"note-html":(C=(k=(N=r.value)==null?void 0:N.meta)==null?void 0:k.slide)==null?void 0:C.noteHTML,placeholder:"No notes for next slide."},null,8,["note","note-html"])])):K("v-if",!0),e("div",me,[e("div",ve,[e("button",{class:"slidev-icon-btn",onClick:v[0]||(v[0]=(...E)=>o(p)&&o(p)(...E))},[o(T)?(n(),V(A,{key:0})):(n(),V(D,{key:1}))]),e("button",{class:"slidev-icon-btn",onClick:Z},[a(R)]),e("button",{class:"slidev-icon-btn",onClick:j},[a(U)]),he,e("div",fe,B(l.value)+" / "+B(o(F)),1)])])])],64)}}}),ye=Y(xe,[["__file","/Users/aotter/Documents/psycho-test/node_modules/.pnpm/@slidev+client@0.42.5_postcss@8.4.26_vite@4.4.4/node_modules/@slidev/client/internals/NotesView.vue"]]);export{ye as default};
