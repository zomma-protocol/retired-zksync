(self["webpackChunkzomma"] = self["webpackChunkzomma"] || []).push([["src_app_views_main_main_module_ts"],{

/***/ 88007:
/*!*************************************!*\
  !*** ./src/app/api/auth/account.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Account": () => (/* binding */ Account)
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ 38195);
/* harmony import */ var _account_points__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./account/points */ 28108);


class Account extends _base__WEBPACK_IMPORTED_MODULE_0__.Base {
    constructor(httpClient) {
        super(httpClient, 'account');
        this.httpClient = httpClient;
        this.points = new _account_points__WEBPACK_IMPORTED_MODULE_1__.Points(this.httpClient, 'account');
    }
    update(record) {
        return this.api.httpClient.patch(this.api.path, this.api.snakecaseKeys(record));
    }
    signIn(params) {
        return this.api.httpClient.post(this.api.idPath('sign_in'), params);
    }
    getTotalPoints() {
        return this.api.get('total_points');
    }
    getReferralCode() {
        return this.api.get('referral_code');
    }
    getReferrerPoints() {
        return this.api.get('referrer_points');
    }
    getRefereePoints() {
        return this.api.get('referee_points');
    }
}


/***/ }),

/***/ 28108:
/*!********************************************!*\
  !*** ./src/app/api/auth/account/points.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Points": () => (/* binding */ Points)
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base */ 38195);

class Points extends _base__WEBPACK_IMPORTED_MODULE_0__.Base {
    constructor(httpClient, parent) {
        super(httpClient, `${parent}/points`);
        this.httpClient = httpClient;
        this.parent = parent;
    }
    query(params) {
        return this.api.query(params);
    }
    checkIn(validateResult) {
        return this.api.httpClient.post(this.api.idPath('check_in'), validateResult);
    }
}


/***/ }),

/***/ 38195:
/*!**********************************!*\
  !*** ./src/app/api/auth/base.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Base": () => (/* binding */ Base)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api */ 27028);

class Base {
    constructor(httpClient, resource) {
        this.httpClient = httpClient;
        this.resource = resource;
        this.api = new _api__WEBPACK_IMPORTED_MODULE_0__.Api(httpClient, `api/auth/v1/${this.resource}`);
    }
    get path() {
        return this.api.path;
    }
    pathJoin(id) {
        return `${this.resource}/${id}`;
    }
}


/***/ }),

/***/ 14193:
/*!*********************************************!*\
  !*** ./src/app/api/auth/referee-rewards.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RefereeRewards": () => (/* binding */ RefereeRewards)
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ 38195);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 68307);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bignumber.js */ 15788);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_app_rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/rxjs */ 77316);




class RefereeRewards extends _base__WEBPACK_IMPORTED_MODULE_0__.Base {
    constructor(httpClient) {
        super(httpClient, 'referee_rewards');
        this.httpClient = httpClient;
    }
    getClaimable() {
        return this.api.get('claimable').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)((json) => {
            json.claimable = new (bignumber_js__WEBPACK_IMPORTED_MODULE_1___default())(json.claimable).fromDecimal();
        }));
    }
    claim() {
        return this.api.httpClient.post(this.api.idPath('claim'), {}).pipe((0,src_app_rxjs__WEBPACK_IMPORTED_MODULE_2__.camelCase)());
    }
}


/***/ }),

/***/ 9707:
/*!********************************************!*\
  !*** ./src/app/api/auth/referral-codes.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReferralCodes": () => (/* binding */ ReferralCodes)
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ 38195);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 68307);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bignumber.js */ 15788);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_1__);



class ReferralCodes extends _base__WEBPACK_IMPORTED_MODULE_0__.Base {
    constructor(httpClient) {
        super(httpClient, 'referral_codes');
        this.httpClient = httpClient;
    }
    query(params) {
        return this.api.query(params).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((json) => json.referralCodes.forEach((record) => this.processRecord(record))));
    }
    create(params) {
        return this.api.create(params);
    }
    processRecord(record) {
        record.tradingVolume = new (bignumber_js__WEBPACK_IMPORTED_MODULE_1___default())(record.tradingVolume).fromDecimal();
        record.fee = new (bignumber_js__WEBPACK_IMPORTED_MODULE_1___default())(record.fee).fromDecimal();
        record.referrerRewardAmount = new (bignumber_js__WEBPACK_IMPORTED_MODULE_1___default())(record.referrerRewardAmount).fromDecimal();
        record.referrerPoints = new (bignumber_js__WEBPACK_IMPORTED_MODULE_1___default())(record.referrerPoints);
    }
}


/***/ }),

/***/ 45741:
/*!**********************************************!*\
  !*** ./src/app/api/auth/referrer-rewards.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReferrerRewards": () => (/* binding */ ReferrerRewards)
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ 38195);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 68307);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bignumber.js */ 15788);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_app_rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/rxjs */ 77316);




class ReferrerRewards extends _base__WEBPACK_IMPORTED_MODULE_0__.Base {
    constructor(httpClient) {
        super(httpClient, 'referrer_rewards');
        this.httpClient = httpClient;
    }
    getClaimable() {
        return this.api.get('claimable').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)((json) => {
            json.claimable = new (bignumber_js__WEBPACK_IMPORTED_MODULE_1___default())(json.claimable).fromDecimal();
        }));
    }
    claim() {
        return this.api.httpClient.post(this.api.idPath('claim'), {}).pipe((0,src_app_rxjs__WEBPACK_IMPORTED_MODULE_2__.camelCase)());
    }
}


/***/ }),

/***/ 94177:
/*!***********************************!*\
  !*** ./src/app/api/auth/tasks.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tasks": () => (/* binding */ Tasks)
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ 38195);

class Tasks extends _base__WEBPACK_IMPORTED_MODULE_0__.Base {
    constructor(httpClient) {
        super(httpClient, 'tasks');
        this.httpClient = httpClient;
    }
    verify(id, body = {}) {
        return this.api.httpClient.post(this.api.idPath(`${id}/verify`), body);
    }
    getStatus(ids) {
        return this.api.get('status', { id: ids.join() });
    }
    getFlash(referralCode) {
        return this.api.get('flash', { referralCode });
    }
}


/***/ }),

/***/ 37556:
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthService": () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 59193);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 40205);
/* harmony import */ var _api_auth_referral_codes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/auth/referral-codes */ 9707);
/* harmony import */ var _api_auth_account__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/auth/account */ 88007);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 13653);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 5304);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 19773);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 15257);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 68307);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 78345);
/* harmony import */ var _rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rxjs */ 77316);
/* harmony import */ var _api_auth_referrer_rewards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/auth/referrer-rewards */ 45741);
/* harmony import */ var _api_auth_referee_rewards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api/auth/referee-rewards */ 14193);
/* harmony import */ var _api_auth_tasks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api/auth/tasks */ 94177);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var ngx_libs_http__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-libs-http */ 22808);
/* harmony import */ var _eth_wallet_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./eth-wallet.service */ 8834);
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./message.service */ 42684);
/* harmony import */ var _account_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./account.service */ 89876);













const MESSAGE = 'Signing this message proves to Zomma you are in control of your account without giving Zomma access to any sensitive information. Message ID: %{nonce}';
class AuthService {
    constructor(httpService, ethWalletService, messageService, accountService) {
        this.httpService = httpService;
        this.ethWalletService = ethWalletService;
        this.messageService = messageService;
        this.accountService = accountService;
        this.lastMessage = 0;
        this.httpClient = this.httpService.get('auth');
        this.unauthorized = this.httpService.unauthorized('auth');
        this.referralCodes = new _api_auth_referral_codes__WEBPACK_IMPORTED_MODULE_0__.ReferralCodes(this.httpClient);
        this.referrerRewards = new _api_auth_referrer_rewards__WEBPACK_IMPORTED_MODULE_3__.ReferrerRewards(this.httpClient);
        this.refereeRewards = new _api_auth_referee_rewards__WEBPACK_IMPORTED_MODULE_4__.RefereeRewards(this.httpClient);
        this.account = new _api_auth_account__WEBPACK_IMPORTED_MODULE_1__.Account(this.httpClient);
        this.tasks = new _api_auth_tasks__WEBPACK_IMPORTED_MODULE_5__.Tasks(this.httpClient);
        this.accountService.account.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.skip)(1)).subscribe((a) => {
            if (a !== localStorage.getItem('ADDRESS')) {
                localStorage.removeItem('ACCESS_TOKEN');
                localStorage.removeItem('SAVED_REFERRAL_CODE');
                localStorage.removeItem('ADDRESS');
            }
        });
    }
    withSignedin(func) {
        return func().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.catchError)((e) => {
            if (e.status === 401) {
                return this.signIn().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.catchError)((e) => {
                    const now = Date.now();
                    if (now - this.lastMessage > 1000) {
                        this.lastMessage = now;
                        this.messageService.warning('Sign in failed');
                    }
                    return rxjs__WEBPACK_IMPORTED_MODULE_11__.EMPTY;
                }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.mergeMap)((r) => {
                    localStorage.setItem('ACCESS_TOKEN', r.accessToken);
                    return func();
                }));
            }
            else {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.throwError)(e);
            }
        }));
    }
    signIn() {
        if (this.lastSign) {
            return this.lastSign;
        }
        return this.accountService.account.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.mergeMap)((account) => {
            if (!account) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.throwError)(new Error('No account'));
            }
            const nonce = Math.floor(Date.now() / 1000);
            const message = MESSAGE.replace('%{nonce}', nonce.toString());
            this.lastSign = this.ethWalletService.sign({ message, address: account, encoding: 'utf8' }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.mergeMap)((signature) => this.account.signIn({ signature, nonce, address: account })), (0,_rxjs__WEBPACK_IMPORTED_MODULE_2__.camelCase)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.tap)(() => {
                this.lastSign = null;
                localStorage.setItem('ADDRESS', account);
            }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.catchError)((e) => {
                this.lastSign = null;
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.throwError)(e);
            }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.share)());
            return this.lastSign;
        }));
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](ngx_libs_http__WEBPACK_IMPORTED_MODULE_18__.HttpService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_eth_wallet_service__WEBPACK_IMPORTED_MODULE_6__.EthWalletService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_message_service__WEBPACK_IMPORTED_MODULE_7__.MessageService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵinject"](_account_service__WEBPACK_IMPORTED_MODULE_8__.AccountService)); };
AuthService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 23741:
/*!*******************************************************************!*\
  !*** ./src/app/views/main/accept-terms/accept-terms.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AcceptTermsComponent": () => (/* binding */ AcceptTermsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 12664);


class AcceptTermsComponent {
    constructor(ngbActiveModal) {
        this.ngbActiveModal = ngbActiveModal;
        this.checked = false;
        this.checked2 = false;
        this.checked3 = false;
    }
    ngOnInit() {
    }
    onChange(key, e) {
        this[key] = e.target.checked;
    }
    accept() {
        localStorage.setItem('TERMS_ACCEPTED', '1');
        this.ngbActiveModal.close();
    }
}
AcceptTermsComponent.ɵfac = function AcceptTermsComponent_Factory(t) { return new (t || AcceptTermsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__.NgbActiveModal)); };
AcceptTermsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AcceptTermsComponent, selectors: [["app-accept-terms"]], decls: 23, vars: 1, consts: [[1, "modal-header", "pb-2"], [1, "modal-title"], ["src", "/retired-zksync/assets/images/icons/asset_agreement_32.svg", 1, "mt-3"], [1, "modal-body", "p-0"], [1, "form-check", "mt-32"], ["type", "checkbox", "id", "check1", 1, "form-check-input", 3, "change"], ["for", "check1", 1, "form-check-label"], ["type", "checkbox", "id", "check2", 1, "form-check-input", 3, "change"], ["for", "check2", 1, "form-check-label"], ["type", "checkbox", "id", "check3", 1, "form-check-input", 3, "change"], ["for", "check3", 1, "form-check-label"], ["href", "https://zomma-protocol.gitbook.io/welcome-to-zomma/glossary/term-of-use", "rel", "noopener", "target", "_blank"], [1, "btn", "btn-primary", "w-100", "mt-32", 3, "disabled", "click"]], template: function AcceptTermsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h6", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "User Agreement");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function AcceptTermsComponent_Template_input_change_7_listener($event) { return ctx.onChange("checked", $event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " I am not a citizen or reside in the United States of America or a Prohibited User defined in the Terms of Use. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function AcceptTermsComponent_Template_input_change_11_listener($event) { return ctx.onChange("checked2", $event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "label", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " I am eligible to use decentralized financial services under the laws of the jurisdiction where I am located. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function AcceptTermsComponent_Template_input_change_15_listener($event) { return ctx.onChange("checked3", $event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " I have read carefully and agree the ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Terms & Use");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, ". ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AcceptTermsComponent_Template_button_click_21_listener() { return ctx.accept(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Continue");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.checked || !ctx.checked2 || !ctx.checked3);
    } }, styles: ["[_nghost-%COMP%] {\n  padding: 1rem;\n}\n\n.mt-32[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY2VwdC10ZXJtcy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0FBQ0YiLCJmaWxlIjoiYWNjZXB0LXRlcm1zLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4ubXQtMzIge1xuICBtYXJnaW4tdG9wOiAycmVtO1xufVxuIl19 */"] });


/***/ }),

/***/ 33893:
/*!*******************************************************!*\
  !*** ./src/app/views/main/header/header.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeaderComponent": () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var ngx_libs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-libs */ 76115);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 88002);
/* harmony import */ var src_app_services_eth_wallet_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/eth-wallet.service */ 8834);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ 92340);
/* harmony import */ var _modals_paymaster_paymaster_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modals/paymaster/paymaster.component */ 71647);
/* harmony import */ var _modals_network_network_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modals/network/network.component */ 80206);
/* harmony import */ var _modals_xy_xy_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modals/xy/xy.component */ 12785);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var src_app_services_account_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/account.service */ 89876);
/* harmony import */ var src_app_services_paymaster_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/paymaster.service */ 88206);
/* harmony import */ var src_app_services_main_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/main.service */ 91557);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 12664);
/* harmony import */ var _shared_hashed_asset_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../shared/hashed-asset.directive */ 50163);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 38583);
/* harmony import */ var _shared_let_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../shared/let.directive */ 20737);
/* harmony import */ var _shared_connect_button_connect_button_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../shared/connect-button/connect-button.component */ 90550);



















const _c0 = ["connectButton"];

function HeaderComponent_li_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "li", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "a", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function HeaderComponent_li_18_Template_a_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return ctx_r5.showPaymaster();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3, "Pay Gas by");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "img", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](7, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const item_r4 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("src", item_r4.icon, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](7, 2, item_r4.symbol));
  }
}

function HeaderComponent_ng_container_20_li_1_ng_container_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "img", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const network_r13 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("src", network_r13.icon, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](network_r13.name);
  }
}

function HeaderComponent_ng_container_20_li_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, HeaderComponent_ng_container_20_li_1_ng_container_2_ng_container_1_Template, 4, 2, "ng-container", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, ctx_r9.currentNetwork));
  }
}

function HeaderComponent_ng_container_20_li_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "img", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3, "Unsupported Network");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }
}

function HeaderComponent_ng_container_20_li_1_a_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "a", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function HeaderComponent_ng_container_20_li_1_a_9_Template_a_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r16);
      const network_r14 = restoredCtx.$implicit;
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
      return ctx_r15.selectNetwork(network_r14);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "img", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const network_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("disabled", !network_r14.params);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("src", network_r14.icon, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](network_r14.name);
  }
}

function HeaderComponent_ng_container_20_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "li", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "a", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, HeaderComponent_ng_container_20_li_1_ng_container_2_Template, 3, 3, "ng-container", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](3, HeaderComponent_ng_container_20_li_1_ng_container_3_Template, 4, 0, "ng-container", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6, " Select Network ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](9, HeaderComponent_ng_container_20_li_1_a_9_Template, 4, 4, "a", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "a", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](11, "img", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](13, "Arbitrum");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const supported_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("text-danger", !supported_r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", supported_r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !supported_r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r8.networks);
  }
}

function HeaderComponent_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, HeaderComponent_ng_container_20_li_1_Template, 14, 5, "li", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }
}

function HeaderComponent_li_26_ng_container_3_ng_container_1_img_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "img", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](1, "async");
  }

  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](4);
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("src", (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](1, 1, ctx_r23.currentNetwork)) == null ? null : tmp_0_0.icon, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
  }
}

function HeaderComponent_li_26_ng_container_3_ng_container_1_img_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "img", 36);
  }
}

function HeaderComponent_li_26_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, HeaderComponent_li_26_ng_container_3_ng_container_1_img_1_Template, 2, 3, "img", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, HeaderComponent_li_26_ng_container_3_ng_container_1_img_2_Template, 1, 0, "img", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const supported_r22 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", supported_r22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !supported_r22);
  }
}

function HeaderComponent_li_26_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, HeaderComponent_li_26_ng_container_3_ng_container_1_Template, 3, 2, "ng-container", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("appLet", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, ctx_r19.supportedNetwork));
  }
}

function HeaderComponent_li_26_ng_container_15_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "img", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const network_r29 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("src", network_r29.icon, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](network_r29.name);
  }
}

function HeaderComponent_li_26_ng_container_15_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, HeaderComponent_li_26_ng_container_15_ng_container_1_ng_container_1_Template, 4, 2, "ng-container", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, ctx_r26.currentNetwork));
  }
}

function HeaderComponent_li_26_ng_container_15_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "img", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3, "Unsupported Network");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }
}

function HeaderComponent_li_26_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, HeaderComponent_li_26_ng_container_15_ng_container_1_Template, 3, 3, "ng-container", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, HeaderComponent_li_26_ng_container_15_ng_container_2_Template, 4, 0, "ng-container", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const supported_r25 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", supported_r25);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !supported_r25);
  }
}

function HeaderComponent_li_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "li", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "a", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](3, HeaderComponent_li_26_ng_container_3_Template, 3, 3, "ng-container", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "img", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](7, "shortAddress");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](11, "shortAddress");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](13, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](14, "a", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function HeaderComponent_li_26_Template_a_click_14_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r31);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return ctx_r30.showNetwork();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](15, HeaderComponent_li_26_ng_container_15_Template, 3, 2, "ng-container", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](16, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](17, "a", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function HeaderComponent_li_26_Template_a_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r31);
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return ctx_r32.disconnet();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](18, "img", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](19, " Disconnet ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const a_r18 = ctx.ngIf;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("dropdownClass", "dropdown-popup");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("border-danger", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 7, ctx_r3.accountService.isObserving));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("src", "/retired-zksync/assets/images/icons/" + _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](5, 9, ctx_r3.walletIcon), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](7, 11, a_r18), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](11, 13, a_r18), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("appLet", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](16, 15, ctx_r3.supportedNetwork));
  }
}

const _c1 = function () {
  return ["/"];
};

class HeaderComponent {
  constructor(accountService, paymasterService, ethWalletService, mainService, ngbModal) {
    this.accountService = accountService;
    this.paymasterService = paymasterService;
    this.ethWalletService = ethWalletService;
    this.mainService = mainService;
    this.ngbModal = ngbModal;
    this.features = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.features;
    this.networks = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.networks.filter(n => n.contracts);
    const name = localStorage.getItem('NETWORK');
    const network = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.networks.find(n => n.name === name) || src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.networks[0];
    this.ethWalletService.selectNetwork(network);
    this.walletIcon = this.ethWalletService.wallet.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.map)(wallet => {
      switch (wallet) {
        case src_app_services_eth_wallet_service__WEBPACK_IMPORTED_MODULE_0__.Wallet.Okx:
          return 'wallet_okxwallet.svg';

        default:
          return 'wallet_metamask_24.svg';
      }
    }));
    this.announcements = this.mainService.announcements.query().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.map)(result => result.announcements));
  }

  ngOnInit() {
    this.currentNetwork = this.ethWalletService.selectedNetwork.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.map)(network => network));
    this.supportedNetwork = this.ethWalletService.chainId.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.map)(chainId => chainId === 0 || !!src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.networks.find(n => n.params && parseInt(n.params.chainId) === chainId)), (0,ngx_libs__WEBPACK_IMPORTED_MODULE_13__.sharePublishReplay)(1));
    const wallet = parseInt(localStorage.getItem('WALLET'));

    if (wallet in src_app_services_eth_wallet_service__WEBPACK_IMPORTED_MODULE_0__.Wallet) {
      const win = window;

      if (win.ethereum._metamask) {
        win.ethereum._metamask.isUnlocked().then(unlocked => {
          if (unlocked) {
            this.ethWalletService.connect(wallet).subscribe();
          }
        });
      } else {
        this.ethWalletService.connect(wallet).subscribe();
      }
    }
  }

  selectNetwork(network) {
    if (!network.params) {
      return;
    }

    localStorage.setItem('NETWORK', network.name);
    this.ethWalletService.selectNetwork(network);
    this.connectButton.changeWalletNetwork(network);
  }

  disconnet() {
    if (localStorage.getItem('OBSERVE_ADDRESS')) {
      this.accountService.removeObserveAddress();
    } else {
      this.ethWalletService.disconnect();
    }
  }

  showPaymaster() {
    this.ngbModal.open(_modals_paymaster_paymaster_component__WEBPACK_IMPORTED_MODULE_2__.PaymasterComponent, {
      size: 'sm',
      centered: true
    });
  }

  showNetwork() {
    const ref = this.ngbModal.open(_modals_network_network_component__WEBPACK_IMPORTED_MODULE_3__.NetworkComponent, {
      size: 'sm',
      centered: true
    });
    ref.componentInstance.connectButton = this.connectButton;
  }

  showXy() {
    this.ngbModal.open(_modals_xy_xy_component__WEBPACK_IMPORTED_MODULE_4__.XyComponent, {
      size: 'md',
      centered: true
    });
  }

}

HeaderComponent.ɵfac = function HeaderComponent_Factory(t) {
  return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_app_services_account_service__WEBPACK_IMPORTED_MODULE_5__.AccountService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_app_services_paymaster_service__WEBPACK_IMPORTED_MODULE_6__.PaymasterService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_app_services_eth_wallet_service__WEBPACK_IMPORTED_MODULE_0__.EthWalletService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_app_services_main_service__WEBPACK_IMPORTED_MODULE_7__.MainService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbModal));
};

HeaderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
  type: HeaderComponent,
  selectors: [["app-header"]],
  viewQuery: function HeaderComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c0, 5);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.connectButton = _t.first);
    }
  },
  decls: 28,
  vars: 15,
  consts: [[1, "navbar", "navbar-expand-lg", "navbar-dark", "fixed-top", "bg-main-dark", "mb-3"], [1, "container-fluid", "px-3"], [1, "bg-blur"], ["href", "https://zomma.pro/", 1, "navbar-brand", "d-none", "d-md-block"], ["src", "/retired-zksync/assets/images/logo_n.svg"], ["type", "button", "data-bs-toggle", "collapse", "data-bs-target", "#navbarSupportedContent", "aria-controls", "navbarSupportedContent", "aria-expanded", "false", "aria-label", "Toggle navigation", 1, "navbar-toggler", "more-pages", "border-0", "p-0", "collapsed"], ["src", "/retired-zksync/assets/images/icons/menu_24_normal.svg", 1, "normal"], ["src", "/retired-zksync/assets/images/icons/menu_24_hover.svg", 1, "hover"], ["id", "navbarSupportedContent", 1, "collapse", "navbar-collapse"], [1, "d-flex", "d-lg-none", "p-3", "border-bottom"], ["aria-hidden", "true", "data-bs-toggle", "collapse", "data-bs-target", "#navbarSupportedContent.show", 1, "ms-auto", "fs-1"], [1, "navbar-nav", "me-auto", "mb-2", "mb-lg-0", "fs-6", "align-items-center", "navbar-menu"], ["data-bs-toggle", "collapse", "data-bs-target", "#navbarSupportedContent.show", 1, "nav-item"], ["aria-current", "page", "routerLinkActive", "active", 1, "nav-link", "d-flex", "align-items-center", 3, "routerLink"], [1, "navbar-nav", "navbar-account", "ms-auto", "fs-6"], ["class", "nav-item", 4, "ngIf"], [4, "appLet"], [1, "nav-item", "ms-2"], ["connectButton", ""], ["ngbDropdown", "", "class", "nav-item ms-2 dropdown", 3, "dropdownClass", 4, "ngIf"], [1, "nav-item"], ["aria-expanded", "false", "aria-haspopup", "true", "href", "javascript:;", "role", "button", 1, "d-flex", "align-items-center", "btn", "btn-outline-primary-dark", "text-white", "px-2", "px-md-3", "hover", 3, "click"], [1, "text-gray", "me-2"], [1, "dropdown-item-icon", "me-0", "me-md-2", 3, "src"], [1, "d-none", "d-md-inline"], ["ngbDropdown", "", "class", "nav-item dropdown ms-2", 4, "ngxHideXs"], ["ngbDropdown", "", 1, "nav-item", "dropdown", "ms-2"], ["ngbDropdownToggle", "", "aria-expanded", "false", "aria-haspopup", "true", "href", "javascript:;", "role", "button", 1, "btn", "btn-outline-primary-dark", "text-white", "px-3", "dropdown-toggle"], [4, "ngIf"], ["aria-labelledby", "navbarDropdown", "ngbDropdownMenu", "", 1, "dropdown-menu", "dropdown-menu-dark", "dropdown-menu-end", "dropdown-menu-fadein"], [1, "d-flex", "d-lg-none", "p-3", "border-bottom", "fs-5-5"], ["ngbDropdownToggle", "", 1, "ms-auto", "fs-1", "dropdown-toggle-no-icon"], ["ngbDropdownItem", "", "href", "javascript:;", "class", "dropdown-item d-flex align-items-center", 3, "disabled", "click", 4, "ngFor", "ngForOf"], ["ngbDropdownItem", "", "href", "https://arb.zomma.pro", 1, "dropdown-item", "d-flex", "align-items-center"], ["src", "/retired-zksync/assets/images/icons/asset_arbitrum_20.svg", 1, "dropdown-item-icon"], [1, "dropdown-item-icon", 3, "src"], ["src", "/retired-zksync/assets/images/icons/error_20.svg", 1, "dropdown-item-icon"], ["ngbDropdownItem", "", "href", "javascript:;", 1, "dropdown-item", "d-flex", "align-items-center", 3, "click"], ["ngbDropdown", "", 1, "nav-item", "ms-2", "dropdown", 3, "dropdownClass"], ["ngbDropdownToggle", "", "aria-expanded", "false", "aria-haspopup", "true", "href", "javascript:;", "role", "button", 1, "btn", "btn-outline-primary-dark", "text-white", "px-2", "px-md-3", "dropdown-toggle"], [4, "ngxVisibleXs"], ["ngbDropdownItem", "", "data-bs-toggle", "collapse", "data-bs-target", "#navbarSupportedContent.show", 1, "dropdown-item", "d-flex", "d-md-none", "align-items-center", 3, "click"], ["src", "/retired-zksync/assets/images/icons/logout_24.svg", 1, "dropdown-item-icon"], ["class", "dropdown-item-icon", 3, "src", 4, "ngIf"], ["class", "dropdown-item-icon", "src", "/retired-zksync/assets/images/icons/error_20.svg", 4, "ngIf"]],
  template: function HeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "nav", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "a", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "img", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "button", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](6, "img", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](7, "img", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](10, "img", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](11, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](12, "\u00D7");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](13, "ul", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](14, "li", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](15, "a", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](16, " Retired ");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](17, "ul", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](18, HeaderComponent_li_18_Template, 8, 4, "li", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](19, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](20, HeaderComponent_ng_container_20_Template, 2, 0, "ng-container", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](21, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](22, "li", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](23, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](24, "app-connect-button", null, 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](26, HeaderComponent_li_26_Template, 20, 17, "li", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](27, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](14, _c1));
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](19, 6, ctx.paymasterService.item));
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("appLet", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](21, 8, ctx.supportedNetwork));
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("d-none", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](23, 10, ctx.accountService.account));
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](27, 12, ctx.accountService.account));
    }
  },
  directives: [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbNavbar, _shared_hashed_asset_directive__WEBPACK_IMPORTED_MODULE_8__.HashedAssetDirective, _angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterLinkWithHref, _angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterLinkActive, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _shared_let_directive__WEBPACK_IMPORTED_MODULE_9__.LetDirective, _shared_connect_button_connect_button_component__WEBPACK_IMPORTED_MODULE_10__.ConnectButtonComponent, ngx_libs__WEBPACK_IMPORTED_MODULE_13__.HideXsDirective, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDropdown, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDropdownToggle, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDropdownMenu, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgForOf, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDropdownItem, ngx_libs__WEBPACK_IMPORTED_MODULE_13__.VisibleXsDirective],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.AsyncPipe, ngx_libs__WEBPACK_IMPORTED_MODULE_13__.ShortAddressPipe],
  styles: [".bg-blur[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: -1;\n  pointer-events: none;\n  -webkit-backdrop-filter: blur(9px);\n          backdrop-filter: blur(9px);\n}\n\n.navbar-brand[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.more-pages[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]::after {\n  display: none;\n}\n\n.more-pages[_ngcontent-%COMP%]   .hover[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.more-pages[_ngcontent-%COMP%]:hover   .hover[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.more-pages[_ngcontent-%COMP%]:hover   .normal[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.new[_ngcontent-%COMP%] {\n  padding: 0 2px;\n  font-size: 10px;\n  border-radius: 4px;\n}\n\n@media (max-width: 991px) {\n  .navbar-collapse[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .navbar-collapse[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%] {\n    padding: 0.75rem 1rem;\n    font-size: 14px;\n  }\n\n  .navbar-account[_ngcontent-%COMP%] {\n    flex-direction: row;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNFLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLE1BQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtFQUNBLGtDQUFBO1VBQUEsMEJBQUE7QUFERjs7QUFJQTtFQUNFLGtCQUFBO0FBREY7O0FBS0U7RUFDRSxhQUFBO0FBRko7O0FBS0U7RUFDRSxhQUFBO0FBSEo7O0FBT0k7RUFDRSxjQUFBO0FBTE47O0FBUUk7RUFDRSxhQUFBO0FBTk47O0FBV0E7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FBUkY7O0FBV0E7RUFFSTtJQUNFLGNBQUE7RUFUSjtFQVlFO0lBQ0UscUJBQUE7SUFDQSxlQUFBO0VBVko7O0VBY0E7SUFDRSxtQkFBQTtFQVhGO0FBQ0YiLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAndmFyaWFibGVzJztcblxuLmJnLWJsdXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgei1pbmRleDogLTE7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoOXB4KTtcbn1cblxuLm5hdmJhci1icmFuZCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLm1vcmUtcGFnZXMge1xuICAuZHJvcGRvd24tdG9nZ2xlOjphZnRlciB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gIC5ob3ZlciB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gICY6aG92ZXJ7XG4gICAgLmhvdmVyIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cblxuICAgIC5ub3JtYWwge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cbn1cblxuLm5ldyB7XG4gIHBhZGRpbmc6IDAgMnB4O1xuICBmb250LXNpemU6IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDk5MXB4KSB7XG4gIC5uYXZiYXItY29sbGFwc2Uge1xuICAgIC5uYXZiYXItbmF2IHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cblxuICAgIC5uYXYtbGluayB7XG4gICAgICBwYWRkaW5nOiAuNzVyZW0gMXJlbTtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICB9XG4gIH1cblxuICAubmF2YmFyLWFjY291bnQge1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIH1cbn1cbiJdfQ== */"]
});

