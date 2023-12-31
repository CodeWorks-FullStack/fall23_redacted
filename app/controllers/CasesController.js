import { AppState } from "../AppState.js";
import { casesService } from "../services/CasesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawCases() {
  const cases = AppState.cases
  console.log('[CASES CONTROLLER] _drawCases, cases:', cases)
  console.log('cases.length number:', cases.length)
  let content = ""
  cases.forEach(caseFile => content += caseFile.CaseCardTemplate)
  console.log('[CASES CONTROLLER] _drawCases, content:', content)
  setHTML("cases-count", `${cases.length} cases on file`)
  setHTML("cases", content)
}

function _drawActiveCase() {
  const activeCase = AppState.activeCase
  
  if(activeCase.unlocked == false) {
    // NOTE MAKE SURE IF THE CASE ISN'T UNLOCKED TO RENDER NO COUNT/THE "UNLOCKED" CASE TEMPLATE
    setHTML("cases-count", "")
    setHTML("cases", activeCase.ActiveCaseTemplate)
  } else {
    // NOTE IF IT IS UNLOCKED, RENDER THE UNLOCKED CASE TEMPLATE
    setHTML("cases-count", "")
    setHTML("cases", activeCase.UnlockedCaseTemplate)
  }
}

export class CasesController{
  constructor() {
    Pop.success('Cases Controller good to go')
    // ON PAGE LOAD
    // _drawCases()
    // LISTENERS/OBSERVERS
    AppState.on('cases', _drawCases)
    AppState.on('activeCase', _drawActiveCase)
  }

  goHome() {
    _drawCases()
  }

  test() {
    Pop.success("Test successful")
  }

  setActiveCase(caseId) {
    casesService.setActiveCase(caseId)
  }

  unlockCase() {
    casesService.unlockCase()
    // NOTE USE TO GO DOWN TO THE TEXT AREA WHEN UNLOCKED
    // GRADE THE REPORT ELEMENT
    const reportElem = document.getElementById('case-contents')
    // NOTE USE BUILT IN JAVASCRIPT FUNCTION TO FOCUS ON THE TEXT AREA
    reportElem.focus()
    // NOTE THIS FUNCTION IS SETTING THE CURSOR TO THE END OF THE CURRENT TEXT
    reportElem.setSelectionRange(reportElem.value.length, reportElem.value.length)
  }

  lockCase() {
    let caseContents = document.getElementById('case-contents').value
    console.log('[CASES CONTROLLER] lockCase, caseContents:', caseContents)

    casesService.saveActiveCase(caseContents)
    casesService.lockCase()
  }

  createCase(event) {
    try {
      event.preventDefault()

      const form = event.target

      const eventData = getFormData(form)
      console.log('[CASES CONTROLLER] createCase, eventData:', eventData)

      casesService.createCase(eventData)
      Pop.success('Case successfully created!')
      form.reset()
      bootstrap.Offcanvas.getOrCreateInstance("#createCaseOffcanvas").hide()


      } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }
}