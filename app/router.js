import { AboutController } from "./controllers/AboutController.js";
import { CasesController } from "./controllers/CasesController.js";
import { HomeController } from "./controllers/HomeController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { AboutView } from "./views/AboutView.js";


export const router = [
  {
    path: '',
    controller: CasesController,
    view: /*html*/`
    <div class="container-fluid">
      <div class="row">
        <div id="cases-count" class="col-12 text-center fs-1"></div>
      </div>
      <div id="cases" class="row">
      </div>
    </div>
    `
  },
  {
    path: '#/about',
    controller: [AboutController, ValuesController],
    view: AboutView
  }
]