/***/ }),

/***/ 33964:
/*!***************************************************!*\
  !*** ./src/app/views/main/main-routing.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainRoutingModule": () => (/* binding */ MainRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _main_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.component */ 41435);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37716);




// const devPath = environment.features.faucet ? [
//   {
//     path: 'faucet',
//     loadChildren: () => import('./faucet/faucet.module').then(m => m.FaucetModule)
//   },
//   {
//     path: 'dev',
//     component: DevComponent
//   }
// ] : [];
const routes = [
    // {
    //   path: '',
    //   pathMatch: 'full',
    //   redirectTo: 'vault',
    // },
    {
        path: '',
        component: _main_component__WEBPACK_IMPORTED_MODULE_0__.MainComponent,
        children: [
            // {
            //   path: 'trade',
            //   loadChildren: () => import('./trade/trade.module').then(m => m.TradeModule)
            // },
            // {
            //   path: 'earn',
            //   loadChildren: () => import('./earn/earn.module').then(m => m.EarnModule)
            // },
            // {
            //   path: 'vault',
            //   loadChildren: () => import('./yield/yield.module').then(m => m.YieldModule)
            // },
            // {
            //   path: 'referrals',
            //   loadChildren: () => import('./referrals/referrals.module').then(m => m.ReferralsModule)
            // },
            // {
            //   path: 'rebates',
            //   loadChildren: () => import('./rebates/rebates.module').then(m => m.RebatesModule)
            // },
            // {
            //   path: 'rewards',
            //   loadChildren: () => import('./loyalty-program/loyalty-program.module').then(m => m.LoyaltyProgramModule)
            // },
            // {
            //   path: 'usdc-shortcut',
            //   loadChildren: () => import('./bridge/bridge.module').then(m => m.BridgeModule)
            // },
            // {
            //   path: 'settlement',
            //   loadChildren: () => import('./data/data.module').then(m => m.DataModule)
            // },
            {
                path: '',
                loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_views_main_retired_retired_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./retired/retired.module */ 46365)).then(m => m.RetiredModule)
            }
            // ...devPath,
            // {
            //   path: 'pools',
            //   redirectTo: 'earn'
            // },
            // {
            //   path: 'loyalty-program',
            //   redirectTo: 'rewards'
            // },
            // {
            //   path: '**',
            //   redirectTo: 'retired'
            // }
        ]
    }
];
class MainRoutingModule {
}
MainRoutingModule.ɵfac = function MainRoutingModule_Factory(t) { return new (t || MainRoutingModule)(); };
MainRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: MainRoutingModule });
MainRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes),
            // LocalizeRouterModule.forChild(routes)
        ], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](MainRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 41435:
/*!**********************************************!*\
  !*** ./src/app/views/main/main.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainComponent": () => (/* binding */ MainComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 25917);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 88002);
/* harmony import */ var _accept_terms_accept_terms_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accept-terms/accept-terms.component */ 23741);
/* harmony import */ var _unavailable_region_unavailable_region_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unavailable-region/unavailable-region.component */ 12132);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 12664);
/* harmony import */ var src_app_services_main_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/main.service */ 91557);
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/auth.service */ 37556);
/* harmony import */ var src_app_services_account_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/account.service */ 89876);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var src_app_services_router_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/router.service */ 8509);
/* harmony import */ var src_app_services_gtag_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/gtag.service */ 7670);
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./header/header.component */ 33893);
/* harmony import */ var _shared_hashed_asset_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/hashed-asset.directive */ 50163);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 38583);















function MainComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "div", 15);
} }
class MainComponent {
    constructor(ngbModal, mainService, authService, accountService, activatedRoute, routerService, gtagService) {
        this.ngbModal = ngbModal;
        this.mainService = mainService;
        this.authService = authService;
        this.accountService = accountService;
        this.activatedRoute = activatedRoute;
        this.routerService = routerService;
        this.gtagService = gtagService;
        this.checking = true;
        this.countryAvailable = false;
    }
    ngOnInit() {
        this.checkCountry().subscribe((result) => {
            // if (result) {
            //   if (localStorage.getItem('TERMS_ACCEPTED') !== '1') {
            //     this.showTerms();
            //   }
            // } else {
            //   this.showUnavailableRegion();
            // }
            this.checking = false;
        });
        const code = this.activatedRoute.queryParams.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)((q) => q.r));
        // this.activatedRoute.queryParams.pipe(
        //   filter((q) => q.r)
        // ).subscribe((q) => {
        //   localStorage.setItem('REFERRAL_CODE', q.r);
        //   this.gtagService.gtag('set', 'user_properties', {
        //     referral_code: q.r
        //   });
        //   this.gtagService.gtag('event', 'set_referral_code');
        // });
        // this.accountService.account.pipe(
        //   filter((a) => !!a),
        //   debounceTime(100)
        // ).subscribe(() => {
        //   const referralCode = localStorage.getItem('REFERRAL_CODE');
        //   const savedCode = localStorage.getItem('SAVED_REFERRAL_CODE');
        //   if (!referralCode || savedCode === referralCode) {
        //     return;
        //   }
        //   this.authService.withSignedin(() => this.authService.account.update({ referralCode })).subscribe(
        //     () => {
        //       localStorage.setItem('SAVED_REFERRAL_CODE', referralCode);
        //     }, () => {
        //       localStorage.setItem('SAVED_REFERRAL_CODE', referralCode);
        //     }
        //   );
        // });
        // if (localStorage.getItem('CAMPAIGN') !== '2') {
        //   this.ngbModal.open(CampaignComponent, {
        //     modalDialogClass: 'modal-campaign',
        //     size: 'sm',
        //     centered: true,
        //     // backdrop: 'static'
        //   });
        //   localStorage.setItem('CAMPAIGN', '2');
        // }
    }
    checkCountry() {
        // if (environment.features.checkCountry) {
        //   return this.mainService.ips.getCountryCode().pipe(
        //     map((json) => json.countryCode),
        //     catchError(() => of(getCountryCode())),
        //     catchError(() => of(true)),
        //     map((code) => code !== 'US' && code !== 'TW')
        //     // map((code) => false)
        //   );
        // } else {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.of)(true);
        // }
    }
    showTerms() {
        this.ngbModal.open(_accept_terms_accept_terms_component__WEBPACK_IMPORTED_MODULE_0__.AcceptTermsComponent, {
            modalDialogClass: 'modal-terms',
            size: 'sm',
            centered: true,
            backdrop: 'static'
        });
    }
    showUnavailableRegion() {
        this.ngbModal.open(_unavailable_region_unavailable_region_component__WEBPACK_IMPORTED_MODULE_1__.UnavailableRegionComponent, {
            modalDialogClass: 'modal-terms',
            size: 'sm',
            centered: true,
            backdrop: 'static'
        });
    }
}
MainComponent.ɵfac = function MainComponent_Factory(t) { return new (t || MainComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__.NgbModal), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_services_main_service__WEBPACK_IMPORTED_MODULE_2__.MainService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_services_account_service__WEBPACK_IMPORTED_MODULE_4__.AccountService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_services_router_service__WEBPACK_IMPORTED_MODULE_5__.RouterService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_services_gtag_service__WEBPACK_IMPORTED_MODULE_6__.GtagService)); };
MainComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: MainComponent, selectors: [["app-main"]], decls: 18, vars: 1, consts: [[1, "container-min-height"], [1, "text-center", "p-3", "text-gray"], [1, "mb-1"], ["href", "https://twitter.com/ZommaProtocol", 1, "mx-2"], ["src", "/retired-zksync/assets/images/icons/twitter.svg"], ["href", "https://discord.com/invite/VAkBKQKXnh", 1, "mx-2"], ["src", "/retired-zksync/assets/images/icons/discord.svg"], ["href", "https://t.me/ZommaProtocol", 1, "mx-2"], ["src", "/retired-zksync/assets/images/icons/telegram.svg"], ["href", "https://zomma-protocol.gitbook.io/", 1, "mx-2"], ["src", "/retired-zksync/assets/images/icons/gitbook.svg"], ["href", "https://github.com/zomma-protocol/", 1, "mx-2"], ["src", "/retired-zksync/assets/images/icons/github_24.svg"], [1, "mt-3"], ["class", "checking", 4, "ngIf"], [1, "checking"]], template: function MainComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "footer", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](6, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](8, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](10, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](12, "img", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](14, "img", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](16, " \u00A9 Copyright 2023-2024 Zomma - All Rights Reserved ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](17, MainComponent_div_17_Template, 1, 0, "div", 14);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.checking);
    } }, directives: [_header_header_component__WEBPACK_IMPORTED_MODULE_7__.HeaderComponent, _angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterOutlet, _shared_hashed_asset_directive__WEBPACK_IMPORTED_MODULE_8__.HashedAssetDirective, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf], styles: ["footer[_ngcontent-%COMP%] {\n  margin-top: 4.125rem;\n}\n\n.checking[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  top: 0;\n  z-index: 1030;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.5);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxvQkFBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtFQUNBLE9BQUE7RUFDQSxNQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0Esb0NBQUE7QUFDRiIsImZpbGUiOiJtYWluLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiZm9vdGVyIHtcbiAgbWFyZ2luLXRvcDogNC4xMjVyZW07XG59XG5cbi5jaGVja2luZyB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICB6LWluZGV4OiAxMDMwO1xuICB3aWR0aDogMTAwdnc7XG4gIGhlaWdodDogMTAwdmg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ 33135:
/*!*******************************************!*\
  !*** ./src/app/views/main/main.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainModule": () => (/* binding */ MainModule)
/* harmony export */ });
/* harmony import */ var _main_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.component */ 41435);
/* harmony import */ var _main_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main-routing.module */ 33964);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 44466);
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header/header.component */ 33893);
/* harmony import */ var _modals_paymaster_paymaster_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modals/paymaster/paymaster.component */ 71647);
/* harmony import */ var _modals_network_network_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modals/network/network.component */ 80206);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37716);
// import { NgxMarqueeModule } from 'ngx-marquee';




// import { DevComponent } from './dev/dev.component';
// import { AcceptTermsComponent } from './accept-terms/accept-terms.component';
// import { UnavailableRegionComponent } from './unavailable-region/unavailable-region.component';
// import { CampaignComponent } from './campaign/campaign.component';



class MainModule {
}
MainModule.ɵfac = function MainModule_Factory(t) { return new (t || MainModule)(); };
MainModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: MainModule });
MainModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _main_routing_module__WEBPACK_IMPORTED_MODULE_1__.MainRoutingModule,
            src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            // NgxMarqueeModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](MainModule, { declarations: [_main_component__WEBPACK_IMPORTED_MODULE_0__.MainComponent,
        _header_header_component__WEBPACK_IMPORTED_MODULE_3__.HeaderComponent,
        // DevComponent,
        // AcceptTermsComponent,
        // UnavailableRegionComponent,
        // CampaignComponent,
        _modals_paymaster_paymaster_component__WEBPACK_IMPORTED_MODULE_4__.PaymasterComponent,
        _modals_network_network_component__WEBPACK_IMPORTED_MODULE_5__.NetworkComponent], imports: [_main_routing_module__WEBPACK_IMPORTED_MODULE_1__.MainRoutingModule,
        src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule] }); })();


/***/ }),

/***/ 80206:
/*!****************************************************************!*\
  !*** ./src/app/views/main/modals/network/network.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NetworkComponent": () => (/* binding */ NetworkComponent)
/* harmony export */ });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 92340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 12664);
/* harmony import */ var src_app_services_eth_wallet_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/eth-wallet.service */ 8834);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 38583);
/* harmony import */ var _shared_hashed_asset_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/hashed-asset.directive */ 50163);






