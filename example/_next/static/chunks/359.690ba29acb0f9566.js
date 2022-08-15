"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[359],{96359:function(n,t,i){i.r(t),i.d(t,{StrikeWallet:function(){return c}});var s=i(58725),e=i(36301),r=i(49214),a=i(75291).Buffer;const o=a.alloc(s.SIGNATURE_LENGTH_IN_BYTES).fill(0);class c{constructor(){this.url="https://wallet.strikeprotocols.com",this.cleanUp=()=>{[...this._timers].forEach((n=>this.clearTimer(n)));const n=this._wallet;n&&n.close(),this._wallet=null},this.clearTimer=n=>{this._timers=this._timers.filter((t=>t!=n)),window.clearInterval(n)},this.instructionsToSerializableInstructions=n=>n.map((n=>({programId:n.programId.toBase58(),accountMetas:n.keys.map((n=>({address:n.pubkey.toBase58(),signer:n.isSigner,writable:n.isWritable}))),data:window.btoa(String.fromCharCode(...n.data))}))),this.handleWalletMessage=n=>{var t,i,e;if("connected"==n.type)this._connecting=!1,n.error||(this.isLoggedIn=!0,(null===(t=n.connected)||void 0===t?void 0:t.publicKey)&&(this._publicKey=new s.PublicKey(n.connected.publicKey)));else if(["sendTransaction","sendFinalTransaction"].includes(n.type)){const t=null===(i=n.sendTransaction)||void 0===i?void 0:i.identifier;t&&t in this._pendingTransactions&&(n.error?this._pendingTransactionErrors[t]=new Error(n.error):this._pendingTransactions[t]=n.sendTransaction||null)}else if("signTransaction"==n.type){const t=null===(e=n.signTransaction)||void 0===e?void 0:e.identifier;t&&t in this._pendingTransactions&&(n.error?this._pendingTransactionErrors[t]=new Error(n.error):this._pendingTransactions[t]=n.signTransaction||null)}},this.isLoggedIn=!1,this._pendingTransactions={},this._pendingTransactionErrors={},this._timers=[],this._wallet=null,this._connecting=!1,this._publicKey=null,window.addEventListener("message",(n=>{this.handleWalletMessage(n.data)}))}async connect(n){try{this.url=n||this.url;const t=encodeURIComponent(window.location.origin),i=`${this.url}/connect?origin=${t}`;if(this._connecting=!0,this._wallet=window.open(i,`strike-wallet-${t}`,"height=800,width=800,menubar=no,status=no,toolbar=no"),!this._wallet)throw this._connecting=!1,new Error("Unable to connect to wallet");return this._timers.push(window.setInterval((()=>{this._wallet.closed?this.cleanUp():this._wallet&&this._wallet.postMessage({type:"heartbeat"},this.url)}),100)),new Promise(((n,t)=>{const i=window.setInterval((()=>{this.isLoggedIn&&this._publicKey?(this.clearTimer(i),n(this._publicKey)):this.isLoggedIn||this._connecting||(this.clearTimer(i),t(new Error("Unable to connect to Strike")))}),100);this._timers.push(i)}))}catch(t){throw t}}async signTransaction(n){this.verifyCanSignRequests([n]);try{return this.signOneTransaction(n)}catch(t){throw t}}async signAllTransactions(n){this.verifyCanSignRequests(n);try{return Promise.all(n.map((n=>this.signOneTransaction(n))))}catch(t){throw t}}async sendTransaction(n,t,i){try{const t=this._wallet;if(!t)throw new Error("Not Connected");const s=(0,r.Z)();this._pendingTransactions[s]=null;const e=i?i.signers:void 0;if(e&&e.length>0)return new Promise(((i,r)=>{this.signOneTransaction(n,s).then((n=>{this._pendingTransactions[s]=null,(null===e||void 0===e?void 0:e.length)&&n.partialSign(...e),t.postMessage({type:"sendFinalTransaction",sendFinalTransaction:{transactionIdentifier:s,signaturePubkeyPairs:n.signatures.filter((n=>null!=n.signature)).map((n=>({pubkey:n.publicKey.toBase58(),signature:n.signature.toString("base64")})))}},this.url);const a=window.setInterval((()=>{const n=this._pendingTransactions[s],t=this._pendingTransactionErrors[s];null==n&&null==t||(this.clearTimer(a),n&&i(n.signature),t&&r(t))}),100);this._timers.push(a)})).catch((n=>{throw r(n),n}))}));{const i=this.instructionsToSerializableInstructions(n.instructions);return new Promise(((n,e)=>{t.postMessage({type:"sendTransaction",sendTransaction:{instructions:i,transactionIdentifier:s}},this.url);const r=window.setInterval((()=>{const t=this._pendingTransactions[s],i=this._pendingTransactionErrors[s];null==t&&null==i||(this.clearTimer(r),t&&n(t.signature),i&&e(i))}),100);this._timers.push(r)}))}}catch(s){throw s}}buildTransaction(n){let t=s.Message.from(a.from(Uint8Array.from(window.atob(n.message),(n=>n.charCodeAt(0)))));return s.Transaction.populate(t,Array.from({length:t.header.numRequiredSignatures},((i,s)=>{let r=n.signatures.find((n=>n.pubkey==t.accountKeys[s].toBase58()));return e.encode(r?a.from(Uint8Array.from(window.atob(r.signature),(n=>n.charCodeAt(0)))):o)})))}verifyCanSignRequests(n){n.forEach((n=>{if(n.signatures.some((n=>null!=n.signature)))throw new Error("Strike does not support this signing mode")}))}signOneTransaction(n,t=(0,r.Z)()){const i=this._wallet;if(!i)throw new Error("Not Connected");const s=this.instructionsToSerializableInstructions(n.instructions);return this._pendingTransactions[t]=null,new Promise(((n,e)=>{i.postMessage({type:"signTransaction",signTransaction:{instructions:s,transactionIdentifier:t}},this.url);const r=window.setInterval((()=>{const i=this._pendingTransactions[t],s=this._pendingTransactionErrors[t];null==i&&null==s||(this.clearTimer(r),i&&n(this.buildTransaction(i)),s&&e(s))}),100);this._timers.push(r)}))}}}}]);