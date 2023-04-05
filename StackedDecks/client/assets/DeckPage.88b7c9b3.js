import{_ as w,c as d,b as e,e as _,t as C,F as I,r as P,l as D,u as S,w as m,f as j,m as B,g as r,C as E,o as n,d as V,h as v,n as h,P as k,A as a,i as F,p as M,j as N,k as A,q as f}from"./index.e8374378.js";const u={setup(){const t=D();S();async function l(){try{await f.calculateXp()}catch(s){k.error(s.message)}}async function p(){try{await v.getMyDecks()}catch(s){h.error(s),k.error(s)}}async function c(){try{const s=t.params.deckId;await f.getDeckCardsForDeck(s)}catch(s){h.error(s),k.error(s)}}async function g(){try{const s=t.params.deckId;await v.getDeckById(s)}catch(s){h.error(s),k.error("How did deck get here?",s)}}return m(()=>{t.params.deckId&&c()}),m(()=>{a.deck&&l()}),j(()=>{g(),p()}),B(()=>{}),{route:t,account:r(()=>a.account),deck:r(()=>a.deck),deckCards:r(()=>a.deckCards),coverImg:r(()=>{var s;return`url("${(s=a.deck)==null?void 0:s.coverImg}")`}),decks:r(()=>a.decks),deckPercentage:r(()=>`${a.deckPercent}%`),stackedPercentage:r(()=>`${a.stackedPercent}%`)}},components:{Card:E}},y=()=>{F(t=>({"65bef076":t.deckPercentage,"10c8203f":t.stackedPercentage,"1fc0b9ae":t.coverImg}))},x=u.setup;u.setup=x?(t,l)=>(y(),x(t,l)):y;const R=u,i=t=>(M("data-v-b756dd0f"),t=t(),N(),t),X={key:0},q={class:"container-fluid"},H={class:"row d-flex bg-banner"},L=i(()=>e("div",{class:"col-md-2"},null,-1)),U={class:"col-md-8 p-2"},z={class:"card elevation-5 mx-auto frosted"},G={class:"card-body"},J={key:0},K=i(()=>e("h6",{title:"Stacked progress is the mastery of this deck.",class:"text-center text-light"},"Stacked Progress",-1)),O=i(()=>e("div",{class:"d-flex justify-content-center"},[e("div",{class:"progress w-50",role:"progressbar","aria-label":"Example 20px high","aria-valuenow":"25","aria-valuemin":"0","aria-valuemax":"100",style:{height:"20px"}},[e("div",{class:"progress-bar stacked-percent-bar"})])],-1)),Q=[K,O],T={class:"d-flex justify-content-center pt-2"},W={class:"text-center text-light"},Y=["src"],Z={key:1},$=i(()=>e("h6",{class:"text-center text-light"},"Current Exercise Progress",-1)),ee={class:"d-flex justify-content-center"},se={class:"progress w-25",role:"progressbar","aria-label":"Example 1px high","aria-valuenow":"25","aria-valuemin":"0","aria-valuemax":"100",style:{height:"1px"}},te={key:0,class:"progress-bar deck-percent-bar"},ce=i(()=>e("div",{class:"col-md-2"},null,-1)),ae={class:"container-fluid"},re={class:"row"},oe={class:"col-md-4"};function de(t,l,p,c,g,s){const b=A("Card");return c.deck?(n(),d("div",X,[e("div",q,[e("div",H,[L,e("div",U,[e("div",z,[e("div",G,[c.account.id==c.deck.creatorId?(n(),d("div",J,Q)):_("",!0),e("div",T,[e("h1",W,"My "+C(c.deck.name)+" Deck ",1),e("img",{class:"img-fluid ms-3 rounded-circle profile-img",src:c.deck.creator.picture,alt:""},null,8,Y)]),c.account.id==c.deck.creatorId?(n(),d("div",Z,[$,e("div",ee,[e("div",se,[c.deckPercentage?(n(),d("div",te)):_("",!0)])])])):_("",!0)])])]),ce])]),e("div",null,[e("div",ae,[e("div",re,[(n(!0),d(I,null,P(c.deckCards,o=>(n(),d("div",oe,[V(b,{time:o.time,sets:o.sets,weight:o.weight,reps:o.reps,deckCard:o,decks:c.decks,card:o.card},null,8,["time","sets","weight","reps","deckCard","decks","card"])]))),256))])])])])):_("",!0)}const ie=w(R,[["render",de],["__scopeId","data-v-b756dd0f"]]);export{ie as default};
