import{s as u,n as d,A as s,v as g,_ as h,f as b,m as n,w as k,g as l,C as y,c as t,b as v,F as f,r as w,P as o,a as p,o as r,d as C,k as x,h as A,q as S}from"./index.e8374378.js";class D{async getAllCards(){const e=await u.get("api/cards");e.data,d.log(e.data),s.cards=e.data.map(c=>new g(c)),d.log(s.cards)}}const B=new D;const P={props:{cards:{type:Object,required:!0},decks:{type:Object,required:!0}},setup(){async function i(){try{await B.getAllCards()}catch(a){o.error(a)}}async function e(){try{await A.getMyDecks(),d.log("getting my decks",s.decks)}catch(a){d.error(a),o.error(a)}}async function c(){try{await S.getAccountDeckCards()}catch(a){d.log(a),o.error(a)}}return b(()=>{i()}),n(()=>{}),k(()=>{s.account.id&&(e(),c(),d.log("watch effect"))}),n(()=>{}),{account:l(()=>s.account),accountDeckCards:l(()=>s.accountDeckCards)}},components:{Card:y}},q={key:0},F=p('<div class="container rounded bg-pic" data-v-caa9abd8><div class="row" data-v-caa9abd8><div class="col-md-2" data-v-caa9abd8></div><div class="col-md-8" data-v-caa9abd8><div class="card frosted marg-top" data-v-caa9abd8><div class="card-body d-flex" data-v-caa9abd8><p class="bebas text-light mt-5 line-1 anim-typewriter flex-wrap" data-v-caa9abd8>Arms, Legs, Shoulders, Back, Cardio, Full Body ...</p></div></div></div><div class="col-md-2" data-v-caa9abd8></div></div></div>',1),M={class:"container-fluid"},N={class:"row"},V={class:"col-md-3"},j={key:1,class:"text-light text-center p-5"},E=p('<h1 class="display-1" data-v-caa9abd8><i class="mdi mdi-pinwheel mdi-spin" data-v-caa9abd8></i><i class="mdi mdi-pinwheel mdi-spin" data-v-caa9abd8></i><i class="mdi mdi-pinwheel mdi-spin" data-v-caa9abd8></i><i class="mdi mdi-pinwheel mdi-spin" data-v-caa9abd8></i></h1>',1),H=[E];function L(i,e,c,a,O,$){const _=x("Card");return a.account?(r(),t("div",q,[F,v("div",M,[v("div",N,[(r(!0),t(f,null,w(c.cards,m=>(r(),t("div",V,[C(_,{decks:c.decks,card:m},null,8,["decks","card"])]))),256))])])])):(r(),t("div",j,H))}const U=h(P,[["render",L],["__scopeId","data-v-caa9abd8"]]);export{U as default};
