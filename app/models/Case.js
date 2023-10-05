import { generateId } from "../utils/GenerateId.js";

export class Case {
  constructor(data) {
    this.id = generateId()
    this.agency = data.agency
    this.report = data.report || "No report"
    this.unlocked = data.unlocked || false
    // this.unlocked = data.unlocked ? data.unlocked : false
    this.reportedDate = data.reportedDate ? new Date(data.reportedDate) : new Date()
  }

  get CaseCardTemplate() {
    return `
  <div class="col-6 col-lg-4 p-3">
    <div onClick="app.CasesController.setActiveCase('${this.id}')" class="row justify-content-center flex-column align-items-center p-3 briefcase">
      <div class="handle d-flex align-items-end justify-content-center">
        <div class="handle-hole "></div>
      </div>
      <div class="case d-flex align-items-center justify-content-center">
        <div class="py-2 fs-1">${this.agency}</div>
      </div>
    </div>  
  </div>
    `
  }

  get ActiveCaseTemplate() {
    return `
    <div class="col-6 col-lg-2">
        <button onclick="app.CasesController.goHome()" class="btn btn-primary rounded-pill" type="button" onclick="app.CasesController.goHome()"><i class="mdi mdi-arrow-left"></i> Back</button>
      </div>
      <div class="col-12">
        <p class="fs-2">Agency Name: ${this.agency}</p>
      </div>
      <div class="col-6 col-lg-2">
        <p onclick="app.CasesController.unlockCase()" class="fs-2" role="button">🔒 Unlock</p>
      </div>
      <div class="col-12">
        <p class="fs-2">${this.reportedDate.toLocaleString()}</p>
      </div>
      <div class="col-12">
      </div>
      `
    }
    // <p class="bg-dark text-light">${this.report}</p>
  
  get UnlockedCaseTemplate() {
    return `
    <div class="col-6 col-lg-2">
        <button onclick="app.CasesController.goHome()" class="btn btn-primary rounded-pill" type="button" ><i class="mdi mdi-arrow-left"></i> Back</button>
      </div>
      <div class="col-12">
        <p class="fs-2">Agency Name: ${this.agency}</p>
      </div>
      <div class="col-6 col-lg-2">
        <p onclick="app.CasesController.lockCase()" class="fs-2" role="button">🔓 Lock</p>
      </div>
      <div class="col-12">
        <p class="fs-2">${this.reportedDate.toLocaleTimeString()}</p>
      </div>
      <div class="col-12">
        <textarea onblur="app.CasesController.lockCase()" id="case-contents" class="bg-dark text-light w-100 rounded textarea-height fs-5">${this.report}</textarea>
    </div>
    `
  }
}