function NetworkComponent_a_7_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "a", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NetworkComponent_a_7_Template_a_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3); const network_r1 = restoredCtx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r2.selectNetwork(network_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const network_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("disabled", !network_r1.params);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", network_r1.icon, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](network_r1.name);
} }
class NetworkComponent {
    constructor(ngbActiveModal, ethWalletService) {
        this.ngbActiveModal = ngbActiveModal;
        this.ethWalletService = ethWalletService;
        this.networks = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.networks.filter((n) => n.contracts);
    }
    ngOnInit() {
    }
    selectNetwork(network) {
        if (!network.params) {
            return;
        }
        localStorage.setItem('NETWORK', network.name);
        this.ethWalletService.selectNetwork(network);
        this.connectButton.changeWalletNetwork(network);
        this.ngbActiveModal.close();
    }
}
NetworkComponent.ɵfac = function NetworkComponent_Factory(t) { return new (t || NetworkComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__.NgbActiveModal), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_services_eth_wallet_service__WEBPACK_IMPORTED_MODULE_1__.EthWalletService)); };
NetworkComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: NetworkComponent, selectors: [["app-network"]], inputs: { connectButton: "connectButton" }, decls: 8, vars: 1, consts: [[1, "modal-header", "px-3", "border-bottom"], [1, "modal-title", "fs-5-5"], ["aria-label", "Close", 1, "close", "cursor-pointer", 3, "click"], ["aria-hidden", "true"], [1, "modal-body", "p-3"], ["href", "javascript:;", "class", "dropdown-item d-flex align-items-center px-3 py-2", 3, "disabled", "click", 4, "ngFor", "ngForOf"], ["href", "javascript:;", 1, "dropdown-item", "d-flex", "align-items-center", "px-3", "py-2", 3, "click"], [1, "dropdown-item-icon", 3, "src"]], template: function NetworkComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "h6", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Select Network");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NetworkComponent_Template_div_click_3_listener() { return ctx.ngbActiveModal.dismiss(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, NetworkComponent_a_7_Template, 4, 4, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.networks);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _shared_hashed_asset_directive__WEBPACK_IMPORTED_MODULE_2__.HashedAssetDirective], styles: [".dropdown-item[_ngcontent-%COMP%] {\n  background-color: #142A3F;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ldHdvcmsuY29tcG9uZW50LnNjc3MiLCIuLi8uLi8uLi8uLi8uLi9zdHlsZXMvX3ZhcmlhYmxlcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UseUJDeVIwQjtBRDFSNUIiLCJmaWxlIjoibmV0d29yay5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJ3ZhcmlhYmxlcyc7XG5cbi5kcm9wZG93bi1pdGVtIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGJvZHktYmc7XG59XG4iLCJAaW1wb3J0ICdib290c3RyYXAvc2Nzcy9mdW5jdGlvbnMnO1xuXG4vLyAvLyBWYXJpYWJsZXNcbi8vIC8vXG4vLyAvLyBWYXJpYWJsZXMgc2hvdWxkIGZvbGxvdyB0aGUgYCRjb21wb25lbnQtc3RhdGUtcHJvcGVydHktc2l6ZWAgZm9ybXVsYSBmb3Jcbi8vIC8vIGNvbnNpc3RlbnQgbmFtaW5nLiBFeDogJG5hdi1saW5rLWRpc2FibGVkLWNvbG9yIGFuZCAkbW9kYWwtY29udGVudC1ib3gtc2hhZG93LXhzLlxuXG4vLyBDb2xvciBzeXN0ZW1cblxuLy8gc2Nzcy1kb2NzLXN0YXJ0IGdyYXktY29sb3ItdmFyaWFibGVzXG5cbiR3aGl0ZTogICAgI2ZmZiAhZGVmYXVsdDtcbiRncmF5LTEwMDogI0YyRjJGMiAhZGVmYXVsdDtcbiRncmF5LTIwMDogI0UwRUFFRiAhZGVmYXVsdDtcbiRncmF5LTMwMDogI2RlZTJlNiAhZGVmYXVsdDtcbiRncmF5LTQwMDogI0E0QkFCRSAhZGVmYXVsdDtcbiRncmF5LTUwMDogIzhBQTRBNCAhZGVmYXVsdDtcbiRncmF5LTYwMDogIzJEMzYzOSAhZGVmYXVsdDtcbiRncmF5LTcwMDogIzI4MzAzMyAhZGVmYXVsdDtcbiRncmF5LTgwMDogIzFGMjQyNiAhZGVmYXVsdDtcbiRncmF5LTkwMDogIzE2MUMxRSAhZGVmYXVsdDtcbiRibGFjazogICAgIzAwMCAhZGVmYXVsdDtcblxuLy8gZnVzdi1kaXNhYmxlXG4kZ3JheXM6IChcbiAgXCIxMDBcIjogJGdyYXktMTAwLFxuICBcIjIwMFwiOiAkZ3JheS0yMDAsXG4gIFwiMzAwXCI6ICRncmF5LTMwMCxcbiAgXCI0MDBcIjogJGdyYXktNDAwLFxuICBcIjUwMFwiOiAkZ3JheS01MDAsXG4gIFwiNjAwXCI6ICRncmF5LTYwMCxcbiAgXCI3MDBcIjogJGdyYXktNzAwLFxuICBcIjgwMFwiOiAkZ3JheS04MDAsXG4gIFwiOTAwXCI6ICRncmF5LTkwMFxuKSAhZGVmYXVsdDtcbi8vIGZ1c3YtZW5hYmxlXG5cbiRibHVlOiAgICAjMWM0NDg3ICFkZWZhdWx0O1xuJGluZGlnbzogICM2NjEwZjIgIWRlZmF1bHQ7XG4kcHVycGxlOiAgIzZmNDJjMSAhZGVmYXVsdDtcbiRwaW5rOiAgICAjRkRBN0E5ICFkZWZhdWx0O1xuJHJlZDogICAgICNFQTM0NTQgIWRlZmF1bHQ7XG4kb3JhbmdlOiAgI2ZmNmYwMCAhZGVmYXVsdDtcbiR5ZWxsb3c6ICAjRjdFMTVDICFkZWZhdWx0O1xuJGdyZWVuOiAgICMyMEQyNzIgIWRlZmF1bHQ7XG4kdGVhbDogICAgIzIwYzk5NyAhZGVmYXVsdDtcbiRjeWFuOiAgICAjM2ZhYmQxICFkZWZhdWx0O1xuJGN5YW4tMTAwOiAgICAjODZlYWUwICFkZWZhdWx0O1xuXG4kZGFyay10aGVtZS1jYXJkLWJnOiByZ2JhKDExLCAyOCwgNDEsIDAuNzUpO1xuJGRhcmstdGhlbWUtYnRuLWhvdmVyOiByZ2JhKDUyLCA5OSwgOTMsIDAuNDApO1xuJGRhcmstdGhlbWUtaW50ZXJhY3Rpb246IHJnYmEoMCwgMjIsIDM4LCAwLjc1KTtcbiRwcmltYXJ5LWRhcms6ICMxNDRFNjc7XG5cbi8vIHNjc3MtZG9jcy1zdGFydCBjb2xvcnMtbWFwXG4kY29sb3JzOiAoXG4gIFwiYmx1ZVwiOiAgICAgICAkYmx1ZSxcbiAgXCJpbmRpZ29cIjogICAgICRpbmRpZ28sXG4gIFwicHVycGxlXCI6ICAgICAkcHVycGxlLFxuICBcInBpbmtcIjogICAgICAgJHBpbmssXG4gIFwicmVkXCI6ICAgICAgICAkcmVkLFxuICBcIm9yYW5nZVwiOiAgICAgJG9yYW5nZSxcbiAgXCJ5ZWxsb3dcIjogICAgICR5ZWxsb3csXG4gIFwiZ3JlZW5cIjogICAgICAkZ3JlZW4sXG4gIFwidGVhbFwiOiAgICAgICAkdGVhbCxcbiAgXCJjeWFuXCI6ICAgICAgICRjeWFuLFxuICBcIndoaXRlXCI6ICAgICAgJHdoaXRlLFxuICBcImJsYWNrXCI6ICAgICAgJGJsYWNrLFxuICBcImdyYXlcIjogICAgICAgJGdyYXktNTAwLFxuICBcImdyYXktZGFya1wiOiAgJGdyYXktODAwXG4pICFkZWZhdWx0O1xuLy8gc2Nzcy1kb2NzLWVuZCBjb2xvcnMtbWFwXG5cbiRwcmltYXJ5OiAgICAgICAkY3lhbi0xMDAgIWRlZmF1bHQ7XG4kc2Vjb25kYXJ5OiAgICAgcmdiYSg0OCwgOTIsIDEzMywgMC4zMCkgIWRlZmF1bHQ7XG4kc3VjY2VzczogICAgICAgJGdyZWVuICFkZWZhdWx0O1xuJGluZm86ICAgICAgICAgICRjeWFuICFkZWZhdWx0O1xuJHdhcm5pbmc6ICAgICAgICR5ZWxsb3cgIWRlZmF1bHQ7XG4kZGFuZ2VyOiAgICAgICAgJHJlZCAhZGVmYXVsdDtcbiRsaWdodDogICAgICAgICAkZ3JheS0xMDAgIWRlZmF1bHQ7XG4kZGFyazogICAgICAgICAgJGdyYXktOTAwICFkZWZhdWx0O1xuXG4vLyBzY3NzLWRvY3Mtc3RhcnQgdGhlbWUtY29sb3JzLW1hcFxuJHRoZW1lLWNvbG9yczogKFxuICBcInByaW1hcnlcIjogICAgJHByaW1hcnksXG4gIFwic2Vjb25kYXJ5XCI6ICAkc2Vjb25kYXJ5LFxuICBcInN1Y2Nlc3NcIjogICAgJHN1Y2Nlc3MsXG4gIFwiaW5mb1wiOiAgICAgICAkaW5mbyxcbiAgXCJ3YXJuaW5nXCI6ICAgICR3YXJuaW5nLFxuICBcImRhbmdlclwiOiAgICAgJGRhbmdlcixcbiAgXCJsaWdodFwiOiAgICAgICRsaWdodCxcbiAgXCJkYXJrXCI6ICAgICAgICRncmF5LTkwMCxcbiAgXCJncmF5XCI6ICAgICAgICRncmF5LTUwMCxcbiAgXCJncmF5LWRhcmtcIjogICRncmF5LTgwMCxcbiAgXCJwcmltYXJ5LWRhcmtcIjogJHByaW1hcnktZGFya1xuKSAhZGVmYXVsdDtcblxuLy8gLy8gVGhlIGNvbnRyYXN0IHJhdGlvIHRvIHJlYWNoIGFnYWluc3Qgd2hpdGUsIHRvIGRldGVybWluZSBpZiBjb2xvciBjaGFuZ2VzIGZyb20gXCJsaWdodFwiIHRvIFwiZGFya1wiLiBBY2NlcHRhYmxlIHZhbHVlcyBmb3IgV0NBRyAyLjAgYXJlIDMsIDQuNSBhbmQgNy5cbi8vIC8vIFNlZSBodHRwczovL3d3dy53My5vcmcvVFIvV0NBRzIwLyN2aXN1YWwtYXVkaW8tY29udHJhc3QtY29udHJhc3Rcbi8vICRtaW4tY29udHJhc3QtcmF0aW86ICAgNC41ICFkZWZhdWx0O1xuXG4vLyAvLyBDdXN0b21pemUgdGhlIGxpZ2h0IGFuZCBkYXJrIHRleHQgY29sb3JzIGZvciB1c2UgaW4gb3VyIGNvbG9yIGNvbnRyYXN0IGZ1bmN0aW9uLlxuLy8gJGNvbG9yLWNvbnRyYXN0LWRhcms6ICAgICAgJGJsYWNrICFkZWZhdWx0O1xuLy8gJGNvbG9yLWNvbnRyYXN0LWxpZ2h0OiAgICAgJHdoaXRlICFkZWZhdWx0O1xuXG4vLyAvLyBmdXN2LWRpc2FibGVcbi8vICRibHVlLTEwMDogdGludC1jb2xvcigkYmx1ZSwgODAlKSAhZGVmYXVsdDtcbi8vICRibHVlLTIwMDogdGludC1jb2xvcigkYmx1ZSwgNjAlKSAhZGVmYXVsdDtcbi8vICRibHVlLTMwMDogdGludC1jb2xvcigkYmx1ZSwgNDAlKSAhZGVmYXVsdDtcbi8vICRibHVlLTQwMDogdGludC1jb2xvcigkYmx1ZSwgMjAlKSAhZGVmYXVsdDtcbi8vICRibHVlLTUwMDogJGJsdWUgIWRlZmF1bHQ7XG4vLyAkYmx1ZS02MDA6IHNoYWRlLWNvbG9yKCRibHVlLCAyMCUpICFkZWZhdWx0O1xuLy8gJGJsdWUtNzAwOiBzaGFkZS1jb2xvcigkYmx1ZSwgNDAlKSAhZGVmYXVsdDtcbi8vICRibHVlLTgwMDogc2hhZGUtY29sb3IoJGJsdWUsIDYwJSkgIWRlZmF1bHQ7XG4vLyAkYmx1ZS05MDA6IHNoYWRlLWNvbG9yKCRibHVlLCA4MCUpICFkZWZhdWx0O1xuXG4vLyAkaW5kaWdvLTEwMDogdGludC1jb2xvcigkaW5kaWdvLCA4MCUpICFkZWZhdWx0O1xuLy8gJGluZGlnby0yMDA6IHRpbnQtY29sb3IoJGluZGlnbywgNjAlKSAhZGVmYXVsdDtcbi8vICRpbmRpZ28tMzAwOiB0aW50LWNvbG9yKCRpbmRpZ28sIDQwJSkgIWRlZmF1bHQ7XG4vLyAkaW5kaWdvLTQwMDogdGludC1jb2xvcigkaW5kaWdvLCAyMCUpICFkZWZhdWx0O1xuLy8gJGluZGlnby01MDA6ICRpbmRpZ28gIWRlZmF1bHQ7XG4vLyAkaW5kaWdvLTYwMDogc2hhZGUtY29sb3IoJGluZGlnbywgMjAlKSAhZGVmYXVsdDtcbi8vICRpbmRpZ28tNzAwOiBzaGFkZS1jb2xvcigkaW5kaWdvLCA0MCUpICFkZWZhdWx0O1xuLy8gJGluZGlnby04MDA6IHNoYWRlLWNvbG9yKCRpbmRpZ28sIDYwJSkgIWRlZmF1bHQ7XG4vLyAkaW5kaWdvLTkwMDogc2hhZGUtY29sb3IoJGluZGlnbywgODAlKSAhZGVmYXVsdDtcblxuLy8gJHB1cnBsZS0xMDA6IHRpbnQtY29sb3IoJHB1cnBsZSwgODAlKSAhZGVmYXVsdDtcbi8vICRwdXJwbGUtMjAwOiB0aW50LWNvbG9yKCRwdXJwbGUsIDYwJSkgIWRlZmF1bHQ7XG4vLyAkcHVycGxlLTMwMDogdGludC1jb2xvcigkcHVycGxlLCA0MCUpICFkZWZhdWx0O1xuLy8gJHB1cnBsZS00MDA6IHRpbnQtY29sb3IoJHB1cnBsZSwgMjAlKSAhZGVmYXVsdDtcbi8vICRwdXJwbGUtNTAwOiAkcHVycGxlICFkZWZhdWx0O1xuLy8gJHB1cnBsZS02MDA6IHNoYWRlLWNvbG9yKCRwdXJwbGUsIDIwJSkgIWRlZmF1bHQ7XG4vLyAkcHVycGxlLTcwMDogc2hhZGUtY29sb3IoJHB1cnBsZSwgNDAlKSAhZGVmYXVsdDtcbi8vICRwdXJwbGUtODAwOiBzaGFkZS1jb2xvcigkcHVycGxlLCA2MCUpICFkZWZhdWx0O1xuLy8gJHB1cnBsZS05MDA6IHNoYWRlLWNvbG9yKCRwdXJwbGUsIDgwJSkgIWRlZmF1bHQ7XG5cbi8vICRwaW5rLTEwMDogdGludC1jb2xvcigkcGluaywgODAlKSAhZGVmYXVsdDtcbi8vICRwaW5rLTIwMDogdGludC1jb2xvcigkcGluaywgNjAlKSAhZGVmYXVsdDtcbi8vICRwaW5rLTMwMDogdGludC1jb2xvcigkcGluaywgNDAlKSAhZGVmYXVsdDtcbi8vICRwaW5rLTQwMDogdGludC1jb2xvcigkcGluaywgMjAlKSAhZGVmYXVsdDtcbi8vICRwaW5rLTUwMDogJHBpbmsgIWRlZmF1bHQ7XG4vLyAkcGluay02MDA6IHNoYWRlLWNvbG9yKCRwaW5rLCAyMCUpICFkZWZhdWx0O1xuLy8gJHBpbmstNzAwOiBzaGFkZS1jb2xvcigkcGluaywgNDAlKSAhZGVmYXVsdDtcbi8vICRwaW5rLTgwMDogc2hhZGUtY29sb3IoJHBpbmssIDYwJSkgIWRlZmF1bHQ7XG4vLyAkcGluay05MDA6IHNoYWRlLWNvbG9yKCRwaW5rLCA4MCUpICFkZWZhdWx0O1xuXG4vLyAkcmVkLTEwMDogdGludC1jb2xvcigkcmVkLCA4MCUpICFkZWZhdWx0O1xuLy8gJHJlZC0yMDA6IHRpbnQtY29sb3IoJHJlZCwgNjAlKSAhZGVmYXVsdDtcbi8vICRyZWQtMzAwOiB0aW50LWNvbG9yKCRyZWQsIDQwJSkgIWRlZmF1bHQ7XG4vLyAkcmVkLTQwMDogdGludC1jb2xvcigkcmVkLCAyMCUpICFkZWZhdWx0O1xuLy8gJHJlZC01MDA6ICRyZWQgIWRlZmF1bHQ7XG4vLyAkcmVkLTYwMDogc2hhZGUtY29sb3IoJHJlZCwgMjAlKSAhZGVmYXVsdDtcbi8vICRyZWQtNzAwOiBzaGFkZS1jb2xvcigkcmVkLCA0MCUpICFkZWZhdWx0O1xuLy8gJHJlZC04MDA6IHNoYWRlLWNvbG9yKCRyZWQsIDYwJSkgIWRlZmF1bHQ7XG4vLyAkcmVkLTkwMDogc2hhZGUtY29sb3IoJHJlZCwgODAlKSAhZGVmYXVsdDtcblxuLy8gJG9yYW5nZS0xMDA6IHRpbnQtY29sb3IoJG9yYW5nZSwgODAlKSAhZGVmYXVsdDtcbi8vICRvcmFuZ2UtMjAwOiB0aW50LWNvbG9yKCRvcmFuZ2UsIDYwJSkgIWRlZmF1bHQ7XG4vLyAkb3JhbmdlLTMwMDogdGludC1jb2xvcigkb3JhbmdlLCA0MCUpICFkZWZhdWx0O1xuLy8gJG9yYW5nZS00MDA6IHRpbnQtY29sb3IoJG9yYW5nZSwgMjAlKSAhZGVmYXVsdDtcbi8vICRvcmFuZ2UtNTAwOiAkb3JhbmdlICFkZWZhdWx0O1xuLy8gJG9yYW5nZS02MDA6IHNoYWRlLWNvbG9yKCRvcmFuZ2UsIDIwJSkgIWRlZmF1bHQ7XG4vLyAkb3JhbmdlLTcwMDogc2hhZGUtY29sb3IoJG9yYW5nZSwgNDAlKSAhZGVmYXVsdDtcbi8vICRvcmFuZ2UtODAwOiBzaGFkZS1jb2xvcigkb3JhbmdlLCA2MCUpICFkZWZhdWx0O1xuLy8gJG9yYW5nZS05MDA6IHNoYWRlLWNvbG9yKCRvcmFuZ2UsIDgwJSkgIWRlZmF1bHQ7XG5cbi8vICR5ZWxsb3ctMTAwOiB0aW50LWNvbG9yKCR5ZWxsb3csIDgwJSkgIWRlZmF1bHQ7XG4vLyAkeWVsbG93LTIwMDogdGludC1jb2xvcigkeWVsbG93LCA2MCUpICFkZWZhdWx0O1xuLy8gJHllbGxvdy0zMDA6IHRpbnQtY29sb3IoJHllbGxvdywgNDAlKSAhZGVmYXVsdDtcbi8vICR5ZWxsb3ctNDAwOiB0aW50LWNvbG9yKCR5ZWxsb3csIDIwJSkgIWRlZmF1bHQ7XG4vLyAkeWVsbG93LTUwMDogJHllbGxvdyAhZGVmYXVsdDtcbi8vICR5ZWxsb3ctNjAwOiBzaGFkZS1jb2xvcigkeWVsbG93LCAyMCUpICFkZWZhdWx0O1xuLy8gJHllbGxvdy03MDA6IHNoYWRlLWNvbG9yKCR5ZWxsb3csIDQwJSkgIWRlZmF1bHQ7XG4vLyAkeWVsbG93LTgwMDogc2hhZGUtY29sb3IoJHllbGxvdywgNjAlKSAhZGVmYXVsdDtcbi8vICR5ZWxsb3ctOTAwOiBzaGFkZS1jb2xvcigkeWVsbG93LCA4MCUpICFkZWZhdWx0O1xuXG4vLyAkZ3JlZW4tMTAwOiB0aW50LWNvbG9yKCRncmVlbiwgODAlKSAhZGVmYXVsdDtcbi8vICRncmVlbi0yMDA6IHRpbnQtY29sb3IoJGdyZWVuLCA2MCUpICFkZWZhdWx0O1xuLy8gJGdyZWVuLTMwMDogdGludC1jb2xvcigkZ3JlZW4sIDQwJSkgIWRlZmF1bHQ7XG4vLyAkZ3JlZW4tNDAwOiB0aW50LWNvbG9yKCRncmVlbiwgMjAlKSAhZGVmYXVsdDtcbi8vICRncmVlbi01MDA6ICRncmVlbiAhZGVmYXVsdDtcbi8vICRncmVlbi02MDA6IHNoYWRlLWNvbG9yKCRncmVlbiwgMjAlKSAhZGVmYXVsdDtcbi8vICRncmVlbi03MDA6IHNoYWRlLWNvbG9yKCRncmVlbiwgNDAlKSAhZGVmYXVsdDtcbi8vICRncmVlbi04MDA6IHNoYWRlLWNvbG9yKCRncmVlbiwgNjAlKSAhZGVmYXVsdDtcbi8vICRncmVlbi05MDA6IHNoYWRlLWNvbG9yKCRncmVlbiwgODAlKSAhZGVmYXVsdDtcblxuLy8gJHRlYWwtMTAwOiB0aW50LWNvbG9yKCR0ZWFsLCA4MCUpICFkZWZhdWx0O1xuLy8gJHRlYWwtMjAwOiB0aW50LWNvbG9yKCR0ZWFsLCA2MCUpICFkZWZhdWx0O1xuLy8gJHRlYWwtMzAwOiB0aW50LWNvbG9yKCR0ZWFsLCA0MCUpICFkZWZhdWx0O1xuLy8gJHRlYWwtNDAwOiB0aW50LWNvbG9yKCR0ZWFsLCAyMCUpICFkZWZhdWx0O1xuLy8gJHRlYWwtNTAwOiAkdGVhbCAhZGVmYXVsdDtcbi8vICR0ZWFsLTYwMDogc2hhZGUtY29sb3IoJHRlYWwsIDIwJSkgIWRlZmF1bHQ7XG4vLyAkdGVhbC03MDA6IHNoYWRlLWNvbG9yKCR0ZWFsLCA0MCUpICFkZWZhdWx0O1xuLy8gJHRlYWwtODAwOiBzaGFkZS1jb2xvcigkdGVhbCwgNjAlKSAhZGVmYXVsdDtcbi8vICR0ZWFsLTkwMDogc2hhZGUtY29sb3IoJHRlYWwsIDgwJSkgIWRlZmF1bHQ7XG5cbi8vICRjeWFuLTEwMDogdGludC1jb2xvcigkY3lhbiwgODAlKSAhZGVmYXVsdDtcbi8vICRjeWFuLTIwMDogdGludC1jb2xvcigkY3lhbiwgNjAlKSAhZGVmYXVsdDtcbi8vICRjeWFuLTMwMDogdGludC1jb2xvcigkY3lhbiwgNDAlKSAhZGVmYXVsdDtcbi8vICRjeWFuLTQwMDogdGludC1jb2xvcigkY3lhbiwgMjAlKSAhZGVmYXVsdDtcbi8vICRjeWFuLTUwMDogJGN5YW4gIWRlZmF1bHQ7XG4vLyAkY3lhbi02MDA6IHNoYWRlLWNvbG9yKCRjeWFuLCAyMCUpICFkZWZhdWx0O1xuLy8gJGN5YW4tNzAwOiBzaGFkZS1jb2xvcigkY3lhbiwgNDAlKSAhZGVmYXVsdDtcbi8vICRjeWFuLTgwMDogc2hhZGUtY29sb3IoJGN5YW4sIDYwJSkgIWRlZmF1bHQ7XG4vLyAkY3lhbi05MDA6IHNoYWRlLWNvbG9yKCRjeWFuLCA4MCUpICFkZWZhdWx0O1xuLy8gLy8gZnVzdi1lbmFibGVcblxuLy8gLy8gQ2hhcmFjdGVycyB3aGljaCBhcmUgZXNjYXBlZCBieSB0aGUgZXNjYXBlLXN2ZyBmdW5jdGlvblxuLy8gJGVzY2FwZWQtY2hhcmFjdGVyczogKFxuLy8gICAoXCI8XCIsIFwiJTNjXCIpLFxuLy8gICAoXCI+XCIsIFwiJTNlXCIpLFxuLy8gICAoXCIjXCIsIFwiJTIzXCIpLFxuLy8gICAoXCIoXCIsIFwiJTI4XCIpLFxuLy8gICAoXCIpXCIsIFwiJTI5XCIpLFxuLy8gKSAhZGVmYXVsdDtcblxuLy8gLy8gT3B0aW9uc1xuLy8gLy9cbi8vIC8vIFF1aWNrbHkgbW9kaWZ5IGdsb2JhbCBzdHlsaW5nIGJ5IGVuYWJsaW5nIG9yIGRpc2FibGluZyBvcHRpb25hbCBmZWF0dXJlcy5cblxuLy8gJGVuYWJsZS1jYXJldDogICAgICAgICAgICAgICAgdHJ1ZSAhZGVmYXVsdDtcbi8vICRlbmFibGUtcm91bmRlZDogICAgICAgICAgICAgIHRydWUgIWRlZmF1bHQ7XG4vLyAkZW5hYmxlLXNoYWRvd3M6ICAgICAgICAgICAgICBmYWxzZSAhZGVmYXVsdDtcbi8vICRlbmFibGUtZ3JhZGllbnRzOiAgICAgICAgICAgIGZhbHNlICFkZWZhdWx0O1xuLy8gJGVuYWJsZS10cmFuc2l0aW9uczogICAgICAgICAgdHJ1ZSAhZGVmYXVsdDtcbi8vICRlbmFibGUtcmVkdWNlZC1tb3Rpb246ICAgICAgIHRydWUgIWRlZmF1bHQ7XG4vLyAkZW5hYmxlLXNtb290aC1zY3JvbGw6ICAgICAgICB0cnVlICFkZWZhdWx0O1xuLy8gJGVuYWJsZS1ncmlkLWNsYXNzZXM6ICAgICAgICAgdHJ1ZSAhZGVmYXVsdDtcbi8vICRlbmFibGUtY3NzZ3JpZDogICAgICAgICAgICAgIGZhbHNlICFkZWZhdWx0O1xuLy8gJGVuYWJsZS1idXR0b24tcG9pbnRlcnM6ICAgICAgdHJ1ZSAhZGVmYXVsdDtcbi8vICRlbmFibGUtcmZzOiAgICAgICAgICAgICAgICAgIHRydWUgIWRlZmF1bHQ7XG4vLyAkZW5hYmxlLXZhbGlkYXRpb24taWNvbnM6ICAgICB0cnVlICFkZWZhdWx0O1xuLy8gJGVuYWJsZS1uZWdhdGl2ZS1tYXJnaW5zOiAgICAgZmFsc2UgIWRlZmF1bHQ7XG4vLyAkZW5hYmxlLWRlcHJlY2F0aW9uLW1lc3NhZ2VzOiB0cnVlICFkZWZhdWx0O1xuLy8gJGVuYWJsZS1pbXBvcnRhbnQtdXRpbGl0aWVzOiAgdHJ1ZSAhZGVmYXVsdDtcblxuLy8gLy8gUHJlZml4IGZvciA6cm9vdCBDU1MgdmFyaWFibGVzXG5cbi8vICR2YXJpYWJsZS1wcmVmaXg6ICAgICAgICAgICAgIGJzLSAhZGVmYXVsdDtcblxuLy8gLy8gR3JhZGllbnRcbi8vIC8vXG4vLyAvLyBUaGUgZ3JhZGllbnQgd2hpY2ggaXMgYWRkZWQgdG8gY29tcG9uZW50cyBpZiBgJGVuYWJsZS1ncmFkaWVudHNgIGlzIGB0cnVlYFxuLy8gLy8gVGhpcyBncmFkaWVudCBpcyBhbHNvIGFkZGVkIHRvIGVsZW1lbnRzIHdpdGggYC5iZy1ncmFkaWVudGBcbi8vIC8vIHNjc3MtZG9jcy1zdGFydCB2YXJpYWJsZS1ncmFkaWVudFxuLy8gJGdyYWRpZW50OiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCByZ2JhKCR3aGl0ZSwgLjE1KSwgcmdiYSgkd2hpdGUsIDApKSAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgdmFyaWFibGUtZ3JhZGllbnRcblxuLy8gLy8gU3BhY2luZ1xuLy8gLy9cbi8vIC8vIENvbnRyb2wgdGhlIGRlZmF1bHQgc3R5bGluZyBvZiBtb3N0IEJvb3RzdHJhcCBlbGVtZW50cyBieSBtb2RpZnlpbmcgdGhlc2Vcbi8vIC8vIHZhcmlhYmxlcy4gTW9zdGx5IGZvY3VzZWQgb24gc3BhY2luZy5cbi8vIC8vIFlvdSBjYW4gYWRkIG1vcmUgZW50cmllcyB0byB0aGUgJHNwYWNlcnMgbWFwLCBzaG91bGQgeW91IG5lZWQgbW9yZSB2YXJpYXRpb24uXG5cbi8vIC8vIHNjc3MtZG9jcy1zdGFydCBzcGFjZXItdmFyaWFibGVzLW1hcHNcbi8vICRzcGFjZXI6IDFyZW0gIWRlZmF1bHQ7XG4vLyAkc3BhY2VyczogKFxuLy8gICAwOiAwLFxuLy8gICAxOiAkc3BhY2VyICogLjI1LFxuLy8gICAyOiAkc3BhY2VyICogLjUsXG4vLyAgIDM6ICRzcGFjZXIsXG4vLyAgIDQ6ICRzcGFjZXIgKiAxLjUsXG4vLyAgIDU6ICRzcGFjZXIgKiAzLFxuLy8gKSAhZGVmYXVsdDtcblxuLy8gJG5lZ2F0aXZlLXNwYWNlcnM6IGlmKCRlbmFibGUtbmVnYXRpdmUtbWFyZ2lucywgbmVnYXRpdmlmeS1tYXAoJHNwYWNlcnMpLCBudWxsKSAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgc3BhY2VyLXZhcmlhYmxlcy1tYXBzXG5cbi8vIC8vIFBvc2l0aW9uXG4vLyAvL1xuLy8gLy8gRGVmaW5lIHRoZSBlZGdlIHBvc2l0aW9uaW5nIGFuY2hvcnMgb2YgdGhlIHBvc2l0aW9uIHV0aWxpdGllcy5cblxuLy8gLy8gc2Nzcy1kb2NzLXN0YXJ0IHBvc2l0aW9uLW1hcFxuLy8gJHBvc2l0aW9uLXZhbHVlczogKFxuLy8gICAwOiAwLFxuLy8gICA1MDogNTAlLFxuLy8gICAxMDA6IDEwMCVcbi8vICkgIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIHBvc2l0aW9uLW1hcFxuXG4vLyAvLyBCb2R5XG4vLyAvL1xuLy8gLy8gU2V0dGluZ3MgZm9yIHRoZSBgPGJvZHk+YCBlbGVtZW50LlxuXG4kYm9keS1iZzogICAgICAgICAgICAgICAgICAgIzE0MkEzRiAhZGVmYXVsdDtcbiRib2R5LWNvbG9yOiAgICAgICAgICAgICAgICAkd2hpdGUgIWRlZmF1bHQ7XG4vLyAkYm9keS10ZXh0LWFsaWduOiAgICAgICAgICAgbnVsbCAhZGVmYXVsdDtcblxuXG4vLyAvLyBMaW5rc1xuLy8gLy9cbi8vIC8vIFN0eWxlIGFuY2hvciBlbGVtZW50cy5cblxuLy8gJGxpbmstY29sb3I6ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHByaW1hcnkgIWRlZmF1bHQ7XG4kbGluay1kZWNvcmF0aW9uOiAgICAgICAgICAgICAgICAgICAgICAgICBub25lICFkZWZhdWx0O1xuLy8gJGxpbmstc2hhZGUtcGVyY2VudGFnZTogICAgICAgICAgICAgICAgICAgMjAlICFkZWZhdWx0O1xuLy8gJGxpbmstaG92ZXItY29sb3I6ICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnQtY29sb3IoJGxpbmstY29sb3IsICRsaW5rLXNoYWRlLXBlcmNlbnRhZ2UpICFkZWZhdWx0O1xuLy8gJGxpbmstaG92ZXItZGVjb3JhdGlvbjogICAgICAgICAgICAgICAgICAgbnVsbCAhZGVmYXVsdDtcblxuLy8gJHN0cmV0Y2hlZC1saW5rLXBzZXVkby1lbGVtZW50OiAgICAgICAgICAgYWZ0ZXIgIWRlZmF1bHQ7XG4vLyAkc3RyZXRjaGVkLWxpbmstei1pbmRleDogICAgICAgICAgICAgICAgICAxICFkZWZhdWx0O1xuXG4vLyAvLyBQYXJhZ3JhcGhzXG4vLyAvL1xuLy8gLy8gU3R5bGUgcCBlbGVtZW50LlxuXG4vLyAkcGFyYWdyYXBoLW1hcmdpbi1ib3R0b206ICAgMXJlbSAhZGVmYXVsdDtcblxuXG4vLyAvLyBHcmlkIGJyZWFrcG9pbnRzXG4vLyAvL1xuLy8gLy8gRGVmaW5lIHRoZSBtaW5pbXVtIGRpbWVuc2lvbnMgYXQgd2hpY2ggeW91ciBsYXlvdXQgd2lsbCBjaGFuZ2UsXG4vLyAvLyBhZGFwdGluZyB0byBkaWZmZXJlbnQgc2NyZWVuIHNpemVzLCBmb3IgdXNlIGluIG1lZGlhIHF1ZXJpZXMuXG5cbi8vIC8vIHNjc3MtZG9jcy1zdGFydCBncmlkLWJyZWFrcG9pbnRzXG4vLyAkZ3JpZC1icmVha3BvaW50czogKFxuLy8gICB4czogMCxcbi8vICAgc206IDU3NnB4LFxuLy8gICBtZDogNzY4cHgsXG4vLyAgIGxnOiA5OTJweCxcbi8vICAgeGw6IDEyMDBweCxcbi8vICAgeHhsOiAxNDAwcHhcbi8vICkgIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIGdyaWQtYnJlYWtwb2ludHNcblxuLy8gQGluY2x1ZGUgX2Fzc2VydC1hc2NlbmRpbmcoJGdyaWQtYnJlYWtwb2ludHMsIFwiJGdyaWQtYnJlYWtwb2ludHNcIik7XG4vLyBAaW5jbHVkZSBfYXNzZXJ0LXN0YXJ0cy1hdC16ZXJvKCRncmlkLWJyZWFrcG9pbnRzLCBcIiRncmlkLWJyZWFrcG9pbnRzXCIpO1xuXG5cbi8vIC8vIEdyaWQgY29udGFpbmVyc1xuLy8gLy9cbi8vIC8vIERlZmluZSB0aGUgbWF4aW11bSB3aWR0aCBvZiBgLmNvbnRhaW5lcmAgZm9yIGRpZmZlcmVudCBzY3JlZW4gc2l6ZXMuXG5cbi8vIC8vIHNjc3MtZG9jcy1zdGFydCBjb250YWluZXItbWF4LXdpZHRoc1xuLy8gJGNvbnRhaW5lci1tYXgtd2lkdGhzOiAoXG4vLyAgIHNtOiA1NDBweCxcbi8vICAgbWQ6IDcyMHB4LFxuLy8gICBsZzogOTYwcHgsXG4vLyAgIHhsOiAxMTYwcHgsXG4vLyAgIHh4bDogMTMyMHB4XG4vLyApICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBjb250YWluZXItbWF4LXdpZHRoc1xuXG4vLyBAaW5jbHVkZSBfYXNzZXJ0LWFzY2VuZGluZygkY29udGFpbmVyLW1heC13aWR0aHMsIFwiJGNvbnRhaW5lci1tYXgtd2lkdGhzXCIpO1xuXG5cbi8vIC8vIEdyaWQgY29sdW1uc1xuLy8gLy9cbi8vIC8vIFNldCB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgYW5kIHNwZWNpZnkgdGhlIHdpZHRoIG9mIHRoZSBndXR0ZXJzLlxuXG4vLyAkZ3JpZC1jb2x1bW5zOiAgICAgICAgICAgICAgICAxMiAhZGVmYXVsdDtcbi8vICRncmlkLWd1dHRlci13aWR0aDogICAgICAgICAgIDEuNXJlbSAhZGVmYXVsdDtcbi8vICRncmlkLXJvdy1jb2x1bW5zOiAgICAgICAgICAgIDYgIWRlZmF1bHQ7XG5cbi8vICRndXR0ZXJzOiAkc3BhY2VycyAhZGVmYXVsdDtcblxuLy8gLy8gQ29udGFpbmVyIHBhZGRpbmdcblxuLy8gJGNvbnRhaW5lci1wYWRkaW5nLXg6ICRncmlkLWd1dHRlci13aWR0aCAqIC41ICFkZWZhdWx0O1xuXG5cbi8vIC8vIENvbXBvbmVudHNcbi8vIC8vXG4vLyAvLyBEZWZpbmUgY29tbW9uIHBhZGRpbmcgYW5kIGJvcmRlciByYWRpdXMgc2l6ZXMgYW5kIG1vcmUuXG5cbi8vIC8vIHNjc3MtZG9jcy1zdGFydCBib3JkZXItdmFyaWFibGVzXG4vLyAkYm9yZGVyLXdpZHRoOiAgICAgICAgICAgICAgICAxcHggIWRlZmF1bHQ7XG4vLyAkYm9yZGVyLXdpZHRoczogKFxuLy8gICAxOiAxcHgsXG4vLyAgIDI6IDJweCxcbi8vICAgMzogM3B4LFxuLy8gICA0OiA0cHgsXG4vLyAgIDU6IDVweFxuLy8gKSAhZGVmYXVsdDtcblxuJGJvcmRlci1jb2xvcjogICAgICAgICAgICAgICAgJHByaW1hcnktZGFyayAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgYm9yZGVyLXZhcmlhYmxlc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgYm9yZGVyLXJhZGl1cy12YXJpYWJsZXNcbiRib3JkZXItcmFkaXVzOiAgICAgICAgICAgICAgIC4yNXJlbSAhZGVmYXVsdDtcbi8vICRib3JkZXItcmFkaXVzLXNtOiAgICAgICAgICAgIC4yNXJlbSAhZGVmYXVsdDtcbiRib3JkZXItcmFkaXVzLWxnOiAgICAgICAgICAgIC43NXJlbSAhZGVmYXVsdDtcbi8vICRib3JkZXItcmFkaXVzLXBpbGw6ICAgICAgICAgIDUwcmVtICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBib3JkZXItcmFkaXVzLXZhcmlhYmxlc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgYm94LXNoYWRvdy12YXJpYWJsZXNcbi8vICRib3gtc2hhZG93OiAgICAgICAgICAgICAgICAgIDAgLjVyZW0gMXJlbSByZ2JhKCRibGFjaywgLjE1KSAhZGVmYXVsdDtcbi8vICRib3gtc2hhZG93LXNtOiAgICAgICAgICAgICAgIDAgLjEyNXJlbSAuMjVyZW0gcmdiYSgkYmxhY2ssIC4wNzUpICFkZWZhdWx0O1xuLy8gJGJveC1zaGFkb3ctbGc6ICAgICAgICAgICAgICAgMCAxcmVtIDNyZW0gcmdiYSgkYmxhY2ssIC4xNzUpICFkZWZhdWx0O1xuLy8gJGJveC1zaGFkb3ctaW5zZXQ6ICAgICAgICAgICAgaW5zZXQgMCAxcHggMnB4IHJnYmEoJGJsYWNrLCAuMDc1KSAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgYm94LXNoYWRvdy12YXJpYWJsZXNcblxuLy8gJGNvbXBvbmVudC1hY3RpdmUtY29sb3I6ICAgICAgJHdoaXRlICFkZWZhdWx0O1xuLy8gJGNvbXBvbmVudC1hY3RpdmUtYmc6ICAgICAgICAgJHByaW1hcnkgIWRlZmF1bHQ7XG5cbi8vIC8vIHNjc3MtZG9jcy1zdGFydCBjYXJldC12YXJpYWJsZXNcbi8vICRjYXJldC13aWR0aDogICAgICAgICAgICAgICAgIC4zZW0gIWRlZmF1bHQ7XG4vLyAkY2FyZXQtdmVydGljYWwtYWxpZ246ICAgICAgICAkY2FyZXQtd2lkdGggKiAuODUgIWRlZmF1bHQ7XG4vLyAkY2FyZXQtc3BhY2luZzogICAgICAgICAgICAgICAkY2FyZXQtd2lkdGggKiAuODUgIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIGNhcmV0LXZhcmlhYmxlc1xuXG4vLyAkdHJhbnNpdGlvbi1iYXNlOiAgICAgICAgICAgICBhbGwgLjJzIGVhc2UtaW4tb3V0ICFkZWZhdWx0O1xuLy8gJHRyYW5zaXRpb24tZmFkZTogICAgICAgICAgICAgb3BhY2l0eSAuMTVzIGxpbmVhciAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1zdGFydCBjb2xsYXBzZS10cmFuc2l0aW9uXG4vLyAkdHJhbnNpdGlvbi1jb2xsYXBzZTogICAgICAgICBoZWlnaHQgLjM1cyBlYXNlICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBjb2xsYXBzZS10cmFuc2l0aW9uXG5cbi8vIC8vIHN0eWxlbGludC1kaXNhYmxlIGZ1bmN0aW9uLWRpc2FsbG93ZWQtbGlzdFxuLy8gLy8gc2Nzcy1kb2NzLXN0YXJ0IGFzcGVjdC1yYXRpb3Ncbi8vICRhc3BlY3QtcmF0aW9zOiAoXG4vLyAgIFwiMXgxXCI6IDEwMCUsXG4vLyAgIFwiNHgzXCI6IGNhbGMoMyAvIDQgKiAxMDAlKSxcbi8vICAgXCIxNng5XCI6IGNhbGMoOSAvIDE2ICogMTAwJSksXG4vLyAgIFwiMjF4OVwiOiBjYWxjKDkgLyAyMSAqIDEwMCUpXG4vLyApICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBhc3BlY3QtcmF0aW9zXG4vLyAvLyBzdHlsZWxpbnQtZW5hYmxlIGZ1bmN0aW9uLWRpc2FsbG93ZWQtbGlzdFxuXG4vLyAvLyBUeXBvZ3JhcGh5XG4vLyAvL1xuLy8gLy8gRm9udCwgbGluZS1oZWlnaHQsIGFuZCBjb2xvciBmb3IgYm9keSB0ZXh0LCBoZWFkaW5ncywgYW5kIG1vcmUuXG5cbi8vIC8vIHNjc3MtZG9jcy1zdGFydCBmb250LXZhcmlhYmxlc1xuLy8gLy8gc3R5bGVsaW50LWRpc2FibGUgdmFsdWUta2V5d29yZC1jYXNlXG4kZm9udC1mYW1pbHktc2Fucy1zZXJpZjogICAgICBSb2JvdG8sIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgXCJTZWdvZSBVSVwiLCBcIkhlbHZldGljYSBOZXVlXCIsIEFyaWFsLCBcIk5vdG8gU2Fuc1wiLCBcIkxpYmVyYXRpb24gU2Fuc1wiLCBzYW5zLXNlcmlmLCBcIkFwcGxlIENvbG9yIEVtb2ppXCIsIFwiU2Vnb2UgVUkgRW1vamlcIiwgXCJTZWdvZSBVSSBTeW1ib2xcIiwgXCJOb3RvIENvbG9yIEVtb2ppXCIgIWRlZmF1bHQ7XG4kZm9udC1mYW1pbHktbW9ub3NwYWNlOiAgICAgICBSb2JvdG8sIFNGTW9uby1SZWd1bGFyLCBNZW5sbywgTW9uYWNvLCBDb25zb2xhcywgXCJMaWJlcmF0aW9uIE1vbm9cIiwgXCJDb3VyaWVyIE5ld1wiLCBtb25vc3BhY2UgIWRlZmF1bHQ7XG4vLyAvLyBzdHlsZWxpbnQtZW5hYmxlIHZhbHVlLWtleXdvcmQtY2FzZVxuLy8gJGZvbnQtZmFtaWx5LWJhc2U6ICAgICAgICAgICAgdmFyKC0tI3skdmFyaWFibGUtcHJlZml4fWZvbnQtc2Fucy1zZXJpZikgIWRlZmF1bHQ7XG4vLyAkZm9udC1mYW1pbHktY29kZTogICAgICAgICAgICB2YXIoLS0jeyR2YXJpYWJsZS1wcmVmaXh9Zm9udC1tb25vc3BhY2UpICFkZWZhdWx0O1xuXG4vLyAvLyAkZm9udC1zaXplLXJvb3QgYWZmZWN0cyB0aGUgdmFsdWUgb2YgYHJlbWAsIHdoaWNoIGlzIHVzZWQgZm9yIGFzIHdlbGwgZm9udCBzaXplcywgcGFkZGluZ3MsIGFuZCBtYXJnaW5zXG4vLyAvLyAkZm9udC1zaXplLWJhc2UgYWZmZWN0cyB0aGUgZm9udCBzaXplIG9mIHRoZSBib2R5IHRleHRcbi8vICRmb250LXNpemUtcm9vdDogICAgICAgICAgICAgIG51bGwgIWRlZmF1bHQ7XG4kZm9udC1zaXplLWJhc2U6ICAgICAgICAgICAgICAxcmVtICFkZWZhdWx0OyAvLyBBc3N1bWVzIHRoZSBicm93c2VyIGRlZmF1bHQsIHR5cGljYWxseSBgMTZweGBcbiRmb250LXNpemUtc206ICAgICAgICAgICAgICAgICRmb250LXNpemUtYmFzZSAqIC44NzUgIWRlZmF1bHQ7XG4vLyAkZm9udC1zaXplLWxnOiAgICAgICAgICAgICAgICAkZm9udC1zaXplLWJhc2UgKiAxLjI1ICFkZWZhdWx0O1xuXG4vLyAkZm9udC13ZWlnaHQtbGlnaHRlcjogICAgICAgICBsaWdodGVyICFkZWZhdWx0O1xuLy8gJGZvbnQtd2VpZ2h0LWxpZ2h0OiAgICAgICAgICAgMzAwICFkZWZhdWx0O1xuLy8gJGZvbnQtd2VpZ2h0LW5vcm1hbDogICAgICAgICAgNDAwICFkZWZhdWx0O1xuLy8gJGZvbnQtd2VpZ2h0LWJvbGQ6ICAgICAgICAgICAgNzAwICFkZWZhdWx0O1xuLy8gJGZvbnQtd2VpZ2h0LWJvbGRlcjogICAgICAgICAgYm9sZGVyICFkZWZhdWx0O1xuXG4vLyAkZm9udC13ZWlnaHQtYmFzZTogICAgICAgICAgICAkZm9udC13ZWlnaHQtbm9ybWFsICFkZWZhdWx0O1xuXG4vLyAkbGluZS1oZWlnaHQtYmFzZTogICAgICAgICAgICAxLjUgIWRlZmF1bHQ7XG4vLyAkbGluZS1oZWlnaHQtc206ICAgICAgICAgICAgICAxLjI1ICFkZWZhdWx0O1xuLy8gJGxpbmUtaGVpZ2h0LWxnOiAgICAgICAgICAgICAgMiAhZGVmYXVsdDtcblxuLy8gJGgxLWZvbnQtc2l6ZTogICAgICAgICAgICAgICAgJGZvbnQtc2l6ZS1iYXNlICogMi41ICFkZWZhdWx0O1xuLy8gJGgyLWZvbnQtc2l6ZTogICAgICAgICAgICAgICAgJGZvbnQtc2l6ZS1iYXNlICogMiAhZGVmYXVsdDtcbi8vICRoMy1mb250LXNpemU6ICAgICAgICAgICAgICAgICRmb250LXNpemUtYmFzZSAqIDEuNzUgIWRlZmF1bHQ7XG4vLyAkaDQtZm9udC1zaXplOiAgICAgICAgICAgICAgICAkZm9udC1zaXplLWJhc2UgKiAxLjUgIWRlZmF1bHQ7XG4vLyAkaDUtZm9udC1zaXplOiAgICAgICAgICAgICAgICAkZm9udC1zaXplLWJhc2UgKiAxLjI1ICFkZWZhdWx0O1xuLy8gJGg2LWZvbnQtc2l6ZTogICAgICAgICAgICAgICAgJGZvbnQtc2l6ZS1iYXNlICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBmb250LXZhcmlhYmxlc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgZm9udC1zaXplc1xuLy8gJGZvbnQtc2l6ZXM6IChcbi8vICAgMTogJGgxLWZvbnQtc2l6ZSxcbi8vICAgMjogJGgyLWZvbnQtc2l6ZSxcbi8vICAgMzogJGgzLWZvbnQtc2l6ZSxcbi8vICAgNDogJGg0LWZvbnQtc2l6ZSxcbi8vICAgNTogJGg1LWZvbnQtc2l6ZSxcbi8vICAgNjogJGg2LWZvbnQtc2l6ZVxuLy8gKSAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgZm9udC1zaXplc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgaGVhZGluZ3MtdmFyaWFibGVzXG4vLyAkaGVhZGluZ3MtbWFyZ2luLWJvdHRvbTogICAgICAkc3BhY2VyICogLjUgIWRlZmF1bHQ7XG4vLyAkaGVhZGluZ3MtZm9udC1mYW1pbHk6ICAgICAgICBudWxsICFkZWZhdWx0O1xuLy8gJGhlYWRpbmdzLWZvbnQtc3R5bGU6ICAgICAgICAgbnVsbCAhZGVmYXVsdDtcbi8vICRoZWFkaW5ncy1mb250LXdlaWdodDogICAgICAgIDUwMCAhZGVmYXVsdDtcbi8vICRoZWFkaW5ncy1saW5lLWhlaWdodDogICAgICAgIDEuMiAhZGVmYXVsdDtcbi8vICRoZWFkaW5ncy1jb2xvcjogICAgICAgICAgICAgIG51bGwgIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIGhlYWRpbmdzLXZhcmlhYmxlc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgZGlzcGxheS1oZWFkaW5nc1xuLy8gJGRpc3BsYXktZm9udC1zaXplczogKFxuLy8gICAxOiA1cmVtLFxuLy8gICAyOiA0LjVyZW0sXG4vLyAgIDM6IDRyZW0sXG4vLyAgIDQ6IDMuNXJlbSxcbi8vICAgNTogM3JlbSxcbi8vICAgNjogMi41cmVtXG4vLyApICFkZWZhdWx0O1xuXG4vLyAkZGlzcGxheS1mb250LXdlaWdodDogMzAwICFkZWZhdWx0O1xuLy8gJGRpc3BsYXktbGluZS1oZWlnaHQ6ICRoZWFkaW5ncy1saW5lLWhlaWdodCAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgZGlzcGxheS1oZWFkaW5nc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgdHlwZS12YXJpYWJsZXNcbi8vICRsZWFkLWZvbnQtc2l6ZTogICAgICAgICAgICAgICRmb250LXNpemUtYmFzZSAqIDEuMjUgIWRlZmF1bHQ7XG4vLyAkbGVhZC1mb250LXdlaWdodDogICAgICAgICAgICAzMDAgIWRlZmF1bHQ7XG5cbi8vICRzbWFsbC1mb250LXNpemU6ICAgICAgICAgICAgIC44NzVlbSAhZGVmYXVsdDtcblxuLy8gJHN1Yi1zdXAtZm9udC1zaXplOiAgICAgICAgICAgLjc1ZW0gIWRlZmF1bHQ7XG5cbi8vICR0ZXh0LW11dGVkOiAgICAgICAgICAgICAgICAgICRncmF5LTYwMCAhZGVmYXVsdDtcblxuLy8gJGluaXRpYWxpc20tZm9udC1zaXplOiAgICAgICAgJHNtYWxsLWZvbnQtc2l6ZSAhZGVmYXVsdDtcblxuLy8gJGJsb2NrcXVvdGUtbWFyZ2luLXk6ICAgICAgICAgJHNwYWNlciAhZGVmYXVsdDtcbi8vICRibG9ja3F1b3RlLWZvbnQtc2l6ZTogICAgICAgICRmb250LXNpemUtYmFzZSAqIDEuMjUgIWRlZmF1bHQ7XG4vLyAkYmxvY2txdW90ZS1mb290ZXItY29sb3I6ICAgICAkZ3JheS02MDAgIWRlZmF1bHQ7XG4vLyAkYmxvY2txdW90ZS1mb290ZXItZm9udC1zaXplOiAkc21hbGwtZm9udC1zaXplICFkZWZhdWx0O1xuXG4vLyAkaHItbWFyZ2luLXk6ICAgICAgICAgICAgICAgICAkc3BhY2VyICFkZWZhdWx0O1xuLy8gJGhyLWNvbG9yOiAgICAgICAgICAgICAgICAgICAgaW5oZXJpdCAhZGVmYXVsdDtcbi8vICRoci1oZWlnaHQ6ICAgICAgICAgICAgICAgICAgICRib3JkZXItd2lkdGggIWRlZmF1bHQ7XG4vLyAkaHItb3BhY2l0eTogICAgICAgICAgICAgICAgICAuMjUgIWRlZmF1bHQ7XG5cbi8vICRsZWdlbmQtbWFyZ2luLWJvdHRvbTogICAgICAgIC41cmVtICFkZWZhdWx0O1xuLy8gJGxlZ2VuZC1mb250LXNpemU6ICAgICAgICAgICAgMS41cmVtICFkZWZhdWx0O1xuLy8gJGxlZ2VuZC1mb250LXdlaWdodDogICAgICAgICAgbnVsbCAhZGVmYXVsdDtcblxuLy8gJG1hcmstcGFkZGluZzogICAgICAgICAgICAgICAgLjJlbSAhZGVmYXVsdDtcblxuLy8gJGR0LWZvbnQtd2VpZ2h0OiAgICAgICAgICAgICAgJGZvbnQtd2VpZ2h0LWJvbGQgIWRlZmF1bHQ7XG5cbi8vICRuZXN0ZWQta2JkLWZvbnQtd2VpZ2h0OiAgICAgICRmb250LXdlaWdodC1ib2xkICFkZWZhdWx0O1xuXG4vLyAkbGlzdC1pbmxpbmUtcGFkZGluZzogICAgICAgICAuNXJlbSAhZGVmYXVsdDtcblxuLy8gJG1hcmstYmc6ICAgICAgICAgICAgICAgICAgICAgI2ZjZjhlMyAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgdHlwZS12YXJpYWJsZXNcblxuXG4vLyAvLyBUYWJsZXNcbi8vIC8vXG4vLyAvLyBDdXN0b21pemVzIHRoZSBgLnRhYmxlYCBjb21wb25lbnQgd2l0aCBiYXNpYyB2YWx1ZXMsIGVhY2ggdXNlZCBhY3Jvc3MgYWxsIHRhYmxlIHZhcmlhdGlvbnMuXG5cbi8vIC8vIHNjc3MtZG9jcy1zdGFydCB0YWJsZS12YXJpYWJsZXNcbiR0YWJsZS1jZWxsLXBhZGRpbmcteTogICAgICAgIC43NXJlbSAhZGVmYXVsdDtcbiR0YWJsZS1jZWxsLXBhZGRpbmcteDogICAgICAgIC43NXJlbSAhZGVmYXVsdDtcbi8vICR0YWJsZS1jZWxsLXBhZGRpbmcteS1zbTogICAgIC4yNXJlbSAhZGVmYXVsdDtcbi8vICR0YWJsZS1jZWxsLXBhZGRpbmcteC1zbTogICAgIC4yNXJlbSAhZGVmYXVsdDtcblxuLy8gJHRhYmxlLWNlbGwtdmVydGljYWwtYWxpZ246ICAgdG9wICFkZWZhdWx0O1xuXG4kdGFibGUtY29sb3I6ICAgICAgICAgICAgICAgICAjQTJENURGICFkZWZhdWx0O1xuLy8gJHRhYmxlLWJnOiAgICAgICAgICAgICAgICAgICAgdHJhbnNwYXJlbnQgIWRlZmF1bHQ7XG4vLyAkdGFibGUtYWNjZW50LWJnOiAgICAgICAgICAgICB0cmFuc3BhcmVudCAhZGVmYXVsdDtcblxuJHRhYmxlLXRoLWZvbnQtd2VpZ2h0OiAgICAgICAgbm9ybWFsICFkZWZhdWx0O1xuXG4vLyAkdGFibGUtc3RyaXBlZC1jb2xvcjogICAgICAgICAkdGFibGUtY29sb3IgIWRlZmF1bHQ7XG4vLyAkdGFibGUtc3RyaXBlZC1iZy1mYWN0b3I6ICAgICAuMDUgIWRlZmF1bHQ7XG4kdGFibGUtc3RyaXBlZC1iZzogICAgICAgICAgICAjMjEyNzJCICFkZWZhdWx0O1xuXG4vLyAkdGFibGUtYWN0aXZlLWNvbG9yOiAgICAgICAgICAkdGFibGUtY29sb3IgIWRlZmF1bHQ7XG4vLyAkdGFibGUtYWN0aXZlLWJnLWZhY3RvcjogICAgICAuMSAhZGVmYXVsdDtcbi8vICR0YWJsZS1hY3RpdmUtYmc6ICAgICAgICAgICAgIHJnYmEoJGJsYWNrLCAkdGFibGUtYWN0aXZlLWJnLWZhY3RvcikgIWRlZmF1bHQ7XG5cbi8vICR0YWJsZS1ob3Zlci1jb2xvcjogICAgICAgICAgICR0YWJsZS1jb2xvciAhZGVmYXVsdDtcbi8vICR0YWJsZS1ob3Zlci1iZy1mYWN0b3I6ICAgICAgIC4wNzUgIWRlZmF1bHQ7XG4kdGFibGUtaG92ZXItYmc6ICAgICAgICAgICAgICByZ2JhKDEzLCA2NSwgMTA0LCAwLjc1KSAhZGVmYXVsdDtcblxuLy8gJHRhYmxlLWJvcmRlci1mYWN0b3I6ICAgICAgICAgLjEgIWRlZmF1bHQ7XG4vLyAkdGFibGUtYm9yZGVyLXdpZHRoOiAgICAgICAgICAkYm9yZGVyLXdpZHRoICFkZWZhdWx0O1xuLy8gJHRhYmxlLWJvcmRlci1jb2xvcjogICAgICAgICAgJGJvcmRlci1jb2xvciAhZGVmYXVsdDtcblxuLy8gJHRhYmxlLXN0cmlwZWQtb3JkZXI6ICAgICAgICAgb2RkICFkZWZhdWx0O1xuXG4vLyAkdGFibGUtZ3JvdXAtc2VwYXJhdG9yLWNvbG9yOiBjdXJyZW50Q29sb3IgIWRlZmF1bHQ7XG5cbi8vICR0YWJsZS1jYXB0aW9uLWNvbG9yOiAgICAgICAgICR0ZXh0LW11dGVkICFkZWZhdWx0O1xuXG4vLyAkdGFibGUtYmctc2NhbGU6ICAgICAgICAgICAgICAtODAlICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCB0YWJsZS12YXJpYWJsZXNcblxuLy8gLy8gc2Nzcy1kb2NzLXN0YXJ0IHRhYmxlLWxvb3Bcbi8vICR0YWJsZS12YXJpYW50czogKFxuLy8gICBcInByaW1hcnlcIjogICAgc2hpZnQtY29sb3IoJHByaW1hcnksICR0YWJsZS1iZy1zY2FsZSksXG4vLyAgIFwic2Vjb25kYXJ5XCI6ICBzaGlmdC1jb2xvcigkc2Vjb25kYXJ5LCAkdGFibGUtYmctc2NhbGUpLFxuLy8gICBcInN1Y2Nlc3NcIjogICAgc2hpZnQtY29sb3IoJHN1Y2Nlc3MsICR0YWJsZS1iZy1zY2FsZSksXG4vLyAgIFwiaW5mb1wiOiAgICAgICBzaGlmdC1jb2xvcigkaW5mbywgJHRhYmxlLWJnLXNjYWxlKSxcbi8vICAgXCJ3YXJuaW5nXCI6ICAgIHNoaWZ0LWNvbG9yKCR3YXJuaW5nLCAkdGFibGUtYmctc2NhbGUpLFxuLy8gICBcImRhbmdlclwiOiAgICAgc2hpZnQtY29sb3IoJGRhbmdlciwgJHRhYmxlLWJnLXNjYWxlKSxcbi8vICAgXCJsaWdodFwiOiAgICAgICRsaWdodCxcbi8vICAgXCJkYXJrXCI6ICAgICAgICRkYXJrLFxuLy8gKSAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgdGFibGUtbG9vcFxuXG5cbi8vIC8vIEJ1dHRvbnMgKyBGb3Jtc1xuLy8gLy9cbi8vIC8vIFNoYXJlZCB2YXJpYWJsZXMgdGhhdCBhcmUgcmVhc3NpZ25lZCB0byBgJGlucHV0LWAgYW5kIGAkYnRuLWAgc3BlY2lmaWMgdmFyaWFibGVzLlxuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgaW5wdXQtYnRuLXZhcmlhYmxlc1xuJGlucHV0LWJ0bi1wYWRkaW5nLXk6ICAgICAgICAgLjYyNXJlbSAhZGVmYXVsdDtcbiRpbnB1dC1idG4tcGFkZGluZy14OiAgICAgICAgIDFyZW0gIWRlZmF1bHQ7XG4vLyAkaW5wdXQtYnRuLWZvbnQtZmFtaWx5OiAgICAgICBudWxsICFkZWZhdWx0O1xuJGlucHV0LWJ0bi1mb250LXNpemU6ICAgICAgICAgJGZvbnQtc2l6ZS1zbSAhZGVmYXVsdDtcbi8vICRpbnB1dC1idG4tbGluZS1oZWlnaHQ6ICAgICAgICRsaW5lLWhlaWdodC1iYXNlICFkZWZhdWx0O1xuXG4vLyAkaW5wdXQtYnRuLWZvY3VzLXdpZHRoOiAgICAgICAgIC4yNXJlbSAhZGVmYXVsdDtcbi8vICRpbnB1dC1idG4tZm9jdXMtY29sb3Itb3BhY2l0eTogLjI1ICFkZWZhdWx0O1xuLy8gJGlucHV0LWJ0bi1mb2N1cy1jb2xvcjogICAgICAgICByZ2JhKCRjb21wb25lbnQtYWN0aXZlLWJnLCAkaW5wdXQtYnRuLWZvY3VzLWNvbG9yLW9wYWNpdHkpICFkZWZhdWx0O1xuLy8gJGlucHV0LWJ0bi1mb2N1cy1ibHVyOiAgICAgICAgICAwICFkZWZhdWx0O1xuLy8gJGlucHV0LWJ0bi1mb2N1cy1ib3gtc2hhZG93OiAgICAwIDAgJGlucHV0LWJ0bi1mb2N1cy1ibHVyICRpbnB1dC1idG4tZm9jdXMtd2lkdGggJGlucHV0LWJ0bi1mb2N1cy1jb2xvciAhZGVmYXVsdDtcblxuLy8gJGlucHV0LWJ0bi1wYWRkaW5nLXktc206ICAgICAgLjI1cmVtICFkZWZhdWx0O1xuLy8gJGlucHV0LWJ0bi1wYWRkaW5nLXgtc206ICAgICAgLjVyZW0gIWRlZmF1bHQ7XG4vLyAkaW5wdXQtYnRuLWZvbnQtc2l6ZS1zbTogICAgICAkZm9udC1zaXplLXNtICFkZWZhdWx0O1xuXG4vLyAkaW5wdXQtYnRuLXBhZGRpbmcteS1sZzogICAgICAuNXJlbSAhZGVmYXVsdDtcbi8vICRpbnB1dC1idG4tcGFkZGluZy14LWxnOiAgICAgIDFyZW0gIWRlZmF1bHQ7XG4vLyAkaW5wdXQtYnRuLWZvbnQtc2l6ZS1sZzogICAgICAkZm9udC1zaXplLWxnICFkZWZhdWx0O1xuXG4vLyAkaW5wdXQtYnRuLWJvcmRlci13aWR0aDogICAgICAkYm9yZGVyLXdpZHRoICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBpbnB1dC1idG4tdmFyaWFibGVzXG5cblxuLy8gLy8gQnV0dG9uc1xuLy8gLy9cbi8vIC8vIEZvciBlYWNoIG9mIEJvb3RzdHJhcCdzIGJ1dHRvbnMsIGRlZmluZSB0ZXh0LCBiYWNrZ3JvdW5kLCBhbmQgYm9yZGVyIGNvbG9yLlxuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgYnRuLXZhcmlhYmxlc1xuLy8gJGJ0bi1wYWRkaW5nLXk6ICAgICAgICAgICAgICAgJGlucHV0LWJ0bi1wYWRkaW5nLXkgIWRlZmF1bHQ7XG4vLyAkYnRuLXBhZGRpbmcteDogICAgICAgICAgICAgICAkaW5wdXQtYnRuLXBhZGRpbmcteCAhZGVmYXVsdDtcbi8vICRidG4tZm9udC1mYW1pbHk6ICAgICAgICAgICAgICRpbnB1dC1idG4tZm9udC1mYW1pbHkgIWRlZmF1bHQ7XG4vLyAkYnRuLWZvbnQtc2l6ZTogICAgICAgICAgICAgICAkaW5wdXQtYnRuLWZvbnQtc2l6ZSAhZGVmYXVsdDtcbiRidG4tbGluZS1oZWlnaHQ6ICAgICAgICAgICAgIDEuMjVyZW0gIWRlZmF1bHQ7XG4vLyAkYnRuLXdoaXRlLXNwYWNlOiAgICAgICAgICAgICBudWxsICFkZWZhdWx0OyAvLyBTZXQgdG8gYG5vd3JhcGAgdG8gcHJldmVudCB0ZXh0IHdyYXBwaW5nXG5cbi8vICRidG4tcGFkZGluZy15LXNtOiAgICAgICAgICAgICRpbnB1dC1idG4tcGFkZGluZy15LXNtICFkZWZhdWx0O1xuLy8gJGJ0bi1wYWRkaW5nLXgtc206ICAgICAgICAgICAgJGlucHV0LWJ0bi1wYWRkaW5nLXgtc20gIWRlZmF1bHQ7XG4vLyAkYnRuLWZvbnQtc2l6ZS1zbTogICAgICAgICAgICAkaW5wdXQtYnRuLWZvbnQtc2l6ZS1zbSAhZGVmYXVsdDtcblxuLy8gJGJ0bi1wYWRkaW5nLXktbGc6ICAgICAgICAgICAgJGlucHV0LWJ0bi1wYWRkaW5nLXktbGcgIWRlZmF1bHQ7XG4vLyAkYnRuLXBhZGRpbmcteC1sZzogICAgICAgICAgICAkaW5wdXQtYnRuLXBhZGRpbmcteC1sZyAhZGVmYXVsdDtcbi8vICRidG4tZm9udC1zaXplLWxnOiAgICAgICAgICAgICRpbnB1dC1idG4tZm9udC1zaXplLWxnICFkZWZhdWx0O1xuXG4vLyAkYnRuLWJvcmRlci13aWR0aDogICAgICAgICAgICAkaW5wdXQtYnRuLWJvcmRlci13aWR0aCAhZGVmYXVsdDtcblxuJGJ0bi1mb250LXdlaWdodDogICAgICAgICAgICAgNTAwICFkZWZhdWx0O1xuLy8gJGJ0bi1ib3gtc2hhZG93OiAgICAgICAgICAgICAgaW5zZXQgMCAxcHggMCByZ2JhKCR3aGl0ZSwgLjE1KSwgMCAxcHggMXB4IHJnYmEoJGJsYWNrLCAuMDc1KSAhZGVmYXVsdDtcbi8vICRidG4tZm9jdXMtd2lkdGg6ICAgICAgICAgICAgICRpbnB1dC1idG4tZm9jdXMtd2lkdGggIWRlZmF1bHQ7XG4vLyAkYnRuLWZvY3VzLWJveC1zaGFkb3c6ICAgICAgICAkaW5wdXQtYnRuLWZvY3VzLWJveC1zaGFkb3cgIWRlZmF1bHQ7XG4vLyAkYnRuLWRpc2FibGVkLW9wYWNpdHk6ICAgICAgICAuNjUgIWRlZmF1bHQ7XG4vLyAkYnRuLWFjdGl2ZS1ib3gtc2hhZG93OiAgICAgICBpbnNldCAwIDNweCA1cHggcmdiYSgkYmxhY2ssIC4xMjUpICFkZWZhdWx0O1xuXG4vLyAkYnRuLWxpbmstY29sb3I6ICAgICAgICAgICAgICAkbGluay1jb2xvciAhZGVmYXVsdDtcbi8vICRidG4tbGluay1ob3Zlci1jb2xvcjogICAgICAgICRsaW5rLWhvdmVyLWNvbG9yICFkZWZhdWx0O1xuLy8gJGJ0bi1saW5rLWRpc2FibGVkLWNvbG9yOiAgICAgJGdyYXktNjAwICFkZWZhdWx0O1xuXG4vLyAvLyBBbGxvd3MgZm9yIGN1c3RvbWl6aW5nIGJ1dHRvbiByYWRpdXMgaW5kZXBlbmRlbnRseSBmcm9tIGdsb2JhbCBib3JkZXIgcmFkaXVzXG4vLyAkYnRuLWJvcmRlci1yYWRpdXM6ICAgICAgICAgICAkYm9yZGVyLXJhZGl1cyAhZGVmYXVsdDtcbiRidG4tYm9yZGVyLXJhZGl1cy1zbTogICAgICAgICRib3JkZXItcmFkaXVzICFkZWZhdWx0O1xuJGJ0bi1ib3JkZXItcmFkaXVzLWxnOiAgICAgICAgJGJvcmRlci1yYWRpdXMgIWRlZmF1bHQ7XG5cbi8vICRidG4tdHJhbnNpdGlvbjogICAgICAgICAgICAgIGNvbG9yIC4xNXMgZWFzZS1pbi1vdXQsIGJhY2tncm91bmQtY29sb3IgLjE1cyBlYXNlLWluLW91dCwgYm9yZGVyLWNvbG9yIC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgLjE1cyBlYXNlLWluLW91dCAhZGVmYXVsdDtcblxuLy8gJGJ0bi1ob3Zlci1iZy1zaGFkZS1hbW91bnQ6ICAgICAgIDE1JSAhZGVmYXVsdDtcbi8vICRidG4taG92ZXItYmctdGludC1hbW91bnQ6ICAgICAgICAxNSUgIWRlZmF1bHQ7XG4vLyAkYnRuLWhvdmVyLWJvcmRlci1zaGFkZS1hbW91bnQ6ICAgMjAlICFkZWZhdWx0O1xuLy8gJGJ0bi1ob3Zlci1ib3JkZXItdGludC1hbW91bnQ6ICAgIDEwJSAhZGVmYXVsdDtcbi8vICRidG4tYWN0aXZlLWJnLXNoYWRlLWFtb3VudDogICAgICAyMCUgIWRlZmF1bHQ7XG4vLyAkYnRuLWFjdGl2ZS1iZy10aW50LWFtb3VudDogICAgICAgMjAlICFkZWZhdWx0O1xuLy8gJGJ0bi1hY3RpdmUtYm9yZGVyLXNoYWRlLWFtb3VudDogIDI1JSAhZGVmYXVsdDtcbi8vICRidG4tYWN0aXZlLWJvcmRlci10aW50LWFtb3VudDogICAxMCUgIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIGJ0bi12YXJpYWJsZXNcblxuXG4vLyAvLyBGb3Jtc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgZm9ybS10ZXh0LXZhcmlhYmxlc1xuLy8gJGZvcm0tdGV4dC1tYXJnaW4tdG9wOiAgICAgICAgICAgICAgICAgIC4yNXJlbSAhZGVmYXVsdDtcbi8vICRmb3JtLXRleHQtZm9udC1zaXplOiAgICAgICAgICAgICAgICAgICAkc21hbGwtZm9udC1zaXplICFkZWZhdWx0O1xuLy8gJGZvcm0tdGV4dC1mb250LXN0eWxlOiAgICAgICAgICAgICAgICAgIG51bGwgIWRlZmF1bHQ7XG4vLyAkZm9ybS10ZXh0LWZvbnQtd2VpZ2h0OiAgICAgICAgICAgICAgICAgbnVsbCAhZGVmYXVsdDtcbi8vICRmb3JtLXRleHQtY29sb3I6ICAgICAgICAgICAgICAgICAgICAgICAkdGV4dC1tdXRlZCAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgZm9ybS10ZXh0LXZhcmlhYmxlc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgZm9ybS1sYWJlbC12YXJpYWJsZXNcbi8vICRmb3JtLWxhYmVsLW1hcmdpbi1ib3R0b206ICAgICAgICAgICAgICAuNXJlbSAhZGVmYXVsdDtcbi8vICRmb3JtLWxhYmVsLWZvbnQtc2l6ZTogICAgICAgICAgICAgICAgICBudWxsICFkZWZhdWx0O1xuLy8gJGZvcm0tbGFiZWwtZm9udC1zdHlsZTogICAgICAgICAgICAgICAgIG51bGwgIWRlZmF1bHQ7XG4vLyAkZm9ybS1sYWJlbC1mb250LXdlaWdodDogICAgICAgICAgICAgICAgbnVsbCAhZGVmYXVsdDtcbi8vICRmb3JtLWxhYmVsLWNvbG9yOiAgICAgICAgICAgICAgICAgICAgICBudWxsICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBmb3JtLWxhYmVsLXZhcmlhYmxlc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgZm9ybS1pbnB1dC12YXJpYWJsZXNcbi8vICRpbnB1dC1wYWRkaW5nLXk6ICAgICAgICAgICAgICAgICAgICAgICAwLjc1cmVtICFkZWZhdWx0O1xuLy8gJGlucHV0LXBhZGRpbmcteDogICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC1idG4tcGFkZGluZy14ICFkZWZhdWx0O1xuLy8gJGlucHV0LWZvbnQtZmFtaWx5OiAgICAgICAgICAgICAgICAgICAgICRpbnB1dC1idG4tZm9udC1mYW1pbHkgIWRlZmF1bHQ7XG4vLyAkaW5wdXQtZm9udC1zaXplOiAgICAgICAgICAgICAgICAgICAgICAgMS4xMjVyZW0gIWRlZmF1bHQ7XG4vLyAkaW5wdXQtZm9udC13ZWlnaHQ6ICAgICAgICAgICAgICAgICAgICAgJGZvbnQtd2VpZ2h0LWJhc2UgIWRlZmF1bHQ7XG4vLyAkaW5wdXQtbGluZS1oZWlnaHQ6ICAgICAgICAgICAgICAgICAgICAgJGlucHV0LWJ0bi1saW5lLWhlaWdodCAhZGVmYXVsdDtcblxuLy8gJGlucHV0LXBhZGRpbmcteS1zbTogICAgICAgICAgICAgICAgICAgICRpbnB1dC1idG4tcGFkZGluZy15LXNtICFkZWZhdWx0O1xuLy8gJGlucHV0LXBhZGRpbmcteC1zbTogICAgICAgICAgICAgICAgICAgICRpbnB1dC1idG4tcGFkZGluZy14LXNtICFkZWZhdWx0O1xuLy8gJGlucHV0LWZvbnQtc2l6ZS1zbTogICAgICAgICAgICAgICAgICAgICRpbnB1dC1idG4tZm9udC1zaXplLXNtICFkZWZhdWx0O1xuXG4vLyAkaW5wdXQtcGFkZGluZy15LWxnOiAgICAgICAgICAgICAgICAgICAgJGlucHV0LWJ0bi1wYWRkaW5nLXktbGcgIWRlZmF1bHQ7XG4vLyAkaW5wdXQtcGFkZGluZy14LWxnOiAgICAgICAgICAgICAgICAgICAgJGlucHV0LWJ0bi1wYWRkaW5nLXgtbGcgIWRlZmF1bHQ7XG4vLyAkaW5wdXQtZm9udC1zaXplLWxnOiAgICAgICAgICAgICAgICAgICAgJGlucHV0LWJ0bi1mb250LXNpemUtbGcgIWRlZmF1bHQ7XG5cbi8vICRpbnB1dC1iZzogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZ3JheS03MDA7XG4vLyAkaW5wdXQtZGlzYWJsZWQtYmc6ICAgICAgICAgICAgICAgICAgICAgJGdyYXktMjAwICFkZWZhdWx0O1xuLy8gJGlucHV0LWRpc2FibGVkLWJvcmRlci1jb2xvcjogICAgICAgICAgIG51bGwgIWRlZmF1bHQ7XG5cbi8vICRpbnB1dC1jb2xvcjogICAgICAgICAgICAgICAgICAgICAgICAgICAkZ3JheS01MDAgIWRlZmF1bHQ7XG4vLyAkaW5wdXQtYm9yZGVyLWNvbG9yOiAgICAgICAgICAgICAgICAgICAgJGdyYXktNDAwICFkZWZhdWx0O1xuJGlucHV0LWJvcmRlci13aWR0aDogICAgICAgICAgICAgICAgICAgIDAgIWRlZmF1bHQ7XG4vLyAkaW5wdXQtYm94LXNoYWRvdzogICAgICAgICAgICAgICAgICAgICAgJGJveC1zaGFkb3ctaW5zZXQgIWRlZmF1bHQ7XG5cbi8vICRpbnB1dC1ib3JkZXItcmFkaXVzOiAgICAgICAgICAgICAgICAgICAuNjI1cmVtICFkZWZhdWx0O1xuLy8gJGlucHV0LWJvcmRlci1yYWRpdXMtc206ICAgICAgICAgICAgICAgICRib3JkZXItcmFkaXVzLXNtICFkZWZhdWx0O1xuLy8gJGlucHV0LWJvcmRlci1yYWRpdXMtbGc6ICAgICAgICAgICAgICAgICRib3JkZXItcmFkaXVzLWxnICFkZWZhdWx0O1xuXG4vLyAkaW5wdXQtZm9jdXMtYmc6ICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LWJnICFkZWZhdWx0O1xuLy8gJGlucHV0LWZvY3VzLWJvcmRlci1jb2xvcjogICAgICAgICAgICAgIHRpbnQtY29sb3IoJGNvbXBvbmVudC1hY3RpdmUtYmcsIDUwJSkgIWRlZmF1bHQ7XG4vLyAkaW5wdXQtZm9jdXMtY29sb3I6ICAgICAgICAgICAgICAgICAgICAgJGlucHV0LWNvbG9yICFkZWZhdWx0O1xuLy8gJGlucHV0LWZvY3VzLXdpZHRoOiAgICAgICAgICAgICAgICAgICAgICRpbnB1dC1idG4tZm9jdXMtd2lkdGggIWRlZmF1bHQ7XG4kaW5wdXQtZm9jdXMtYm94LXNoYWRvdzogICAgICAgICAgICAgICAgMCAhZGVmYXVsdDtcblxuJGlucHV0LXBsYWNlaG9sZGVyLWNvbG9yOiAgICAgICAgICAgICAgICRncmF5LTUwMCAhZGVmYXVsdDtcbi8vICRpbnB1dC1wbGFpbnRleHQtY29sb3I6ICAgICAgICAgICAgICAgICAkYm9keS1jb2xvciAhZGVmYXVsdDtcblxuLy8gJGlucHV0LWhlaWdodC1ib3JkZXI6ICAgICAgICAgICAgICAgICAgICRpbnB1dC1ib3JkZXItd2lkdGggKiAyICFkZWZhdWx0O1xuXG4vLyAkaW5wdXQtaGVpZ2h0LWlubmVyOiAgICAgICAgICAgICAgICAgICAgYWRkKCRpbnB1dC1saW5lLWhlaWdodCAqIDFlbSwgJGlucHV0LXBhZGRpbmcteSAqIDIpICFkZWZhdWx0O1xuLy8gJGlucHV0LWhlaWdodC1pbm5lci1oYWxmOiAgICAgICAgICAgICAgIGFkZCgkaW5wdXQtbGluZS1oZWlnaHQgKiAuNWVtLCAkaW5wdXQtcGFkZGluZy15KSAhZGVmYXVsdDtcbi8vICRpbnB1dC1oZWlnaHQtaW5uZXItcXVhcnRlcjogICAgICAgICAgICBhZGQoJGlucHV0LWxpbmUtaGVpZ2h0ICogLjI1ZW0sICRpbnB1dC1wYWRkaW5nLXkgKiAuNSkgIWRlZmF1bHQ7XG5cbi8vICRpbnB1dC1oZWlnaHQ6ICAgICAgICAgICAgICAgICAgICAgICAgICBhZGQoJGlucHV0LWxpbmUtaGVpZ2h0ICogMWVtLCBhZGQoJGlucHV0LXBhZGRpbmcteSAqIDIsICRpbnB1dC1oZWlnaHQtYm9yZGVyLCBmYWxzZSkpICFkZWZhdWx0O1xuLy8gJGlucHV0LWhlaWdodC1zbTogICAgICAgICAgICAgICAgICAgICAgIGFkZCgkaW5wdXQtbGluZS1oZWlnaHQgKiAxZW0sIGFkZCgkaW5wdXQtcGFkZGluZy15LXNtICogMiwgJGlucHV0LWhlaWdodC1ib3JkZXIsIGZhbHNlKSkgIWRlZmF1bHQ7XG4vLyAkaW5wdXQtaGVpZ2h0LWxnOiAgICAgICAgICAgICAgICAgICAgICAgYWRkKCRpbnB1dC1saW5lLWhlaWdodCAqIDFlbSwgYWRkKCRpbnB1dC1wYWRkaW5nLXktbGcgKiAyLCAkaW5wdXQtaGVpZ2h0LWJvcmRlciwgZmFsc2UpKSAhZGVmYXVsdDtcblxuLy8gJGlucHV0LXRyYW5zaXRpb246ICAgICAgICAgICAgICAgICAgICAgIGJvcmRlci1jb2xvciAuMTVzIGVhc2UtaW4tb3V0LCBib3gtc2hhZG93IC4xNXMgZWFzZS1pbi1vdXQgIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIGZvcm0taW5wdXQtdmFyaWFibGVzXG5cbi8vIC8vIHNjc3MtZG9jcy1zdGFydCBmb3JtLWNoZWNrLXZhcmlhYmxlc1xuJGZvcm0tY2hlY2staW5wdXQtd2lkdGg6ICAgICAgICAgICAgICAgICAgMmVtICFkZWZhdWx0O1xuLy8gJGZvcm0tY2hlY2stbWluLWhlaWdodDogICAgICAgICAgICAgICAgICAgJGZvbnQtc2l6ZS1iYXNlICogJGxpbmUtaGVpZ2h0LWJhc2UgIWRlZmF1bHQ7XG4kZm9ybS1jaGVjay1wYWRkaW5nLXN0YXJ0OiAgICAgICAgICAgICAgICAyLjVyZW0gIWRlZmF1bHQ7XG4vLyAkZm9ybS1jaGVjay1tYXJnaW4tYm90dG9tOiAgICAgICAgICAgICAgICAuMTI1cmVtICFkZWZhdWx0O1xuLy8gJGZvcm0tY2hlY2stbGFiZWwtY29sb3I6ICAgICAgICAgICAgICAgICAgbnVsbCAhZGVmYXVsdDtcbi8vICRmb3JtLWNoZWNrLWxhYmVsLWN1cnNvcjogICAgICAgICAgICAgICAgIG51bGwgIWRlZmF1bHQ7XG4vLyAkZm9ybS1jaGVjay10cmFuc2l0aW9uOiAgICAgICAgICAgICAgICAgICBudWxsICFkZWZhdWx0O1xuXG4vLyAkZm9ybS1jaGVjay1pbnB1dC1hY3RpdmUtZmlsdGVyOiAgICAgICAgICBicmlnaHRuZXNzKDkwJSkgIWRlZmF1bHQ7XG5cbiRmb3JtLWNoZWNrLWlucHV0LWJnOiAgICAgICAgICAgICAgICAgICAgICRkYXJrLXRoZW1lLWludGVyYWN0aW9uICFkZWZhdWx0O1xuJGZvcm0tY2hlY2staW5wdXQtYm9yZGVyOiAgICAgICAgICAgICAgICAgMXB4IHNvbGlkICRwcmltYXJ5LWRhcmsgIWRlZmF1bHQ7XG4vLyAkZm9ybS1jaGVjay1pbnB1dC1ib3JkZXItcmFkaXVzOiAgICAgICAgICAuMjVlbSAhZGVmYXVsdDtcbi8vICRmb3JtLWNoZWNrLXJhZGlvLWJvcmRlci1yYWRpdXM6ICAgICAgICAgIDUwJSAhZGVmYXVsdDtcbi8vICRmb3JtLWNoZWNrLWlucHV0LWZvY3VzLWJvcmRlcjogICAgICAgICAgICRpbnB1dC1mb2N1cy1ib3JkZXItY29sb3IgIWRlZmF1bHQ7XG4vLyAkZm9ybS1jaGVjay1pbnB1dC1mb2N1cy1ib3gtc2hhZG93OiAgICAgICAkaW5wdXQtYnRuLWZvY3VzLWJveC1zaGFkb3cgIWRlZmF1bHQ7XG5cbi8vICRmb3JtLWNoZWNrLWlucHV0LWNoZWNrZWQtY29sb3I6ICAgICAgICAgICRjb21wb25lbnQtYWN0aXZlLWNvbG9yICFkZWZhdWx0O1xuJGZvcm0tY2hlY2staW5wdXQtY2hlY2tlZC1iZy1jb2xvcjogICAgICAgJGRhcmstdGhlbWUtaW50ZXJhY3Rpb24gIWRlZmF1bHQ7XG4kZm9ybS1jaGVjay1pbnB1dC1jaGVja2VkLWJvcmRlci1jb2xvcjogICAkcHJpbWFyeSAhZGVmYXVsdDtcbi8vICRmb3JtLWNoZWNrLWlucHV0LWNoZWNrZWQtYmctaW1hZ2U6ICAgICAgIHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCw8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDIwIDIwJz48cGF0aCBmaWxsPSdub25lJyBzdHJva2U9JyN7JGZvcm0tY2hlY2staW5wdXQtY2hlY2tlZC1jb2xvcn0nIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgc3Ryb2tlLXdpZHRoPSczJyBkPSdNNiAxMGwzIDNsNi02Jy8+PC9zdmc+XCIpICFkZWZhdWx0O1xuLy8gJGZvcm0tY2hlY2stcmFkaW8tY2hlY2tlZC1iZy1pbWFnZTogICAgICAgdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLDxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PSctNCAtNCA4IDgnPjxjaXJjbGUgcj0nMicgZmlsbD0nI3skZm9ybS1jaGVjay1pbnB1dC1jaGVja2VkLWNvbG9yfScvPjwvc3ZnPlwiKSAhZGVmYXVsdDtcblxuLy8gJGZvcm0tY2hlY2staW5wdXQtaW5kZXRlcm1pbmF0ZS1jb2xvcjogICAgICAgICAgJGNvbXBvbmVudC1hY3RpdmUtY29sb3IgIWRlZmF1bHQ7XG4vLyAkZm9ybS1jaGVjay1pbnB1dC1pbmRldGVybWluYXRlLWJnLWNvbG9yOiAgICAgICAkY29tcG9uZW50LWFjdGl2ZS1iZyAhZGVmYXVsdDtcbi8vICRmb3JtLWNoZWNrLWlucHV0LWluZGV0ZXJtaW5hdGUtYm9yZGVyLWNvbG9yOiAgICRmb3JtLWNoZWNrLWlucHV0LWluZGV0ZXJtaW5hdGUtYmctY29sb3IgIWRlZmF1bHQ7XG4vLyAkZm9ybS1jaGVjay1pbnB1dC1pbmRldGVybWluYXRlLWJnLWltYWdlOiAgICAgICB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyMCAyMCc+PHBhdGggZmlsbD0nbm9uZScgc3Ryb2tlPScjeyRmb3JtLWNoZWNrLWlucHV0LWluZGV0ZXJtaW5hdGUtY29sb3J9JyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMycgZD0nTTYgMTBoOCcvPjwvc3ZnPlwiKSAhZGVmYXVsdDtcblxuLy8gJGZvcm0tY2hlY2staW5wdXQtZGlzYWJsZWQtb3BhY2l0eTogICAgICAgIC41ICFkZWZhdWx0O1xuLy8gJGZvcm0tY2hlY2stbGFiZWwtZGlzYWJsZWQtb3BhY2l0eTogICAgICAgICRmb3JtLWNoZWNrLWlucHV0LWRpc2FibGVkLW9wYWNpdHkgIWRlZmF1bHQ7XG4vLyAkZm9ybS1jaGVjay1idG4tY2hlY2stZGlzYWJsZWQtb3BhY2l0eTogICAgJGJ0bi1kaXNhYmxlZC1vcGFjaXR5ICFkZWZhdWx0O1xuXG4vLyAkZm9ybS1jaGVjay1pbmxpbmUtbWFyZ2luLWVuZDogICAgMXJlbSAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgZm9ybS1jaGVjay12YXJpYWJsZXNcblxuLy8gLy8gc2Nzcy1kb2NzLXN0YXJ0IGZvcm0tc3dpdGNoLXZhcmlhYmxlc1xuJGZvcm0tc3dpdGNoLWNvbG9yOiAgICAgICAgICAgICAgICRncmF5LTUwMCAhZGVmYXVsdDtcbi8vICRmb3JtLXN3aXRjaC13aWR0aDogICAgICAgICAgICAgICAyZW0gIWRlZmF1bHQ7XG4vLyAkZm9ybS1zd2l0Y2gtcGFkZGluZy1zdGFydDogICAgICAgJGZvcm0tc3dpdGNoLXdpZHRoICsgLjVlbSAhZGVmYXVsdDtcbi8vICRmb3JtLXN3aXRjaC1iZy1pbWFnZTogICAgICAgICAgICB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9Jy00IC00IDggOCc+PGNpcmNsZSByPSczJyBmaWxsPScjeyRncmF5LTUwMH0nLz48L3N2Zz5cIikgIWRlZmF1bHQ7XG4vLyAkZm9ybS1zd2l0Y2gtYm9yZGVyLXJhZGl1czogICAgICAgJGZvcm0tc3dpdGNoLXdpZHRoICFkZWZhdWx0O1xuLy8gJGZvcm0tc3dpdGNoLXRyYW5zaXRpb246ICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb24gLjE1cyBlYXNlLWluLW91dCAhZGVmYXVsdDtcblxuLy8gJGZvcm0tc3dpdGNoLWZvY3VzLWNvbG9yOiAgICAgICAgICRpbnB1dC1mb2N1cy1ib3JkZXItY29sb3IgIWRlZmF1bHQ7XG4vLyAkZm9ybS1zd2l0Y2gtZm9jdXMtYmctaW1hZ2U6ICAgICAgdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLDxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PSctNCAtNCA4IDgnPjxjaXJjbGUgcj0nMycgZmlsbD0nI3skZm9ybS1zd2l0Y2gtZm9jdXMtY29sb3J9Jy8+PC9zdmc+XCIpICFkZWZhdWx0O1xuXG4vLyAkZm9ybS1zd2l0Y2gtY2hlY2tlZC1jb2xvcjogICAgICAgJGNvbXBvbmVudC1hY3RpdmUtY29sb3IgIWRlZmF1bHQ7XG4vLyAkZm9ybS1zd2l0Y2gtY2hlY2tlZC1iZy1pbWFnZTogICAgdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLDxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PSctNCAtNCA4IDgnPjxjaXJjbGUgcj0nMycgZmlsbD0nI3skZm9ybS1zd2l0Y2gtY2hlY2tlZC1jb2xvcn0nLz48L3N2Zz5cIikgIWRlZmF1bHQ7XG4vLyAkZm9ybS1zd2l0Y2gtY2hlY2tlZC1iZy1wb3NpdGlvbjogcmlnaHQgY2VudGVyICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBmb3JtLXN3aXRjaC12YXJpYWJsZXNcblxuLy8gLy8gc2Nzcy1kb2NzLXN0YXJ0IGlucHV0LWdyb3VwLXZhcmlhYmxlc1xuLy8gJGlucHV0LWdyb3VwLWFkZG9uLXBhZGRpbmcteTogICAgICAgICAgICRpbnB1dC1wYWRkaW5nLXkgIWRlZmF1bHQ7XG4vLyAkaW5wdXQtZ3JvdXAtYWRkb24tcGFkZGluZy14OiAgICAgICAgICAgJGlucHV0LXBhZGRpbmcteCAhZGVmYXVsdDtcbi8vICRpbnB1dC1ncm91cC1hZGRvbi1mb250LXdlaWdodDogICAgICAgICAkaW5wdXQtZm9udC13ZWlnaHQgIWRlZmF1bHQ7XG4vLyAkaW5wdXQtZ3JvdXAtYWRkb24tY29sb3I6ICAgICAgICAgICAgICAgJGlucHV0LWNvbG9yICFkZWZhdWx0O1xuLy8gJGlucHV0LWdyb3VwLWFkZG9uLWJnOiAgICAgICAgICAgICAgICAgICRncmF5LTkwMCAhZGVmYXVsdDtcbi8vICRpbnB1dC1ncm91cC1hZGRvbi1ib3JkZXItY29sb3I6ICAgICAgICAkaW5wdXQtYm9yZGVyLWNvbG9yICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBpbnB1dC1ncm91cC12YXJpYWJsZXNcblxuLy8gLy8gc2Nzcy1kb2NzLXN0YXJ0IGZvcm0tc2VsZWN0LXZhcmlhYmxlc1xuLy8gJGZvcm0tc2VsZWN0LXBhZGRpbmcteTogICAgICAgICAgICAgJGlucHV0LXBhZGRpbmcteSAhZGVmYXVsdDtcbi8vICRmb3JtLXNlbGVjdC1wYWRkaW5nLXg6ICAgICAgICAgICAgICRpbnB1dC1wYWRkaW5nLXggIWRlZmF1bHQ7XG4vLyAkZm9ybS1zZWxlY3QtZm9udC1mYW1pbHk6ICAgICAgICAgICAkaW5wdXQtZm9udC1mYW1pbHkgIWRlZmF1bHQ7XG4vLyAkZm9ybS1zZWxlY3QtZm9udC1zaXplOiAgICAgICAgICAgICAkaW5wdXQtZm9udC1zaXplICFkZWZhdWx0O1xuLy8gJGZvcm0tc2VsZWN0LWluZGljYXRvci1wYWRkaW5nOiAgICAgJGZvcm0tc2VsZWN0LXBhZGRpbmcteCAqIDMgIWRlZmF1bHQ7IC8vIEV4dHJhIHBhZGRpbmcgZm9yIGJhY2tncm91bmQtaW1hZ2Vcbi8vICRmb3JtLXNlbGVjdC1mb250LXdlaWdodDogICAgICAgICAgICRpbnB1dC1mb250LXdlaWdodCAhZGVmYXVsdDtcbi8vICRmb3JtLXNlbGVjdC1saW5lLWhlaWdodDogICAgICAgICAgICRpbnB1dC1saW5lLWhlaWdodCAhZGVmYXVsdDtcbi8vICRmb3JtLXNlbGVjdC1jb2xvcjogICAgICAgICAgICAgICAgICRpbnB1dC1jb2xvciAhZGVmYXVsdDtcbi8vICRmb3JtLXNlbGVjdC1iZzogICAgICAgICAgICAgICAgICAgICRpbnB1dC1iZyAhZGVmYXVsdDtcbi8vICRmb3JtLXNlbGVjdC1kaXNhYmxlZC1jb2xvcjogICAgICAgIG51bGwgIWRlZmF1bHQ7XG4vLyAkZm9ybS1zZWxlY3QtZGlzYWJsZWQtYmc6ICAgICAgICAgICAkZ3JheS0yMDAgIWRlZmF1bHQ7XG4vLyAkZm9ybS1zZWxlY3QtZGlzYWJsZWQtYm9yZGVyLWNvbG9yOiAkaW5wdXQtZGlzYWJsZWQtYm9yZGVyLWNvbG9yICFkZWZhdWx0O1xuLy8gJGZvcm0tc2VsZWN0LWJnLXBvc2l0aW9uOiAgICAgICAgICAgcmlnaHQgJGZvcm0tc2VsZWN0LXBhZGRpbmcteCBjZW50ZXIgIWRlZmF1bHQ7XG4vLyAkZm9ybS1zZWxlY3QtYmctc2l6ZTogICAgICAgICAgICAgICAxNnB4IDEycHggIWRlZmF1bHQ7IC8vIEluIHBpeGVscyBiZWNhdXNlIGltYWdlIGRpbWVuc2lvbnNcbi8vICRmb3JtLXNlbGVjdC1pbmRpY2F0b3ItY29sb3I6ICAgICAgICRncmF5LTgwMCAhZGVmYXVsdDtcbi8vICRmb3JtLXNlbGVjdC1pbmRpY2F0b3I6ICAgICAgICAgICAgIHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCw8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDE2IDE2Jz48cGF0aCBmaWxsPSdub25lJyBzdHJva2U9JyN7JGZvcm0tc2VsZWN0LWluZGljYXRvci1jb2xvcn0nIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgc3Ryb2tlLXdpZHRoPScyJyBkPSdNMiA1bDYgNiA2LTYnLz48L3N2Zz5cIikgIWRlZmF1bHQ7XG5cbi8vICRmb3JtLXNlbGVjdC1mZWVkYmFjay1pY29uLXBhZGRpbmctZW5kOiAkZm9ybS1zZWxlY3QtcGFkZGluZy14ICogMi41ICsgJGZvcm0tc2VsZWN0LWluZGljYXRvci1wYWRkaW5nICFkZWZhdWx0O1xuLy8gJGZvcm0tc2VsZWN0LWZlZWRiYWNrLWljb24tcG9zaXRpb246ICAgIGNlbnRlciByaWdodCAkZm9ybS1zZWxlY3QtaW5kaWNhdG9yLXBhZGRpbmcgIWRlZmF1bHQ7XG4vLyAkZm9ybS1zZWxlY3QtZmVlZGJhY2staWNvbi1zaXplOiAgICAgICAgJGlucHV0LWhlaWdodC1pbm5lci1oYWxmICRpbnB1dC1oZWlnaHQtaW5uZXItaGFsZiAhZGVmYXVsdDtcblxuLy8gJGZvcm0tc2VsZWN0LWJvcmRlci13aWR0aDogICAgICAgICRpbnB1dC1ib3JkZXItd2lkdGggIWRlZmF1bHQ7XG4vLyAkZm9ybS1zZWxlY3QtYm9yZGVyLWNvbG9yOiAgICAgICAgJGlucHV0LWJvcmRlci1jb2xvciAhZGVmYXVsdDtcbi8vICRmb3JtLXNlbGVjdC1ib3JkZXItcmFkaXVzOiAgICAgICAkYm9yZGVyLXJhZGl1cyAhZGVmYXVsdDtcbi8vICRmb3JtLXNlbGVjdC1ib3gtc2hhZG93OiAgICAgICAgICAkYm94LXNoYWRvdy1pbnNldCAhZGVmYXVsdDtcblxuLy8gJGZvcm0tc2VsZWN0LWZvY3VzLWJvcmRlci1jb2xvcjogICRpbnB1dC1mb2N1cy1ib3JkZXItY29sb3IgIWRlZmF1bHQ7XG4vLyAkZm9ybS1zZWxlY3QtZm9jdXMtd2lkdGg6ICAgICAgICAgJGlucHV0LWZvY3VzLXdpZHRoICFkZWZhdWx0O1xuLy8gJGZvcm0tc2VsZWN0LWZvY3VzLWJveC1zaGFkb3c6ICAgIDAgMCAwICRmb3JtLXNlbGVjdC1mb2N1cy13aWR0aCAkaW5wdXQtYnRuLWZvY3VzLWNvbG9yICFkZWZhdWx0O1xuXG4vLyAkZm9ybS1zZWxlY3QtcGFkZGluZy15LXNtOiAgICAgICAgJGlucHV0LXBhZGRpbmcteS1zbSAhZGVmYXVsdDtcbi8vICRmb3JtLXNlbGVjdC1wYWRkaW5nLXgtc206ICAgICAgICAkaW5wdXQtcGFkZGluZy14LXNtICFkZWZhdWx0O1xuLy8gJGZvcm0tc2VsZWN0LWZvbnQtc2l6ZS1zbTogICAgICAgICRpbnB1dC1mb250LXNpemUtc20gIWRlZmF1bHQ7XG5cbi8vICRmb3JtLXNlbGVjdC1wYWRkaW5nLXktbGc6ICAgICAgICAkaW5wdXQtcGFkZGluZy15LWxnICFkZWZhdWx0O1xuLy8gJGZvcm0tc2VsZWN0LXBhZGRpbmcteC1sZzogICAgICAgICRpbnB1dC1wYWRkaW5nLXgtbGcgIWRlZmF1bHQ7XG4vLyAkZm9ybS1zZWxlY3QtZm9udC1zaXplLWxnOiAgICAgICAgJGlucHV0LWZvbnQtc2l6ZS1sZyAhZGVmYXVsdDtcblxuLy8gJGZvcm0tc2VsZWN0LXRyYW5zaXRpb246ICAgICAgICAgICRpbnB1dC10cmFuc2l0aW9uICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBmb3JtLXNlbGVjdC12YXJpYWJsZXNcblxuLy8gLy8gc2Nzcy1kb2NzLXN0YXJ0IGZvcm0tcmFuZ2UtdmFyaWFibGVzXG4vLyAkZm9ybS1yYW5nZS10cmFjay13aWR0aDogICAgICAgICAgMTAwJSAhZGVmYXVsdDtcbi8vICRmb3JtLXJhbmdlLXRyYWNrLWhlaWdodDogICAgICAgICAuNXJlbSAhZGVmYXVsdDtcbi8vICRmb3JtLXJhbmdlLXRyYWNrLWN1cnNvcjogICAgICAgICBwb2ludGVyICFkZWZhdWx0O1xuLy8gJGZvcm0tcmFuZ2UtdHJhY2stYmc6ICAgICAgICAgICAgICRncmF5LTMwMCAhZGVmYXVsdDtcbi8vICRmb3JtLXJhbmdlLXRyYWNrLWJvcmRlci1yYWRpdXM6ICAxcmVtICFkZWZhdWx0O1xuLy8gJGZvcm0tcmFuZ2UtdHJhY2stYm94LXNoYWRvdzogICAgICRib3gtc2hhZG93LWluc2V0ICFkZWZhdWx0O1xuXG4vLyAkZm9ybS1yYW5nZS10aHVtYi13aWR0aDogICAgICAgICAgICAgICAgICAgMXJlbSAhZGVmYXVsdDtcbi8vICRmb3JtLXJhbmdlLXRodW1iLWhlaWdodDogICAgICAgICAgICAgICAgICAkZm9ybS1yYW5nZS10aHVtYi13aWR0aCAhZGVmYXVsdDtcbi8vICRmb3JtLXJhbmdlLXRodW1iLWJnOiAgICAgICAgICAgICAgICAgICAgICAkY29tcG9uZW50LWFjdGl2ZS1iZyAhZGVmYXVsdDtcbi8vICRmb3JtLXJhbmdlLXRodW1iLWJvcmRlcjogICAgICAgICAgICAgICAgICAwICFkZWZhdWx0O1xuLy8gJGZvcm0tcmFuZ2UtdGh1bWItYm9yZGVyLXJhZGl1czogICAgICAgICAgIDFyZW0gIWRlZmF1bHQ7XG4vLyAkZm9ybS1yYW5nZS10aHVtYi1ib3gtc2hhZG93OiAgICAgICAgICAgICAgMCAuMXJlbSAuMjVyZW0gcmdiYSgkYmxhY2ssIC4xKSAhZGVmYXVsdDtcbi8vICRmb3JtLXJhbmdlLXRodW1iLWZvY3VzLWJveC1zaGFkb3c6ICAgICAgICAwIDAgMCAxcHggJGJvZHktYmcsICRpbnB1dC1mb2N1cy1ib3gtc2hhZG93ICFkZWZhdWx0O1xuLy8gJGZvcm0tcmFuZ2UtdGh1bWItZm9jdXMtYm94LXNoYWRvdy13aWR0aDogICRpbnB1dC1mb2N1cy13aWR0aCAhZGVmYXVsdDsgLy8gRm9yIGZvY3VzIGJveCBzaGFkb3cgaXNzdWUgaW4gRWRnZVxuLy8gJGZvcm0tcmFuZ2UtdGh1bWItYWN0aXZlLWJnOiAgICAgICAgICAgICAgIHRpbnQtY29sb3IoJGNvbXBvbmVudC1hY3RpdmUtYmcsIDcwJSkgIWRlZmF1bHQ7XG4vLyAkZm9ybS1yYW5nZS10aHVtYi1kaXNhYmxlZC1iZzogICAgICAgICAgICAgJGdyYXktNTAwICFkZWZhdWx0O1xuLy8gJGZvcm0tcmFuZ2UtdGh1bWItdHJhbnNpdGlvbjogICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3IgLjE1cyBlYXNlLWluLW91dCwgYm9yZGVyLWNvbG9yIC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgLjE1cyBlYXNlLWluLW91dCAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgZm9ybS1yYW5nZS12YXJpYWJsZXNcblxuLy8gLy8gc2Nzcy1kb2NzLXN0YXJ0IGZvcm0tZmlsZS12YXJpYWJsZXNcbi8vICRmb3JtLWZpbGUtYnV0dG9uLWNvbG9yOiAgICAgICAgICAkaW5wdXQtY29sb3IgIWRlZmF1bHQ7XG4vLyAkZm9ybS1maWxlLWJ1dHRvbi1iZzogICAgICAgICAgICAgJGlucHV0LWdyb3VwLWFkZG9uLWJnICFkZWZhdWx0O1xuLy8gJGZvcm0tZmlsZS1idXR0b24taG92ZXItYmc6ICAgICAgIHNoYWRlLWNvbG9yKCRmb3JtLWZpbGUtYnV0dG9uLWJnLCA1JSkgIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIGZvcm0tZmlsZS12YXJpYWJsZXNcblxuLy8gLy8gc2Nzcy1kb2NzLXN0YXJ0IGZvcm0tZmxvYXRpbmctdmFyaWFibGVzXG4vLyAkZm9ybS1mbG9hdGluZy1oZWlnaHQ6ICAgICAgICAgICAgYWRkKDMuNXJlbSwgJGlucHV0LWhlaWdodC1ib3JkZXIpICFkZWZhdWx0O1xuLy8gJGZvcm0tZmxvYXRpbmctbGluZS1oZWlnaHQ6ICAgICAgIDEuMjUgIWRlZmF1bHQ7XG4vLyAkZm9ybS1mbG9hdGluZy1wYWRkaW5nLXg6ICAgICAgICAgJGlucHV0LXBhZGRpbmcteCAhZGVmYXVsdDtcbi8vICRmb3JtLWZsb2F0aW5nLXBhZGRpbmcteTogICAgICAgICAxcmVtICFkZWZhdWx0O1xuLy8gJGZvcm0tZmxvYXRpbmctaW5wdXQtcGFkZGluZy10OiAgIDEuNjI1cmVtICFkZWZhdWx0O1xuLy8gJGZvcm0tZmxvYXRpbmctaW5wdXQtcGFkZGluZy1iOiAgIC42MjVyZW0gIWRlZmF1bHQ7XG4vLyAkZm9ybS1mbG9hdGluZy1sYWJlbC1vcGFjaXR5OiAgICAgLjY1ICFkZWZhdWx0O1xuLy8gJGZvcm0tZmxvYXRpbmctbGFiZWwtdHJhbnNmb3JtOiAgIHNjYWxlKC44NSkgdHJhbnNsYXRlWSgtLjVyZW0pIHRyYW5zbGF0ZVgoLjE1cmVtKSAhZGVmYXVsdDtcbi8vICRmb3JtLWZsb2F0aW5nLXRyYW5zaXRpb246ICAgICAgICBvcGFjaXR5IC4xcyBlYXNlLWluLW91dCwgdHJhbnNmb3JtIC4xcyBlYXNlLWluLW91dCAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgZm9ybS1mbG9hdGluZy12YXJpYWJsZXNcblxuLy8gLy8gRm9ybSB2YWxpZGF0aW9uXG5cbi8vIC8vIHNjc3MtZG9jcy1zdGFydCBmb3JtLWZlZWRiYWNrLXZhcmlhYmxlc1xuLy8gJGZvcm0tZmVlZGJhY2stbWFyZ2luLXRvcDogICAgICAgICAgJGZvcm0tdGV4dC1tYXJnaW4tdG9wICFkZWZhdWx0O1xuLy8gJGZvcm0tZmVlZGJhY2stZm9udC1zaXplOiAgICAgICAgICAgJGZvcm0tdGV4dC1mb250LXNpemUgIWRlZmF1bHQ7XG4vLyAkZm9ybS1mZWVkYmFjay1mb250LXN0eWxlOiAgICAgICAgICAkZm9ybS10ZXh0LWZvbnQtc3R5bGUgIWRlZmF1bHQ7XG4vLyAkZm9ybS1mZWVkYmFjay12YWxpZC1jb2xvcjogICAgICAgICAkc3VjY2VzcyAhZGVmYXVsdDtcbi8vICRmb3JtLWZlZWRiYWNrLWludmFsaWQtY29sb3I6ICAgICAgICRkYW5nZXIgIWRlZmF1bHQ7XG5cbi8vICRmb3JtLWZlZWRiYWNrLWljb24tdmFsaWQtY29sb3I6ICAgICRmb3JtLWZlZWRiYWNrLXZhbGlkLWNvbG9yICFkZWZhdWx0O1xuLy8gJGZvcm0tZmVlZGJhY2staWNvbi12YWxpZDogICAgICAgICAgdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLDxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgOCA4Jz48cGF0aCBmaWxsPScjeyRmb3JtLWZlZWRiYWNrLWljb24tdmFsaWQtY29sb3J9JyBkPSdNMi4zIDYuNzNMLjYgNC41M2MtLjQtMS4wNC40Ni0xLjQgMS4xLS44bDEuMSAxLjQgMy40LTMuOGMuNi0uNjMgMS42LS4yNyAxLjIuN2wtNCA0LjZjLS40My41LS44LjQtMS4xLjF6Jy8+PC9zdmc+XCIpICFkZWZhdWx0O1xuLy8gJGZvcm0tZmVlZGJhY2staWNvbi1pbnZhbGlkLWNvbG9yOiAgJGZvcm0tZmVlZGJhY2staW52YWxpZC1jb2xvciAhZGVmYXVsdDtcbi8vICRmb3JtLWZlZWRiYWNrLWljb24taW52YWxpZDogICAgICAgIHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCw8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDEyIDEyJyB3aWR0aD0nMTInIGhlaWdodD0nMTInIGZpbGw9J25vbmUnIHN0cm9rZT0nI3skZm9ybS1mZWVkYmFjay1pY29uLWludmFsaWQtY29sb3J9Jz48Y2lyY2xlIGN4PSc2JyBjeT0nNicgcj0nNC41Jy8+PHBhdGggc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgZD0nTTUuOCAzLjZoLjRMNiA2LjV6Jy8+PGNpcmNsZSBjeD0nNicgY3k9JzguMicgcj0nLjYnIGZpbGw9JyN7JGZvcm0tZmVlZGJhY2staWNvbi1pbnZhbGlkLWNvbG9yfScgc3Ryb2tlPSdub25lJy8+PC9zdmc+XCIpICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBmb3JtLWZlZWRiYWNrLXZhcmlhYmxlc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgZm9ybS12YWxpZGF0aW9uLXN0YXRlc1xuLy8gJGZvcm0tdmFsaWRhdGlvbi1zdGF0ZXM6IChcbi8vICAgXCJ2YWxpZFwiOiAoXG4vLyAgICAgXCJjb2xvclwiOiAkZm9ybS1mZWVkYmFjay12YWxpZC1jb2xvcixcbi8vICAgICBcImljb25cIjogJGZvcm0tZmVlZGJhY2staWNvbi12YWxpZFxuLy8gICApLFxuLy8gICBcImludmFsaWRcIjogKFxuLy8gICAgIFwiY29sb3JcIjogJGZvcm0tZmVlZGJhY2staW52YWxpZC1jb2xvcixcbi8vICAgICBcImljb25cIjogJGZvcm0tZmVlZGJhY2staWNvbi1pbnZhbGlkXG4vLyAgIClcbi8vICkgIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIGZvcm0tdmFsaWRhdGlvbi1zdGF0ZXNcblxuLy8gLy8gWi1pbmRleCBtYXN0ZXIgbGlzdFxuLy8gLy9cbi8vIC8vIFdhcm5pbmc6IEF2b2lkIGN1c3RvbWl6aW5nIHRoZXNlIHZhbHVlcy4gVGhleSdyZSB1c2VkIGZvciBhIGJpcmQncyBleWUgdmlld1xuLy8gLy8gb2YgY29tcG9uZW50cyBkZXBlbmRlbnQgb24gdGhlIHotYXhpcyBhbmQgYXJlIGRlc2lnbmVkIHRvIGFsbCB3b3JrIHRvZ2V0aGVyLlxuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgemluZGV4LXN0YWNrXG4vLyAkemluZGV4LWRyb3Bkb3duOiAgICAgICAgICAgICAgICAgICAxMDAwICFkZWZhdWx0O1xuLy8gJHppbmRleC1zdGlja3k6ICAgICAgICAgICAgICAgICAgICAgMTAyMCAhZGVmYXVsdDtcbi8vICR6aW5kZXgtZml4ZWQ6ICAgICAgICAgICAgICAgICAgICAgIDEwMzAgIWRlZmF1bHQ7XG4vLyAkemluZGV4LW9mZmNhbnZhcy1iYWNrZHJvcDogICAgICAgICAxMDQwICFkZWZhdWx0O1xuLy8gJHppbmRleC1vZmZjYW52YXM6ICAgICAgICAgICAgICAgICAgMTA0NSAhZGVmYXVsdDtcbi8vICR6aW5kZXgtbW9kYWwtYmFja2Ryb3A6ICAgICAgICAgICAgIDEwNTAgIWRlZmF1bHQ7XG4vLyAkemluZGV4LW1vZGFsOiAgICAgICAgICAgICAgICAgICAgICAxMDU1ICFkZWZhdWx0O1xuLy8gJHppbmRleC1wb3BvdmVyOiAgICAgICAgICAgICAgICAgICAgMTA3MCAhZGVmYXVsdDtcbi8vICR6aW5kZXgtdG9vbHRpcDogICAgICAgICAgICAgICAgICAgIDEwODAgIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIHppbmRleC1zdGFja1xuXG5cbi8vIC8vIE5hdnNcblxuLy8gLy8gc2Nzcy1kb2NzLXN0YXJ0IG5hdi12YXJpYWJsZXNcbiRuYXYtbGluay1wYWRkaW5nLXk6ICAgICAgICAgICAgICAgIC4zNzVyZW0gIWRlZmF1bHQ7XG4vLyAkbmF2LWxpbmstcGFkZGluZy14OiAgICAgICAgICAgICAgICAxcmVtICFkZWZhdWx0O1xuJG5hdi1saW5rLWZvbnQtc2l6ZTogICAgICAgICAgICAgICAgLjg3NXJlbSAhZGVmYXVsdDtcbi8vICRuYXYtbGluay1mb250LXdlaWdodDogICAgICAgICAgICAgIG51bGwgIWRlZmF1bHQ7XG4vLyAkbmF2LWxpbmstY29sb3I6ICAgICAgICAgICAgICAgICAgICAkbGluay1jb2xvciAhZGVmYXVsdDtcbi8vICRuYXYtbGluay1ob3Zlci1jb2xvcjogICAgICAgICAgICAgICRsaW5rLWhvdmVyLWNvbG9yICFkZWZhdWx0O1xuLy8gJG5hdi1saW5rLXRyYW5zaXRpb246ICAgICAgICAgICAgICAgY29sb3IgLjE1cyBlYXNlLWluLW91dCwgYmFja2dyb3VuZC1jb2xvciAuMTVzIGVhc2UtaW4tb3V0LCBib3JkZXItY29sb3IgLjE1cyBlYXNlLWluLW91dCAhZGVmYXVsdDtcbi8vICRuYXYtbGluay1kaXNhYmxlZC1jb2xvcjogICAgICAgICAgICRncmF5LTYwMCAhZGVmYXVsdDtcblxuLy8gJG5hdi10YWJzLWJvcmRlci1jb2xvcjogICAgICAgICAgICAgJGdyYXktMzAwICFkZWZhdWx0O1xuLy8gJG5hdi10YWJzLWJvcmRlci13aWR0aDogICAgICAgICAgICAgJGJvcmRlci13aWR0aCAhZGVmYXVsdDtcbi8vICRuYXYtdGFicy1ib3JkZXItcmFkaXVzOiAgICAgICAgICAgICRib3JkZXItcmFkaXVzICFkZWZhdWx0O1xuLy8gJG5hdi10YWJzLWxpbmstaG92ZXItYm9yZGVyLWNvbG9yOiAgJGdyYXktMjAwICRncmF5LTIwMCAkbmF2LXRhYnMtYm9yZGVyLWNvbG9yICFkZWZhdWx0O1xuLy8gJG5hdi10YWJzLWxpbmstYWN0aXZlLWNvbG9yOiAgICAgICAgJHdoaXRlICFkZWZhdWx0O1xuLy8gJG5hdi10YWJzLWxpbmstYWN0aXZlLWJnOiAgICAgICAgICAgJGJvZHktYmcgIWRlZmF1bHQ7XG4vLyAkbmF2LXRhYnMtbGluay1hY3RpdmUtYm9yZGVyLWNvbG9yOiAkZ3JheS0zMDAgJGdyYXktMzAwICRuYXYtdGFicy1saW5rLWFjdGl2ZS1iZyAhZGVmYXVsdDtcblxuLy8gJG5hdi1waWxscy1ib3JkZXItcmFkaXVzOiAgICAgICAgICAgJGJvcmRlci1yYWRpdXMgIWRlZmF1bHQ7XG4vLyAkbmF2LXBpbGxzLWxpbmstYWN0aXZlLWNvbG9yOiAgICAgICAkY29tcG9uZW50LWFjdGl2ZS1jb2xvciAhZGVmYXVsdDtcbi8vICRuYXYtcGlsbHMtbGluay1hY3RpdmUtYmc6ICAgICAgICAgICRjb21wb25lbnQtYWN0aXZlLWJnICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBuYXYtdmFyaWFibGVzXG5cblxuLy8gLy8gTmF2YmFyXG5cbi8vIC8vIHNjc3MtZG9jcy1zdGFydCBuYXZiYXItdmFyaWFibGVzXG4kbmF2YmFyLXBhZGRpbmcteTogICAgICAgICAgICAgICAgICAuNXJlbSAhZGVmYXVsdDtcbi8vICRuYXZiYXItcGFkZGluZy14OiAgICAgICAgICAgICAgICAgIG51bGwgIWRlZmF1bHQ7XG5cbiRuYXZiYXItbmF2LWxpbmstcGFkZGluZy14OiAgICAgICAgIDFyZW0gIWRlZmF1bHQ7XG5cbi8vICRuYXZiYXItYnJhbmQtZm9udC1zaXplOiAgICAgICAgICAgICRmb250LXNpemUtbGcgIWRlZmF1bHQ7XG4vLyAvLyBDb21wdXRlIHRoZSBuYXZiYXItYnJhbmQgcGFkZGluZy15IHNvIHRoZSBuYXZiYXItYnJhbmQgd2lsbCBoYXZlIHRoZSBzYW1lIGhlaWdodCBhcyBuYXZiYXItdGV4dCBhbmQgbmF2LWxpbmtcbi8vICRuYXYtbGluay1oZWlnaHQ6ICAgICAgICAgICAgICAgICAgICRmb250LXNpemUtYmFzZSAqICRsaW5lLWhlaWdodC1iYXNlICsgJG5hdi1saW5rLXBhZGRpbmcteSAqIDIgIWRlZmF1bHQ7XG4vLyAkbmF2YmFyLWJyYW5kLWhlaWdodDogICAgICAgICAgICAgICAkbmF2YmFyLWJyYW5kLWZvbnQtc2l6ZSAqICRsaW5lLWhlaWdodC1iYXNlICFkZWZhdWx0O1xuLy8gJG5hdmJhci1icmFuZC1wYWRkaW5nLXk6ICAgICAgICAgICAgKCRuYXYtbGluay1oZWlnaHQgLSAkbmF2YmFyLWJyYW5kLWhlaWdodCkgKiAuNSAhZGVmYXVsdDtcbi8vICRuYXZiYXItYnJhbmQtbWFyZ2luLWVuZDogICAgICAgICAgIDFyZW0gIWRlZmF1bHQ7XG5cbi8vICRuYXZiYXItdG9nZ2xlci1wYWRkaW5nLXk6ICAgICAgICAgIC4yNXJlbSAhZGVmYXVsdDtcbi8vICRuYXZiYXItdG9nZ2xlci1wYWRkaW5nLXg6ICAgICAgICAgIC43NXJlbSAhZGVmYXVsdDtcbi8vICRuYXZiYXItdG9nZ2xlci1mb250LXNpemU6ICAgICAgICAgICRmb250LXNpemUtbGcgIWRlZmF1bHQ7XG4vLyAkbmF2YmFyLXRvZ2dsZXItYm9yZGVyLXJhZGl1czogICAgICAkYnRuLWJvcmRlci1yYWRpdXMgIWRlZmF1bHQ7XG4vLyAkbmF2YmFyLXRvZ2dsZXItZm9jdXMtd2lkdGg6ICAgICAgICAkYnRuLWZvY3VzLXdpZHRoICFkZWZhdWx0O1xuLy8gJG5hdmJhci10b2dnbGVyLXRyYW5zaXRpb246ICAgICAgICAgYm94LXNoYWRvdyAuMTVzIGVhc2UtaW4tb3V0ICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBuYXZiYXItdmFyaWFibGVzXG5cbi8vIC8vIHNjc3MtZG9jcy1zdGFydCBuYXZiYXItdGhlbWUtdmFyaWFibGVzXG4kbmF2YmFyLWRhcmstY29sb3I6ICAgICAgICAgICAgICAgICAkZ3JheS01MDAgIWRlZmF1bHQ7XG4kbmF2YmFyLWRhcmstaG92ZXItY29sb3I6ICAgICAgICAgICAkd2hpdGUgIWRlZmF1bHQ7XG4vLyAkbmF2YmFyLWRhcmstYWN0aXZlLWNvbG9yOiAgICAgICAgICAkd2hpdGUgIWRlZmF1bHQ7XG4vLyAkbmF2YmFyLWRhcmstZGlzYWJsZWQtY29sb3I6ICAgICAgICByZ2JhKCR3aGl0ZSwgLjI1KSAhZGVmYXVsdDtcbi8vICRuYXZiYXItZGFyay10b2dnbGVyLWljb24tYmc6ICAgICAgIHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCw8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDMwIDMwJz48cGF0aCBzdHJva2U9JyN7JG5hdmJhci1kYXJrLWNvbG9yfScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbWl0ZXJsaW1pdD0nMTAnIHN0cm9rZS13aWR0aD0nMicgZD0nTTQgN2gyMk00IDE1aDIyTTQgMjNoMjInLz48L3N2Zz5cIikgIWRlZmF1bHQ7XG4vLyAkbmF2YmFyLWRhcmstdG9nZ2xlci1ib3JkZXItY29sb3I6ICByZ2JhKCR3aGl0ZSwgLjEpICFkZWZhdWx0O1xuXG4vLyAkbmF2YmFyLWxpZ2h0LWNvbG9yOiAgICAgICAgICAgICAgICByZ2JhKCRibGFjaywgLjU1KSAhZGVmYXVsdDtcbi8vICRuYXZiYXItbGlnaHQtaG92ZXItY29sb3I6ICAgICAgICAgIHJnYmEoJGJsYWNrLCAuNykgIWRlZmF1bHQ7XG4vLyAkbmF2YmFyLWxpZ2h0LWFjdGl2ZS1jb2xvcjogICAgICAgICByZ2JhKCRibGFjaywgLjkpICFkZWZhdWx0O1xuLy8gJG5hdmJhci1saWdodC1kaXNhYmxlZC1jb2xvcjogICAgICAgcmdiYSgkYmxhY2ssIC4zKSAhZGVmYXVsdDtcbi8vICRuYXZiYXItbGlnaHQtdG9nZ2xlci1pY29uLWJnOiAgICAgIHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCw8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDMwIDMwJz48cGF0aCBzdHJva2U9JyN7JG5hdmJhci1saWdodC1jb2xvcn0nIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLW1pdGVybGltaXQ9JzEwJyBzdHJva2Utd2lkdGg9JzInIGQ9J000IDdoMjJNNCAxNWgyMk00IDIzaDIyJy8+PC9zdmc+XCIpICFkZWZhdWx0O1xuLy8gJG5hdmJhci1saWdodC10b2dnbGVyLWJvcmRlci1jb2xvcjogcmdiYSgkYmxhY2ssIC4xKSAhZGVmYXVsdDtcblxuLy8gJG5hdmJhci1saWdodC1icmFuZC1jb2xvcjogICAgICAgICAgICAgICAgJG5hdmJhci1saWdodC1hY3RpdmUtY29sb3IgIWRlZmF1bHQ7XG4vLyAkbmF2YmFyLWxpZ2h0LWJyYW5kLWhvdmVyLWNvbG9yOiAgICAgICAgICAkbmF2YmFyLWxpZ2h0LWFjdGl2ZS1jb2xvciAhZGVmYXVsdDtcbi8vICRuYXZiYXItZGFyay1icmFuZC1jb2xvcjogICAgICAgICAgICAgICAgICRuYXZiYXItZGFyay1hY3RpdmUtY29sb3IgIWRlZmF1bHQ7XG4vLyAkbmF2YmFyLWRhcmstYnJhbmQtaG92ZXItY29sb3I6ICAgICAgICAgICAkbmF2YmFyLWRhcmstYWN0aXZlLWNvbG9yICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBuYXZiYXItdGhlbWUtdmFyaWFibGVzXG5cblxuLy8gLy8gRHJvcGRvd25zXG4vLyAvL1xuLy8gLy8gRHJvcGRvd24gbWVudSBjb250YWluZXIgYW5kIGNvbnRlbnRzLlxuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgZHJvcGRvd24tdmFyaWFibGVzXG4vLyAkZHJvcGRvd24tbWluLXdpZHRoOiAgICAgICAgICAgICAgICAxMHJlbSAhZGVmYXVsdDtcbi8vICRkcm9wZG93bi1wYWRkaW5nLXg6ICAgICAgICAgICAgICAgIDAgIWRlZmF1bHQ7XG4kZHJvcGRvd24tcGFkZGluZy15OiAgICAgICAgICAgICAgICAwICFkZWZhdWx0O1xuLy8gJGRyb3Bkb3duLXNwYWNlcjogICAgICAgICAgICAgICAgICAgLjEyNXJlbSAhZGVmYXVsdDtcbiRkcm9wZG93bi1mb250LXNpemU6ICAgICAgICAgICAgICAgIC44NzVyZW0gIWRlZmF1bHQ7XG4vLyAkZHJvcGRvd24tY29sb3I6ICAgICAgICAgICAgICAgICAgICAkYm9keS1jb2xvciAhZGVmYXVsdDtcbi8vICRkcm9wZG93bi1iZzogICAgICAgICAgICAgICAgICAgICAgICR3aGl0ZSAhZGVmYXVsdDtcbi8vICRkcm9wZG93bi1ib3JkZXItY29sb3I6ICAgICAgICAgICAgIHJnYmEoJGJsYWNrLCAuMTUpICFkZWZhdWx0O1xuLy8gJGRyb3Bkb3duLWJvcmRlci1yYWRpdXM6ICAgICAgICAgICAgJGJvcmRlci1yYWRpdXMgIWRlZmF1bHQ7XG4kZHJvcGRvd24tYm9yZGVyLXdpZHRoOiAgICAgICAgICAgICAwICFkZWZhdWx0O1xuLy8gJGRyb3Bkb3duLWlubmVyLWJvcmRlci1yYWRpdXM6ICAgICAgc3VidHJhY3QoJGRyb3Bkb3duLWJvcmRlci1yYWRpdXMsICRkcm9wZG93bi1ib3JkZXItd2lkdGgpICFkZWZhdWx0O1xuLy8gJGRyb3Bkb3duLWRpdmlkZXItYmc6ICAgICAgICAgICAgICAgJGRyb3Bkb3duLWJvcmRlci1jb2xvciAhZGVmYXVsdDtcbi8vICRkcm9wZG93bi1kaXZpZGVyLW1hcmdpbi15OiAgICAgICAgICRzcGFjZXIgKiAuNSAhZGVmYXVsdDtcbiRkcm9wZG93bi1ib3gtc2hhZG93OiAgICAgICAgICAgICAgIDBweCA0cHggMTZweCByZ2IoMCAwIDAgLyAyNSUpICFkZWZhdWx0O1xuXG4vLyAkZHJvcGRvd24tbGluay1jb2xvcjogICAgICAgICAgICAgICAkZ3JheS05MDAgIWRlZmF1bHQ7XG4vLyAkZHJvcGRvd24tbGluay1ob3Zlci1jb2xvcjogICAgICAgICBzaGFkZS1jb2xvcigkZ3JheS05MDAsIDEwJSkgIWRlZmF1bHQ7XG4vLyAkZHJvcGRvd24tbGluay1ob3Zlci1iZzogICAgICAgICAgICAkZ3JheS0yMDAgIWRlZmF1bHQ7XG5cbi8vICRkcm9wZG93bi1saW5rLWFjdGl2ZS1jb2xvcjogICAgICAgICRjb21wb25lbnQtYWN0aXZlLWNvbG9yICFkZWZhdWx0O1xuLy8gJGRyb3Bkb3duLWxpbmstYWN0aXZlLWJnOiAgICAgICAgICAgJGNvbXBvbmVudC1hY3RpdmUtYmcgIWRlZmF1bHQ7XG5cbi8vICRkcm9wZG93bi1saW5rLWRpc2FibGVkLWNvbG9yOiAgICAgICRncmF5LTUwMCAhZGVmYXVsdDtcblxuJGRyb3Bkb3duLWl0ZW0tcGFkZGluZy15OiAgICAgICAgICAgLjc1cmVtICFkZWZhdWx0O1xuLy8gJGRyb3Bkb3duLWl0ZW0tcGFkZGluZy14OiAgICAgICAgICAgJHNwYWNlciAhZGVmYXVsdDtcblxuLy8gJGRyb3Bkb3duLWhlYWRlci1jb2xvcjogICAgICAgICAgICAgJGdyYXktNjAwICFkZWZhdWx0O1xuLy8gJGRyb3Bkb3duLWhlYWRlci1wYWRkaW5nOiAgICAgICAgICAgJGRyb3Bkb3duLXBhZGRpbmcteSAkZHJvcGRvd24taXRlbS1wYWRkaW5nLXggIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIGRyb3Bkb3duLXZhcmlhYmxlc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgZHJvcGRvd24tZGFyay12YXJpYWJsZXNcbi8vICRkcm9wZG93bi1kYXJrLWNvbG9yOiAgICAgICAgICAgICAgICRncmF5LTMwMCAhZGVmYXVsdDtcbiRkcm9wZG93bi1kYXJrLWJnOiAgICAgICAgICAgICAgICAgICMxNTMzNEUgIWRlZmF1bHQ7XG4vLyAkZHJvcGRvd24tZGFyay1ib3JkZXItY29sb3I6ICAgICAgICAkZHJvcGRvd24tYm9yZGVyLWNvbG9yICFkZWZhdWx0O1xuLy8gJGRyb3Bkb3duLWRhcmstZGl2aWRlci1iZzogICAgICAgICAgJGRyb3Bkb3duLWRpdmlkZXItYmcgIWRlZmF1bHQ7XG4vLyAkZHJvcGRvd24tZGFyay1ib3gtc2hhZG93OiAgICAgICAgICBudWxsICFkZWZhdWx0O1xuLy8gJGRyb3Bkb3duLWRhcmstbGluay1jb2xvcjogICAgICAgICAgJGRyb3Bkb3duLWRhcmstY29sb3IgIWRlZmF1bHQ7XG4kZHJvcGRvd24tZGFyay1saW5rLWhvdmVyLWNvbG9yOiAgICAkd2hpdGUgIWRlZmF1bHQ7XG4kZHJvcGRvd24tZGFyay1saW5rLWhvdmVyLWJnOiAgICAgICAjMDY0QzgxICFkZWZhdWx0O1xuJGRyb3Bkb3duLWRhcmstbGluay1hY3RpdmUtY29sb3I6ICAgJHdoaXRlICFkZWZhdWx0O1xuJGRyb3Bkb3duLWRhcmstbGluay1hY3RpdmUtYmc6ICAgICAgIzA2NEM4MSAhZGVmYXVsdDtcbi8vICRkcm9wZG93bi1kYXJrLWxpbmstZGlzYWJsZWQtY29sb3I6ICRncmF5LTUwMCAhZGVmYXVsdDtcbi8vICRkcm9wZG93bi1kYXJrLWhlYWRlci1jb2xvcjogICAgICAgICRncmF5LTUwMCAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgZHJvcGRvd24tZGFyay12YXJpYWJsZXNcblxuXG4vLyAvLyBQYWdpbmF0aW9uXG5cbi8vIC8vIHNjc3MtZG9jcy1zdGFydCBwYWdpbmF0aW9uLXZhcmlhYmxlc1xuLy8gJHBhZ2luYXRpb24tcGFkZGluZy15OiAgICAgICAgICAgICAgLjM3NXJlbSAhZGVmYXVsdDtcbi8vICRwYWdpbmF0aW9uLXBhZGRpbmcteDogICAgICAgICAgICAgIC43NXJlbSAhZGVmYXVsdDtcbi8vICRwYWdpbmF0aW9uLXBhZGRpbmcteS1zbTogICAgICAgICAgIC4yNXJlbSAhZGVmYXVsdDtcbi8vICRwYWdpbmF0aW9uLXBhZGRpbmcteC1zbTogICAgICAgICAgIC41cmVtICFkZWZhdWx0O1xuLy8gJHBhZ2luYXRpb24tcGFkZGluZy15LWxnOiAgICAgICAgICAgLjc1cmVtICFkZWZhdWx0O1xuLy8gJHBhZ2luYXRpb24tcGFkZGluZy14LWxnOiAgICAgICAgICAgMS41cmVtICFkZWZhdWx0O1xuXG4vLyAkcGFnaW5hdGlvbi1jb2xvcjogICAgICAgICAgICAgICAgICAkbGluay1jb2xvciAhZGVmYXVsdDtcbi8vICRwYWdpbmF0aW9uLWJnOiAgICAgICAgICAgICAgICAgICAgICR3aGl0ZSAhZGVmYXVsdDtcbi8vICRwYWdpbmF0aW9uLWJvcmRlci13aWR0aDogICAgICAgICAgICRib3JkZXItd2lkdGggIWRlZmF1bHQ7XG4vLyAkcGFnaW5hdGlvbi1ib3JkZXItcmFkaXVzOiAgICAgICAgICAkYm9yZGVyLXJhZGl1cyAhZGVmYXVsdDtcbi8vICRwYWdpbmF0aW9uLW1hcmdpbi1zdGFydDogICAgICAgICAgIC0kcGFnaW5hdGlvbi1ib3JkZXItd2lkdGggIWRlZmF1bHQ7XG4vLyAkcGFnaW5hdGlvbi1ib3JkZXItY29sb3I6ICAgICAgICAgICAkZ3JheS0zMDAgIWRlZmF1bHQ7XG5cbi8vICRwYWdpbmF0aW9uLWZvY3VzLWNvbG9yOiAgICAgICAgICAgICRsaW5rLWhvdmVyLWNvbG9yICFkZWZhdWx0O1xuLy8gJHBhZ2luYXRpb24tZm9jdXMtYmc6ICAgICAgICAgICAgICAgJGdyYXktMjAwICFkZWZhdWx0O1xuLy8gJHBhZ2luYXRpb24tZm9jdXMtYm94LXNoYWRvdzogICAgICAgJGlucHV0LWJ0bi1mb2N1cy1ib3gtc2hhZG93ICFkZWZhdWx0O1xuLy8gJHBhZ2luYXRpb24tZm9jdXMtb3V0bGluZTogICAgICAgICAgMCAhZGVmYXVsdDtcblxuLy8gJHBhZ2luYXRpb24taG92ZXItY29sb3I6ICAgICAgICAgICAgJGxpbmstaG92ZXItY29sb3IgIWRlZmF1bHQ7XG4vLyAkcGFnaW5hdGlvbi1ob3Zlci1iZzogICAgICAgICAgICAgICAkZ3JheS0yMDAgIWRlZmF1bHQ7XG4vLyAkcGFnaW5hdGlvbi1ob3Zlci1ib3JkZXItY29sb3I6ICAgICAkZ3JheS0zMDAgIWRlZmF1bHQ7XG5cbi8vICRwYWdpbmF0aW9uLWFjdGl2ZS1jb2xvcjogICAgICAgICAgICRjb21wb25lbnQtYWN0aXZlLWNvbG9yICFkZWZhdWx0O1xuLy8gJHBhZ2luYXRpb24tYWN0aXZlLWJnOiAgICAgICAgICAgICAgJGNvbXBvbmVudC1hY3RpdmUtYmcgIWRlZmF1bHQ7XG4vLyAkcGFnaW5hdGlvbi1hY3RpdmUtYm9yZGVyLWNvbG9yOiAgICAkcGFnaW5hdGlvbi1hY3RpdmUtYmcgIWRlZmF1bHQ7XG5cbi8vICRwYWdpbmF0aW9uLWRpc2FibGVkLWNvbG9yOiAgICAgICAgICRncmF5LTYwMCAhZGVmYXVsdDtcbi8vICRwYWdpbmF0aW9uLWRpc2FibGVkLWJnOiAgICAgICAgICAgICR3aGl0ZSAhZGVmYXVsdDtcbi8vICRwYWdpbmF0aW9uLWRpc2FibGVkLWJvcmRlci1jb2xvcjogICRncmF5LTMwMCAhZGVmYXVsdDtcblxuLy8gJHBhZ2luYXRpb24tdHJhbnNpdGlvbjogICAgICAgICAgICAgIGNvbG9yIC4xNXMgZWFzZS1pbi1vdXQsIGJhY2tncm91bmQtY29sb3IgLjE1cyBlYXNlLWluLW91dCwgYm9yZGVyLWNvbG9yIC4xNXMgZWFzZS1pbi1vdXQsIGJveC1zaGFkb3cgLjE1cyBlYXNlLWluLW91dCAhZGVmYXVsdDtcblxuLy8gJHBhZ2luYXRpb24tYm9yZGVyLXJhZGl1cy1zbTogICAgICAgJGJvcmRlci1yYWRpdXMtc20gIWRlZmF1bHQ7XG4vLyAkcGFnaW5hdGlvbi1ib3JkZXItcmFkaXVzLWxnOiAgICAgICAkYm9yZGVyLXJhZGl1cy1sZyAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgcGFnaW5hdGlvbi12YXJpYWJsZXNcblxuXG4vLyAvLyBDYXJkc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgY2FyZC12YXJpYWJsZXNcbi8vICRjYXJkLXNwYWNlci15OiAgICAgICAgICAgICAgICAgICAgICRzcGFjZXIgIWRlZmF1bHQ7XG4vLyAkY2FyZC1zcGFjZXIteDogICAgICAgICAgICAgICAgICAgICAkc3BhY2VyICFkZWZhdWx0O1xuLy8gJGNhcmQtdGl0bGUtc3BhY2VyLXk6ICAgICAgICAgICAgICAgJHNwYWNlciAqIC41ICFkZWZhdWx0O1xuLy8gJGNhcmQtYm9yZGVyLXdpZHRoOiAgICAgICAgICAgICAgICAgJGJvcmRlci13aWR0aCAhZGVmYXVsdDtcbiRjYXJkLWJvcmRlci1yYWRpdXM6ICAgICAgICAgICAgICAgIDRweCAhZGVmYXVsdDtcbi8vICRjYXJkLWJvcmRlci1jb2xvcjogICAgICAgICAgICAgICAgIHJnYmEoJGJsYWNrLCAuMTI1KSAhZGVmYXVsdDtcbi8vICRjYXJkLWlubmVyLWJvcmRlci1yYWRpdXM6ICAgICAgICAgIHN1YnRyYWN0KCRjYXJkLWJvcmRlci1yYWRpdXMsICRjYXJkLWJvcmRlci13aWR0aCkgIWRlZmF1bHQ7XG4vLyAkY2FyZC1jYXAtcGFkZGluZy15OiAgICAgICAgICAgICAgICAkY2FyZC1zcGFjZXIteSAqIC41ICFkZWZhdWx0O1xuLy8gJGNhcmQtY2FwLXBhZGRpbmcteDogICAgICAgICAgICAgICAgJGNhcmQtc3BhY2VyLXggIWRlZmF1bHQ7XG4vLyAkY2FyZC1jYXAtYmc6ICAgICAgICAgICAgICAgICAgICAgICByZ2JhKCRibGFjaywgLjAzKSAhZGVmYXVsdDtcbi8vICRjYXJkLWNhcC1jb2xvcjogICAgICAgICAgICAgICAgICAgIG51bGwgIWRlZmF1bHQ7XG4vLyAkY2FyZC1oZWlnaHQ6ICAgICAgICAgICAgICAgICAgICAgICBudWxsICFkZWZhdWx0O1xuLy8gJGNhcmQtY29sb3I6ICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCAhZGVmYXVsdDtcbi8vICRjYXJkLWJnOiAgICAgICAgICAgICAgICAgICAgICAgICAgICR3aGl0ZSAhZGVmYXVsdDtcbi8vICRjYXJkLWltZy1vdmVybGF5LXBhZGRpbmc6ICAgICAgICAgICRzcGFjZXIgIWRlZmF1bHQ7XG4vLyAkY2FyZC1ncm91cC1tYXJnaW46ICAgICAgICAgICAgICAgICAkZ3JpZC1ndXR0ZXItd2lkdGggKiAuNSAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgY2FyZC12YXJpYWJsZXNcblxuLy8gLy8gQWNjb3JkaW9uXG5cbi8vIC8vIHNjc3MtZG9jcy1zdGFydCBhY2NvcmRpb24tdmFyaWFibGVzXG4vLyAkYWNjb3JkaW9uLXBhZGRpbmcteTogICAgICAgICAgICAgICAgICAgICAxcmVtICFkZWZhdWx0O1xuLy8gJGFjY29yZGlvbi1wYWRkaW5nLXg6ICAgICAgICAgICAgICAgICAgICAgMS4yNXJlbSAhZGVmYXVsdDtcbi8vICRhY2NvcmRpb24tY29sb3I6ICAgICAgICAgICAgICAgICAgICAgICAgICRib2R5LWNvbG9yICFkZWZhdWx0O1xuLy8gJGFjY29yZGlvbi1iZzogICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJvZHktYmcgIWRlZmF1bHQ7XG4vLyAkYWNjb3JkaW9uLWJvcmRlci13aWR0aDogICAgICAgICAgICAgICAgICAkYm9yZGVyLXdpZHRoICFkZWZhdWx0O1xuLy8gJGFjY29yZGlvbi1ib3JkZXItY29sb3I6ICAgICAgICAgICAgICAgICAgcmdiYSgkYmxhY2ssIC4xMjUpICFkZWZhdWx0O1xuLy8gJGFjY29yZGlvbi1ib3JkZXItcmFkaXVzOiAgICAgICAgICAgICAgICAgJGJvcmRlci1yYWRpdXMgIWRlZmF1bHQ7XG4vLyAkYWNjb3JkaW9uLWlubmVyLWJvcmRlci1yYWRpdXM6ICAgICAgICAgICBzdWJ0cmFjdCgkYWNjb3JkaW9uLWJvcmRlci1yYWRpdXMsICRhY2NvcmRpb24tYm9yZGVyLXdpZHRoKSAhZGVmYXVsdDtcblxuLy8gJGFjY29yZGlvbi1ib2R5LXBhZGRpbmcteTogICAgICAgICAgICAgICAgJGFjY29yZGlvbi1wYWRkaW5nLXkgIWRlZmF1bHQ7XG4vLyAkYWNjb3JkaW9uLWJvZHktcGFkZGluZy14OiAgICAgICAgICAgICAgICAkYWNjb3JkaW9uLXBhZGRpbmcteCAhZGVmYXVsdDtcblxuLy8gJGFjY29yZGlvbi1idXR0b24tcGFkZGluZy15OiAgICAgICAgICAgICAgJGFjY29yZGlvbi1wYWRkaW5nLXkgIWRlZmF1bHQ7XG4vLyAkYWNjb3JkaW9uLWJ1dHRvbi1wYWRkaW5nLXg6ICAgICAgICAgICAgICAkYWNjb3JkaW9uLXBhZGRpbmcteCAhZGVmYXVsdDtcbi8vICRhY2NvcmRpb24tYnV0dG9uLWNvbG9yOiAgICAgICAgICAgICAgICAgICRhY2NvcmRpb24tY29sb3IgIWRlZmF1bHQ7XG4vLyAkYWNjb3JkaW9uLWJ1dHRvbi1iZzogICAgICAgICAgICAgICAgICAgICAkYWNjb3JkaW9uLWJnICFkZWZhdWx0O1xuLy8gJGFjY29yZGlvbi10cmFuc2l0aW9uOiAgICAgICAgICAgICAgICAgICAgJGJ0bi10cmFuc2l0aW9uLCBib3JkZXItcmFkaXVzIC4xNXMgZWFzZSAhZGVmYXVsdDtcbi8vICRhY2NvcmRpb24tYnV0dG9uLWFjdGl2ZS1iZzogICAgICAgICAgICAgIHRpbnQtY29sb3IoJGNvbXBvbmVudC1hY3RpdmUtYmcsIDkwJSkgIWRlZmF1bHQ7XG4vLyAkYWNjb3JkaW9uLWJ1dHRvbi1hY3RpdmUtY29sb3I6ICAgICAgICAgICBzaGFkZS1jb2xvcigkcHJpbWFyeSwgMTAlKSAhZGVmYXVsdDtcblxuLy8gJGFjY29yZGlvbi1idXR0b24tZm9jdXMtYm9yZGVyLWNvbG9yOiAgICAgJGlucHV0LWZvY3VzLWJvcmRlci1jb2xvciAhZGVmYXVsdDtcbi8vICRhY2NvcmRpb24tYnV0dG9uLWZvY3VzLWJveC1zaGFkb3c6ICAgICAgICRidG4tZm9jdXMtYm94LXNoYWRvdyAhZGVmYXVsdDtcblxuLy8gJGFjY29yZGlvbi1pY29uLXdpZHRoOiAgICAgICAgICAgICAgICAgICAgMS4yNXJlbSAhZGVmYXVsdDtcbi8vICRhY2NvcmRpb24taWNvbi1jb2xvcjogICAgICAgICAgICAgICAgICAgICRhY2NvcmRpb24tY29sb3IgIWRlZmF1bHQ7XG4vLyAkYWNjb3JkaW9uLWljb24tYWN0aXZlLWNvbG9yOiAgICAgICAgICAgICAkYWNjb3JkaW9uLWJ1dHRvbi1hY3RpdmUtY29sb3IgIWRlZmF1bHQ7XG4vLyAkYWNjb3JkaW9uLWljb24tdHJhbnNpdGlvbjogICAgICAgICAgICAgICB0cmFuc2Zvcm0gLjJzIGVhc2UtaW4tb3V0ICFkZWZhdWx0O1xuLy8gJGFjY29yZGlvbi1pY29uLXRyYW5zZm9ybTogICAgICAgICAgICAgICAgcm90YXRlKC0xODBkZWcpICFkZWZhdWx0O1xuXG4vLyAkYWNjb3JkaW9uLWJ1dHRvbi1pY29uOiAgICAgICAgIHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCw8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDE2IDE2JyBmaWxsPScjeyRhY2NvcmRpb24taWNvbi1jb2xvcn0nPjxwYXRoIGZpbGwtcnVsZT0nZXZlbm9kZCcgZD0nTTEuNjQ2IDQuNjQ2YS41LjUgMCAwIDEgLjcwOCAwTDggMTAuMjkzbDUuNjQ2LTUuNjQ3YS41LjUgMCAwIDEgLjcwOC43MDhsLTYgNmEuNS41IDAgMCAxLS43MDggMGwtNi02YS41LjUgMCAwIDEgMC0uNzA4eicvPjwvc3ZnPlwiKSAhZGVmYXVsdDtcbi8vICRhY2NvcmRpb24tYnV0dG9uLWFjdGl2ZS1pY29uOiAgdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sLDxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMTYgMTYnIGZpbGw9JyN7JGFjY29yZGlvbi1pY29uLWFjdGl2ZS1jb2xvcn0nPjxwYXRoIGZpbGwtcnVsZT0nZXZlbm9kZCcgZD0nTTEuNjQ2IDQuNjQ2YS41LjUgMCAwIDEgLjcwOCAwTDggMTAuMjkzbDUuNjQ2LTUuNjQ3YS41LjUgMCAwIDEgLjcwOC43MDhsLTYgNmEuNS41IDAgMCAxLS43MDggMGwtNi02YS41LjUgMCAwIDEgMC0uNzA4eicvPjwvc3ZnPlwiKSAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgYWNjb3JkaW9uLXZhcmlhYmxlc1xuXG4vLyAvLyBUb29sdGlwc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgdG9vbHRpcC12YXJpYWJsZXNcbi8vICR0b29sdGlwLWZvbnQtc2l6ZTogICAgICAgICAgICAgICAgICRmb250LXNpemUtc20gIWRlZmF1bHQ7XG4vLyAkdG9vbHRpcC1tYXgtd2lkdGg6ICAgICAgICAgICAgICAgICAyMDBweCAhZGVmYXVsdDtcbi8vICR0b29sdGlwLWNvbG9yOiAgICAgICAgICAgICAgICAgICAgICR3aGl0ZSAhZGVmYXVsdDtcbiR0b29sdGlwLWJnOiAgICAgICAgICAgICAgICAgICAgICAgICRkYXJrLXRoZW1lLWNhcmQtYmcgIWRlZmF1bHQ7XG4vLyAkdG9vbHRpcC1ib3JkZXItcmFkaXVzOiAgICAgICAgICAgICAkYm9yZGVyLXJhZGl1cyAhZGVmYXVsdDtcbiR0b29sdGlwLW9wYWNpdHk6ICAgICAgICAgICAgICAgICAgIDEgIWRlZmF1bHQ7XG4vLyAkdG9vbHRpcC1wYWRkaW5nLXk6ICAgICAgICAgICAgICAgICAkc3BhY2VyICogLjI1ICFkZWZhdWx0O1xuLy8gJHRvb2x0aXAtcGFkZGluZy14OiAgICAgICAgICAgICAgICAgJHNwYWNlciAqIC41ICFkZWZhdWx0O1xuLy8gJHRvb2x0aXAtbWFyZ2luOiAgICAgICAgICAgICAgICAgICAgMCAhZGVmYXVsdDtcblxuLy8gJHRvb2x0aXAtYXJyb3ctd2lkdGg6ICAgICAgICAgICAgICAgLjhyZW0gIWRlZmF1bHQ7XG4vLyAkdG9vbHRpcC1hcnJvdy1oZWlnaHQ6ICAgICAgICAgICAgICAuNHJlbSAhZGVmYXVsdDtcbi8vICR0b29sdGlwLWFycm93LWNvbG9yOiAgICAgICAgICAgICAgICR0b29sdGlwLWJnICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCB0b29sdGlwLXZhcmlhYmxlc1xuXG4vLyAvLyBGb3JtIHRvb2x0aXBzIG11c3QgY29tZSBhZnRlciByZWd1bGFyIHRvb2x0aXBzXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgdG9vbHRpcC1mZWVkYmFjay12YXJpYWJsZXNcbi8vICRmb3JtLWZlZWRiYWNrLXRvb2x0aXAtcGFkZGluZy15OiAgICAgJHRvb2x0aXAtcGFkZGluZy15ICFkZWZhdWx0O1xuLy8gJGZvcm0tZmVlZGJhY2stdG9vbHRpcC1wYWRkaW5nLXg6ICAgICAkdG9vbHRpcC1wYWRkaW5nLXggIWRlZmF1bHQ7XG4vLyAkZm9ybS1mZWVkYmFjay10b29sdGlwLWZvbnQtc2l6ZTogICAgICR0b29sdGlwLWZvbnQtc2l6ZSAhZGVmYXVsdDtcbi8vICRmb3JtLWZlZWRiYWNrLXRvb2x0aXAtbGluZS1oZWlnaHQ6ICAgbnVsbCAhZGVmYXVsdDtcbi8vICRmb3JtLWZlZWRiYWNrLXRvb2x0aXAtb3BhY2l0eTogICAgICAgJHRvb2x0aXAtb3BhY2l0eSAhZGVmYXVsdDtcbi8vICRmb3JtLWZlZWRiYWNrLXRvb2x0aXAtYm9yZGVyLXJhZGl1czogJHRvb2x0aXAtYm9yZGVyLXJhZGl1cyAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgdG9vbHRpcC1mZWVkYmFjay12YXJpYWJsZXNcblxuXG4vLyAvLyBQb3BvdmVyc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgcG9wb3Zlci12YXJpYWJsZXNcbi8vICRwb3BvdmVyLWZvbnQtc2l6ZTogICAgICAgICAgICAgICAgICRmb250LXNpemUtc20gIWRlZmF1bHQ7XG4vLyAkcG9wb3Zlci1iZzogICAgICAgICAgICAgICAgICAgICAgICAkd2hpdGUgIWRlZmF1bHQ7XG4vLyAkcG9wb3Zlci1tYXgtd2lkdGg6ICAgICAgICAgICAgICAgICAyNzZweCAhZGVmYXVsdDtcbi8vICRwb3BvdmVyLWJvcmRlci13aWR0aDogICAgICAgICAgICAgICRib3JkZXItd2lkdGggIWRlZmF1bHQ7XG4vLyAkcG9wb3Zlci1ib3JkZXItY29sb3I6ICAgICAgICAgICAgICByZ2JhKCRibGFjaywgLjIpICFkZWZhdWx0O1xuLy8gJHBvcG92ZXItYm9yZGVyLXJhZGl1czogICAgICAgICAgICAgJGJvcmRlci1yYWRpdXMtbGcgIWRlZmF1bHQ7XG4vLyAkcG9wb3Zlci1pbm5lci1ib3JkZXItcmFkaXVzOiAgICAgICBzdWJ0cmFjdCgkcG9wb3Zlci1ib3JkZXItcmFkaXVzLCAkcG9wb3Zlci1ib3JkZXItd2lkdGgpICFkZWZhdWx0O1xuLy8gJHBvcG92ZXItYm94LXNoYWRvdzogICAgICAgICAgICAgICAgJGJveC1zaGFkb3cgIWRlZmF1bHQ7XG5cbi8vICRwb3BvdmVyLWhlYWRlci1iZzogICAgICAgICAgICAgICAgIHNoYWRlLWNvbG9yKCRwb3BvdmVyLWJnLCA2JSkgIWRlZmF1bHQ7XG4vLyAkcG9wb3Zlci1oZWFkZXItY29sb3I6ICAgICAgICAgICAgICAkaGVhZGluZ3MtY29sb3IgIWRlZmF1bHQ7XG4vLyAkcG9wb3Zlci1oZWFkZXItcGFkZGluZy15OiAgICAgICAgICAuNXJlbSAhZGVmYXVsdDtcbi8vICRwb3BvdmVyLWhlYWRlci1wYWRkaW5nLXg6ICAgICAgICAgICRzcGFjZXIgIWRlZmF1bHQ7XG5cbi8vICRwb3BvdmVyLWJvZHktY29sb3I6ICAgICAgICAgICAgICAgICRib2R5LWNvbG9yICFkZWZhdWx0O1xuLy8gJHBvcG92ZXItYm9keS1wYWRkaW5nLXk6ICAgICAgICAgICAgJHNwYWNlciAhZGVmYXVsdDtcbi8vICRwb3BvdmVyLWJvZHktcGFkZGluZy14OiAgICAgICAgICAgICRzcGFjZXIgIWRlZmF1bHQ7XG5cbi8vICRwb3BvdmVyLWFycm93LXdpZHRoOiAgICAgICAgICAgICAgIDFyZW0gIWRlZmF1bHQ7XG4vLyAkcG9wb3Zlci1hcnJvdy1oZWlnaHQ6ICAgICAgICAgICAgICAuNXJlbSAhZGVmYXVsdDtcbi8vICRwb3BvdmVyLWFycm93LWNvbG9yOiAgICAgICAgICAgICAgICRwb3BvdmVyLWJnICFkZWZhdWx0O1xuXG4vLyAkcG9wb3Zlci1hcnJvdy1vdXRlci1jb2xvcjogICAgICAgICBmYWRlLWluKCRwb3BvdmVyLWJvcmRlci1jb2xvciwgLjA1KSAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgcG9wb3Zlci12YXJpYWJsZXNcblxuXG4vLyAvLyBUb2FzdHNcblxuLy8gLy8gc2Nzcy1kb2NzLXN0YXJ0IHRvYXN0LXZhcmlhYmxlc1xuLy8gJHRvYXN0LW1heC13aWR0aDogICAgICAgICAgICAgICAgICAgMzUwcHggIWRlZmF1bHQ7XG4vLyAkdG9hc3QtcGFkZGluZy14OiAgICAgICAgICAgICAgICAgICAuNzVyZW0gIWRlZmF1bHQ7XG4vLyAkdG9hc3QtcGFkZGluZy15OiAgICAgICAgICAgICAgICAgICAuNXJlbSAhZGVmYXVsdDtcbi8vICR0b2FzdC1mb250LXNpemU6ICAgICAgICAgICAgICAgICAgIC44NzVyZW0gIWRlZmF1bHQ7XG4vLyAkdG9hc3QtY29sb3I6ICAgICAgICAgICAgICAgICAgICAgICBudWxsICFkZWZhdWx0O1xuLy8gJHRvYXN0LWJhY2tncm91bmQtY29sb3I6ICAgICAgICAgICAgcmdiYSgkd2hpdGUsIC44NSkgIWRlZmF1bHQ7XG4vLyAkdG9hc3QtYm9yZGVyLXdpZHRoOiAgICAgICAgICAgICAgICAxcHggIWRlZmF1bHQ7XG4vLyAkdG9hc3QtYm9yZGVyLWNvbG9yOiAgICAgICAgICAgICAgICByZ2JhKDAsIDAsIDAsIC4xKSAhZGVmYXVsdDtcbi8vICR0b2FzdC1ib3JkZXItcmFkaXVzOiAgICAgICAgICAgICAgICRib3JkZXItcmFkaXVzICFkZWZhdWx0O1xuLy8gJHRvYXN0LWJveC1zaGFkb3c6ICAgICAgICAgICAgICAgICAgJGJveC1zaGFkb3cgIWRlZmF1bHQ7XG4vLyAkdG9hc3Qtc3BhY2luZzogICAgICAgICAgICAgICAgICAgICAkY29udGFpbmVyLXBhZGRpbmcteCAhZGVmYXVsdDtcblxuLy8gJHRvYXN0LWhlYWRlci1jb2xvcjogICAgICAgICAgICAgICAgJGdyYXktNjAwICFkZWZhdWx0O1xuLy8gJHRvYXN0LWhlYWRlci1iYWNrZ3JvdW5kLWNvbG9yOiAgICAgcmdiYSgkd2hpdGUsIC44NSkgIWRlZmF1bHQ7XG4vLyAkdG9hc3QtaGVhZGVyLWJvcmRlci1jb2xvcjogICAgICAgICByZ2JhKDAsIDAsIDAsIC4wNSkgIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIHRvYXN0LXZhcmlhYmxlc1xuXG5cbi8vIC8vIEJhZGdlc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgYmFkZ2UtdmFyaWFibGVzXG4vLyAkYmFkZ2UtZm9udC1zaXplOiAgICAgICAgICAgICAgICAgICAuNzVlbSAhZGVmYXVsdDtcbi8vICRiYWRnZS1mb250LXdlaWdodDogICAgICAgICAgICAgICAgICRmb250LXdlaWdodC1ib2xkICFkZWZhdWx0O1xuLy8gJGJhZGdlLWNvbG9yOiAgICAgICAgICAgICAgICAgICAgICAgJHdoaXRlICFkZWZhdWx0O1xuLy8gJGJhZGdlLXBhZGRpbmcteTogICAgICAgICAgICAgICAgICAgLjM1ZW0gIWRlZmF1bHQ7XG4vLyAkYmFkZ2UtcGFkZGluZy14OiAgICAgICAgICAgICAgICAgICAuNjVlbSAhZGVmYXVsdDtcbi8vICRiYWRnZS1ib3JkZXItcmFkaXVzOiAgICAgICAgICAgICAgICRib3JkZXItcmFkaXVzICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBiYWRnZS12YXJpYWJsZXNcblxuXG4vLyAvLyBNb2RhbHNcblxuLy8gLy8gc2Nzcy1kb2NzLXN0YXJ0IG1vZGFsLXZhcmlhYmxlc1xuLy8gJG1vZGFsLWlubmVyLXBhZGRpbmc6ICAgICAgICAgICAgICAgJHNwYWNlciAhZGVmYXVsdDtcblxuLy8gJG1vZGFsLWZvb3Rlci1tYXJnaW4tYmV0d2VlbjogICAgICAgLjVyZW0gIWRlZmF1bHQ7XG5cbi8vICRtb2RhbC1kaWFsb2ctbWFyZ2luOiAgICAgICAgICAgICAgIC41cmVtICFkZWZhdWx0O1xuLy8gJG1vZGFsLWRpYWxvZy1tYXJnaW4teS1zbS11cDogICAgICAgMS43NXJlbSAhZGVmYXVsdDtcblxuLy8gJG1vZGFsLXRpdGxlLWxpbmUtaGVpZ2h0OiAgICAgICAgICAgJGxpbmUtaGVpZ2h0LWJhc2UgIWRlZmF1bHQ7XG5cbi8vICRtb2RhbC1jb250ZW50LWNvbG9yOiAgICAgICAgICAgICAgIG51bGwgIWRlZmF1bHQ7XG4kbW9kYWwtY29udGVudC1iZzogICAgICAgICAgICAgICAgICByZ2JhKDIwLCA0MiwgNjMsIDAuOCkgIWRlZmF1bHQ7XG4kbW9kYWwtY29udGVudC1ib3JkZXItY29sb3I6ICAgICAgICByZ2JhKDUyLCAxNjksIDIxOSwgMC41MCkgIWRlZmF1bHQ7XG4kbW9kYWwtY29udGVudC1ib3JkZXItd2lkdGg6ICAgICAgICAuMjVyZW0gIWRlZmF1bHQ7XG4vLyAkbW9kYWwtY29udGVudC1ib3JkZXItcmFkaXVzOiAgICAgICAkYm9yZGVyLXJhZGl1cy1zbSAhZGVmYXVsdDtcbi8vICRtb2RhbC1jb250ZW50LWlubmVyLWJvcmRlci1yYWRpdXM6IHN1YnRyYWN0KCRtb2RhbC1jb250ZW50LWJvcmRlci1yYWRpdXMsICRtb2RhbC1jb250ZW50LWJvcmRlci13aWR0aCkgIWRlZmF1bHQ7XG4vLyAkbW9kYWwtY29udGVudC1ib3gtc2hhZG93LXhzOiAgICAgICAkYm94LXNoYWRvdy1zbSAhZGVmYXVsdDtcbi8vICRtb2RhbC1jb250ZW50LWJveC1zaGFkb3ctc20tdXA6ICAgICRib3gtc2hhZG93ICFkZWZhdWx0O1xuXG4vLyAkbW9kYWwtYmFja2Ryb3AtYmc6ICAgICAgICAgICAgICAgICAkYmxhY2sgIWRlZmF1bHQ7XG4vLyAkbW9kYWwtYmFja2Ryb3Atb3BhY2l0eTogICAgICAgICAgICAuNSAhZGVmYXVsdDtcbi8vICRtb2RhbC1oZWFkZXItYm9yZGVyLWNvbG9yOiAgICAgICAgICRib3JkZXItY29sb3IgIWRlZmF1bHQ7XG4vLyAkbW9kYWwtZm9vdGVyLWJvcmRlci1jb2xvcjogICAgICAgICAkbW9kYWwtaGVhZGVyLWJvcmRlci1jb2xvciAhZGVmYXVsdDtcbiRtb2RhbC1oZWFkZXItYm9yZGVyLXdpZHRoOiAgICAgICAgIDAgIWRlZmF1bHQ7XG4vLyAkbW9kYWwtZm9vdGVyLWJvcmRlci13aWR0aDogICAgICAgICAkbW9kYWwtaGVhZGVyLWJvcmRlci13aWR0aCAhZGVmYXVsdDtcbi8vICRtb2RhbC1oZWFkZXItcGFkZGluZy15OiAgICAgICAgICAgICRtb2RhbC1pbm5lci1wYWRkaW5nICFkZWZhdWx0O1xuLy8gJG1vZGFsLWhlYWRlci1wYWRkaW5nLXg6ICAgICAgICAgICAgJG1vZGFsLWlubmVyLXBhZGRpbmcgIWRlZmF1bHQ7XG4vLyAkbW9kYWwtaGVhZGVyLXBhZGRpbmc6ICAgICAgICAgICAgICAkbW9kYWwtaGVhZGVyLXBhZGRpbmcteSAkbW9kYWwtaGVhZGVyLXBhZGRpbmcteCAhZGVmYXVsdDsgLy8gS2VlcCB0aGlzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuXG4kbW9kYWwtc206ICAgICAgICAgICAgICAgICAgICAgICAgICAzNjBweCAhZGVmYXVsdDtcbiRtb2RhbC1tZDogICAgICAgICAgICAgICAgICAgICAgICAgIDY5MHB4ICFkZWZhdWx0O1xuLy8gJG1vZGFsLWxnOiAgICAgICAgICAgICAgICAgICAgICAgICAgODAwcHggIWRlZmF1bHQ7XG4vLyAkbW9kYWwteGw6ICAgICAgICAgICAgICAgICAgICAgICAgICAxMTQwcHggIWRlZmF1bHQ7XG5cbi8vICRtb2RhbC1mYWRlLXRyYW5zZm9ybTogICAgICAgICAgICAgIHRyYW5zbGF0ZSgwLCAtNTBweCkgIWRlZmF1bHQ7XG4vLyAkbW9kYWwtc2hvdy10cmFuc2Zvcm06ICAgICAgICAgICAgICBub25lICFkZWZhdWx0O1xuLy8gJG1vZGFsLXRyYW5zaXRpb246ICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtIC4zcyBlYXNlLW91dCAhZGVmYXVsdDtcbi8vICRtb2RhbC1zY2FsZS10cmFuc2Zvcm06ICAgICAgICAgICAgIHNjYWxlKDEuMDIpICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBtb2RhbC12YXJpYWJsZXNcblxuXG4vLyAvLyBBbGVydHNcbi8vIC8vXG4vLyAvLyBEZWZpbmUgYWxlcnQgY29sb3JzLCBib3JkZXIgcmFkaXVzLCBhbmQgcGFkZGluZy5cblxuLy8gLy8gc2Nzcy1kb2NzLXN0YXJ0IGFsZXJ0LXZhcmlhYmxlc1xuLy8gJGFsZXJ0LXBhZGRpbmcteTogICAgICAgICAgICAgICAkc3BhY2VyICFkZWZhdWx0O1xuLy8gJGFsZXJ0LXBhZGRpbmcteDogICAgICAgICAgICAgICAkc3BhY2VyICFkZWZhdWx0O1xuLy8gJGFsZXJ0LW1hcmdpbi1ib3R0b206ICAgICAgICAgICAxcmVtICFkZWZhdWx0O1xuLy8gJGFsZXJ0LWJvcmRlci1yYWRpdXM6ICAgICAgICAgICAkYm9yZGVyLXJhZGl1cyAhZGVmYXVsdDtcbi8vICRhbGVydC1saW5rLWZvbnQtd2VpZ2h0OiAgICAgICAgJGZvbnQtd2VpZ2h0LWJvbGQgIWRlZmF1bHQ7XG4vLyAkYWxlcnQtYm9yZGVyLXdpZHRoOiAgICAgICAgICAgICRib3JkZXItd2lkdGggIWRlZmF1bHQ7XG4vLyAkYWxlcnQtYmctc2NhbGU6ICAgICAgICAgICAgICAgIC04MCUgIWRlZmF1bHQ7XG4vLyAkYWxlcnQtYm9yZGVyLXNjYWxlOiAgICAgICAgICAgIC03MCUgIWRlZmF1bHQ7XG4vLyAkYWxlcnQtY29sb3Itc2NhbGU6ICAgICAgICAgICAgIDQwJSAhZGVmYXVsdDtcbi8vICRhbGVydC1kaXNtaXNzaWJsZS1wYWRkaW5nLXI6ICAgJGFsZXJ0LXBhZGRpbmcteCAqIDMgIWRlZmF1bHQ7IC8vIDN4IGNvdmVycyB3aWR0aCBvZiB4IHBsdXMgZGVmYXVsdCBwYWRkaW5nIG9uIGVpdGhlciBzaWRlXG4vLyAvLyBzY3NzLWRvY3MtZW5kIGFsZXJ0LXZhcmlhYmxlc1xuXG5cbi8vIC8vIFByb2dyZXNzIGJhcnNcblxuLy8gLy8gc2Nzcy1kb2NzLXN0YXJ0IHByb2dyZXNzLXZhcmlhYmxlc1xuLy8gJHByb2dyZXNzLWhlaWdodDogICAgICAgICAgICAgICAgICAgMXJlbSAhZGVmYXVsdDtcbi8vICRwcm9ncmVzcy1mb250LXNpemU6ICAgICAgICAgICAgICAgICRmb250LXNpemUtYmFzZSAqIC43NSAhZGVmYXVsdDtcbi8vICRwcm9ncmVzcy1iZzogICAgICAgICAgICAgICAgICAgICAgICRncmF5LTIwMCAhZGVmYXVsdDtcbi8vICRwcm9ncmVzcy1ib3JkZXItcmFkaXVzOiAgICAgICAgICAgICRib3JkZXItcmFkaXVzICFkZWZhdWx0O1xuLy8gJHByb2dyZXNzLWJveC1zaGFkb3c6ICAgICAgICAgICAgICAgJGJveC1zaGFkb3ctaW5zZXQgIWRlZmF1bHQ7XG4vLyAkcHJvZ3Jlc3MtYmFyLWNvbG9yOiAgICAgICAgICAgICAgICAkd2hpdGUgIWRlZmF1bHQ7XG4vLyAkcHJvZ3Jlc3MtYmFyLWJnOiAgICAgICAgICAgICAgICAgICAkcHJpbWFyeSAhZGVmYXVsdDtcbi8vICRwcm9ncmVzcy1iYXItYW5pbWF0aW9uLXRpbWluZzogICAgIDFzIGxpbmVhciBpbmZpbml0ZSAhZGVmYXVsdDtcbi8vICRwcm9ncmVzcy1iYXItdHJhbnNpdGlvbjogICAgICAgICAgIHdpZHRoIC42cyBlYXNlICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBwcm9ncmVzcy12YXJpYWJsZXNcblxuXG4vLyAvLyBMaXN0IGdyb3VwXG5cbi8vIC8vIHNjc3MtZG9jcy1zdGFydCBsaXN0LWdyb3VwLXZhcmlhYmxlc1xuLy8gJGxpc3QtZ3JvdXAtY29sb3I6ICAgICAgICAgICAgICAgICAgJGdyYXktOTAwICFkZWZhdWx0O1xuLy8gJGxpc3QtZ3JvdXAtYmc6ICAgICAgICAgICAgICAgICAgICAgJHdoaXRlICFkZWZhdWx0O1xuLy8gJGxpc3QtZ3JvdXAtYm9yZGVyLWNvbG9yOiAgICAgICAgICAgcmdiYSgkYmxhY2ssIC4xMjUpICFkZWZhdWx0O1xuLy8gJGxpc3QtZ3JvdXAtYm9yZGVyLXdpZHRoOiAgICAgICAgICAgJGJvcmRlci13aWR0aCAhZGVmYXVsdDtcbi8vICRsaXN0LWdyb3VwLWJvcmRlci1yYWRpdXM6ICAgICAgICAgICRib3JkZXItcmFkaXVzICFkZWZhdWx0O1xuXG4vLyAkbGlzdC1ncm91cC1pdGVtLXBhZGRpbmcteTogICAgICAgICAkc3BhY2VyICogLjUgIWRlZmF1bHQ7XG4vLyAkbGlzdC1ncm91cC1pdGVtLXBhZGRpbmcteDogICAgICAgICAkc3BhY2VyICFkZWZhdWx0O1xuLy8gJGxpc3QtZ3JvdXAtaXRlbS1iZy1zY2FsZTogICAgICAgICAgLTgwJSAhZGVmYXVsdDtcbi8vICRsaXN0LWdyb3VwLWl0ZW0tY29sb3Itc2NhbGU6ICAgICAgIDQwJSAhZGVmYXVsdDtcblxuLy8gJGxpc3QtZ3JvdXAtaG92ZXItYmc6ICAgICAgICAgICAgICAgJGdyYXktMTAwICFkZWZhdWx0O1xuLy8gJGxpc3QtZ3JvdXAtYWN0aXZlLWNvbG9yOiAgICAgICAgICAgJGNvbXBvbmVudC1hY3RpdmUtY29sb3IgIWRlZmF1bHQ7XG4vLyAkbGlzdC1ncm91cC1hY3RpdmUtYmc6ICAgICAgICAgICAgICAkY29tcG9uZW50LWFjdGl2ZS1iZyAhZGVmYXVsdDtcbi8vICRsaXN0LWdyb3VwLWFjdGl2ZS1ib3JkZXItY29sb3I6ICAgICRsaXN0LWdyb3VwLWFjdGl2ZS1iZyAhZGVmYXVsdDtcblxuLy8gJGxpc3QtZ3JvdXAtZGlzYWJsZWQtY29sb3I6ICAgICAgICAgJGdyYXktNjAwICFkZWZhdWx0O1xuLy8gJGxpc3QtZ3JvdXAtZGlzYWJsZWQtYmc6ICAgICAgICAgICAgJGxpc3QtZ3JvdXAtYmcgIWRlZmF1bHQ7XG5cbi8vICRsaXN0LWdyb3VwLWFjdGlvbi1jb2xvcjogICAgICAgICAgICRncmF5LTcwMCAhZGVmYXVsdDtcbi8vICRsaXN0LWdyb3VwLWFjdGlvbi1ob3Zlci1jb2xvcjogICAgICRsaXN0LWdyb3VwLWFjdGlvbi1jb2xvciAhZGVmYXVsdDtcblxuLy8gJGxpc3QtZ3JvdXAtYWN0aW9uLWFjdGl2ZS1jb2xvcjogICAgJGJvZHktY29sb3IgIWRlZmF1bHQ7XG4vLyAkbGlzdC1ncm91cC1hY3Rpb24tYWN0aXZlLWJnOiAgICAgICAkZ3JheS0yMDAgIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIGxpc3QtZ3JvdXAtdmFyaWFibGVzXG5cblxuLy8gLy8gSW1hZ2UgdGh1bWJuYWlsc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgdGh1bWJuYWlsLXZhcmlhYmxlc1xuLy8gJHRodW1ibmFpbC1wYWRkaW5nOiAgICAgICAgICAgICAgICAgLjI1cmVtICFkZWZhdWx0O1xuLy8gJHRodW1ibmFpbC1iZzogICAgICAgICAgICAgICAgICAgICAgJGJvZHktYmcgIWRlZmF1bHQ7XG4vLyAkdGh1bWJuYWlsLWJvcmRlci13aWR0aDogICAgICAgICAgICAkYm9yZGVyLXdpZHRoICFkZWZhdWx0O1xuLy8gJHRodW1ibmFpbC1ib3JkZXItY29sb3I6ICAgICAgICAgICAgJGdyYXktMzAwICFkZWZhdWx0O1xuLy8gJHRodW1ibmFpbC1ib3JkZXItcmFkaXVzOiAgICAgICAgICAgJGJvcmRlci1yYWRpdXMgIWRlZmF1bHQ7XG4vLyAkdGh1bWJuYWlsLWJveC1zaGFkb3c6ICAgICAgICAgICAgICAkYm94LXNoYWRvdy1zbSAhZGVmYXVsdDtcbi8vIC8vIHNjc3MtZG9jcy1lbmQgdGh1bWJuYWlsLXZhcmlhYmxlc1xuXG5cbi8vIC8vIEZpZ3VyZXNcblxuLy8gLy8gc2Nzcy1kb2NzLXN0YXJ0IGZpZ3VyZS12YXJpYWJsZXNcbi8vICRmaWd1cmUtY2FwdGlvbi1mb250LXNpemU6ICAgICAgICAgICRzbWFsbC1mb250LXNpemUgIWRlZmF1bHQ7XG4vLyAkZmlndXJlLWNhcHRpb24tY29sb3I6ICAgICAgICAgICAgICAkZ3JheS02MDAgIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIGZpZ3VyZS12YXJpYWJsZXNcblxuXG4vLyAvLyBCcmVhZGNydW1ic1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgYnJlYWRjcnVtYi12YXJpYWJsZXNcbi8vICRicmVhZGNydW1iLWZvbnQtc2l6ZTogICAgICAgICAgICAgIG51bGwgIWRlZmF1bHQ7XG4vLyAkYnJlYWRjcnVtYi1wYWRkaW5nLXk6ICAgICAgICAgICAgICAwICFkZWZhdWx0O1xuLy8gJGJyZWFkY3J1bWItcGFkZGluZy14OiAgICAgICAgICAgICAgMCAhZGVmYXVsdDtcbi8vICRicmVhZGNydW1iLWl0ZW0tcGFkZGluZy14OiAgICAgICAgIC41cmVtICFkZWZhdWx0O1xuLy8gJGJyZWFkY3J1bWItbWFyZ2luLWJvdHRvbTogICAgICAgICAgMXJlbSAhZGVmYXVsdDtcbi8vICRicmVhZGNydW1iLWJnOiAgICAgICAgICAgICAgICAgICAgICRncmF5LTcwMCAhZGVmYXVsdDtcbi8vICRicmVhZGNydW1iLWRpdmlkZXItY29sb3I6ICAgICAgICAgICRncmF5LTYwMCAhZGVmYXVsdDtcbi8vICRicmVhZGNydW1iLWFjdGl2ZS1jb2xvcjogICAgICAgICAgICRncmF5LTIwMCAhZGVmYXVsdDtcbi8vICRicmVhZGNydW1iLWRpdmlkZXI6ICAgICAgICAgICAgICAgIHF1b3RlKFwiL1wiKSAhZGVmYXVsdDtcbi8vICRicmVhZGNydW1iLWRpdmlkZXItZmxpcHBlZDogICAgICAgICRicmVhZGNydW1iLWRpdmlkZXIgIWRlZmF1bHQ7XG4vLyAkYnJlYWRjcnVtYi1ib3JkZXItcmFkaXVzOiAgICAgICAgICBudWxsICFkZWZhdWx0O1xuLy8gLy8gc2Nzcy1kb2NzLWVuZCBicmVhZGNydW1iLXZhcmlhYmxlc1xuXG4vLyAvLyBDYXJvdXNlbFxuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgY2Fyb3VzZWwtdmFyaWFibGVzXG4vLyAkY2Fyb3VzZWwtY29udHJvbC1jb2xvcjogICAgICAgICAgICAgJHdoaXRlICFkZWZhdWx0O1xuLy8gJGNhcm91c2VsLWNvbnRyb2wtd2lkdGg6ICAgICAgICAgICAgIDE1JSAhZGVmYXVsdDtcbi8vICRjYXJvdXNlbC1jb250cm9sLW9wYWNpdHk6ICAgICAgICAgICAuNSAhZGVmYXVsdDtcbi8vICRjYXJvdXNlbC1jb250cm9sLWhvdmVyLW9wYWNpdHk6ICAgICAuOSAhZGVmYXVsdDtcbi8vICRjYXJvdXNlbC1jb250cm9sLXRyYW5zaXRpb246ICAgICAgICBvcGFjaXR5IC4xNXMgZWFzZSAhZGVmYXVsdDtcblxuLy8gJGNhcm91c2VsLWluZGljYXRvci13aWR0aDogICAgICAgICAgIDMwcHggIWRlZmF1bHQ7XG4vLyAkY2Fyb3VzZWwtaW5kaWNhdG9yLWhlaWdodDogICAgICAgICAgM3B4ICFkZWZhdWx0O1xuLy8gJGNhcm91c2VsLWluZGljYXRvci1oaXQtYXJlYS1oZWlnaHQ6IDEwcHggIWRlZmF1bHQ7XG4vLyAkY2Fyb3VzZWwtaW5kaWNhdG9yLXNwYWNlcjogICAgICAgICAgM3B4ICFkZWZhdWx0O1xuLy8gJGNhcm91c2VsLWluZGljYXRvci1vcGFjaXR5OiAgICAgICAgIC41ICFkZWZhdWx0O1xuLy8gJGNhcm91c2VsLWluZGljYXRvci1hY3RpdmUtYmc6ICAgICAgICR3aGl0ZSAhZGVmYXVsdDtcbi8vICRjYXJvdXNlbC1pbmRpY2F0b3ItYWN0aXZlLW9wYWNpdHk6ICAxICFkZWZhdWx0O1xuLy8gJGNhcm91c2VsLWluZGljYXRvci10cmFuc2l0aW9uOiAgICAgIG9wYWNpdHkgLjZzIGVhc2UgIWRlZmF1bHQ7XG5cbi8vICRjYXJvdXNlbC1jYXB0aW9uLXdpZHRoOiAgICAgICAgICAgICA3MCUgIWRlZmF1bHQ7XG4vLyAkY2Fyb3VzZWwtY2FwdGlvbi1jb2xvcjogICAgICAgICAgICAgJHdoaXRlICFkZWZhdWx0O1xuLy8gJGNhcm91c2VsLWNhcHRpb24tcGFkZGluZy15OiAgICAgICAgIDEuMjVyZW0gIWRlZmF1bHQ7XG4vLyAkY2Fyb3VzZWwtY2FwdGlvbi1zcGFjZXI6ICAgICAgICAgICAgMS4yNXJlbSAhZGVmYXVsdDtcblxuLy8gJGNhcm91c2VsLWNvbnRyb2wtaWNvbi13aWR0aDogICAgICAgIDJyZW0gIWRlZmF1bHQ7XG5cbi8vICRjYXJvdXNlbC1jb250cm9sLXByZXYtaWNvbi1iZzogICAgICB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxNiAxNicgZmlsbD0nI3skY2Fyb3VzZWwtY29udHJvbC1jb2xvcn0nPjxwYXRoIGQ9J00xMS4zNTQgMS42NDZhLjUuNSAwIDAgMSAwIC43MDhMNS43MDcgOGw1LjY0NyA1LjY0NmEuNS41IDAgMCAxLS43MDguNzA4bC02LTZhLjUuNSAwIDAgMSAwLS43MDhsNi02YS41LjUgMCAwIDEgLjcwOCAweicvPjwvc3ZnPlwiKSAhZGVmYXVsdDtcbi8vICRjYXJvdXNlbC1jb250cm9sLW5leHQtaWNvbi1iZzogICAgICB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxNiAxNicgZmlsbD0nI3skY2Fyb3VzZWwtY29udHJvbC1jb2xvcn0nPjxwYXRoIGQ9J000LjY0NiAxLjY0NmEuNS41IDAgMCAxIC43MDggMGw2IDZhLjUuNSAwIDAgMSAwIC43MDhsLTYgNmEuNS41IDAgMCAxLS43MDgtLjcwOEwxMC4yOTMgOCA0LjY0NiAyLjM1NGEuNS41IDAgMCAxIDAtLjcwOHonLz48L3N2Zz5cIikgIWRlZmF1bHQ7XG5cbi8vICRjYXJvdXNlbC10cmFuc2l0aW9uLWR1cmF0aW9uOiAgICAgICAuNnMgIWRlZmF1bHQ7XG4vLyAkY2Fyb3VzZWwtdHJhbnNpdGlvbjogICAgICAgICAgICAgICAgdHJhbnNmb3JtICRjYXJvdXNlbC10cmFuc2l0aW9uLWR1cmF0aW9uIGVhc2UtaW4tb3V0ICFkZWZhdWx0OyAvLyBEZWZpbmUgdHJhbnNmb3JtIHRyYW5zaXRpb24gZmlyc3QgaWYgdXNpbmcgbXVsdGlwbGUgdHJhbnNpdGlvbnMgKGUuZy4sIGB0cmFuc2Zvcm0gMnMgZWFzZSwgb3BhY2l0eSAuNXMgZWFzZS1vdXRgKVxuXG4vLyAkY2Fyb3VzZWwtZGFyay1pbmRpY2F0b3ItYWN0aXZlLWJnOiAgJGJsYWNrICFkZWZhdWx0O1xuLy8gJGNhcm91c2VsLWRhcmstY2FwdGlvbi1jb2xvcjogICAgICAgICRibGFjayAhZGVmYXVsdDtcbi8vICRjYXJvdXNlbC1kYXJrLWNvbnRyb2wtaWNvbi1maWx0ZXI6ICBpbnZlcnQoMSkgZ3JheXNjYWxlKDEwMCkgIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIGNhcm91c2VsLXZhcmlhYmxlc1xuXG5cbi8vIC8vIFNwaW5uZXJzXG5cbi8vIC8vIHNjc3MtZG9jcy1zdGFydCBzcGlubmVyLXZhcmlhYmxlc1xuLy8gJHNwaW5uZXItd2lkdGg6ICAgICAgICAgICAycmVtICFkZWZhdWx0O1xuLy8gJHNwaW5uZXItaGVpZ2h0OiAgICAgICAgICAkc3Bpbm5lci13aWR0aCAhZGVmYXVsdDtcbi8vICRzcGlubmVyLXZlcnRpY2FsLWFsaWduOiAgLS4xMjVlbSAhZGVmYXVsdDtcbi8vICRzcGlubmVyLWJvcmRlci13aWR0aDogICAgLjI1ZW0gIWRlZmF1bHQ7XG4vLyAkc3Bpbm5lci1hbmltYXRpb24tc3BlZWQ6IC43NXMgIWRlZmF1bHQ7XG5cbi8vICRzcGlubmVyLXdpZHRoLXNtOiAgICAgICAgMXJlbSAhZGVmYXVsdDtcbi8vICRzcGlubmVyLWhlaWdodC1zbTogICAgICAgJHNwaW5uZXItd2lkdGgtc20gIWRlZmF1bHQ7XG4vLyAkc3Bpbm5lci1ib3JkZXItd2lkdGgtc206IC4yZW0gIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIHNwaW5uZXItdmFyaWFibGVzXG5cblxuLy8gLy8gQ2xvc2VcblxuLy8gLy8gc2Nzcy1kb2NzLXN0YXJ0IGNsb3NlLXZhcmlhYmxlc1xuLy8gJGJ0bi1jbG9zZS13aWR0aDogICAgICAgICAgICAxZW0gIWRlZmF1bHQ7XG4vLyAkYnRuLWNsb3NlLWhlaWdodDogICAgICAgICAgICRidG4tY2xvc2Utd2lkdGggIWRlZmF1bHQ7XG4vLyAkYnRuLWNsb3NlLXBhZGRpbmcteDogICAgICAgIC4yNWVtICFkZWZhdWx0O1xuLy8gJGJ0bi1jbG9zZS1wYWRkaW5nLXk6ICAgICAgICAkYnRuLWNsb3NlLXBhZGRpbmcteCAhZGVmYXVsdDtcbiRidG4tY2xvc2UtY29sb3I6ICAgICAgICAgICAgICAgICAgICAgICAkd2hpdGUgIWRlZmF1bHQ7XG4vLyAkYnRuLWNsb3NlLWJnOiAgICAgICAgICAgICAgIHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbCw8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDE2IDE2JyBmaWxsPScjeyRidG4tY2xvc2UtY29sb3J9Jz48cGF0aCBkPSdNLjI5My4yOTNhMSAxIDAgMDExLjQxNCAwTDggNi41ODYgMTQuMjkzLjI5M2ExIDEgMCAxMTEuNDE0IDEuNDE0TDkuNDE0IDhsNi4yOTMgNi4yOTNhMSAxIDAgMDEtMS40MTQgMS40MTRMOCA5LjQxNGwtNi4yOTMgNi4yOTNhMSAxIDAgMDEtMS40MTQtMS40MTRMNi41ODYgOCAuMjkzIDEuNzA3YTEgMSAwIDAxMC0xLjQxNHonLz48L3N2Zz5cIikgIWRlZmF1bHQ7XG4vLyAkYnRuLWNsb3NlLWZvY3VzLXNoYWRvdzogICAgICRpbnB1dC1idG4tZm9jdXMtYm94LXNoYWRvdyAhZGVmYXVsdDtcbi8vICRidG4tY2xvc2Utb3BhY2l0eTogICAgICAgICAgLjUgIWRlZmF1bHQ7XG4vLyAkYnRuLWNsb3NlLWhvdmVyLW9wYWNpdHk6ICAgIC43NSAhZGVmYXVsdDtcbi8vICRidG4tY2xvc2UtZm9jdXMtb3BhY2l0eTogICAgMSAhZGVmYXVsdDtcbi8vICRidG4tY2xvc2UtZGlzYWJsZWQtb3BhY2l0eTogLjI1ICFkZWZhdWx0O1xuLy8gJGJ0bi1jbG9zZS13aGl0ZS1maWx0ZXI6ICAgICBpbnZlcnQoMSkgZ3JheXNjYWxlKDEwMCUpIGJyaWdodG5lc3MoMjAwJSkgIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIGNsb3NlLXZhcmlhYmxlc1xuXG5cbi8vIC8vIE9mZmNhbnZhc1xuXG4vLyAvLyBzY3NzLWRvY3Mtc3RhcnQgb2ZmY2FudmFzLXZhcmlhYmxlc1xuLy8gJG9mZmNhbnZhcy1wYWRkaW5nLXk6ICAgICAgICAgICAgICAgJG1vZGFsLWlubmVyLXBhZGRpbmcgIWRlZmF1bHQ7XG4vLyAkb2ZmY2FudmFzLXBhZGRpbmcteDogICAgICAgICAgICAgICAkbW9kYWwtaW5uZXItcGFkZGluZyAhZGVmYXVsdDtcbi8vICRvZmZjYW52YXMtaG9yaXpvbnRhbC13aWR0aDogICAgICAgIDQwMHB4ICFkZWZhdWx0O1xuLy8gJG9mZmNhbnZhcy12ZXJ0aWNhbC1oZWlnaHQ6ICAgICAgICAgMzB2aCAhZGVmYXVsdDtcbi8vICRvZmZjYW52YXMtdHJhbnNpdGlvbi1kdXJhdGlvbjogICAgIC4zcyAhZGVmYXVsdDtcbi8vICRvZmZjYW52YXMtYm9yZGVyLWNvbG9yOiAgICAgICAgICAgICRtb2RhbC1jb250ZW50LWJvcmRlci1jb2xvciAhZGVmYXVsdDtcbi8vICRvZmZjYW52YXMtYm9yZGVyLXdpZHRoOiAgICAgICAgICAgICRtb2RhbC1jb250ZW50LWJvcmRlci13aWR0aCAhZGVmYXVsdDtcbi8vICRvZmZjYW52YXMtdGl0bGUtbGluZS1oZWlnaHQ6ICAgICAgICRtb2RhbC10aXRsZS1saW5lLWhlaWdodCAhZGVmYXVsdDtcbi8vICRvZmZjYW52YXMtYmctY29sb3I6ICAgICAgICAgICAgICAgICRtb2RhbC1jb250ZW50LWJnICFkZWZhdWx0O1xuLy8gJG9mZmNhbnZhcy1jb2xvcjogICAgICAgICAgICAgICAgICAgJG1vZGFsLWNvbnRlbnQtY29sb3IgIWRlZmF1bHQ7XG4vLyAkb2ZmY2FudmFzLWJveC1zaGFkb3c6ICAgICAgICAgICAgICAkbW9kYWwtY29udGVudC1ib3gtc2hhZG93LXhzICFkZWZhdWx0O1xuLy8gJG9mZmNhbnZhcy1iYWNrZHJvcC1iZzogICAgICAgICAgICAgJG1vZGFsLWJhY2tkcm9wLWJnICFkZWZhdWx0O1xuLy8gJG9mZmNhbnZhcy1iYWNrZHJvcC1vcGFjaXR5OiAgICAgICAgJG1vZGFsLWJhY2tkcm9wLW9wYWNpdHkgIWRlZmF1bHQ7XG4vLyAvLyBzY3NzLWRvY3MtZW5kIG9mZmNhbnZhcy12YXJpYWJsZXNcblxuLy8gLy8gQ29kZVxuXG4vLyAkY29kZS1mb250LXNpemU6ICAgICAgICAgICAgICAgICAgICAkc21hbGwtZm9udC1zaXplICFkZWZhdWx0O1xuLy8gJGNvZGUtY29sb3I6ICAgICAgICAgICAgICAgICAgICAgICAgJHBpbmsgIWRlZmF1bHQ7XG5cbi8vICRrYmQtcGFkZGluZy15OiAgICAgICAgICAgICAgICAgICAgIC4ycmVtICFkZWZhdWx0O1xuLy8gJGtiZC1wYWRkaW5nLXg6ICAgICAgICAgICAgICAgICAgICAgLjRyZW0gIWRlZmF1bHQ7XG4vLyAka2JkLWZvbnQtc2l6ZTogICAgICAgICAgICAgICAgICAgICAkY29kZS1mb250LXNpemUgIWRlZmF1bHQ7XG4vLyAka2JkLWNvbG9yOiAgICAgICAgICAgICAgICAgICAgICAgICAkd2hpdGUgIWRlZmF1bHQ7XG4vLyAka2JkLWJnOiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZ3JheS05MDAgIWRlZmF1bHQ7XG5cbi8vICRwcmUtY29sb3I6ICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgIWRlZmF1bHQ7XG5cblxuJHBvb2xzOiAkeWVsbG93LCAkY3lhbiwgI0YzNkQ0RSwgJGN5YW4tMTAwO1xuIl19 */"] });


/***/ }),

