(self["webpackChunkzomma"] = self["webpackChunkzomma"] || []).push([["src_app_views_main_retired_retired_module_ts"],{

/***/ 17364:
/*!*********************************************!*\
  !*** ./src/app/models/beta/retired-pool.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RetiredPool": () => (/* binding */ RetiredPool)
/* harmony export */ });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ 15788);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_app_abi_pool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/abi/pool */ 19487);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ 61362);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 46797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 9112);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 88002);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 43190);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 15257);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 19773);
/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../token */ 3589);
/* harmony import */ var ngx_libs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-libs */ 76115);
/* harmony import */ var _retired_vault__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./retired-vault */ 18574);








class RetiredPool extends _base__WEBPACK_IMPORTED_MODULE_2__.Base {
    constructor(contract, accountService, contractService, ethWalletService, info) {
        super(contract, src_app_abi_pool__WEBPACK_IMPORTED_MODULE_1__.default, accountService, contractService);
        this.contract = contract;
        this.accountService = accountService;
        this.contractService = contractService;
        this.ethWalletService = ethWalletService;
        this.info = info;
        this.name = this.info.name;
        const token = this.getToken().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((address) => new _token__WEBPACK_IMPORTED_MODULE_3__.Token(address, 18, this.accountService, this.ethWalletService, this.contractService)), (0,ngx_libs__WEBPACK_IMPORTED_MODULE_6__.sharePublishReplay)(1));
        const vault = this.getVault().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((address) => new _retired_vault__WEBPACK_IMPORTED_MODULE_4__.RetiredVault(address, this.accountService, this.contractService, {})), (0,ngx_libs__WEBPACK_IMPORTED_MODULE_6__.sharePublishReplay)(1));
        this.totalShares = token.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)((t) => t.totalSupply));
        this.equity = vault.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)((v) => (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.timer)(0, 5000).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)(() => v.getBalance(this.contract)))), (0,ngx_libs__WEBPACK_IMPORTED_MODULE_6__.sharePublishReplay)(1));
        this.myShares = token.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)((t) => t.balance));
        this.myValue = (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.combineLatest)([this.equity, this.totalShares, this.myShares]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(([e, t, m]) => (t.eq(0) ? new (bignumber_js__WEBPACK_IMPORTED_MODULE_0___default())(0) : e.div(t).times(m))));
        this.staked = this.myShares.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((s) => s.gt(0)));
    }
    getToken() {
        return this.call((i) => i.methods.token());
    }
    getVault() {
        return this.call((i) => i.methods.vault());
    }
    withdrawAll(paymasterMethod) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.combineLatest)([this.myShares, this.myValue]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.mergeMap)(([s, v]) => this.send((i) => i.methods.withdraw(s.toDecimal().toString(10), v.times(0.99).toDecimal().toString(10)), {
            paymasterMethod,
            extraData: _retired_vault__WEBPACK_IMPORTED_MODULE_4__.signedData
        })));
    }
}


/***/ }),

/***/ 18574:
/*!**********************************************!*\
  !*** ./src/app/models/beta/retired-vault.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "signedData": () => (/* binding */ signedData),
/* harmony export */   "RetiredVault": () => (/* binding */ RetiredVault)
/* harmony export */ });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ 15788);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_app_abi_vault__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/abi/vault */ 28874);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ 61362);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 9112);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 46797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 25917);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 43190);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 88002);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 15257);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 19773);
/* harmony import */ var ngx_libs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-libs */ 76115);






const signedData = '000000000000000000000000000000000000000000000000000000000000001b3bb4e13421d4a09c0aae950c64a2ab387dc0078afb52d4338067cc04c06b7b5d621a2484d05246f06d129637e7d374e0627856f7aef88a35225276f5f13d29330000000000000000000000000000000000000000000000000000000079c264bf00000000000000000000000000000000000000000000008e5d7c4aef0eb300000000000000000000000000000000000000000000000000000000000000000006';
class RetiredVault extends _base__WEBPACK_IMPORTED_MODULE_2__.Base {
    constructor(contract, accountService, contractService, info) {
        super(contract, src_app_abi_vault__WEBPACK_IMPORTED_MODULE_1__.default, accountService, contractService);
        this.contract = contract;
        this.accountService = accountService;
        this.contractService = contractService;
        this.info = info;
        this.name = this.info.name;
        const source = (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.combineLatest)([this.accountService.account, (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.timer)(0, 5000)]).pipe((0,ngx_libs__WEBPACK_IMPORTED_MODULE_5__.sharePublishReplay)(1));
        this.balance = source.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)(([a]) => (a ? this.getBalance(a).pipe() : (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(new (bignumber_js__WEBPACK_IMPORTED_MODULE_0___default())(0)))), (0,ngx_libs__WEBPACK_IMPORTED_MODULE_5__.sharePublishReplay)(1));
        this.deposited = this.balance.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.map)((b) => b.gt(0)));
    }
    withdrawAll(paymasterMethod) {
        return this.balance.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.mergeMap)((b) => this.send((i) => i.methods.withdraw(b.toDecimal().toString(10)), { paymasterMethod, extraData: signedData })));
    }
    getBalance(account) {
        return this.call((i) => i.methods.balanceOf(account)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.map)((v) => new (bignumber_js__WEBPACK_IMPORTED_MODULE_0___default())(v).fromDecimal()));
    }
}


