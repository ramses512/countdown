(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{rqJc:function(t,e,n){"use strict";n.r(e),n.d(e,"CountdownModule",(function(){return f}));var c=n("PCNd"),o=n("ofXK"),s=n("tyNb"),r=n("KDUW"),i=n("B4aO"),a=n("fXoL");let b=(()=>{class t{constructor(t){this.apiService=t}getLastLogin(t){return this.apiService.get(t)}}return t.\u0275fac=function(e){return new(e||t)(a.Wb(i.a))},t.\u0275prov=a.Ib({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var u=n("bTqV");function l(t,e){if(1&t&&(a.Sb(0,"section",6),a.Sb(1,"p",7),a.zc(2),a.Sb(3,"span"),a.zc(4,"days"),a.Rb(),a.Rb(),a.Sb(5,"p",8),a.zc(6),a.Sb(7,"span"),a.zc(8,"hours"),a.Rb(),a.Rb(),a.Sb(9,"p",9),a.zc(10),a.Sb(11,"span"),a.zc(12,"minutes"),a.Rb(),a.Rb(),a.Sb(13,"p",10),a.zc(14),a.Sb(15,"span"),a.zc(16,"seconds"),a.Rb(),a.Rb(),a.Rb()),2&t){const t=a.ec();a.Bb(2),a.Bc("",t.dateObj.days," "),a.Bb(4),a.Bc("",t.dateObj.hours," "),a.Bb(4),a.Bc("",t.dateObj.minutes," "),a.Bb(4),a.Bc("",t.dateObj.seconds," ")}}const p=[{path:"",component:(()=>{class t{constructor(t,e){this.userService=t,this.authService=e}ngOnInit(){const t=localStorage.getItem("userId");this.userService.getLastLogin("/user/"+t).subscribe(t=>{this.dateObj=this.calculateDiff(t)})}calculateDiff(t){let e=new Date(t.lastLogin),n=new Date,c=Math.abs(e.getTime()-n.getTime())/1e3;const o=Math.floor(c/86400);c-=86400*o;const s=Math.floor(c/3600)%24;c-=3600*s;const r=Math.floor(c/60)%60;return c-=60*r,{days:o,hours:s,minutes:r,seconds:(c%60).toFixed(0)}}logout(){this.authService.logout()}}return t.\u0275fac=function(e){return new(e||t)(a.Mb(b),a.Mb(r.a))},t.\u0275cmp=a.Gb({type:t,selectors:[["app-countdown"]],decls:10,vars:1,consts:[[1,"countdown"],[1,"center"],[1,"box"],["class","result",4,"ngIf"],[1,"button"],["id","btnSubmit","type","submit","mat-raised-button","","color","primary",3,"click"],[1,"result"],[1,"days"],[1,"hours"],[1,"minutes"],[1,"seconds"]],template:function(t,e){1&t&&(a.Sb(0,"section",0),a.Sb(1,"h1",1),a.zc(2,"Welcome!"),a.Rb(),a.Sb(3,"h6",1),a.zc(4,"The last time you accessed was"),a.Rb(),a.Sb(5,"article",2),a.yc(6,l,17,4,"section",3),a.Sb(7,"div",4),a.Sb(8,"button",5),a.ac("click",(function(){return e.logout()})),a.zc(9," Logout "),a.Rb(),a.Rb(),a.Rb(),a.Rb()),2&t&&(a.Bb(6),a.jc("ngIf",e.dateObj))},directives:[o.k,u.a],styles:[".result[_ngcontent-%COMP%]{display:flex;gap:20px;font-size:3em}.result[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.result[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.5em;color:#666;margin-top:10px}.box[_ngcontent-%COMP%]{display:flex;gap:2rem;flex-direction:column;margin:0 auto;font-size:min(2vw,1rem);align-items:center;justify-content:center;text-align:center}"]}),t})()}];let d=(()=>{class t{}return t.\u0275mod=a.Kb({type:t}),t.\u0275inj=a.Jb({factory:function(e){return new(e||t)},imports:[[s.b.forChild(p)],s.b]}),t})(),f=(()=>{class t{}return t.\u0275mod=a.Kb({type:t}),t.\u0275inj=a.Jb({factory:function(e){return new(e||t)},imports:[[o.c,d,c.a]]}),t})()}}]);