/***/ 71647:
/*!********************************************************************!*\
  !*** ./src/app/views/main/modals/paymaster/paymaster.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaymasterComponent": () => (/* binding */ PaymasterComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 12664);
/* harmony import */ var src_app_services_paymaster_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/services/paymaster.service */ 88206);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 38583);
/* harmony import */ var _shared_hashed_asset_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/hashed-asset.directive */ 50163);
/* harmony import */ var ngx_libs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-libs */ 76115);







function PaymasterComponent_a_7_img_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "img", 17);
  }
}

function PaymasterComponent_a_7_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("-", item_r1.discount, "%");
  }
}

function PaymasterComponent_a_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PaymasterComponent_a_7_Template_a_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6);
      const item_r1 = restoredCtx.$implicit;
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return ctx_r5.onSelect(item_r1);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, PaymasterComponent_a_7_img_6_Template, 1, 0, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, PaymasterComponent_a_7_span_8_Template, 2, 1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "ngx-money", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](13, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", item_r1.icon, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r1.tokenName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](7, 11, ctx_r0.key) === item_r1.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", item_r1.discount);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](11, 13, item_r1.balance))("precision", item_r1.precision)("disableTooltip", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](13, 15, item_r1.symbol), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("invisible", !item_r1.provider);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Powered by ", item_r1.provider, "");
  }
}