/***/ }),

/***/ 38960:
/*!****************************************!*\
  !*** ./src/app/models/retired-pool.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RetiredPool": () => (/* binding */ RetiredPool)
/* harmony export */ });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ 15788);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_app_abi_pool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/abi/pool */ 19487);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base */ 61362);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 46797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 9112);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 88002);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 43190);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 15257);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 19773);
/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./token */ 3589);
/* harmony import */ var ngx_libs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-libs */ 76115);
/* harmony import */ var _retired_vault__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./retired-vault */ 82603);








class RetiredPool extends _base__WEBPACK_IMPORTED_MODULE_2__.Base {
    constructor(contract, accountService, contractService, ethWalletService, info) {
        super(contract, src_app_abi_pool__WEBPACK_IMPORTED_MODULE_1__.default, accountService, contractService);
        this.contract = contract;
        this.accountService = accountService;
        this.contractService = contractService;
        this.ethWalletService = ethWalletService;
        this.info = info;
        this.name = this.info.name;
        const token = this.getToken().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((address) => new _token__WEBPACK_IMPORTED_MODULE_3__.Token(address, 18, this.accountService, this.ethWalletService, this.contractService)), (0,ngx_libs__WEBPACK_IMPORTED_MODULE_6__.sharePublishReplay)(1));
        const vault = this.getVault().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((address) => new _retired_vault__WEBPACK_IMPORTED_MODULE_4__.RetiredVault(address, this.accountService, this.contractService, this.ethWalletService, {})), (0,ngx_libs__WEBPACK_IMPORTED_MODULE_6__.sharePublishReplay)(1));
        this.totalShares = token.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)((t) => t.totalSupply));
        this.equity = vault.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)((v) => (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.timer)(0, 5000).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)(() => v.getBalance(this.contract)))), (0,ngx_libs__WEBPACK_IMPORTED_MODULE_6__.sharePublishReplay)(1));
        this.myShares = token.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)((t) => t.balance));
        this.myValue = (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.combineLatest)([this.equity, this.totalShares, this.myShares]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(([e, t, m]) => t.eq(0) ? new (bignumber_js__WEBPACK_IMPORTED_MODULE_0___default())(0) : e.div(t).times(m)));
        this.staked = this.myShares.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((s) => s.gt(0)));
    }
    getToken() {
        return this.call((i) => i.methods.token());
    }
    getVault() {
        return this.call((i) => i.methods.vault());
    }
    withdrawAll(paymasterMethod) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.combineLatest)([this.myShares, this.myValue]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.mergeMap)(([s, v]) => this.send((i) => i.methods.withdraw(s.toDecimal().toString(10), v.times(0.99).toDecimal().toString(10)), { paymasterMethod })));
    }
}


/***/ }),

/***/ 82603:
/*!*****************************************!*\
  !*** ./src/app/models/retired-vault.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RetiredVault": () => (/* binding */ RetiredVault)
/* harmony export */ });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ 15788);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_app_abi_vault__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/abi/vault */ 28874);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base */ 61362);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 9112);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 46797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 25917);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 43190);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 88002);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 15257);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 19773);
/* harmony import */ var ngx_libs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-libs */ 76115);






class RetiredVault extends _base__WEBPACK_IMPORTED_MODULE_2__.Base {
    constructor(contract, accountService, contractService, ethWalletService, info) {
        super(contract, src_app_abi_vault__WEBPACK_IMPORTED_MODULE_1__.default, accountService, contractService);
        this.contract = contract;
        this.accountService = accountService;
        this.contractService = contractService;
        this.ethWalletService = ethWalletService;
        this.info = info;
        this.name = info.name;
        const source = (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.combineLatest)([this.accountService.account, (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.timer)(0, 5000)]).pipe((0,ngx_libs__WEBPACK_IMPORTED_MODULE_5__.sharePublishReplay)(1));
        this.balance = source.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)(([a]) => a ? this.getBalance(a).pipe() : (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(new (bignumber_js__WEBPACK_IMPORTED_MODULE_0___default())(0))), (0,ngx_libs__WEBPACK_IMPORTED_MODULE_5__.sharePublishReplay)(1));
        this.deposited = this.balance.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.map)((b) => b.gt(0)));
    }
    withdrawAll(paymasterMethod) {
        return this.balance.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.mergeMap)((b) => this.send((i) => i.methods.withdraw(b.toDecimal().toString(10)), { paymasterMethod })));
    }
    getBalance(account) {
        return this.call((i) => i.methods.balanceOf(account)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.map)((v) => new (bignumber_js__WEBPACK_IMPORTED_MODULE_0___default())(v).fromDecimal()));
    }
}


/***/ }),

/***/ 58253:
/*!*******************************************!*\
  !*** ./src/app/models/v1/retired-pool.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RetiredPool": () => (/* binding */ RetiredPool)
