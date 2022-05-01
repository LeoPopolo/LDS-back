"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
class Subject {
    constructor(name, quarter, professor, id) {
        this.name = name;
        this.quarter = quarter;
        this.professor = professor;
        if (id !== undefined && id !== null) {
            this.id = id;
        }
    }
}
exports.Subject = Subject;
//# sourceMappingURL=subject.js.map