class PaymasterComponent {
  constructor(ngbActiveModal, paymasterService) {
    this.ngbActiveModal = ngbActiveModal;
    this.paymasterService = paymasterService;
  }

  ngOnInit() {
    this.items = this.paymasterService.createItems(null);
    this.key = this.paymasterService.key;
  }

  onSelect(item) {
    this.paymasterService.select(item.key);
    this.ngbActiveModal.close();
  }

}

PaymasterComponent.ɵfac = function PaymasterComponent_Factory(t) {
  return new (t || PaymasterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbActiveModal), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_paymaster_service__WEBPACK_IMPORTED_MODULE_0__.PaymasterService));
};

PaymasterComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: PaymasterComponent,
  selectors: [["app-paymaster"]],
  decls: 8,
  vars: 1,
  consts: [[1, "modal-header", "px-3", "border-bottom"], [1, "modal-title", "fs-5-5"], ["aria-label", "Close", 1, "close", "cursor-pointer", 3, "click"], ["aria-hidden", "true"], [1, "modal-body", "p-0"], ["href", "javascript:;", "class", "item d-flex align-items-center", 3, "click", 4, "ngFor", "ngForOf"], ["href", "javascript:;", 1, "item", "d-flex", "align-items-center", 3, "click"], [1, "list-icon", 3, "src"], [1, "token", "mx-3"], [1, "d-flex", "align-items-center"], [1, "text-white"], ["class", "ms-2", "src", "/retired-zksync/assets/images/icons/tick_20.svg", 4, "ngIf"], ["class", "btn btn-outline-success btn-small text-success ms-2 py-0 px-1", 4, "ngIf"], [1, "text-gray"], [3, "value", "precision", "disableTooltip"], [1, "gas", "ms-auto", "text-end"], [1, "text-gray", "fs-7"], ["src", "/retired-zksync/assets/images/icons/tick_20.svg", 1, "ms-2"], [1, "btn", "btn-outline-success", "btn-small", "text-success", "ms-2", "py-0", "px-1"]],
  template: function PaymasterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "h6", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Pay Gas by");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PaymasterComponent_Template_div_click_3_listener() {
        return ctx.ngbActiveModal.dismiss();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u00D7");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, PaymasterComponent_a_7_Template, 17, 17, "a", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.items);
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _shared_hashed_asset_directive__WEBPACK_IMPORTED_MODULE_1__.HashedAssetDirective, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, ngx_libs__WEBPACK_IMPORTED_MODULE_5__.MoneyComponent],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe],
  styles: [".item[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n}\n\n.list-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n}\n\n.btn-small[_ngcontent-%COMP%] {\n  border-radius: 0.4375rem;\n  font-size: 10px;\n  line-height: 12px;\n  border: 1px solid;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheW1hc3Rlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0Usd0JBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtBQUNGIiwiZmlsZSI6InBheW1hc3Rlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pdGVtIHtcbiAgcGFkZGluZzogLjc1cmVtIDFyZW07XG59XG5cbi5saXN0LWljb24ge1xuICB3aWR0aDogMzJweDtcbiAgaGVpZ2h0OiAzMnB4O1xufVxuXG4uYnRuLXNtYWxsIHtcbiAgYm9yZGVyLXJhZGl1czogLjQzNzVyZW07XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgbGluZS1oZWlnaHQ6IDEycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkO1xufVxuIl19 */"]
});