/* harmony export */ });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ 15788);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_app_abi_signed_pool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/abi/signed-pool */ 92958);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ 61362);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 46797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 9112);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 88002);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 43190);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 15257);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 19773);
/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../token */ 3589);
/* harmony import */ var ngx_libs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-libs */ 76115);
/* harmony import */ var _retired_vault__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./retired-vault */ 15704);








class RetiredPool extends _base__WEBPACK_IMPORTED_MODULE_2__.Base {
    constructor(contract, accountService, contractService, ethWalletService, info) {
        super(contract, src_app_abi_signed_pool__WEBPACK_IMPORTED_MODULE_1__.default, accountService, contractService);
        this.contract = contract;
        this.accountService = accountService;
        this.contractService = contractService;
        this.ethWalletService = ethWalletService;
        this.info = info;
        this.name = this.info.name;
        this.signedData = this.name.includes('BTC') ? _retired_vault__WEBPACK_IMPORTED_MODULE_4__.btcSignedData : _retired_vault__WEBPACK_IMPORTED_MODULE_4__.ethSignedData;
        const token = this.getToken().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((address) => new _token__WEBPACK_IMPORTED_MODULE_3__.Token(address, 18, this.accountService, this.ethWalletService, this.contractService)), (0,ngx_libs__WEBPACK_IMPORTED_MODULE_6__.sharePublishReplay)(1));
        const vault = this.getVault().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((address) => new _retired_vault__WEBPACK_IMPORTED_MODULE_4__.RetiredVault(address, this.accountService, this.contractService, {})), (0,ngx_libs__WEBPACK_IMPORTED_MODULE_6__.sharePublishReplay)(1));
        this.totalShares = token.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)((t) => t.totalSupply));
        this.equity = vault.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)((v) => (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.timer)(0, 5000).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)(() => v.getBalance(this.contract)))), (0,ngx_libs__WEBPACK_IMPORTED_MODULE_6__.sharePublishReplay)(1));
        this.myShares = token.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.switchMap)((t) => t.balance));
        this.myValue = (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.combineLatest)([this.equity, this.totalShares, this.myShares]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(([e, t, m]) => (t.eq(0) ? new (bignumber_js__WEBPACK_IMPORTED_MODULE_0___default())(0) : e.div(t).times(m))));
        this.staked = this.myShares.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((s) => s.gt(0)));
    }
    getToken() {
        return this.call((i) => i.methods.token());
    }
    getVault() {
        return this.call((i) => i.methods.vault());
    }
    withdrawAll(paymasterMethod) {
        const deadline = Math.floor(Date.now() / 1000) + 6000;
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.combineLatest)([this.myShares, this.myValue]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.mergeMap)(([s, v]) => this.send((i) => i.methods.withdraw(s.toDecimal().toString(10), v.times(0.99).toDecimal().toString(10), deadline), {
            paymasterMethod,
            extraData: this.signedData
        })));
    }
}


/***/ }),

/***/ 30607:
/*!****************************************************!*\
  !*** ./src/app/models/v1/retired-trading-vault.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RetiredTradingVault": () => (/* binding */ RetiredTradingVault)
/* harmony export */ });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ 15788);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_app_abi_trading_vault__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/abi/trading-vault */ 7359);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ 61362);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 46797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 9112);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 88002);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 43190);
/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../token */ 3589);
/* harmony import */ var ngx_libs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-libs */ 76115);







const USDC_ADDRESS = '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4';
class RetiredTradingVault extends _base__WEBPACK_IMPORTED_MODULE_2__.Base {
    constructor(contract, accountService, contractService, ethWalletService, info) {
        super(contract, src_app_abi_trading_vault__WEBPACK_IMPORTED_MODULE_1__.default, accountService, contractService);
        this.contract = contract;
        this.accountService = accountService;
        this.contractService = contractService;
        this.ethWalletService = ethWalletService;
        this.info = info;
        this.name = this.info.name;
        const token = this.getToken().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)((address) => new _token__WEBPACK_IMPORTED_MODULE_3__.Token(address, 18, this.accountService, this.ethWalletService, this.contractService)), (0,ngx_libs__WEBPACK_IMPORTED_MODULE_5__.sharePublishReplay)(1));
        const usdc = new _token__WEBPACK_IMPORTED_MODULE_3__.Token(USDC_ADDRESS, 6, this.accountService, this.ethWalletService, this.contractService);
        this.totalShares = token.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)((t) => t.totalSupply));
        this.equity = (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.timer)(0, 5000).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)(() => usdc.balanceOf(this.contract)), (0,ngx_libs__WEBPACK_IMPORTED_MODULE_5__.sharePublishReplay)(1));
        this.myShares = token.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)((t) => t.balance));
        this.myValue = (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)([this.equity, this.totalShares, this.myShares]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(([e, t, m]) => (t.eq(0) ? new (bignumber_js__WEBPACK_IMPORTED_MODULE_0___default())(0) : e.div(t).times(m))));
        this.staked = this.myShares.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)((s) => s.gt(0)));
    }
    getToken() {
        return this.call((i) => i.methods.token());
    }
    getVault() {
        return this.call((i) => i.methods.vault());
    }
    withdrawAll(paymasterMethod) {
        return this.send((i) => i.methods.withdraw(), {
            paymasterMethod
        });
    }
}


