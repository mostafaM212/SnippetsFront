

import {orderBy as _orderBy } from 'lodash'
import hotkeys from "hotkeys-js";
export default {

  computed : {
    orderStepsAsc(){
      return _orderBy(this.steps ,'order','ASC')
    },
    orderedStepDesc(){
      return _orderBy(this.steps ,'order','desc')
    },
    firstStep(){
      return this.orderStepsAsc[0]
    },
    nextStep(){
      return this.orderStepsAsc.find(
        (e)=>e.order > this.currentStep.order
      ) || null
    },
    previousStep(){
      return this.orderStepsAsc.find(
        (e)=>e.order < this.currentStep.order
      ) || null
    },
    currentStep(){
        return this.orderStepsAsc.find(
          s => s.uuid === this.$route.query.step
        )|| this.firstStep
    },
    currentStepIndex(){
      return this.orderStepsAsc.map(
        s => s.uuid
      ).indexOf(this.currentStep.uuid)
    }
  },
  mounted() {
    this.registerKeyBoardShortcuts()
  },
  methods : {

    registerKeyBoardShortcuts(){
      console.log('ok')
      hotkeys('ctrl+shift+left,ctrl+shift+right', function (event , handler){
        console.log(this.steps)
        switch (handler.shortcut) {

          case 'ctrl+shift+left':
            this.choose(this.previousStep)

            break ;
          case  'ctrl+shift+right':
            this.choose(this.nextStep)
            break ;
        }
      })
    },

  }
}