/***/ }),

/***/ 12785:
/*!******************************************************!*\
  !*** ./src/app/views/main/modals/xy/xy.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XyComponent": () => (/* binding */ XyComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37716);

class XyComponent {
    constructor() { }
    ngOnInit() {
    }
}
XyComponent.ɵfac = function XyComponent_Factory(t) { return new (t || XyComponent)(); };
XyComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: XyComponent, selectors: [["app-xy"]], decls: 2, vars: 0, consts: [[1, "modal-body", "p-0"], ["src", "https://widget.xy.finance/?amount=100&fromTokenAddress=0xaf88d065e77c8cC2239327C5EDb3A432268e5831&lockmode=none&referrer=0x79De72A0B7282c8ae7Ebe21867582Ab8d6849af2&commissionRate=0&slippage=1&sourceChainId=42161&targetChainId=324&theme=dark&toTokenAddress=0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4"]], template: function XyComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "iframe", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["iframe[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 556px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInh5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsV0FBQTtFQUNBLGFBQUE7QUFBRiIsImZpbGUiOiJ4eS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaWZyYW1lIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNTU2cHg7XG59XG4iXX0= */"] });


/***/ }),

/***/ 12132:
/*!*******************************************************************************!*\
  !*** ./src/app/views/main/unavailable-region/unavailable-region.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnavailableRegionComponent": () => (/* binding */ UnavailableRegionComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37716);