/***/ }),

/***/ 15704:
/*!********************************************!*\
  !*** ./src/app/models/v1/retired-vault.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ethSignedData": () => (/* binding */ ethSignedData),
/* harmony export */   "btcSignedData": () => (/* binding */ btcSignedData),
/* harmony export */   "RetiredVault": () => (/* binding */ RetiredVault)
/* harmony export */ });
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bignumber.js */ 15788);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_app_abi_vault__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/abi/vault */ 28874);
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base */ 61362);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 9112);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 46797);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 25917);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 43190);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 88002);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 15257);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 19773);
/* harmony import */ var ngx_libs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-libs */ 76115);






const ethSignedData = '000000000000000000000000000000000000000000000000000000000000001c3bd678cad1b2de915572f435c3742bf423de52c9e9decb55bce2db6191351322311f696b471545e8e7fb1c2f3fd537195167b948f42a0578c5808de0c109367c00000000000000000000000000000000000000000000000000000007c254b28900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000ab34ff7b96928078000000000000000000000000000000000000000000000000000000000000000007';
const btcSignedData = '000000000000000000000000000000000000000000000000000000000000001b9c3835269171504fabb5b32571bd423de02008da910815ef05d5018460bce56742819ce74b9e78c8ccbc8ca5a3d26ff93e3aa8b61d21c170efed682dc5e4d80a00000000000000000000000000000000000000000000000000000007c254b2b6000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000137d1f8e37d8136c00000000000000000000000000000000000000000000000000000000000000000007';
class RetiredVault extends _base__WEBPACK_IMPORTED_MODULE_2__.Base {
    constructor(contract, accountService, contractService, info) {
        var _a;
        super(contract, src_app_abi_vault__WEBPACK_IMPORTED_MODULE_1__.default, accountService, contractService);
        this.contract = contract;
        this.accountService = accountService;
        this.contractService = contractService;
        this.info = info;
        this.name = this.info.name;
        this.signedData = ((_a = this.name) === null || _a === void 0 ? void 0 : _a.includes('BTC')) ? btcSignedData : ethSignedData;
        const source = (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.combineLatest)([this.accountService.account, (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.timer)(0, 5000)]).pipe((0,ngx_libs__WEBPACK_IMPORTED_MODULE_5__.sharePublishReplay)(1));
        this.balance = source.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)(([a]) => (a ? this.getBalance(a).pipe() : (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(new (bignumber_js__WEBPACK_IMPORTED_MODULE_0___default())(0)))), (0,ngx_libs__WEBPACK_IMPORTED_MODULE_5__.sharePublishReplay)(1));
        this.deposited = this.balance.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.map)((b) => b.gt(0)));
    }
    withdrawAll(paymasterMethod) {
        return this.balance.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.mergeMap)((b) => this.send((i) => i.methods.withdraw(b.toDecimal().toString(10)), { paymasterMethod, extraData: this.signedData })));
    }
    getBalance(account) {
        return this.call((i) => i.methods.balanceOf(account)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.map)((v) => new (bignumber_js__WEBPACK_IMPORTED_MODULE_0___default())(v).fromDecimal()));
    }
}


/***/ }),

/***/ 4471:
/*!*********************************************!*\
  !*** ./src/app/services/loading.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoadingService": () => (/* binding */ LoadingService)
/* harmony export */ });
/* harmony import */ var _shared_loading_loading_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/loading/loading.component */ 83617);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 12664);



class LoadingService {
    constructor(ngbModal) {
        this.ngbModal = ngbModal;
        this.loading = false;
    }
    start() {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.modal = this.ngbModal.open(_shared_loading_loading_component__WEBPACK_IMPORTED_MODULE_0__.LoadingComponent, {
            size: 'sm',
            windowClass: 'modal-loading',
            centered: true,
            backdrop: 'static',
            backdropClass: 'modal-loading-backdrop'
        });
    }
    stop() {
        if (!this.loading) {
            return;
        }
        this.loading = false;
        this.modal.close();
    }
}
LoadingService.ɵfac = function LoadingService_Factory(t) { return new (t || LoadingService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__.NgbModal)); };
LoadingService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: LoadingService, factory: LoadingService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 49189:
/*!*************************************************************!*\
  !*** ./src/app/views/main/retired/index/index.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexComponent": () => (/* binding */ IndexComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 19773);
