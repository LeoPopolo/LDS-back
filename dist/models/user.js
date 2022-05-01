"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User {
    constructor(username, password, email, birthdate, name, surname, phone_number, role, subjects_info, id) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.birthdate = birthdate;
        this.name = name;
        this.surname = surname;
        this.phone_number = phone_number;
        this.role = role;
        if (subjects_info !== undefined && subjects_info !== null) {
            this.subjects_info = subjects_info;
        }
        if (id !== undefined && id !== null) {
            this.id = id;
        }
    }
    encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            return bcryptjs_1.default.hash(password, salt);
        });
    }
    validatePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(password, this.password);
        });
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map