class UnavailableRegionComponent {
    constructor() { }
    ngOnInit() {
    }
}
UnavailableRegionComponent.ɵfac = function UnavailableRegionComponent_Factory(t) { return new (t || UnavailableRegionComponent)(); };
UnavailableRegionComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UnavailableRegionComponent, selectors: [["app-unavailable-region"]], decls: 12, vars: 0, consts: [[1, "modal-header", "pb-2"], [1, "modal-title"], ["src", "/retired-zksync/assets/images/icons/asset_locked_32.svg", 1, "mt-3"], [1, "modal-body", "p-0"], ["href", "https://zomma-protocol.gitbook.io/welcome-to-zomma/glossary/term-of-use", "rel", "noopener", "target", "_blank"]], template: function UnavailableRegionComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h6", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Service Unavailable in Your Region");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "In order to comply with regulatory complainces, we're unable to provide our services to you.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Terms & Use");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, ".");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["[_nghost-%COMP%] {\n  padding: 1rem;\n}\n\n.modal-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuYXZhaWxhYmxlLXJlZ2lvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0FBQ0YiLCJmaWxlIjoidW5hdmFpbGFibGUtcmVnaW9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4ubW9kYWwtaGVhZGVyIHtcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcbn1cbiJdfQ== */"] });


/***/ })

}]);
//# sourceMappingURL=src_app_views_main_main_module_ts.js.map