/* harmony import */ var src_app_models_retired_pool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/models/retired-pool */ 38960);
/* harmony import */ var src_app_models_retired_vault__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/models/retired-vault */ 82603);
/* harmony import */ var src_app_models_beta_retired_pool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/models/beta/retired-pool */ 17364);
/* harmony import */ var src_app_models_beta_retired_vault__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/models/beta/retired-vault */ 18574);
/* harmony import */ var src_app_models_v1_retired_vault__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/models/v1/retired-vault */ 15704);
/* harmony import */ var src_app_models_v1_retired_pool__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/models/v1/retired-pool */ 58253);
/* harmony import */ var src_app_models_v1_retired_trading_vault__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/models/v1/retired-trading-vault */ 30607);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/environments/environment */ 92340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var src_app_services_loading_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/loading.service */ 4471);
/* harmony import */ var src_app_services_account_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/account.service */ 89876);
/* harmony import */ var src_app_services_contract_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/contract.service */ 36569);
/* harmony import */ var src_app_services_eth_wallet_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/eth-wallet.service */ 8834);
/* harmony import */ var src_app_services_message_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/services/message.service */ 42684);
/* harmony import */ var src_app_services_paymaster_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/services/paymaster.service */ 88206);
/* harmony import */ var src_app_services_main_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/services/main.service */ 91557);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/common */ 38583);
/* harmony import */ var ngx_libs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-libs */ 76115);
/* harmony import */ var _shared_connect_button_connect_button_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../shared/connect-button/connect-button.component */ 90550);






















function IndexComponent_a_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function IndexComponent_a_9_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return ctx_r9.clear();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](1, "i", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }
}

function IndexComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](1, "i", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate1"](" View-only mode. The data below for ", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](3, 1, ctx_r1.accountService.account), " is display-only and cannot be operated on. ");
  }
}

function IndexComponent_div_21_i_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "i", 31);
  }
}

function IndexComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](3, "h4", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](5, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](6, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](7, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](8, "My Balance");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](9, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](10, "ngx-money", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](12, " (USDC) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](13, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](14, "app-connect-button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](15, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function IndexComponent_div_21_Template_button_click_15_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r14);
      const vault_r11 = restoredCtx.$implicit;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return ctx_r13.withdrawVault(vault_r11);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](16, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](17, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](18, IndexComponent_div_21_i_18_Template, 1, 0, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](19, " Withdraw All ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const vault_r11 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](vault_r11.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("value", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](11, 7, vault_r11.balance))("precision", 2)("symbol", "$");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("btnClass", "btn btn-primary w-100");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", ctx_r2.loadingService.loading || !_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](16, 9, vault_r11.deposited) || _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](17, 11, ctx_r2.accountService.isObserving));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r2.loadingService.loading);
  }
}

function IndexComponent_div_22_i_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "i", 31);
  }
}

function IndexComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](3, "h4", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](5, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](6, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](7, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](8, "My Balance");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](9, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](10, "ngx-money", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](12, " (USDC) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](13, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](14, "app-connect-button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](15, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function IndexComponent_div_22_Template_button_click_15_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r18);
      const pool_r15 = restoredCtx.$implicit;
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return ctx_r17.withdrawPool(pool_r15);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](16, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](17, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](18, IndexComponent_div_22_i_18_Template, 1, 0, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](19, " Remove All ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const pool_r15 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](pool_r15.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("value", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](11, 7, pool_r15.myValue))("precision", 2)("symbol", "$");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("btnClass", "btn btn-primary w-100");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", ctx_r3.loadingService.loading || !_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](16, 9, pool_r15.staked) || _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](17, 11, ctx_r3.accountService.isObserving));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r3.loadingService.loading);
  }
}

function IndexComponent_div_23_i_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "i", 31);
  }
}

function IndexComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](3, "h4", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](5, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](6, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](7, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](8, "My Balance");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](9, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](10, "ngx-money", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](12, " (USDC) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](13, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](14, "app-connect-button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](15, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function IndexComponent_div_23_Template_button_click_15_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r22);
      const vault_r19 = restoredCtx.$implicit;
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return ctx_r21.withdrawTradingVault(vault_r19);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](16, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](17, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](18, IndexComponent_div_23_i_18_Template, 1, 0, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](19, " Withdraw All ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const vault_r19 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](vault_r19.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("value", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](11, 7, vault_r19.myValue))("precision", 2)("symbol", "$");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("btnClass", "btn btn-primary w-100");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", ctx_r4.loadingService.loading || !_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](16, 9, vault_r19.staked) || _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](17, 11, ctx_r4.accountService.isObserving));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r4.loadingService.loading);
  }
}

function IndexComponent_div_31_i_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "i", 31);
  }
}

function IndexComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](3, "h4", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](5, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](6, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](7, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](8, "My Balance");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](9, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](10, "ngx-money", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](12, " (USDC) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](13, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](14, "app-connect-button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](15, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function IndexComponent_div_31_Template_button_click_15_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r26);
      const vault_r23 = restoredCtx.$implicit;
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return ctx_r25.withdrawVault(vault_r23);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](16, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](17, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](18, IndexComponent_div_31_i_18_Template, 1, 0, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](19, " Withdraw All ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const vault_r23 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](vault_r23.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("value", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](11, 7, vault_r23.balance))("precision", 2)("symbol", "$");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("btnClass", "btn btn-primary w-100");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", ctx_r5.loadingService.loading || !_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](16, 9, vault_r23.deposited) || _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](17, 11, ctx_r5.accountService.isObserving));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r5.loadingService.loading);
  }
}

