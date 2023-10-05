import { AppState } from "../AppState.js"
import { Case } from "../models/Case.js"
import { saveState } from "../utils/Store.js"

function _save() {
  saveState('cases', AppState.cases)
}

class CasesService {

setActiveCase(caseId) {
  console.log('[CASES SERVICE] setActiveCase, caseId:', caseId)
  const activeCase = AppState.cases.find(caseFile => caseFile.id == caseId)
  console.log('[CASES SERVICE] setActiveCase, activeCase:', activeCase)
  AppState.activeCase = activeCase
  console.log('[CASES SERVICE] setActiveCase, AppState.activeCase:', AppState.activeCase)
}

unlockCase() {
  let activeCase = AppState.activeCase
  console.log('[CASES SERVICE] unlockCase, activeCase:', activeCase.unlocked)
  activeCase.unlocked = true
  console.log('[CASES SERVICE] unlockCase, activeCase after unlocked set to true:', activeCase.unlocked)
  AppState.emit("activeCase")
}

lockCase() {
  let activeCase = AppState.activeCase
  console.log('[CASES SERVICE] unlockCase, activeCase:', activeCase.unlocked)
  activeCase.unlocked = false
  console.log('[CASES SERVICE] unlockCase, activeCase after unlocked set to false:', activeCase.unlocked)
  AppState.emit("activeCase")
}

saveActiveCase(caseContents) {
  let activeCase = AppState.activeCase
  activeCase.report = caseContents
  console.log('[CASES SERVICE] saveActiveCase activeCase after report changes:', activeCase)

  _save()
}

createCase(caseData) {
  const newCase = new Case(caseData)
  console.log('[CASES SERVICE]createCase, newCase:', newCase)
  AppState.cases.push(newCase)
  AppState.emit('cases')

  _save()
}

}

export const casesService = new CasesService