(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(441)}])},441:function(n,e,t){"use strict";t.r(e);var c=t(5893),i=t(4902),o=t(3569),u=t(9485),s=t(8829),r=t(5553),l=t(9008),a=t.n(l),h=t(7294),d=function(){var n=(0,h.useState)(),e=n[0],t=n[1],l=(0,h.useState)(),d=l[0],f=l[1],x=(0,h.useState)(),w=x[0],j=x[1],_=(0,h.useState)(),m=_[0],g=_[1];(0,h.useEffect)(function(){if(d&&u.UJ(d)&&window.ethereum){var n=new s.Q(window.ethereum);n.getBalance(d).then(function(n){t(r.dF(n))}),n.getNetwork().then(function(n){j(n.chainId),g(n.name)})}},[d]);var k=function(){if(!window.ethereum){console.log("please install MetaMask");return}new s.Q(window.ethereum).send("eth_requestAccounts",[]).then(function(n){n.length>0&&f(n[0])}).catch(function(n){return console.log(n)})},p=function(){console.log("onClickDisConnect"),t(void 0),f(void 0)};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a(),{children:(0,c.jsx)("title",{children:"My DAPP"})}),(0,c.jsx)(i.X6,{as:"h3",my:4,children:"Explore Web3"}),(0,c.jsxs)(i.gC,{children:[(0,c.jsx)(i.xu,{w:"100%",my:4,children:d?(0,c.jsxs)(o.zx,{type:"button",w:"100%",onClick:p,children:["Account:",d]}):(0,c.jsx)(o.zx,{type:"button",w:"100%",onClick:k,children:"Connect MetaMask"})}),d?(0,c.jsxs)(i.xu,{mb:0,p:4,w:"100%",borderWidth:"1px",borderRadius:"lg",children:[(0,c.jsx)(i.X6,{my:4,fontSize:"xl",children:"Account info"}),(0,c.jsxs)(i.xv,{children:["ETH Balance of current account: ",e]}),(0,c.jsxs)(i.xv,{children:["Chain Info: ChainId ",w," name ",m]})]}):(0,c.jsx)(c.Fragment,{}),"..."]})]})};e.default=d},6601:function(){}},function(n){n.O(0,[330,774,888,179],function(){return n(n.s=8312)}),_N_E=n.O()}]);