function IndexComponent_div_32_i_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "i", 31);
  }
}

function IndexComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](3, "h4", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](5, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](6, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](7, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](8, "My Balance");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](9, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](10, "ngx-money", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](12, " (USDC) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](13, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](14, "app-connect-button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](15, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function IndexComponent_div_32_Template_button_click_15_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r30);
      const pool_r27 = restoredCtx.$implicit;
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return ctx_r29.withdrawPool(pool_r27);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](16, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](17, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](18, IndexComponent_div_32_i_18_Template, 1, 0, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](19, " Remove All ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const pool_r27 = ctx.$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](pool_r27.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("value", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](11, 7, pool_r27.myValue))("precision", 2)("symbol", "$");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("btnClass", "btn btn-primary w-100");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", ctx_r6.loadingService.loading || !_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](16, 9, pool_r27.staked) || _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](17, 11, ctx_r6.accountService.isObserving));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r6.loadingService.loading);
  }
}

function IndexComponent_div_40_i_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "i", 31);
  }
}

function IndexComponent_div_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](3, "h4", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](5, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](6, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](7, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](8, "My Balance");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](9, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](10, "ngx-money", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](12, " (USDC) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](13, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](14, "app-connect-button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](15, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function IndexComponent_div_40_Template_button_click_15_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r34);
      const vault_r31 = restoredCtx.$implicit;
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return ctx_r33.withdrawVault(vault_r31);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](16, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](17, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](18, IndexComponent_div_40_i_18_Template, 1, 0, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](19, " Withdraw All ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const vault_r31 = ctx.$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](vault_r31.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("value", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](11, 7, vault_r31.balance))("precision", 2)("symbol", "$");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("btnClass", "btn btn-primary w-100");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", ctx_r7.loadingService.loading || !_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](16, 9, vault_r31.deposited) || _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](17, 11, ctx_r7.accountService.isObserving));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r7.loadingService.loading);
  }
}

function IndexComponent_div_41_i_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](0, "i", 31);
  }
}

function IndexComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](3, "h4", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](5, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](6, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](7, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](8, "My Balance");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](9, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](10, "ngx-money", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](12, " (USDC) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](13, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](14, "app-connect-button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](15, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function IndexComponent_div_41_Template_button_click_15_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵrestoreView"](_r38);
      const pool_r35 = restoredCtx.$implicit;
      const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
      return ctx_r37.withdrawPool(pool_r35);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](16, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](17, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](18, IndexComponent_div_41_i_18_Template, 1, 0, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](19, " Remove All ");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const pool_r35 = ctx.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtextInterpolate"](pool_r35.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("value", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](11, 7, pool_r35.myValue))("precision", 2)("symbol", "$");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("btnClass", "btn btn-primary w-100");
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("disabled", ctx_r8.loadingService.loading || !_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](16, 9, pool_r35.staked) || _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](17, 11, ctx_r8.accountService.isObserving));
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx_r8.loadingService.loading);
  }
}

class IndexComponent {
  constructor(loadingService, accountService, contractService, ethWalletService, messageService, paymasterService, mainService) {
    this.loadingService = loadingService;
    this.accountService = accountService;
    this.contractService = contractService;
    this.ethWalletService = ethWalletService;
    this.messageService = messageService;
    this.paymasterService = paymasterService;
    this.mainService = mainService;
    this.searchAddress = '';
  }

  ngOnInit() {
    this.retiredPools = src_environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment.retired.pools.map(p => new src_app_models_retired_pool__WEBPACK_IMPORTED_MODULE_0__.RetiredPool(p.address, this.accountService, this.contractService, this.ethWalletService, p)) || [];
    this.retiredVaults = src_environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment.retired.vaults.map(v => new src_app_models_retired_vault__WEBPACK_IMPORTED_MODULE_1__.RetiredVault(v.address, this.accountService, this.contractService, this.ethWalletService, v)) || [];
    this.betaRetiredPools = src_environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment.betaRetired.pools.map(p => new src_app_models_beta_retired_pool__WEBPACK_IMPORTED_MODULE_2__.RetiredPool(p.address, this.accountService, this.contractService, this.ethWalletService, p)) || [];
    this.betaRetiredVaults = src_environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment.betaRetired.vaults.map(v => new src_app_models_beta_retired_vault__WEBPACK_IMPORTED_MODULE_3__.RetiredVault(v.address, this.accountService, this.contractService, v)) || [];
    this.v1RetiredPools = src_environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment.v1Retired.pools.map(p => new src_app_models_v1_retired_pool__WEBPACK_IMPORTED_MODULE_5__.RetiredPool(p.address, this.accountService, this.contractService, this.ethWalletService, p)) || [];
    this.v1RetiredVaults = src_environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment.v1Retired.vaults.map(v => new src_app_models_v1_retired_vault__WEBPACK_IMPORTED_MODULE_4__.RetiredVault(v.address, this.accountService, this.contractService, v)) || [];
    this.v1RetiredTradingVaults = src_environments_environment__WEBPACK_IMPORTED_MODULE_7__.environment.v1Retired.tradingVaults.map(v => new src_app_models_v1_retired_trading_vault__WEBPACK_IMPORTED_MODULE_6__.RetiredTradingVault(v.address, this.accountService, this.contractService, this.ethWalletService, v)) || [];
  }

  withdrawVault(vault) {
    if (this.loadingService.loading) {
      return;
    }

    this.loadingService.start();
    this.paymasterService.getMethod().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.mergeMap)(paymasterMethod => vault.withdrawAll(paymasterMethod))).subscribe(() => {
      this.loadingService.stop();
      this.messageService.success('Transaction completed.');
    }, e => {
      this.loadingService.stop();
      this.messageService.handleError(e);
    });
  }

  withdrawPool(pool) {
    if (this.loadingService.loading) {
      return;
    }

    this.loadingService.start();
    this.paymasterService.getMethod().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.mergeMap)(paymasterMethod => pool.withdrawAll(paymasterMethod))).subscribe(() => {
      this.loadingService.stop();
      this.messageService.success('Transaction completed.');
    }, e => {
      this.loadingService.stop();
      this.messageService.handleError(e);
    });
  }

  withdrawTradingVault(tradingVault) {
    if (this.loadingService.loading) {
      return;
    }

    this.loadingService.start();
    this.paymasterService.getMethod().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.mergeMap)(paymasterMethod => tradingVault.withdrawAll(paymasterMethod))).subscribe(() => {
      this.loadingService.stop();
      this.messageService.success('Transaction completed.');
    }, e => {
      this.loadingService.stop();
      this.messageService.handleError(e);
    });
  }

  onSearch() {
    if (this.searchAddress && (this.searchAddress.length !== 42 || !this.searchAddress.startsWith('0x'))) {
      this.messageService.error('Invalid address');
      return;
    }

    this.accountService.setObserveAddress(this.searchAddress);
  }

  clear() {
    this.searchAddress = '';
    this.onSearch();
  }

}

IndexComponent.ɵfac = function IndexComponent_Factory(t) {
  return new (t || IndexComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](src_app_services_loading_service__WEBPACK_IMPORTED_MODULE_8__.LoadingService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](src_app_services_account_service__WEBPACK_IMPORTED_MODULE_9__.AccountService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](src_app_services_contract_service__WEBPACK_IMPORTED_MODULE_10__.ContractService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](src_app_services_eth_wallet_service__WEBPACK_IMPORTED_MODULE_11__.EthWalletService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](src_app_services_message_service__WEBPACK_IMPORTED_MODULE_12__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](src_app_services_paymaster_service__WEBPACK_IMPORTED_MODULE_13__.PaymasterService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](src_app_services_main_service__WEBPACK_IMPORTED_MODULE_14__.MainService));
};

IndexComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineComponent"]({
  type: IndexComponent,
  selectors: [["app-index"]],
  decls: 42,
  vars: 12,
  consts: [[1, "container", "p-3"], [1, "card", "bg-main-dark", "border"], [1, "card-body", "p-3"], [3, "ngSubmit"], [1, "text-gray"], [1, "d-flex", "gap-2", "mt-2"], [1, "position-relative", "flex-1"], ["id", "address", "placeholder", "0x", "name", "address", "type", "text", 1, "form-control", 3, "ngModel", "ngModelChange"], ["class", "btn-clear p-1", "href", "javascript:;", "type", "button", 3, "click", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-primary"], ["class", "text-warning mt-2", 4, "ngIf"], [1, "card", "bg-main-dark", "border", "mt-3"], [1, "card-body", "p-0"], [1, "pool-wrapper"], [1, "d-block", "d-lg-flex", "pool"], [1, "pool-title", "d-flex", "align-items-center", "p-3"], [1, "fs-5-5", "mb-0"], ["class", "pool-wrapper", 4, "ngFor", "ngForOf"], ["href", "javascript:;", "type", "button", 1, "btn-clear", "p-1", 3, "click"], [1, "fas", "fa-times"], [1, "text-warning", "mt-2"], [1, "fas", "fa-exclamation-triangle"], [1, "d-block", "d-md-flex", "align-items-center", "flex-grow-1", "p-3"], [1, "d-flex", "d-md-block", "flex-1"], [1, "text-gray", "fs-7"], [1, "fs-5-5", "ms-auto"], [3, "value", "precision", "symbol"], [1, "mt-3", "mt-md-0"], [3, "btnClass"], [1, "btn", "btn-outline-primary", "w-100", 3, "disabled", "click"], ["class", "fas fa-spinner fa-spin", 4, "ngIf"], [1, "fas", "fa-spinner", "fa-spin"], [1, "text-white", "fs-5-5", "mb-0"]],
  template: function IndexComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](3, "form", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("ngSubmit", function IndexComponent_Template_form_ngSubmit_3_listener() {
        return ctx.onSearch();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](5, "Address");
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](6, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](7, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](8, "input", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("ngModelChange", function IndexComponent_Template_input_ngModelChange_8_listener($event) {
        return ctx.searchAddress = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](9, IndexComponent_a_9_Template, 2, 0, "a", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](10, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](11, "Query");
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](12, IndexComponent_div_12_Template, 4, 3, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](13, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](14, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](15, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](16, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](17, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](18, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](19, "h4", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](20, "Zomma V1 (Retired)");
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](21, IndexComponent_div_21_Template, 20, 13, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](22, IndexComponent_div_22_Template, 20, 13, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](23, IndexComponent_div_23_Template, 20, 13, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](24, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](25, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](26, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](27, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](28, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](29, "h4", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](30, "Zomma Beta (Retired)");
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](31, IndexComponent_div_31_Template, 20, 13, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](32, IndexComponent_div_32_Template, 20, 13, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](33, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](34, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](35, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](36, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](37, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](38, "h4", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](39, "Zomma Alpha (Retired)");
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](40, IndexComponent_div_40_Template, 20, 13, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtemplate"](41, IndexComponent_div_41_Template, 20, 13, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngModel", ctx.searchAddress);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", ctx.searchAddress);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](13, 10, ctx.accountService.isObserving));
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngForOf", ctx.v1RetiredVaults);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngForOf", ctx.v1RetiredPools);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngForOf", ctx.v1RetiredTradingVaults);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngForOf", ctx.betaRetiredVaults);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngForOf", ctx.betaRetiredPools);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngForOf", ctx.retiredVaults);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("ngForOf", ctx.retiredPools);
    }
  },
  directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_18__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_18__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.NgForm, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgForOf, ngx_libs__WEBPACK_IMPORTED_MODULE_20__.MoneyComponent, _shared_connect_button_connect_button_component__WEBPACK_IMPORTED_MODULE_15__.ConnectButtonComponent],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_19__.AsyncPipe],
  styles: ["@media (min-width: 1200px) {\n  .container[_ngcontent-%COMP%] {\n    max-width: 1160px;\n  }\n}\n.pool-title[_ngcontent-%COMP%] {\n  width: 278px;\n}\n.pool-wrapper[_ngcontent-%COMP%]    + .pool-wrapper[_ngcontent-%COMP%] {\n  border-top: 1px solid #144E67;\n}\n.btn-clear[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 10px;\n  top: 8px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0U7SUFDRSxpQkFBQTtFQURGO0FBQ0Y7QUFJQTtFQUNFLFlBQUE7QUFGRjtBQU1FO0VBQ0UsNkJBQUE7QUFISjtBQU9BO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsUUFBQTtBQUpGIiwiZmlsZSI6ImluZGV4LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAndmFyaWFibGVzJztcblxuQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkge1xuICAuY29udGFpbmVyIHtcbiAgICBtYXgtd2lkdGg6IDExNjBweDtcbiAgfVxufVxuXG4ucG9vbC10aXRsZSB7XG4gIHdpZHRoOiAyNzhweDtcbn1cblxuLnBvb2wtd3JhcHBlciB7XG4gICYgKyAucG9vbC13cmFwcGVyIHtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgJHByaW1hcnktZGFyaztcbiAgfVxufVxuXG4uYnRuLWNsZWFyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMTBweDtcbiAgdG9wOiA4cHg7XG59XG4iXX0= */"]
});

/***/ }),

/***/ 88008:
/*!*********************************************************!*\
  !*** ./src/app/views/main/retired/retired.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RetiredComponent": () => (/* binding */ RetiredComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 39895);


class RetiredComponent {
    constructor() { }
    ngOnInit() {
    }
}
RetiredComponent.ɵfac = function RetiredComponent_Factory(t) { return new (t || RetiredComponent)(); };
RetiredComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RetiredComponent, selectors: [["app-retired"]], decls: 1, vars: 0, template: function RetiredComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZXRpcmVkLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 46365:
/*!******************************************************!*\
  !*** ./src/app/views/main/retired/retired.module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RetiredModule": () => (/* binding */ RetiredModule)
/* harmony export */ });
/* harmony import */ var _retired_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./retired.component */ 88008);
/* harmony import */ var _index_index_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index/index.component */ 49189);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);
// import { CommonModule } from '@angular/common';






// import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
const routes = [
    {
        path: '',
        component: _retired_component__WEBPACK_IMPORTED_MODULE_0__.RetiredComponent,
        children: [
            {
                path: '',
                component: _index_index_component__WEBPACK_IMPORTED_MODULE_1__.IndexComponent
            }
        ]
    }
];
class RetiredModule {
}
RetiredModule.ɵfac = function RetiredModule_Factory(t) { return new (t || RetiredModule)(); };
RetiredModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: RetiredModule });
RetiredModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes),
            // LocalizeRouterModule.forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](RetiredModule, { declarations: [_retired_component__WEBPACK_IMPORTED_MODULE_0__.RetiredComponent,
        _index_index_component__WEBPACK_IMPORTED_MODULE_1__.IndexComponent], imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app_views_main_retired_retired_module_ts.js.map